// PoA credential mint/verify. Single Ed25519 signing key for v1 (per design call).
// Key is loaded from env: POA_SIGNING_KEY_JWK (a JWK string). Generate one with
// `npm run poa:keygen` (script defined in package.json). Public JWK is exposed at
// /poa/.well-known/jwks.json so verifiers don't need to trust an out-of-band key.

import { CompactSign, compactVerify, importJWK, exportJWK, generateKeyPair } from "jose";
import type { JWK } from "jose";
import type { PoACredentialClaims } from "./types";

const KID = "theseus-poa-2026-04";
const ALG = "EdDSA";

export type SigningKey = {
  privateKey: CryptoKey;
  publicKey: CryptoKey;
  publicJwk: JWK;
  kid: string;
};

let cached: SigningKey | null = null;

export async function getSigningKey(): Promise<SigningKey> {
  if (cached) return cached;
  const jwkString = process.env.POA_SIGNING_KEY_JWK;
  if (!jwkString) {
    throw new Error(
      "POA_SIGNING_KEY_JWK is not set. Run `npm run poa:keygen` and add the output to .env.local.",
    );
  }
  const privateJwk = JSON.parse(jwkString) as JWK;
  if (privateJwk.kty !== "OKP" || privateJwk.crv !== "Ed25519") {
    throw new Error(
      `POA_SIGNING_KEY_JWK has unexpected algorithm: kty=${privateJwk.kty} crv=${privateJwk.crv}; expected Ed25519`,
    );
  }
  const privateKey = (await importJWK(privateJwk, ALG)) as CryptoKey;
  const { kty, crv, x } = privateJwk;
  if (!kty || !crv || !x) {
    throw new Error("POA_SIGNING_KEY_JWK is missing required fields (kty/crv/x)");
  }
  const publicJwk: JWK = { kty, crv, x, alg: ALG, kid: KID, use: "sig" };
  // Pre-import the public key once so verifyCredential doesn't re-import on
  // every request.
  const publicKey = (await importJWK(publicJwk, ALG)) as CryptoKey;
  cached = { privateKey, publicKey, publicJwk, kid: KID };
  return cached;
}

export async function generateAndExportKeyPair(): Promise<{
  privateJwk: JWK;
  publicJwk: JWK;
}> {
  const { privateKey, publicKey } = await generateKeyPair(ALG, { extractable: true });
  const privateJwk = await exportJWK(privateKey);
  const publicJwk = await exportJWK(publicKey);
  return {
    privateJwk: { ...privateJwk, alg: ALG, kid: KID, use: "sig" },
    publicJwk: { ...publicJwk, alg: ALG, kid: KID, use: "sig" },
  };
}

const encoder = new TextEncoder();

export async function mintCredential(claims: PoACredentialClaims): Promise<string> {
  const key = await getSigningKey();
  const payload = encoder.encode(JSON.stringify(claims));
  const jws = await new CompactSign(payload)
    .setProtectedHeader({ alg: ALG, kid: key.kid, typ: "poa+jws" })
    .sign(key.privateKey);
  return jws;
}

export async function verifyCredential(
  jws: string,
): Promise<{ claims: PoACredentialClaims; valid: true } | { valid: false; reason: string }> {
  try {
    const key = await getSigningKey();
    // Pin the algorithm explicitly. compactVerify already rejects "none", but
    // without `algorithms` it would also accept any other alg the supplied
    // key happens to support — a confused-deputy hardening concern.
    const { payload } = await compactVerify(jws, key.publicKey, {
      algorithms: [ALG],
    });
    const claims = JSON.parse(new TextDecoder().decode(payload)) as PoACredentialClaims;
    return { claims, valid: true };
  } catch (err) {
    return { valid: false, reason: err instanceof Error ? err.message : "verify failed" };
  }
}

export async function publicJwks(): Promise<{ keys: JWK[] }> {
  const key = await getSigningKey();
  return { keys: [key.publicJwk] };
}
