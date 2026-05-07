// Permanent redirect: design-space content was merged into
// /docs/agentic-smart-contracts. The two pages had ~75% overlap (same
// blog source, same lending example, both arguing the same thesis with
// different lineage framings); merging them into a single page made the
// IA cleaner and removed the duplicate-source-of-truth problem.

import { permanentRedirect } from "next/navigation";

export default function DesignSpacePage() {
  permanentRedirect("/docs/agentic-smart-contracts#design-space");
}
