'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      const parsed = JSON.parse(raw);
      return { ...DEFAULTS, ...parsed };
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

// ─── Individual field component to avoid parent re-render issues ────

function SettingField({ id, label, placeholder, value, onChange }: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export function AdminSettings() {
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [gaTrackingId, setGaTrackingId] = useState('');
  const [adsenseClientId, setAdsenseClientId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const data = loadFromStorage();
    setSiteName(data.site_name);
    setSiteDescription(data.site_description);
    setGaTrackingId(data.ga_tracking_id);
    setAdsenseClientId(data.adsense_client_id);
    setLoaded(true);
  }, []);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    const data: SettingsData = {
      site_name: siteName,
      site_description: siteDescription,
      ga_tracking_id: gaTrackingId,
      adsense_client_id: adsenseClientId,
    };
    try {
      saveToStorage(data);
      toast.success('Settings saved! GA and AdSense will activate on next page load.');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  }, [siteName, siteDescription, gaTrackingId, adsenseClientId]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingField
            id="site_name"
            label="Site Name"
            placeholder="TheTaxCalc"
            value={siteName}
            onChange={setSiteName}
          />
          <SettingField
            id="site_description"
            label="Site Description"
            placeholder="Free paycheck & tax calculator"
            value={siteDescription}
            onChange={setSiteDescription}
          />
          <SettingField
            id="ga_tracking_id"
            label="Google Analytics ID"
            placeholder="G-XXXXXXXXXX"
            value={gaTrackingId}
            onChange={setGaTrackingId}
          />
          <SettingField
            id="adsense_client_id"
            label="AdSense Client ID"
            placeholder="ca-pub-XXXXXXXXXX"
            value={adsenseClientId}
            onChange={setAdsenseClientId}
          />
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
