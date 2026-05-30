'use client';

import { useState, useEffect } from 'react';

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export function BlogTableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observerEntries) => {
        for (const entry of observerEntries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    for (const e of entries) {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <ul className="space-y-1 text-sm">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block py-1 text-muted-foreground hover:text-foreground transition-colors ${
                entry.level === 3 ? 'pl-4 text-xs' : 'text-sm'
              } ${
                activeId === entry.id
                  ? 'text-emerald-500 dark:text-emerald-400 font-medium border-l-2 border-emerald-500 pl-2'
                  : 'border-l-2 border-transparent pl-2'
              }`}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
