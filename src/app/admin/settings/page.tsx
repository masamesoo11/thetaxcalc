'use client';

import { useEffect } from 'react';

/**
 * /admin/settings — Redirects to the hash-based admin settings section.
 * The admin dashboard uses hash routing (#admin/settings), but users
 * and Google Search Console may try to access /admin/settings directly.
 * This page ensures the URL works by redirecting to the correct hash route.
 */
export default function AdminSettingsPage() {
  useEffect(() => {
    // Redirect to the hash-based admin settings route
    window.location.href = '/admin#admin/settings';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to Admin Settings...</p>
      </div>
    </div>
  );
}
