"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import CopyButton from "../_components/CopyButton";

type Lang = "curl" | "ts" | "rust" | "python" | "ship" | "vichtn";

const RECIPES: Record<Lang, { label: string; body: string }> = {
  curl: {
    label: "cURL",
    body: `# Use the PoA verify endpoint directly. Easiest path.
curl -sS https://theseus.network/poa/api/verify \\
  -H 'content-type: application/json' \\
  -d '{"jws":"eyJhbGciOi..."}'

# Or fetch the public JWKS and verify offline with any JOSE tool:
curl -sS https://theseus.network/poa/.well-known/jwks.json`,
  },
  ts: {
    label: "TypeScript (jose)",
    body: `import { compactVerify, importJWK } from "jose";

const jwks = await fetch(
  "https://theseus.network/poa/.well-known/jwks.json",
).then((r) => r.json());
const key = await importJWK(jwks.keys[0], "EdDSA");

const { payload } = await compactVerify(jws, key);
const claims = JSON.parse(new TextDecoder().decode(payload));

console.log("agent:", claims.sub);
console.log("attestation:", claims.attestation.kind);
console.log("verification grade:", claims.agent.recentRuns.grade);`,
  },
  rust: {
    label: "Rust (jsonwebtoken / josekit)",
    body: `// Cargo.toml: josekit = "0.8"
use josekit::{jws::EdDSA, jwk::Jwk, jws};

let jwks: serde_json::Value = reqwest::blocking::get(
    "https://theseus.network/poa/.well-known/jwks.json",
)?.json()?;
let jwk: Jwk = serde_json::from_value(jwks["keys"][0].clone())?;
let verifier = EdDSA.verifier_from_jwk(&jwk)?;
let (payload, _header) = jws::deserialize_compact(jws_str.as_bytes(), &verifier)?;
let claims: serde_json::Value = serde_json::from_slice(&payload)?;
println!("agent: {}", claims["sub"]);`,
  },
  python: {
    label: "Python (PyJWT / authlib)",
    body: `# pip install authlib httpx
import httpx
from authlib.jose import JsonWebKey, jwt

jwks = httpx.get("https://theseus.network/poa/.well-known/jwks.json").json()
key = JsonWebKey.import_key(jwks["keys"][0])
claims = jwt.decode(jws, key)
claims.validate()  # checks the signature and standard claims

print("agent:", claims["sub"])
print("attestation:", claims["attestation"]["kind"])`,
  },
  ship: {
    label: "SHIP (agent)",
    body: `// agents/poa_gated.ship
// Reject delegation to any agent whose PoA token is invalid, revoked,
// or below the grade threshold. Uses the same /poa/api/verify endpoint
// as the cURL recipe, called through a host-provided tool.

#[agent(name = "PoaGated", version = 1, ship = "1.0")]

const claude_haiku_4_5: bytes32 = 0x0000000000000000000000000000000000000000000000000000000000000000;

struct VerifyResult {
    valid: bool,
    revoked: bool,
    agent_id: string,
    grade: string,         // "full" | "mixed" | "lite"
    issued_at: u64,
}

tool verify_poa(token: string) -> VerifyResult;
tool delegate_to(agent_id: string, intent: string) -> string;

let target_token: string;
let intent: string;

#[entry]
node start(token: string, plan: string) {
    target_token = token;
    intent = plan;
    goto(check);
}

#[retry(2), timeout(blocks=20)]
node check() {
    let r = verify_poa(target_token);
    if (!r.valid || r.revoked) {
        raise(\`poa: token rejected\`);
    }
    if (r.grade == "lite") {
        raise(\`poa: grade=\${r.grade} below threshold\`);
    }
    goto(act, r.agent_id);
}

node act(agent_id: string) {
    let receipt = delegate_to(agent_id, intent);
    return receipt;
}`,
  },
  vichtn: {
    label: "VIC-HTN (guardian)",
    body: `# poa_invariant.py
# Add Proof of Agenthood as a precondition before VIC-HTN's Logical Guardian
# clears a plan that delegates work to another on-chain agent.

import httpx
from vic_htn.verification import (
    LogicalGuardian,
    InvariantResult,
    InvariantViolation,
    build_expected_changes,
    build_guardian_constraints,
)

POA = "https://theseus.network/poa/api/verify"

def check_poa(token: str) -> InvariantViolation | None:
    r = httpx.post(POA, json={"jws": token}, timeout=5).json()
    if not r["valid"] or r.get("revoked"):
        return InvariantViolation(
            rule="poa.signature",
            detail=r.get("reason", "invalid or revoked"),
        )
    if r["agent"]["recentRuns"]["grade"] == "lite":
        return InvariantViolation(
            rule="poa.grade",
            detail="grade=lite below threshold",
        )
    return None

def gate_plan(plan, simulation_result, user_address) -> InvariantResult:
    guardian = LogicalGuardian()
    base = guardian.verify(
        simulation_result,
        expected_changes=build_expected_changes(plan),
        constraints=build_guardian_constraints(plan),
        user_address=user_address,
    )
    poa_failures = [
        v for s in plan.steps
        if (tok := s.metadata.get("poa_token"))
        if (v := check_poa(tok)) is not None
    ]
    if poa_failures:
        return InvariantResult(
            passed=base.passed,
            failed=base.failed + poa_failures,
            is_safe=False,
        )
    return base`,
  },
};

const ORDER: Lang[] = ["curl", "ts", "rust", "python", "ship", "vichtn"];

export default function VerificationRecipes() {
  const [lang, setLang] = useState<Lang>("curl");
  const recipe = RECIPES[lang];
  return (
    <div className="border border-slate-300/70 bg-white/70 dark:border-slate-700/55 dark:bg-slate-900/40">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          recipe
        </span>
        <div role="tablist" className="flex flex-wrap gap-1.5">
          {ORDER.map((l) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={l === lang}
              onClick={() => setLang(l)}
              className={cn(
                "border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors",
                l === lang
                  ? "border-indigo-500/60 bg-indigo-500/10 text-indigo-700 dark:border-indigo-300/40 dark:bg-indigo-400/10 dark:text-indigo-300"
                  : "border-slate-300/70 text-slate-500 hover:border-slate-500/60 hover:text-slate-800 dark:border-slate-700/55 dark:text-slate-400 dark:hover:text-slate-100",
              )}
            >
              {RECIPES[l].label}
            </button>
          ))}
        </div>
        <span className="ml-auto">
          <CopyButton value={recipe.body} label={`${recipe.label} recipe`} />
        </span>
      </header>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-relaxed text-slate-800 dark:text-slate-100">
        <code>{recipe.body}</code>
      </pre>
    </div>
  );
}
