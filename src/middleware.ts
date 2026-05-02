import { NextResponse, type NextRequest } from "next/server";

/**
 * Open Graph image User-Agent split.
 *
 * The site's <meta property="og:image"> always points at /og/root.gif so that
 * platforms which animate (Discord, Slack, LinkedIn, Telegram) get the
 * typewriter loop. Facebook's scraper (which also powers Messenger,
 * Instagram, and WhatsApp link previews) silently rejects animated GIFs as
 * og:image and produces a blank preview with title only. There is no
 * encoding that changes this; it is a Meta product decision.
 *
 * This middleware rewrites the GIF request to the static PNG fallback only
 * when the request comes from Facebook's crawler, leaving every other
 * platform untouched. The site's own visitors load the GIF normally because
 * they hit the matcher pattern but their UA doesn't match the regex.
 *
 * Twitter/X is handled separately by `<meta name="twitter:image">` pointing
 * at /og/root.png directly, so it doesn't need a UA rewrite.
 *
 * To extend coverage, add user-agent fragments to FACEBOOK_LIKE_UA. Keep the
 * regex anchored to documented bot identifiers to avoid degrading any
 * platform that does animate GIFs.
 */
const FACEBOOK_LIKE_UA = /facebookexternalhit|facebookcatalog|meta-externalagent/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (FACEBOOK_LIKE_UA.test(userAgent)) {
    return NextResponse.rewrite(new URL("/og/root.png", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/og/root.gif"],
};
