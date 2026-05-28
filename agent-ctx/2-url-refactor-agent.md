# Task 2 - URL Refactor Agent

## Task: Refactor Calculator URL Structure from Hash Fragments to Query Parameters

### Work Log

1. **Created `src/hooks/use-url-state.ts`** — New hook replacing `use-hash-state.ts`:
   - Uses `window.location.search` instead of `window.location.hash` for reading params
   - Uses `window.history.replaceState` for writing params (no page reload)
   - Uses `useSyncExternalStore` with `popstate` event subscription
   - Exports: `useUrlParams()`, `useUrlParam()`, `useUrlNumber()`, `updateUrlState()`, `migrateHashUrl()`, `parseSearchString()`
   - `updateUrlState()` no longer takes a `page` parameter (page name is removed from URL)
   - Server snapshot returns empty params (same pattern as hash approach)
   - Backward compatibility: `migrateHashUrl()` detects old `#page?param=value` hash URLs and redirects them to `?param=value` query param format using `replaceState`

2. **Updated all 11 calculator components** to import from `@/hooks/use-url-state` instead of `@/hooks/use-hash-state`:
   - paycheck-calculator.tsx: `useHashParams` → `useUrlParams`, `updateHashState('home', {...})` → `updateUrlState({...})`
   - illinois-calculator.tsx: `updateHashState('illinois', {...})` → `updateUrlState({...})`
   - texas-calculator.tsx: `updateHashState('texas', {...})` → `updateUrlState({...})`
   - florida-calculator.tsx: `updateHashState('florida', {...})` → `updateUrlState({...})`
   - california-calculator.tsx: `updateHashState('california', {...})` → `updateUrlState({...})`
   - newyork-calculator.tsx: `updateHashState('newyork', {...})` → `updateUrlState({...})`
   - mortgage-calculator.tsx: `updateHashState('mortgage', {...})` → `updateUrlState({...})`
   - retirement-projection.tsx: `updateHashState('retirement', {...})` → `updateUrlState({...})`
   - capital-gains-calculator.tsx: `updateHashState('capital-gains', {...})` → `updateUrlState({...})`
   - self-employment-calculator.tsx: `updateHashState('self-employment', {...})` → `updateUrlState({...})`
   - sales-tax-calculator.tsx: `updateHashState('sales-tax', {...})` → `updateUrlState({...})`
   - Each component calls `migrateHashUrl()` on mount for backward compatibility

3. **Updated internal navigation links** in 3 calculator components:
   - capital-gains-calculator.tsx: Changed `<button onClick={() => { window.location.hash = link.page }}>` to `<a href="/paycheck-calculator">` etc.
   - self-employment-calculator.tsx: Same change, hash navigation → proper URL paths
   - sales-tax-calculator.tsx: Same change, hash navigation → proper URL paths
   - All links now use proper URL paths (/paycheck-calculator, /capital-gains-calculator, etc.) instead of hash fragments

4. **Added deprecation comments** to old modules:
   - `src/hooks/use-hash-state.ts`: Added `@deprecated` JSDoc at module and function level
   - `src/lib/finance-utils.ts`: Added `@deprecated` JSDoc to `serializeToHash`, `parseHashParams`, `getPageFromHash`, `updateHash`

5. **Verified**: ESLint passes on all 13 modified files with zero errors

### URL Structure Change

| Before | After |
|--------|-------|
| `/paycheck-calculator#home?salary=75000&frequency=annual&hours=40&state=illinois&filing=single` | `/paycheck-calculator?salary=75000&frequency=annual&hours=40&state=illinois&filing=single` |
| `/illinois-tax-calculator#illinois?salary=75000&filing=married` | `/illinois-tax-calculator?salary=75000&filing=married` |
| `/mortgage-calculator#mortgage?price=350000&rate=6.5` | `/mortgage-calculator?price=350000&rate=6.5` |

Old hash-based URLs are automatically migrated to query param format via `migrateHashUrl()` for backward compatibility.
