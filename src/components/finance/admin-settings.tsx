'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { getSettings, saveSettings, type SiteSettings } from '@/lib/settings-store';

const COMMON_SETTINGS = [
  { key: 'site_name', label: 'Site Name', placeholder: 'TheTaxCalc' },
  { key: 'site_description', label: 'Site Description', placeholder: 'Free paycheck & tax calculator' },
  { key: 'ga_tracking_id', label: 'Google Analytics ID', placeholder: 'G-XXXXXXXXXX' },
  { key: 'adsense_client_id', label: 'AdSense Client ID', placeholder: 'ca-pub-XXXXXXXXXX' },
];

export function AdminSettings() {
  const [values, setValues] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const settings = getSettings();
    setValues(settings);
  }, []);

  // Update a single field
  const handleChange = (key: string, value: string) => {
    setValues(prev => prev ? { ...prev, [key]: value } : prev);
  };

  // Save all settings
  const handleSave = () => {
    if (!values) return;
    setIsSaving(true);
    try {
      saveSettings(values);
      toast.success('Settings saved successfully! GA and AdSense will activate on next page load.');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Still loading
  if (!values) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Common Settings */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {COMMON_SETTINGS.map((cs) => (
            <div key={cs.key} className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
              <Label htmlFor={cs.key} className="text-sm font-mono">
                {cs.label}
              </Label>
              <Input
                id={cs.key}
                type="text"
                value={values[cs.key] ?? ''}
                onChange={(e) => handleChange(cs.key, e.target.value)}
                placeholder={cs.placeholder}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          ))}
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
