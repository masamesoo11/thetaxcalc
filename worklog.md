---
Task ID: 1
Agent: Main Agent
Task: Fix Tax Refund Calculator not appearing in site navigation

Work Log:
- Investigated why Tax Refund Calculator was not visible on thetaxcalc.com
- Found that the dev server (Next.js on port 3000) was repeatedly crashing/dying
- The root cause was the dev server not staying alive, so all file changes were correct but never served
- Previously edited: header.tsx (added Tax Refund to CALC_ITEMS), footer.tsx (added Tax Refund link), seo-navigation.tsx (added Tax Refund link), page.tsx (added Tax Refund card and updated "11" to "12")
- All file edits were confirmed correct by re-reading the files
- The real fix was starting the dev server using the custom script: `bash .zscripts/dev.sh`
- This script properly manages the dev server lifecycle and keeps it alive
- Verified via browser: dropdown shows "12 tools" with Tax Refund, homepage shows "12 Free Tax Calculators" with Tax Refund card

Stage Summary:
- Tax Refund Calculator is now visible in: header dropdown (12 tools), homepage cards (12 Free), footer, SEO navigation
- Dev server must be started with `bash .zscripts/dev.sh` to stay alive
- The previous approach of starting `npx next dev` or `bun run dev` directly resulted in the process dying after ~15-20 seconds
