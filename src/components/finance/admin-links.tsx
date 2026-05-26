'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  GripVertical,
  Link2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface ExternalLinkItem {
  id: string;
  label: string;
  url: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface LinkFormData {
  label: string;
  url: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
}

const emptyForm: LinkFormData = {
  label: '',
  url: '',
  category: 'resource',
  isActive: true,
  sortOrder: 0,
};

const CATEGORY_LABELS: Record<string, string> = {
  resource: 'Resources',
  government: 'Government',
  partner: 'Partners',
};

const CATEGORY_COLORS: Record<string, string> = {
  resource: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  government: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  partner: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

export function AdminLinks() {
  const queryClient = useQueryClient();
  const [editingLink, setEditingLink] = useState<ExternalLinkItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ExternalLinkItem | null>(null);
  const [form, setForm] = useState<LinkFormData>(emptyForm);

  // Fetch all external links
  const { data: links = [], isLoading } = useQuery<ExternalLinkItem[]>({
    queryKey: ['external-links'],
    queryFn: async () => {
      const res = await fetch('/api/links');
      if (!res.ok) throw new Error('Failed to fetch links');
      return res.json();
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: LinkFormData) => {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create link');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['external-links'] });
      toast.success('Link created');
      closeForm();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LinkFormData> }) => {
      const res = await fetch(`/api/links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update link');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['external-links'] });
      toast.success('Link updated');
      closeForm();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/links/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete link');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['external-links'] });
      toast.success('Link deleted');
      setDeleteTarget(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const openCreate = () => {
    setForm(emptyForm);
    setIsCreating(true);
    setEditingLink(null);
  };

  const openEdit = (link: ExternalLinkItem) => {
    setForm({
      label: link.label,
      url: link.url,
      category: link.category,
      isActive: link.isActive,
      sortOrder: link.sortOrder,
    });
    setEditingLink(link);
    setIsCreating(false);
  };

  const closeForm = () => {
    setForm(emptyForm);
    setEditingLink(null);
    setIsCreating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.label || !form.url) {
      toast.error('Label and URL are required');
      return;
    }
    if (editingLink) {
      updateMutation.mutate({ id: editingLink.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  // Group links by category
  const groupedLinks = links.reduce<Record<string, ExternalLinkItem[]>>((acc, link) => {
    const cat = link.category || 'resource';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(link);
    return acc;
  }, {});

  const isFormOpen = isCreating || !!editingLink;
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
          {links.length} link{links.length !== 1 ? 's' : ''}
        </div>
        <Button onClick={openCreate} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          New Link
        </Button>
      </div>

      {/* Links grouped by category */}
      {Object.keys(groupedLinks).length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No external links yet. Create your first link!
        </div>
      ) : (
        Object.entries(groupedLinks).map(([category, categoryLinks]) => (
          <Card key={category} className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">
                  {CATEGORY_LABELS[category] || category}
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {categoryLinks.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {categoryLinks
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{link.label}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs shrink-0 ${CATEGORY_COLORS[link.category] || ''}`}
                        >
                          {link.category}
                        </Badge>
                        {!link.isActive && (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate mt-0.5">
                        {link.url}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">
                      Order: {link.sortOrder}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-muted transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(link)}
                        className="gap-1 text-xs h-8"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(link)}
                        className="gap-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingLink ? 'Edit Link' : 'New Link'}</DialogTitle>
            <DialogDescription>
              {editingLink ? 'Update external link' : 'Add a new external resource link'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link-label">Label *</Label>
              <Input
                id="link-label"
                value={form.label}
                onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
                placeholder="IRS Website"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">URL *</Label>
              <Input
                id="link-url"
                value={form.url}
                onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://www.irs.gov"
                className="bg-background"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resource">Resource</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="link-order">Sort Order</Label>
                <Input
                  id="link-order"
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))
                  }
                  className="bg-background"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="link-active">Active</Label>
              <Switch
                id="link-active"
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
                {isSaving ? 'Saving...' : editingLink ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.label}&rdquo;? This action cannot be undone.
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
