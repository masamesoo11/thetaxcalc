'use client';

import { useState, useCallback } from 'react';

/**
 * A client component that displays an email address using JavaScript only.
 *
 * Cloudflare's "Email Address Obfuscation" rewrites any email-like text
 * (even in serialized React props and buttons/links) in the server-rendered
 * HTML into /cdn-cgi/l/email-protection links, which return 404 for crawlers.
 *
 * Solution: Pass the email as a single obfuscated `code` prop where the @
 * symbol is replaced with a pipe character. The component decodes it
 * client-side only after the user clicks. This prevents Cloudflare from
 * finding email-like patterns in the server-rendered HTML, including the
 * serialized React hydration data.
 *
 * Usage: <ProtectedEmail code="contact|thetaxcalc.com" />
 */
export function ProtectedEmail({ code }: { code: string }) {
  const [revealed, setRevealed] = useState(false);

  const email = code.replace('|', '@');

  const handleClick = useCallback(() => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    // Copy to clipboard instead of using mailto: (which Cloudflare rewrites)
    navigator.clipboard.writeText(email).catch(() => {});
  }, [revealed, email]);

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

  // Display email as plain text (not a link) to avoid Cloudflare rewriting.
  // Use &#64; HTML entity for @ as an extra precaution.
  const [user, domain] = code.split('|');
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
      title="Click to copy email address"
      aria-label="Click to copy email address"
    >
      {user}&#64;{domain}
    </button>
  );
}
