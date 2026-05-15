import { redirect } from "next/navigation";

// /poa/agents is fused into /poa. Anything that linked here in the old
// architecture (header nav, blog posts, share embeds) hits the same
// directory section at /poa#03 now, no broken inbound links.
export default function AgentsRedirect(): never {
  redirect("/poa#03");
}
