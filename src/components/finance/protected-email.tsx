'use client';

import { useState, useCallback } from 'react';

/**
 * A client component that displays an email address using JavaScript only.
 *
 * Cloudflare's "Email Address Obfuscation" rewrites any email-like text
 * (even in buttons/links) in the server-rendered HTML into
 * /cdn-cgi/l/email-protection links, which return 404 for crawlers.
 *
 * Solution: render NOTHING that resembles an email in the initial HTML.
 * The email is constructed client-side only after the user clicks.
 * We also NEVER use mailto: links because Cloudflare rewrites those too.
 */
export function ProtectedEmail({ user, domain }: { user: string; domain: string }) {
  const [revealed, setRevealed] = useState(false);

  const handleClick = useCallback(() => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    // Copy to clipboard instead of using mailto: (which Cloudflare rewrites)
    const email = `${user}@${domain}`;
    navigator.clipboard.writeText(email).catch(() => {});
  }, [revealed, user, domain]);

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
        aria-label="Click to reveal email address"
      >
        Show email address
      </button>
    );
  }

  // Display email as plain text (not a link) to avoid Cloudflare rewriting
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
      title="Click to copy email address"
      aria-label={`${user} at ${domain}, click to copy`}
    >
      {user}&#64;{domain}
    </button>
  );
}
