'use client';

import { useCallback, useEffect, useState } from 'react';
import { Calculator, Home, MapPin, DollarSign, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { key: 'home', label: 'Paycheck Calculator', icon: Calculator },
  { key: 'illinois', label: 'Illinois', icon: MapPin },
  { key: 'texas', label: 'Texas', icon: MapPin },
  { key: 'florida', label: 'Florida', icon: MapPin },
  { key: 'mortgage', label: 'Mortgage', icon: Home },
];

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = useCallback(
    (page: string) => {
      onNavigate(page);
      setMobileMenuOpen(false);
    },
    [onNavigate]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <DollarSign className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            TaxYield<span className="text-emerald-400">.io</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <Button
                key={item.key}
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => handleNav(item.key)}
                className={`gap-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-400'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.key;
              return (
                <Button
                  key={item.key}
                  variant={isActive ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => handleNav(item.key)}
                  className={`w-full justify-start gap-2 text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
