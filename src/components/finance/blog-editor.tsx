'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import {
  Save,
  Eye,
  Pencil,
  Clock,
  Type,
  Hash,
  FileText,
  Image as ImageIcon,
  Tag,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Globe,
  Search,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  published: boolean;
  featured: boolean;
  metaTitle: string;
  metaDesc: string;
}

interface BlogEditorProps {
  editSlug?: string;
  onNavigate: (hash: string) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: 'tax-guide', label: 'Tax Guide' },
  { value: 'comparison', label: 'Comparison' },
  { value: 'tips', label: 'Tips & Tricks' },
  { value: 'news', label: 'Tax News' },
];

const EMPTY_POST: BlogPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'tax-guide',
  tags: '',
  coverImage: '',
  published: false,
  featured: false,
  metaTitle: '',
  metaDesc: '',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BlogEditor({ editSlug, onNavigate }: BlogEditorProps) {
  const [form, setForm] = useState<BlogPost>(EMPTY_POST);
  const [autoSlug, setAutoSlug] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState('edit');

  // Fetch existing post when editing
  const { data: existingPost, isLoading: loadingExisting } = useQuery<BlogPost & { id: string; authorId: string | null; createdAt: string; updatedAt: string }>({
    queryKey: ['blog-post', editSlug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${editSlug}`);
      if (!res.ok) throw new Error('Post not found');
      return res.json();
    },
    enabled: !!editSlug,
  });

  // Populate form when existing post loads
  useEffect(() => {
    if (existingPost) {
      setForm({
        title: existingPost.title || '',
        slug: existingPost.slug || '',
        excerpt: existingPost.excerpt || '',
        content: existingPost.content || '',
        category: existingPost.category || 'tax-guide',
        tags: existingPost.tags || '',
        coverImage: existingPost.coverImage || '',
        published: existingPost.published ?? false,
        featured: existingPost.featured ?? false,
        metaTitle: existingPost.metaTitle || '',
        metaDesc: existingPost.metaDesc || '',
      });
      setAutoSlug(false);
    }
  }, [existingPost]);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, autoSlug]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const updateField = useCallback(<K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const readTime = useMemo(() => estimateReadTime(form.content), [form.content]);
  const words = useMemo(() => wordCount(form.content), [form.content]);
  const isEditing = !!editSlug;

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setToast({ type: 'error', message: 'Title and content are required.' });
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        excerpt: form.excerpt || null,
        content: form.content,
        category: form.category,
        tags: form.tags,
        coverImage: form.coverImage || null,
        published: form.published,
        featured: form.featured,
        metaTitle: form.metaTitle || null,
        metaDesc: form.metaDesc || null,
      };

      const res = isEditing
        ? await fetch(`/api/blog/${editSlug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} post`);
      }

      setToast({
        type: 'success',
        message: `Post ${isEditing ? 'updated' : 'created'} successfully!`,
      });
    } catch (err) {
      setToast({
        type: 'error',
        message: err instanceof Error ? err.message : 'An unexpected error occurred.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loadingExisting) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── Toast Notification ────────────────────────────── */}
      {toast && (
        <div
          className={`fixed right-4 top-20 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            toast.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-red-500/30 bg-red-500/10 text-red-400'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {toast.message}
        </div>
      )}

      {/* ─── Header ───────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('blog')}
            className="text-muted-foreground hover:text-foreground -ml-2 mb-2"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Blog
          </Button>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isEditing
              ? `Editing: ${existingPost?.title || editSlug}`
              : 'Write and publish a new blog post'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Type className="h-3.5 w-3.5" />
              {words} words
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readTime} min read
            </span>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving || !form.title.trim() || !form.content.trim()}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}
          </Button>
        </div>
      </div>

      {/* ─── Main Editor Layout ───────────────────────────── */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/30">
          <TabsTrigger value="edit" className="gap-1.5">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              {/* Title */}
              <Card className="border-border/50 bg-card/80">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title" className="text-sm font-medium flex items-center gap-1.5">
                      <Type className="h-3.5 w-3.5 text-emerald-400" />
                      Title
                    </Label>
                    <Input
                      id="post-title"
                      value={form.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="Enter post title..."
                      className="text-lg font-semibold bg-background/50 border-border/50"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="post-slug" className="text-sm font-medium flex items-center gap-1.5">
                        <Hash className="h-3.5 w-3.5 text-emerald-400" />
                        URL Slug
                      </Label>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoSlug}
                          onChange={(e) => setAutoSlug(e.target.checked)}
                          className="rounded"
                        />
                        Auto-generate
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">taxyield.io/#blog/</span>
                      <Input
                        id="post-slug"
                        value={form.slug}
                        onChange={(e) => {
                          updateField('slug', e.target.value);
                          setAutoSlug(false);
                        }}
                        placeholder="url-friendly-slug"
                        className="text-sm bg-background/50 border-border/50"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="post-excerpt" className="text-sm font-medium flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-emerald-400" />
                      Excerpt
                    </Label>
                    <Textarea
                      id="post-excerpt"
                      value={form.excerpt}
                      onChange={(e) => updateField('excerpt', e.target.value)}
                      placeholder="Brief summary of the post (shown in blog list and SEO)..."
                      className="min-h-[80px] bg-background/50 border-border/50 text-sm"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    Content (Markdown)
                  </CardTitle>
                  <CardDescription>
                    Write your post content using Markdown syntax
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Textarea
                    value={form.content}
                    onChange={(e) => updateField('content', e.target.value)}
                    placeholder="Write your blog post content here using Markdown..."
                    className="min-h-[400px] font-mono text-sm bg-background/50 border-border/50"
                  />
                </CardContent>
              </Card>

              {/* SEO Section */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Search className="h-4 w-4 text-emerald-400" />
                    SEO Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title" className="text-sm font-medium">
                      Meta Title
                    </Label>
                    <Input
                      id="meta-title"
                      value={form.metaTitle}
                      onChange={(e) => updateField('metaTitle', e.target.value)}
                      placeholder="SEO title (defaults to post title)"
                      className="bg-background/50 border-border/50 text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      {form.metaTitle.length}/60 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta-desc" className="text-sm font-medium">
                      Meta Description
                    </Label>
                    <Textarea
                      id="meta-desc"
                      value={form.metaDesc}
                      onChange={(e) => updateField('metaDesc', e.target.value)}
                      placeholder="SEO description for search engines..."
                      className="min-h-[80px] bg-background/50 border-border/50 text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      {form.metaDesc.length}/160 characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-4">
              {/* Publish Settings */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Publish Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  {/* Published Toggle */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      {form.published ? (
                        <ToggleRight className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                      )}
                      Published
                    </Label>
                    <Switch
                      checked={form.published}
                      onCheckedChange={(v) => updateField('published', v)}
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-amber-400" />
                      Featured
                    </Label>
                    <Switch
                      checked={form.featured}
                      onCheckedChange={(v) => updateField('featured', v)}
                    />
                  </div>

                  <Separator className="bg-border/30" />

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        form.published
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }
                    >
                      {form.published ? 'Published' : 'Draft'}
                    </Badge>
                    {form.featured && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-emerald-400" />
                    Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Select
                    value={form.category}
                    onValueChange={(v) => updateField('category', v)}
                  >
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Tag className="h-4 w-4 text-emerald-400" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Input
                    value={form.tags}
                    onChange={(e) => updateField('tags', e.target.value)}
                    placeholder="tax, illinois, calculator"
                    className="bg-background/50 border-border/50 text-sm"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Comma-separated tags
                  </p>
                  {form.tags && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {form.tags.split(',').map((tag) => {
                        const t = tag.trim();
                        if (!t) return null;
                        return (
                          <Badge key={t} variant="outline" className="text-[10px] border-border/50">
                            {t}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Cover Image */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-emerald-400" />
                    Cover Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Input
                    value={form.coverImage}
                    onChange={(e) => updateField('coverImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-background/50 border-border/50 text-sm"
                  />
                  {form.coverImage && (
                    <div className="mt-2 overflow-hidden rounded-lg border border-border/30">
                      <img
                        src={form.coverImage}
                        alt="Cover preview"
                        className="h-32 w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Content Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-lg bg-muted/20 p-3">
                      <p className="text-xl font-bold text-foreground">{words}</p>
                      <p className="text-xs text-muted-foreground">Words</p>
                    </div>
                    <div className="rounded-lg bg-muted/20 p-3">
                      <p className="text-xl font-bold text-foreground">{readTime}</p>
                      <p className="text-xs text-muted-foreground">Min Read</p>
                    </div>
                    <div className="rounded-lg bg-muted/20 p-3">
                      <p className="text-xl font-bold text-foreground">{form.content.length}</p>
                      <p className="text-xs text-muted-foreground">Characters</p>
                    </div>
                    <div className="rounded-lg bg-muted/20 p-3">
                      <p className="text-xl font-bold text-foreground">
                        {form.tags.split(',').filter((t) => t.trim()).length}
                      </p>
                      <p className="text-xs text-muted-foreground">Tags</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-6 space-y-6">
              {/* Preview Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {CATEGORIES.find((c) => c.value === form.category)?.label || form.category}
                  </Badge>
                  {form.published && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Published</Badge>
                  )}
                  {form.featured && (
                    <Badge className="bg-amber-500/20 text-amber-400 text-xs">Featured</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  {form.title || 'Untitled Post'}
                </h1>
                {form.excerpt && (
                  <p className="text-lg text-muted-foreground">{form.excerpt}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {readTime} min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Type className="h-4 w-4" />
                    {words} words
                  </span>
                </div>
              </div>

              <Separator className="bg-border/30" />

              {/* Preview Content */}
              {form.content ? (
                <div className="prose-container max-w-none">
                  <ReactMarkdown
                    components={{
                      h2: ({ children, ...props }) => (
                        <h2 className="mt-8 mb-4 text-2xl font-bold text-foreground border-b border-border/30 pb-2" {...props}>
                          {children}
                        </h2>
                      ),
                      h3: ({ children, ...props }) => (
                        <h3 className="mt-6 mb-3 text-xl font-semibold text-foreground" {...props}>
                          {children}
                        </h3>
                      ),
                      p: ({ children, ...props }) => (
                        <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
                          {children}
                        </p>
                      ),
                      ul: ({ children, ...props }) => (
                        <ul className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground" {...props}>
                          {children}
                        </ul>
                      ),
                      ol: ({ children, ...props }) => (
                        <ol className="mb-4 ml-6 list-decimal space-y-1 text-muted-foreground" {...props}>
                          {children}
                        </ol>
                      ),
                      strong: ({ children, ...props }) => (
                        <strong className="font-semibold text-foreground" {...props}>
                          {children}
                        </strong>
                      ),
                      a: ({ children, href, ...props }) => (
                        <a href={href} className="text-emerald-400 underline" {...props}>
                          {children}
                        </a>
                      ),
                      blockquote: ({ children, ...props }) => (
                        <blockquote
                          className="my-4 border-l-4 border-emerald-500/50 bg-emerald-500/5 py-3 pl-4 pr-3 italic text-muted-foreground"
                          {...props}
                        >
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className, ...props }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="rounded bg-muted/50 px-1.5 py-0.5 text-sm font-mono text-emerald-400" {...props}>
                            {children}
                          </code>
                        ) : (
                          <code className={`${className || ''} block text-sm`} {...props}>
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children, ...props }) => (
                        <pre className="my-4 overflow-x-auto rounded-lg bg-muted/30 border border-border/30 p-4 text-sm" {...props}>
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {form.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Start writing to see a preview of your post
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Star icon (inline to avoid extra import) ─────────────────────────────────
function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
