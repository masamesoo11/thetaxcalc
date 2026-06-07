'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || '');

  const shareLinks = [
    {
      name: 'Twitter / X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=TheTaxCalc`,
      color: 'hover:bg-sky-500/10 hover:text-sky-400 hover:border-sky-500/30',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30',
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Share2 className="h-3.5 w-3.5" />
        Share:
      </span>
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-lg border border-border/30 p-2 transition-all ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-border/30 px-3 py-2 text-xs transition-all ${
          copied
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : 'hover:bg-muted/50'
        }`}
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
}
