'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('thetaxcalc-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('thetaxcalc-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('thetaxcalc-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 glass-strong p-4 sm:p-6 animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Cookie className="h-5 w-5 text-emerald-400 shrink-0" />
          <p className="text-sm text-muted-foreground">
            We use essential cookies to keep this site running and analytics cookies to improve your experience. 
            All calculations run in your browser — we never store your financial data.{' '}
            <a href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">Privacy Policy</a>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2 hover:from-emerald-500 hover:to-emerald-400 transition-all"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
