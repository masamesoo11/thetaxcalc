'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Pencil,
  Trash2,
  BarChart3,
  MousePointerClick,
  Eye,
  ToggleLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface AdSlot {
  id: string;
  name: string;
  position: string;
  adType: string;
  adCode: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface AdFormData {
  name: string;
  position: string;
  adType: string;
  adCode: string;
  isActive: boolean;
}

const emptyForm: AdFormData = {
  name: '',
  position: '',
  adType: 'adsense',
  adCode: '',
  isActive: false,
};

export function AdminAds() {
  const queryClient = useQueryClient();
  const [editingAd, setEditingAd] = useState<AdSlot | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdSlot | null>(null);
  const [form, setForm] = useState<AdFormData>(emptyForm);

  // Fetch all ad slots
  const { data: ads = [], isLoading } = useQuery<AdSlot[]>({
    queryKey: ['ad-slots'],
    queryFn: async () => {
      const res = await fetch('/api/ads');
      if (!res.ok) throw new Error('Failed to fetch ad slots');
      return res.json();
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: AdFormData) => {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create ad slot');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-slots'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('Ad slot created');
      closeForm();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AdFormData> }) => {
      const res = await fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update ad slot');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-slots'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('Ad slot updated');
      closeForm();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/ads/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete ad slot');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-slots'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('Ad slot deleted');
      setDeleteTarget(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Toggle active mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const res = await fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to toggle ad');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-slots'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('Ad status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const openCreate = () => {
    setForm(emptyForm);
    setIsCreating(true);
    setEditingAd(null);
  };

  const openEdit = (ad: AdSlot) => {
    setForm({
      name: ad.name,
      position: ad.position,
      adType: ad.adType,
      adCode: ad.adCode,
      isActive: ad.isActive,
    });
    setEditingAd(ad);
    setIsCreating(false);
  };

  const closeForm = () => {
    setForm(emptyForm);
    setEditingAd(null);
    setIsCreating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.position) {
      toast.error('Name and position are required');
      return;
    }
    if (editingAd) {
      updateMutation.mutate({ id: editingAd.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const getAdTypeBadge = (adType: string) => {
    const map: Record<string, string> = {
      adsense: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      custom: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      affiliate: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    };
    return map[adType] || 'bg-muted text-muted-foreground border-border';
  };

  const getCTR = (impressions: number, clicks: number) => {
    if (impressions === 0) return '0.00%';
    return ((clicks / impressions) * 100).toFixed(2) + '%';
  };

  const isFormOpen = isCreating || !!editingAd;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {ads.length} ad slot{ads.length !== 1 ? 's' : ''}
        </div>
        <Button onClick={openCreate} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          New Ad Slot
        </Button>
      </div>

      {/* Ad Slots Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {ads.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No ad slots yet. Create your first ad slot!
          </div>
        ) : (
          ads.map((ad) => (
            <Card key={ad.id} className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <CardTitle className="text-base truncate">{ad.name}</CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {ad.position}
                      </code>
                      <Badge variant="outline" className={`text-xs ${getAdTypeBadge(ad.adType)}`}>
                        {ad.adType}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Switch
                      checked={ad.isActive}
                      onCheckedChange={(checked) =>
                        toggleActiveMutation.mutate({ id: ad.id, isActive: checked })
                      }
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded-md bg-muted/50">
                    <Eye className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-semibold">{ad.impressions.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Impressions</div>
                  </div>
                  <div className="text-center p-2 rounded-md bg-muted/50">
                    <MousePointerClick className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-semibold">{ad.clicks.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Clicks</div>
                  </div>
                  <div className="text-center p-2 rounded-md bg-muted/50">
                    <BarChart3 className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-semibold">{getCTR(ad.impressions, ad.clicks)}</div>
                    <div className="text-xs text-muted-foreground">CTR</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/30">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(ad)} className="gap-1 text-xs">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteTarget(ad)}
                    className="gap-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAd ? 'Edit Ad Slot' : 'New Ad Slot'}</DialogTitle>
            <DialogDescription>
              {editingAd ? 'Update ad slot settings' : 'Create a new ad placement'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ad-name">Name *</Label>
              <Input
                id="ad-name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Header Banner"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-position">Position *</Label>
              <Input
                id="ad-position"
                value={form.position}
                onChange={(e) => setForm((prev) => ({ ...prev, position: e.target.value }))}
                placeholder="header-banner"
                className="bg-background"
                disabled={!!editingAd}
              />
              {editingAd && (
                <p className="text-xs text-muted-foreground">Position cannot be changed after creation</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Ad Type</Label>
              <Select
                value={form.adType}
                onValueChange={(value) => setForm((prev) => ({ ...prev, adType: value }))}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adsense">AdSense</SelectItem>
                  <SelectItem value="custom">Custom HTML</SelectItem>
                  <SelectItem value="affiliate">Affiliate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ad-code">Ad Code</Label>
              <Textarea
                id="ad-code"
                value={form.adCode}
                onChange={(e) => setForm((prev) => ({ ...prev, adCode: e.target.value }))}
                placeholder="Paste ad code here..."
                rows={5}
                className="bg-background font-mono text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ad-active">Active</Label>
              <Switch
                id="ad-active"
                checked={form.isActive}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isActive: checked }))}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={closeForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : editingAd ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Ad Slot</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.name}&rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
