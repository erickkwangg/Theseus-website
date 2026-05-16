import { permanentRedirect } from "next/navigation";

// /poa/agents is fused into /poa. Anything that linked here in the old
// architecture (header nav, blog posts, share embeds) hits the same
// directory section at /poa#03 now. Using permanentRedirect so search
// engines return 308 and propagate link equity to the new location.
export default function AgentsRedirect(): never {
  permanentRedirect("/poa#03");
}
