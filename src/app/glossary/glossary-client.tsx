'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen, ChevronUp, X } from 'lucide-react';
import { GLOSSARY_TERMS, getGlossaryLetters } from '@/lib/glossary-data';
import type { GlossaryTerm } from '@/lib/glossary-data';

const ALL_LETTERS = getGlossaryLetters();

export function GlossaryClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const topRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter terms by search query
  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return GLOSSARY_TERMS;
    const query = searchQuery.toLowerCase().trim();
    return GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query) ||
        t.slug.includes(query.replace(/\s+/g, '-'))
    );
  }, [searchQuery]);

  // Group filtered terms by letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    for (const term of filteredTerms) {
      if (!groups[term.letter]) {
        groups[term.letter] = [];
      }
      groups[term.letter].push(term);
    }
    return groups;
  }, [filteredTerms]);

  // Available letters based on current filter
  const availableLetters = useMemo(() => {
    return Object.keys(groupedTerms).sort();
  }, [groupedTerms]);

  // Scroll to a letter section
  const scrollToLetter = useCallback((letter: string) => {
    setActiveLetter(letter);
    const el = sectionRefs.current[letter];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setActiveLetter(null);
  }, []);

  const resultCount = filteredTerms.length;
  const hasResults = resultCount > 0;

  return (
    <div ref={topRef}>
      {/* ─── Search & Filter Bar ─────────────────────────────────────────── */}
      <div className="mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveLetter(null);
            }}
            placeholder='Search tax terms — e.g. "FICA", "standard deduction", "capital gains"...'
            className="w-full rounded-xl border border-border/30 bg-card/60 py-3.5 pl-12 pr-10 text-foreground placeholder:text-muted-foreground/50 backdrop-blur-sm transition-all focus:border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            aria-label="Search tax glossary terms"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Result count */}
        {searchQuery && (
          <p className="text-center text-sm text-muted-foreground">
            {hasResults ? (
              <>
                Found <span className="font-semibold text-foreground">{resultCount}</span> term{resultCount !== 1 ? 's' : ''} matching &ldquo;{searchQuery}&rdquo;
              </>
            ) : (
              <>
                No terms found for &ldquo;{searchQuery}&rdquo;. Try a different search.
              </>
            )}
          </p>
        )}
      </div>

      {/* ─── A-Z Navigation Bar ──────────────────────────────────────────── */}
      <div className="mb-10 sticky top-16 z-30 -mx-4 px-4 py-3 glass-strong">
        <nav aria-label="Glossary A-Z navigation" className="flex flex-wrap items-center justify-center gap-1.5">
          {ALL_LETTERS.map((letter) => {
            const isAvailable = availableLetters.includes(letter);
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => isAvailable && scrollToLetter(letter)}
                disabled={!isAvailable}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/10'
                    : isAvailable
                      ? 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                      : 'text-muted-foreground/25 cursor-not-allowed'
                }`}
                aria-label={`Jump to letter ${letter}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {letter}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ─── Glossary Terms by Letter ────────────────────────────────────── */}
      {hasResults ? (
        <div className="space-y-12">
          {availableLetters.map((letter) => (
            <section
              key={letter}
              ref={(el) => { sectionRefs.current[letter] = el; }}
              id={`letter-${letter}`}
              aria-labelledby={`heading-${letter}`}
            >
              {/* Letter Header */}
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/20 to-emerald-500/10 border border-emerald-500/20">
                  <span className="text-xl font-bold text-emerald-400">{letter}</span>
                </div>
                <div className="divider-glow flex-1" />
                <span className="text-xs text-muted-foreground">
                  {groupedTerms[letter].length} term{groupedTerms[letter].length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Term Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {groupedTerms[letter].map((item) => (
                  <GlossaryCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">No matching terms found</p>
          <p className="mt-1 text-sm text-muted-foreground/60">Try a different search term or clear the filter</p>
          <button
            onClick={clearSearch}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* ─── Back to Top Button ──────────────────────────────────────────── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 hover:bg-emerald-500/30 transition-all animate-fade-in"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

// ─── Individual Glossary Card ──────────────────────────────────────────────

function GlossaryCard({ item }: { item: GlossaryTerm }) {
  return (
    <div className="group glass-card p-5 transition-all hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5">
      {/* Term name as H3 */}
      <h3
        id={`term-${item.slug}`}
        className="text-base font-semibold text-foreground group-hover:text-emerald-400 transition-colors"
      >
        {item.term}
      </h3>

      {/* Definition */}
      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
        {item.definition}
      </p>

      {/* 2026 Figure or Example */}
      {item.figure2026 && (
        <div className="mt-3 rounded-lg bg-emerald-500/8 border border-emerald-500/15 px-3 py-2">
          <p className="text-xs font-medium text-emerald-400">
            <span className="font-bold">2026 Figure:</span> {item.figure2026}
          </p>
        </div>
      )}
      {!item.figure2026 && item.example && (
        <div className="mt-3 rounded-lg bg-muted/20 border border-border/20 px-3 py-2">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/80">Example:</span> {item.example}
          </p>
        </div>
      )}

      {/* Calculator Link */}
      {item.calculatorLink && (
        <div className="mt-3">
          <Link
            href={item.calculatorLink}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {item.calculatorLabel}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
