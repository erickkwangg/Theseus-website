// Input validation helpers for PoA API routes. Caps enforced *before* any
// downstream operation (chain query, signature verify, KV write) so we never
// pass an untrusted oversized payload to a more expensive layer.
//
// Numbers chosen with generous headroom over real-world maxima:
// - SS58 addresses: 47-49 chars in practice; cap at 64.
// - Hex signatures (sr25519/ed25519): 130 chars (0x + 128 hex); cap at 256.
// - Hex nonces: we issue 32 chars; cap at 128 to allow future growth.
// - JWS compact: ~1.6 KB today; cap at 32 KB to handle larger claim payloads
//   without blowing past serverless body limits.
// - JTI (ulid): 26 chars; cap at 64.

export const LIMITS = {
  agentId: 64,
  signatureHex: 256,
  nonce: 128,
  jws: 32 * 1024,
  jti: 64,
} as const;

export function isBoundedString(
  v: unknown,
  maxLen: number,
): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= maxLen;
}

// SS58-ish: base58 alphabet, length range. Doesn't verify checksum (that's
// what the chain reader does); just rules out obvious garbage to give a
// clean 400 instead of a downstream throw.
const SS58_RE = /^[1-9A-HJ-NP-Za-km-z]{40,64}$/;

export function looksLikeSs58(v: unknown): v is string {
  return typeof v === "string" && SS58_RE.test(v);
}

// Hex with optional 0x prefix.
const HEX_RE = /^(0x)?[0-9a-fA-F]+$/;

export function isHexString(v: unknown, maxLen: number): v is string {
  return typeof v === "string" && v.length <= maxLen && HEX_RE.test(v);
}
