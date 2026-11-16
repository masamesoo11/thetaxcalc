# SEO-PROJECT-STATE.md

**Project:** thetaxcalc.com SEO + technical optimization
**Branch:** `seo/full-site-optimization`
**Worktree:** `C:\Users\fito1\AppData\Local\Temp\kilo\thetaxcalc-seo`
**Original clone (untouched):** `C:\Users\fito1\AppData\Local\Temp\kilo\thetaxcalc` (hosts real `node_modules`)
**Last updated:** 2026-11-16
**`main` HEAD:** `6051163` (in sync, working tree clean)

## Git history (newest first)
| Commit | Description |
|---|---|
| `6051163` | Revert noindex on non-curated hourly rates (GSC 2026-11-16 shows real impressions: 30=484, 32=338, 50=234) |
| `ec56f8d` | Remove broken legacy `deploy.yml` (never succeeded 43/43, wrong toolchain `@cloudflare/next-on-pages`) |
| `1d8108b` | Docs: Cloudflare cache purge for `?embed=1` marked done |
| `919e18c` | Docs: 5 deliverable reports |
| `9adb1bc` | Batch 3: drop "slabs", global-nav links to `/research/*` + `/inflation-calculator`, accurate "91" count |
| `e91c7fa` | Accuracy: 2026 IRS figures + calculator tests (18 passing) |
| `04c7cd9` | Batch 2: strict slugs, robots fix, internal 301 links (noindex later reverted by `6051163`) |
| `f08b5ef` | Batch 1: remove param-strip redirect, 404 invalid compare pairs, retarget state pages |
| `15c4f18` | base |

## Batches completed
- [x] **Batch 1 — Critical:** embed/bot redirect root cause removed, state metadata retargeting, compare validation
- [x] **Batch 2 — Technical:** hourly/salary slug handling, schema/robots, internal 301 fixes
- [x] **Batch 3 — Content/linking/E-E-A-T:** slab wording, research/inflation internal links, count accuracy
- [x] **Batch 4 — QA/docs/deploy:** 18/18 tests, 0 title-audit errors, cache purge confirmed, noindex decision closed, docs written, `main` deployed

## Deployment
- Cloudflare Pages ↔ GitHub integration auto-deploys `main` (confirmed live). Legacy `.github/workflows/deploy.yml` removed in `ec56f8d` (broken 43/43, wrong toolchain). Remaining workflows need only existing `SYNDICATION_TOKEN` or no secrets.

## Noindex decision (closed)
- Reverted to index all valid hourly rates (5–500). Fresh GSC data disproved the "undiscoverable → no data" premise. If the owner later prefers explicit curation, re-apply `robots: noindex,follow` for non-curated rates in `src/app/hourly/[rate]/page.tsx`.

## Note on git identity
Git author identity is not configured on this machine. All commits are authored with a one-shot `-c user.name=masamesoo11 -c user.email=masamesoo11@users.noreply.github.com`. History author string is `Z User <z@container>`. No config was modified.

## Security note
Several GitHub tokens were pasted into this chat session; **rotate them** (and `ADMIN_PASSWORD`). They were used only for git push / API checks; no token value appears in any commit or report.
