'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Settings,
  Link2,
  Menu,
  X,
  TrendingUp,
  FileBarChart,
  ToggleLeft,
  Eye,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AdminBlogList } from '@/components/finance/admin-blog-list';
import { AdminAds } from '@/components/finance/admin-ads';
import { AdminSettings } from '@/components/finance/admin-settings';
import { AdminLinks } from '@/components/finance/admin-links';
import { BlogEditor } from '@/components/finance/blog-editor';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminStats {
  totalPosts: number;
  publishedPosts: number;
  totalAds: number;
  activeAds: number;
  totalCalculations: number;
  recentPosts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    published: boolean;
    createdAt: string;
  }[];
  topCalculators: {
    calculator: string;
    totalUsage: number;
  }[];
}

// ─── Navigation Items ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'blog', label: 'Blog Posts', icon: FileText },
  { key: 'ads', label: 'Ad Management', icon: Megaphone },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'links', label: 'External Links', icon: Link2 },
];

// ─── Calculator Name Map ──────────────────────────────────────────────────────

const CALCULATOR_NAMES: Record<string, string> = {
  paycheck: 'Paycheck Calculator',
  illinois: 'Illinois Calculator',
  texas: 'Texas Calculator',
  florida: 'Florida Calculator',
  california: 'California Calculator',
  newyork: 'New York Calculator',
  mortgage: 'Mortgage Calculator',
  retirement: '401(k) Calculator',
  relocation: 'Relocation Calculator',
};

// ─── Main Dashboard Component ─────────────────────────────────────────────────

