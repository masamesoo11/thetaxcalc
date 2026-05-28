'use client';

import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Plus, Trash2 } from 'lucide-react';
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
  // Track local edits as a diff overlay on fetched data
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [addedKeys, setAddedKeys] = useState<string[]>([]);
  const [removedKeys, setRemovedKeys] = useState<string[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  // Fetch settings
  const { data: settingsMap = {}, isLoading } = useQuery<Record<string, string>>({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    },
  });

  // Derive the full settings list from fetched data + local edits
  const settings = useMemo(() => {
    const result: SettingItem[] = [];
    const allKeys = new Set([
      ...Object.keys(settingsMap),
      ...addedKeys,
    ]);
    for (const key of allKeys) {
      if (removedKeys.includes(key)) continue;
      const value = key in edits ? edits[key] : (settingsMap[key] ?? '');
      result.push({ key, value });
    }
    return result;
  }, [settingsMap, edits, addedKeys, removedKeys]);

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

  const handleValueChange = useCallback((key: string, value: string) => {
    setEdits((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAddSetting = useCallback(() => {
    if (!newKey.trim()) {
      toast.error('Setting key is required');
      return;
    }
    if ([...Object.keys(settingsMap), ...addedKeys].includes(newKey.trim()) && !removedKeys.includes(newKey.trim())) {
      toast.error('Setting key already exists');
      return;
    }
    setAddedKeys((prev) => [...prev, newKey.trim()]);
    setEdits((prev) => ({ ...prev, [newKey.trim()]: newValue }));
    setRemovedKeys((prev) => prev.filter((k) => k !== newKey.trim()));
    setNewKey('');
    setNewValue('');
  }, [newKey, newValue, settingsMap, addedKeys, removedKeys]);

  const handleRemoveSetting = useCallback((key: string) => {
    setRemovedKeys((prev) => [...prev, key]);
    setAddedKeys((prev) => prev.filter((k) => k !== key));
    setEdits((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleSave = () => {
    saveMutation.mutate(settings);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Separate common settings from custom ones
  const commonKeys = new Set(COMMON_SETTINGS.map((s) => s.key));
  const commonSettings = settings.filter((s) => commonKeys.has(s.key));
  const customSettings = settings.filter((s) => !commonKeys.has(s.key));

  // Ensure all common settings exist (add empty ones if missing)
  const allCommonSettings = COMMON_SETTINGS.map((cs) => {
    const existing = commonSettings.find((s) => s.key === cs.key);
    return existing || { key: cs.key, value: '' };
  });

  return (
    <div className="space-y-6">
      {/* Common Settings */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allCommonSettings.map((cs) => {
            const meta = COMMON_SETTINGS.find((m) => m.key === cs.key);
            return (
              <div key={cs.key} className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
                <Label htmlFor={cs.key} className="text-sm font-mono">
                  {meta?.label || cs.key}
                </Label>
                <Input
                  id={cs.key}
                  value={cs.value}
                  onChange={(e) => handleValueChange(cs.key, e.target.value)}
                  placeholder={meta?.placeholder}
                  className="bg-background"
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Custom Settings */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Custom Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customSettings.map((setting) => (
            <div key={setting.key} className="grid gap-2 sm:grid-cols-[200px_1fr_auto] sm:items-center">
              <Label className="text-sm font-mono truncate">{setting.key}</Label>
              <Input
                value={setting.value}
                onChange={(e) => handleValueChange(setting.key, e.target.value)}
                className="bg-background"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveSetting(setting.key)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0"
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
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="setting_key"
                className="bg-background font-mono text-sm"
              />
              <Input
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
          <Save className="h-4 w-4" />
          {saveMutation.isPending ? 'Saving...' : 'Save All'}
        </Button>
      </div>
    </div>
  );
}
