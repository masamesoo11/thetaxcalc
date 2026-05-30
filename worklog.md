---
Task ID: 1
Agent: Main Agent
Task: Fix blog formatting, SEO issues, and improve article structure

Work Log:
- Diagnosed blog listing page (blog/page.tsx) - working correctly
- Diagnosed blog article page (blog/[slug]/page.tsx) - formatting improvements needed
- Enhanced simpleMarkdownToHtml() to add IDs to H3 headings (previously only H2 had IDs)
- Added Table of Contents (TOC) sidebar on desktop with IntersectionObserver for active heading tracking
- Created blog-toc.tsx component with smooth scroll navigation and active section highlighting
- Added reading time estimate (200 words/min) to article header
- Improved article layout: TOC sidebar on desktop, content centered on mobile
- Enhanced prose-container CSS: larger font size (1.0625rem), better line-height (1.85), heading anchor links (#) on hover, dark mode link adjustments, improved spacing
- Fixed 404 page title from "Page Not Found (404)" (21 chars) to "Page Not Found — TheTaxCalc" (34 chars)
- Verified all pages render correctly with curl tests

Stage Summary:
- Blog article pages now have: H2 + H3 with IDs, Table of Contents sidebar, reading time, heading anchor links
- Prose CSS enhanced with better typography, dark mode support, and heading anchors
- 404 page title fixed for better SEO
- All pages verified rendering correctly (200 OK, proper HTML structure)