export function AdminDashboard() {
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Parse hash to determine admin section
  const [hash, setHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const adminSection = useMemo(() => {
    const clean = hash.replace(/^#/, '');
    const parts = clean.split('/');

    // #admin → overview
    if (parts[0] === 'admin' && (parts.length === 1 || !parts[1])) {
      return { section: 'overview', sub: '', slug: '' };
    }
    // #admin/blog → blog list
    if (parts[0] === 'admin' && parts[1] === 'blog' && parts.length === 2) {
      return { section: 'blog', sub: 'list', slug: '' };
    }
    // #admin/blog/new → new blog post
    if (parts[0] === 'admin' && parts[1] === 'blog' && parts[2] === 'new') {
      return { section: 'blog', sub: 'new', slug: '' };
    }
    // #admin/blog/edit/slug → edit blog post
    if (parts[0] === 'admin' && parts[1] === 'blog' && parts[2] === 'edit' && parts[3]) {
      return { section: 'blog', sub: 'edit', slug: parts[3] };
    }
    // #admin/ads → ads
    if (parts[0] === 'admin' && parts[1] === 'ads') {
      return { section: 'ads', sub: '', slug: '' };
    }
    // #admin/settings → settings
    if (parts[0] === 'admin' && parts[1] === 'settings') {
      return { section: 'settings', sub: '', slug: '' };
    }
    // #admin/links → links
    if (parts[0] === 'admin' && parts[1] === 'links') {
      return { section: 'links', sub: '', slug: '' };
    }

    return { section: 'overview', sub: '', slug: '' };
  }, [hash]);

  const navigateTo = useCallback((section: string) => {
    window.location.hash = `#admin/${section === 'overview' ? '' : section}`;
    setSidebarOpen(false);
  }, []);

  const navigateToBlogNew = useCallback(() => {
    window.location.hash = '#admin/blog/new';
  }, []);

  const navigateToBlogEdit = useCallback((slug: string) => {
    window.location.hash = `#admin/blog/edit/${slug}`;
  }, []);

  const navigateToBlogList = useCallback(() => {
    window.location.hash = '#admin/blog';
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-20 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm border border-border/50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border/50 transform transition-transform lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Admin Header */}
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-bold text-sm">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">TheTaxCalc</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-2">
            <nav className="space-y-1 px-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = adminSection.section === item.key ||
                  (item.key === 'blog' && adminSection.section === 'blog');
                return (
                  <button
                    key={item.key}
                    onClick={() => navigateTo(item.key)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Back to Site */}
          <div className="p-3 border-t border-border/30">
            <button
              onClick={() => {
                window.location.hash = '#home';
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
            >
              <TrendingUp className="h-4 w-4" />
              Back to Site
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Content header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-foreground">
              {adminSection.section === 'blog' && adminSection.sub === 'new' && 'New Blog Post'}
              {adminSection.section === 'blog' && adminSection.sub === 'edit' && 'Edit Blog Post'}
              {adminSection.section === 'blog' && adminSection.sub === 'list' && 'Blog Management'}
              {adminSection.section === 'ads' && 'Ad Management'}
              {adminSection.section === 'settings' && 'Site Settings'}
              {adminSection.section === 'links' && 'External Links'}
              {adminSection.section === 'overview' && 'Dashboard Overview'}
            </h1>
          </div>

          {/* Render section */}
          {adminSection.section === 'overview' && (
            <AdminOverview />
          )}
          {adminSection.section === 'blog' && adminSection.sub === 'list' && (
            <AdminBlogList onEdit={navigateToBlogEdit} onNew={navigateToBlogNew} />
          )}
          {adminSection.section === 'blog' && adminSection.sub === 'new' && (
            <BlogEditor onNavigate={(hash: string) => { window.location.hash = `#${hash === 'blog' ? 'admin/blog' : hash}`; }} />
          )}
          {adminSection.section === 'blog' && adminSection.sub === 'edit' && (
            <BlogEditor editSlug={adminSection.slug} onNavigate={(hash: string) => { window.location.hash = `#${hash === 'blog' ? 'admin/blog' : hash}`; }} />
          )}
          {adminSection.section === 'ads' && <AdminAds />}
          {adminSection.section === 'settings' && <AdminSettings />}
          {adminSection.section === 'links' && <AdminLinks />}
        </div>
      </main>
    </div>
  );
}

// ─── Overview Section ─────────────────────────────────────────────────────────

function AdminOverview() {
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  // Toggle publish mutation for recent posts
  const toggleMutation = useMutation({
    mutationFn: async ({ slug, published }: { slug: string; published: boolean }) => {
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update post');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Publish status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Failed to load dashboard stats
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15',
    },
    {
      label: 'Published',
      value: stats.publishedPosts,
      icon: FileBarChart,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/15',
    },
    {
      label: 'Total Ads',
      value: stats.totalAds,
      icon: Megaphone,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/15',
    },
    {
      label: 'Active Ads',
      value: stats.activeAds,
      icon: ToggleLeft,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/15',
    },
    {
      label: 'Calculator Uses',
      value: stats.totalCalculations,
      icon: BarChart3,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/15',
    },
  ];

  const maxUsage = stats.topCalculators.length > 0
    ? Math.max(...stats.topCalculators.map((c) => c.totalUsage))
    : 1;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg ${card.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{card.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentPosts.length === 0 ? (
              <div className="text-sm text-muted-foreground py-4">
                No posts yet
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{post.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {post.category} &middot;{' '}
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant="outline"
                        className={
                          post.published
                            ? 'text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'text-xs bg-muted text-muted-foreground'
                        }
                      >
                        {post.published ? 'Live' : 'Draft'}
                      </Badge>
                      <Switch
                        checked={post.published}
                        onCheckedChange={(checked) =>
                          toggleMutation.mutate({ slug: post.slug, published: checked })
                        }
                        disabled={toggleMutation.isPending}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Calculators */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topCalculators.length === 0 ? (
              <div className="text-sm text-muted-foreground py-4">
                No calculator usage data yet
              </div>
            ) : (
              <div className="space-y-3">
                {stats.topCalculators.map((calc, index) => {
                  const percentage = maxUsage > 0 ? (calc.totalUsage / maxUsage) * 100 : 0;
                  return (
                    <div key={calc.calculator} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                          {CALCULATOR_NAMES[calc.calculator] || calc.calculator}
                        </span>
                        <span className="text-muted-foreground">
                          {calc.totalUsage.toLocaleString()} uses
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
