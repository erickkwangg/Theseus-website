import { permanentRedirect } from "next/navigation";

// /playground used to be its own page. The interactive editor + trace
// component now lives inline on /launch under the #playground anchor,
// so the launch page is both the developer hub and the deploy surface
// rather than a doorway to a separate playground page. Permanent
// redirect so search engines propagate link equity from anything
// still pointing at /playground.
export default function PlaygroundRedirect(): never {
  permanentRedirect("/launch#playground");
}
