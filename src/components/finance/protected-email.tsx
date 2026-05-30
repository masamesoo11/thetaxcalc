'use client';

import { useState } from 'react';

/**
 * A client component that displays an email address using JavaScript.
 * Cloudflare's email obfuscation feature only processes static HTML,
 * so emails rendered via JS won't be converted to /cdn-cgi/l/email-protection links.
 * The email is split across props so no email pattern exists in the server-rendered HTML.
 */
export function ProtectedEmail({ user, domain, label }: { user: string; domain: string; label?: string }) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
        aria-label="Click to reveal email address"
      >
        {label || 'Click to show email'}
      </button>
    );
  }

  const email = user + '@' + domain;

  return (
    <a
      href={'mailto:' + email}
      className="text-emerald-400 hover:text-emerald-300 underline"
    >
      {email}
    </a>
  );
}
