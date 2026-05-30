'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface SettingItem {
  key: string;
  value: string;
}

const COMMON_SETTINGS = [
  { key: 'site_name', label: 'Site Name', placeholder: 'TheTaxCalc' },
  { key: 'site_description', label: 'Site Description', placeholder: 'Free paycheck & tax calculator' },
  { key: 'ga_tracking_id', label: 'Google Analytics ID', placeholder: 'G-XXXXXXXXXX' },
  { key: 'adsense_client_id', label: 'AdSense Client ID', placeholder: 'ca-pub-XXXXXXXXXX' },
];

export function AdminSettings() {
  const queryClient = useQueryClient();

  // Simple local state: array of { key, value } that the user can edit directly
  const [commonValues, setCommonValues] = useState<Record<string, string>>({});
  const [customSettings, setCustomSettings] = useState<SettingItem[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Record<string, string> = await res.json();

        // Separate common vs custom
        const commonKeys = new Set(COMMON_SETTINGS.map(s => s.key));
        const cv: Record<string, string> = {};
        const cs: SettingItem[] = [];

        for (const [key, value] of Object.entries(data)) {
          if (commonKeys.has(key)) {
            cv[key] = value;
          } else {
            cs.push({ key, value });
          }
        }

        // Ensure all common keys exist even if missing from API
        for (const cs of COMMON_SETTINGS) {
          if (!(cs.key in cv)) {
            cv[cs.key] = '';
          }
        }

        setCommonValues(cv);
        setCustomSettings(cs);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
        toast.error('Failed to load settings');
        // Still initialize common keys with empty values
        const cv: Record<string, string> = {};
        for (const cs of COMMON_SETTINGS) {
          cv[cs.key] = '';
        }
        setCommonValues(cv);
      } finally {
        setIsLoading(false);
        setHasLoaded(true);
      }
    }
    fetchSettings();
  }, []);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (settingsArr: SettingItem[]) => {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: settingsArr }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save settings');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Settings saved successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update a common setting value
  const handleCommonChange = (key: string, value: string) => {
    setCommonValues(prev => ({ ...prev, [key]: value }));
  };

  // Update a custom setting value
  const handleCustomChange = (index: number, value: string) => {
    setCustomSettings(prev => {
      const next = [...prev];
      next[index] = { ...next[index], value };
      return next;
    });
  };

  // Add a new custom setting
  const handleAddSetting = () => {
    if (!newKey.trim()) {
      toast.error('Setting key is required');
      return;
    }
    const keyExists = COMMON_SETTINGS.some(s => s.key === newKey.trim()) ||
      customSettings.some(s => s.key === newKey.trim());
    if (keyExists) {
      toast.error('Setting key already exists');
      return;
    }
    setCustomSettings(prev => [...prev, { key: newKey.trim(), value: newValue }]);
    setNewKey('');
    setNewValue('');
  };

  // Remove a custom setting
  const handleRemoveSetting = (index: number) => {
    setCustomSettings(prev => prev.filter((_, i) => i !== index));
  };

  // Save all settings
  const handleSave = () => {
    const allSettings: SettingItem[] = [
      // Common settings
      ...Object.entries(commonValues).map(([key, value]) => ({ key, value })),
      // Custom settings
      ...customSettings,
    ];
    saveMutation.mutate(allSettings);
  };

  if (isLoading || !hasLoaded) {
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
                value={commonValues[cs.key] ?? ''}
                onChange={(e) => handleCommonChange(cs.key, e.target.value)}
                placeholder={cs.placeholder}
                className="bg-background"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Custom Settings */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Custom Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customSettings.map((setting, index) => (
            <div key={setting.key} className="grid gap-2 sm:grid-cols-[200px_1fr_auto] sm:items-center">
              <Label className="text-sm font-mono truncate">{setting.key}</Label>
              <Input
                type="text"
                aria-label={`Value for ${setting.key}`}
                value={setting.value}
                onChange={(e) => handleCustomChange(index, e.target.value)}
                className="bg-background"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveSetting(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0"
                aria-label="Remove setting"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {customSettings.length === 0 && (
            <div className="text-sm text-muted-foreground py-2">
              No custom settings yet
            </div>
          )}

          {/* Add new setting */}
          <div className="pt-4 border-t border-border/30">
            <div className="text-sm font-medium mb-3">Add New Setting</div>
            <div className="grid gap-2 sm:grid-cols-[200px_1fr_auto] sm:items-center">
              <Input
                type="text"
                aria-label="New setting key"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="setting_key"
                className="bg-background font-mono text-sm"
              />
              <Input
                type="text"
                aria-label="New setting value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Value"
                className="bg-background"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddSetting}
                className="gap-1 shrink-0"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700 min-w-[140px]"
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saveMutation.isPending ? 'Saving...' : 'Save All'}
        </Button>
      </div>
    </div>
  );
}
