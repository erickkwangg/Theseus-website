// Generate an Ed25519 keypair for the PoA service. Print the private JWK to add to
// .env.local as POA_SIGNING_KEY_JWK, and the public JWK for the served jwks.json.
// Run with: npm run poa:keygen

import { generateAndExportKeyPair } from "../src/lib/poa/credential";

async function main() {
  const { privateJwk, publicJwk } = await generateAndExportKeyPair();
  console.log("# Add this line to .env.local (single line, JSON-stringified):");
  console.log(`POA_SIGNING_KEY_JWK='${JSON.stringify(privateJwk)}'`);
  console.log("\n# Public JWK (for reference; served at /poa/.well-known/jwks.json):");
  console.log(JSON.stringify({ keys: [publicJwk] }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
