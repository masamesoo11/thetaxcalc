# Task 9: Dead JSON-LD Cleanup Agent

## Task
Clean up dead JSON-LD code that contains bugs and is no longer used.

## Work Done

### Task 1: calculator-jsonld.ts deprecation
- Searched all `/src/` for imports of `calculator-jsonld` or `getCalculatorJsonLd` — ZERO external imports found
- Added `@deprecated` JSDoc block comment at top of file documenting dead code status and bugs
- File preserved (not deleted) per task requirements

### Task 2: calculator-content-client.tsx JSON-LD deprecation
- Found 15 dead JSON-LD functions in the file
- Active page uses `getJsonLdForType` from `_jsonld.ts`, not from this client component
- Added block deprecation comment before JSON-LD section header
- Added `@deprecated` JSDoc to `faqsToJsonLd`, `getHomeJsonLd`, `getJsonLdForType`
- Did NOT mark `getCalculatorContent` as deprecated (still used for content generation)

### Task 3: authorReviewJsonLd removal from authors.ts
- Searched all `/src/` for `authorReviewJsonLd` — ZERO references found (only definition)
- Removed the entire function (was lines 170-200)

## Files Modified
1. `src/lib/calculator-jsonld.ts` — Added @deprecated block comment
2. `src/app/[calculator]/calculator-content-client.tsx` — Added deprecation comments
3. `src/lib/authors.ts` — Removed unused `authorReviewJsonLd()` function

## Lint Status
All 3 modified files pass lint cleanly (0 errors, 0 warnings)
Pre-existing `supervisor.js` lint errors are unrelated
