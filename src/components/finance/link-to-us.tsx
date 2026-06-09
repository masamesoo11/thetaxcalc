'use client';

import { useState } from 'react';
import { Link2, Code2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LinkToUsProps {
  url: string;
  title: string;
  slug: string;
}

export function LinkToUs({ url, title, slug }: LinkToUsProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const htmlLink = `<a href="${url}" title="${title}">${title}</a>`;
  const embedCode = `<iframe src="${url}" width="100%" height="600" frameborder="0" title="${title}"></iframe>`;

  const handleCopy = async (text: string, type: 'link' | 'embed') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-border/30 bg-card/50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Link2 className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-semibold text-foreground">Link to This Calculator</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Help others find this free tool — add a link to your website or blog.
      </p>

      {/* HTML Link */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">HTML Link Code</label>
        <div className="relative">
          <pre className="overflow-x-auto rounded-lg bg-muted/30 border border-border/20 p-3 text-xs text-foreground/80 font-mono">
            {htmlLink}
          </pre>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(htmlLink, 'link')}
            className={`absolute top-1.5 right-1.5 h-7 px-2 text-xs ${
              copiedLink ? 'text-emerald-400' : ''
            }`}
            aria-label="Copy link code"
          >
            {copiedLink ? <Check className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
          </Button>
        </div>
      </div>

      {/* Embed Widget Toggle */}
      <button
        onClick={() => setShowEmbed(!showEmbed)}
        className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        <Code2 className="h-3 w-3" />
        {showEmbed ? 'Hide' : 'Show'} embed code for your website
        {showEmbed ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {showEmbed && (
        <div className="mt-2 space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Embed Iframe</label>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-muted/30 border border-border/20 p-3 text-xs text-foreground/80 font-mono whitespace-pre-wrap break-all">
              {embedCode}
            </pre>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(embedCode, 'embed')}
              className={`absolute top-1.5 right-1.5 h-7 px-2 text-xs ${
                copiedEmbed ? 'text-emerald-400' : ''
              }`}
              aria-label="Copy embed code"
            >
              {copiedEmbed ? <Check className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Customize the width and height to fit your layout. The calculator adapts to any size.
          </p>
        </div>
      )}
    </div>
  );
}
