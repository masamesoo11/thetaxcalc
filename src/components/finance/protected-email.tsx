'use client';

import { useState, useEffect } from 'react';

/**
 * A client component that displays an email address using JavaScript only.
 *
 * Cloudflare's "Email Address Obfuscation" rewrites any email-like text
 * (even in buttons/links) in the server-rendered HTML into
 * /cdn-cgi/l/email-protection links, which return 404 for crawlers.
 *
 * Solution: render NOTHING that resembles an email in the initial HTML.
 * The email is constructed client-side only after the user clicks.
 */
export function ProtectedEmail({ user, domain }: { user: string; domain: string }) {
  const [revealed, setRevealed] = useState(false);

  // Hydration-safe: only construct email client-side
  const email = revealed ? `${user}\u0040${domain}` : '';

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
        aria-label="Click to reveal email address"
      >
        Show email address
      </button>
    );
  }

  return (
    <a
      href={`mailto:${user}%40${domain}`}
      className="text-emerald-400 hover:text-emerald-300 underline"
    >
      {email}
    </a>
  );
}
