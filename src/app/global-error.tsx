"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#fff",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            Fatal error
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 400,
              lineHeight: 1.1,
              margin: "1rem 0",
            }}
          >
            The application crashed.
          </h1>
          <p style={{ color: "#cbd5e1", marginBottom: "1.5rem" }}>
            A critical error prevented this page from loading. Reload to try again.
          </p>
          {error.digest && (
            <p
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 12,
                color: "#94a3b8",
                marginBottom: "1.5rem",
              }}
            >
              ref: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.75rem",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
