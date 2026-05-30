'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const STORAGE_KEY = 'thetaxcalc_site_settings';

interface SettingsData {
  site_name: string;
  site_description: string;
  ga_tracking_id: string;
  adsense_client_id: string;
}

const DEFAULTS: SettingsData = {
  site_name: 'TheTaxCalc',
  site_description: 'Free tax calculators and guides to help you understand your paycheck, state taxes, and financial planning.',
  ga_tracking_id: '',
  adsense_client_id: '',
};

function loadFromStorage(): SettingsData {
  if (typeof window === 'undefined') return { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULTS, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULTS };
}

function saveToStorage(data: SettingsData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// ─── Main Component ──────────────────────────────────────────────────
// Uses raw <input> elements instead of shadcn Input to avoid
// event handler loss with dynamic(ssr:false) imports on Cloudflare Pages.

export function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Use refs for each input to avoid React re-render issues
  const siteNameRef = useRef<HTMLInputElement>(null);
  const siteDescRef = useRef<HTMLInputElement>(null);
  const gaIdRef = useRef<HTMLInputElement>(null);
  const adsenseRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const data = loadFromStorage();
    if (siteNameRef.current) siteNameRef.current.value = data.site_name;
    if (siteDescRef.current) siteDescRef.current.value = data.site_description;
    if (gaIdRef.current) gaIdRef.current.value = data.ga_tracking_id;
    if (adsenseRef.current) adsenseRef.current.value = data.adsense_client_id;
    setLoaded(true);
  }, []);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    const data: SettingsData = {
      site_name: siteNameRef.current?.value ?? '',
      site_description: siteDescRef.current?.value ?? '',
      ga_tracking_id: gaIdRef.current?.value ?? '',
      adsense_client_id: adsenseRef.current?.value ?? '',
    };
    try {
      saveToStorage(data);
      toast.success('Settings saved! GA and AdSense will activate on next page load.');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // Common input styling matching shadcn Input
  const inputClass = "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground dark:bg-input/30";

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <label htmlFor="setting_site_name" className="text-sm font-medium">Site Name</label>
            <input
              ref={siteNameRef}
              id="setting_site_name"
              type="text"
              className={inputClass}
              placeholder="TheTaxCalc"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <label htmlFor="setting_site_desc" className="text-sm font-medium">Site Description</label>
            <input
              ref={siteDescRef}
              id="setting_site_desc"
              type="text"
              className={inputClass}
              placeholder="Free paycheck & tax calculator"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <label htmlFor="setting_ga" className="text-sm font-medium">Google Analytics ID</label>
            <input
              ref={gaIdRef}
              id="setting_ga"
              type="text"
              className={inputClass}
              placeholder="G-XXXXXXXXXX"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
            <label htmlFor="setting_adsense" className="text-sm font-medium">AdSense Client ID</label>
            <input
              ref={adsenseRef}
              id="setting_adsense"
              type="text"
              className={inputClass}
              placeholder="ca-pub-XXXXXXXXXX"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-border/50 bg-emerald-500/5">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">How it works:</p>
            <p>• Enter your <strong className="text-foreground">Google Analytics ID</strong> (e.g. G-9SEBTKFT61) to enable analytics tracking.</p>
            <p>• Enter your <strong className="text-foreground">AdSense Client ID</strong> (e.g. ca-pub-1234567890123456) to enable AdSense ads.</p>
            <p>• Click <strong className="text-foreground">Save All</strong> to apply. Changes take effect on the next page load.</p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700 min-w-[140px]"
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Saving...' : 'Save All'}
        </Button>
      </div>
    </div>
  );
}
