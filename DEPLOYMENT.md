# TaxYield Deployment Guide

> **⚠️ WordPress is NOT an option for this project.** TaxYield is built with Next.js 16 — a React-based framework that requires a Node.js runtime or edge-compatible hosting. WordPress is a PHP-based CMS and cannot run Next.js applications. If you need a CMS, consider headless options like Sanity, Strapi, or Contentful — but never WordPress for hosting a Next.js app.

---

## English

### Prerequisites

Before deploying TaxYield, make sure you have:

- **Cloudflare account** (free tier works) — [signup](https://dash.cloudflare.com/sign-up)
- **Node.js 18+** installed (recommended: 20+)
- **Git** installed and your project in a GitHub repository
- **Bun** package manager installed (`curl -fsSL https://bun.sh/install | bash`)

---

### Database Migration: SQLite → Turso (Required for Cloudflare Pages)

TaxYield currently uses Prisma with a local SQLite database. **SQLite will NOT work on Cloudflare Pages** (or any serverless/edge platform) because there is no persistent filesystem. You **must** migrate to Turso before deploying.

Turso is a SQLite-compatible edge database powered by LibSQL — it's the easiest migration because it requires minimal code changes (the Prisma schema stays almost the same).

#### Step-by-step Turso Migration

1. **Create a Turso account** — Go to [turso.tech](https://turso.tech/) and sign up (free tier: 9GB storage, 1 billion reads/month)

2. **Install the Turso CLI**
   ```bash
   curl -sSfL https://get.turso.tech | bash
   ```

3. **Authenticate with Turso**
   ```bash
   turso auth login
   ```

4. **Create your database**
   ```bash
   turso db create taxyield
   ```

5. **Get your connection URL** — This becomes your `TURSO_DATABASE_URL`
   ```bash
   turso db show taxyield --url
   ```
   Output looks like: `libsql://taxyield-YourOrg.aws-eu-west-1.turso.io`

6. **Create an auth token** — This becomes your `TURSO_AUTH_TOKEN`
   ```bash
   turso db tokens create taxyield
   ```
   Output is a long JWT string like `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...`

7. **Update Prisma schema** — Change the datasource provider and add the `directUrl`:
   ```prisma
   datasource db {
     provider  = "sqlite"
     url       = env("TURSO_DATABASE_URL")
     directUrl = env("DATABASE_URL")
   }
   ```
   - `TURSO_DATABASE_URL` — The LibSQL connection string (e.g., `libsql://taxyield-...turso.io`) used at runtime
   - `DATABASE_URL` — A local SQLite file path (e.g., `file:./dev.db`) used by Prisma CLI for migrations locally

8. **Install the LibSQL adapter for Prisma**
   ```bash
   bun add @prisma/adapter-libsql @libsql/client
   ```

9. **Update `src/lib/db.ts`** to use the LibSQL adapter:
   ```typescript
   import { PrismaClient } from '@prisma/client'
   import { PrismaLibSQL } from '@prisma/adapter-libsql'
   import { createClient } from '@libsql/client'

   const libsql = createClient({
     url: process.env.TURSO_DATABASE_URL!,
     authToken: process.env.TURSO_AUTH_TOKEN!,
   })

   const adapter = new PrismaLibSQL(libsql)

   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined
   }

   export const db =
     globalForPrisma.prisma ??
     new PrismaClient({
       adapter,
     })

   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
   ```

10. **Push your schema to Turso**
    ```bash
    DATABASE_URL="file:./dev.db" bun run db:push
    ```

11. **Seed the database** — Visit `/api/seed` after deployment to populate blog posts and initial data

#### Required Environment Variables for Turso

| Variable | Description | Example |
|---|---|---|
| `TURSO_DATABASE_URL` | LibSQL connection string from Turso | `libsql://taxyield-YourOrg.aws-eu-west-1.turso.io` |
| `TURSO_AUTH_TOKEN` | Authentication token from Turso | `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...` |
| `DATABASE_URL` | Local SQLite path (for Prisma CLI only) | `file:./dev.db` |

> **Note:** The `DATABASE_URL` is still needed for local development and Prisma CLI commands. On the deployment platform, `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are what the running app actually uses.

---

### Method 1: Deploy to Cloudflare Pages via Dashboard (Recommended for Beginners)

This method connects your GitHub repository directly to Cloudflare Pages for automatic deployments on every push.

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/taxyield.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create application → Pages
   - Click **"Connect to Git"**
   - Authorize Cloudflare to access your GitHub account
   - Select your **taxyield** repository

3. **Configure build settings**
   - **Framework preset:** Next.js (Static Export)
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`
   - **Node.js version:** 20 (set via environment variable `NODE_VERSION=20`)

4. **Set environment variables** (see Environment Variables section below)

5. **Click "Save and Deploy"** — Cloudflare will build and deploy your site automatically

6. **Auto-deploy:** Every push to your `main` branch will trigger a new deployment

---

### Method 2: Deploy to Cloudflare Pages via CLI (Wrangler)

This method uses the Wrangler CLI to build and deploy from your local machine.

1. **Install Wrangler globally**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```
   This opens a browser window to authenticate with your Cloudflare account.

3. **Build the project**
   ```bash
   bun run pages:build
   ```
   This runs `npx @cloudflare/next-on-pages` which builds the Next.js app for Cloudflare Pages.

4. **Deploy**
   ```bash
   bun run pages:deploy
   ```
   This builds and deploys in one step. Or deploy manually:
   ```bash
   wrangler pages deploy .vercel/output/static --project-name=taxyield
   ```

5. **First deployment** — Wrangler will ask you to create the project. Confirm with "y".

6. **Subsequent deployments** — Just run `bun run pages:deploy` after building.

---

### Environment Variables (Cloudflare Pages)

Set these in the Cloudflare Dashboard under **Pages → taxyield → Settings → Environment variables**, or via CLI:

```bash
wrangler pages secret put TURSO_DATABASE_URL --project-name taxyield
wrangler pages secret put TURSO_AUTH_TOKEN --project-name taxyield
```

| Variable | Description | Required |
|---|---|---|
| `TURSO_DATABASE_URL` | LibSQL connection string for Turso database | Yes |
| `TURSO_AUTH_TOKEN` | Turso authentication token | Yes |
| `DATABASE_URL` | Local SQLite path (used by Prisma CLI during build) | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js authentication | Yes |
| `NEXTAUTH_URL` | Your site's URL (e.g., `https://taxyield.io`) | Yes |

---

### Custom Domain Configuration (Cloudflare)

1. Go to **Cloudflare Dashboard → Pages → taxyield → Custom domains**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `taxyield.io`)
4. Follow the DNS instructions:
   - If your domain is already on Cloudflare, it will add a CNAME record automatically
   - If your domain is elsewhere, add a CNAME record pointing to `taxyield.pages.dev`
5. Cloudflare will automatically provision an SSL certificate

**For www redirect:**
- Add both `taxyield.io` and `www.taxyield.io` as custom domains
- Create a Page Rule to redirect www to the apex domain (or handle in Next.js middleware)

---

### Edge Runtime Compatibility

Cloudflare Pages runs on V8 isolates (the same engine as Chrome), not Node.js. This means:

- **Works:** Fetch API, Web Streams, WebCrypto, URL, TextEncoder/Decoder, setTimeout, console
- **Does NOT work:** Node.js `fs` module, `net`, `child_process`, native Node.js addons, `sharp` (native image processing)
- **`images.unoptimized = true`** is set in `next.config.ts` because Cloudflare Pages does not support Next.js built-in image optimization. You can use Cloudflare Images or a third-party service instead.
- Server-side code must use the **Edge Runtime** compatible APIs
- Some npm packages that rely on Node.js APIs will not work — check with `@cloudflare/next-on-pages` build output for warnings

---

### Deploying to Vercel (Easiest Alternative)

Vercel is the platform built by the creators of Next.js and provides the smoothest deployment experience.

1. **Push to GitHub** (same as step 1 above)

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Next.js — no configuration needed

3. **Set environment variables** in the Vercel dashboard:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

4. **Click Deploy** — that's it!

**Why Vercel is easier:**
- Native Next.js support (all features work out of the box)
- Image optimization works automatically
- Serverless functions support Node.js APIs
- No need for `@cloudflare/next-on-pages` or special build configuration
- Automatic HTTPS, previews for every PR, and instant rollbacks
- Free tier: 100GB bandwidth, unlimited sites

**Vercel-specific notes:**
- The `sharp` package works natively on Vercel (image optimization)
- All Next.js API routes work as serverless functions
- Server-side rendering works without any Edge Runtime restrictions
- You still need Turso (or another external DB) since Vercel doesn't provide persistent filesystem either

---

## دليل النشر - بالعربية

### ⚠️ ووردبريس ليس خياراً لمشروع Next.js

**الخلاصة: ووردبريس لا يعمل لمشروع Next.js.** مشروع TaxYield مبني بإطار Next.js 16 وهو إطار عمل يعتمد على React ويحتاج إلى بيئة Node.js أو بيئة Edge متوافقة. ووردبريس هو نظام إدارة محتوى مبني على PHP ولا يمكنه تشغيل تطبيقات Next.js. إذا كنت بحاجة إلى نظام إدارة محتوى، استخدم أنظمة Headless مثل Sanity أو Strapi أو Contentful — لكن أبداً ووردبريس.

---

### الانتقال إلى Turso (مطلوب قبل النشر)

مشروع TaxYield يستخدم حالياً قاعدة بيانات SQLite المحلية. **SQLite لن يعمل على Cloudflare Pages أو أي منصة بدون خادم** لأنه لا يوجد نظام ملفات دائم. **يجب** الانتقال إلى Turso قبل النشر.

#### خطوات الانتقال إلى Turso

1. **أنشئ حساب على Turso** — اذهب إلى [turso.tech](https://turso.tech/) وسجّل (الخطة المجانية: 9GB تخزين، مليار قراءة/شهر)

2. **ثبّت Turso CLI**
   ```bash
   curl -sSfL https://get.turso.tech | bash
   ```

3. **سجّل الدخول**
   ```bash
   turso auth login
   ```

4. **أنشئ قاعدة البيانات**
   ```bash
   turso db create taxyield
   ```

5. **احصل على رابط الاتصال** — هذا سيكون `TURSO_DATABASE_URL`
   ```bash
   turso db show taxyield --url
   ```
   المخرجات تشبه: `libsql://taxyield-YourOrg.aws-eu-west-1.turso.io`

6. **أنشئ رمز المصادقة** — هذا سيكون `TURSO_AUTH_TOKEN`
   ```bash
   turso db tokens create taxyield
   ```
   المخرجات سلسلة طويلة مثل: `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...`

7. **حدّث مخطط Prisma** — غيّر مصدر البيانات:
   ```prisma
   datasource db {
     provider  = "sqlite"
     url       = env("TURSO_DATABASE_URL")
     directUrl = env("DATABASE_URL")
   }
   ```

8. **ثبّت محول LibSQL**
   ```bash
   bun add @prisma/adapter-libsql @libsql/client
   ```

9. **حدّث `src/lib/db.ts`** لاستخدام المحول الجديد (انظر القسم الإنجليزي أعلاه للكود)

10. **ارفع المخطط إلى Turso**
    ```bash
    DATABASE_URL="file:./dev.db" bun run db:push
    ```

11. **بذر قاعدة البيانات** — زر `/api/seed` بعد النشر لتعبئة المقالات والبيانات الأولية

#### متغيرات البيئة المطلوبة لـ Turso

| المتغير | الوصف | مثال |
|---|---|---|
| `TURSO_DATABASE_URL` | سلسلة اتصال LibSQL من Turso | `libsql://taxyield-YourOrg.aws-eu-west-1.turso.io` |
| `TURSO_AUTH_TOKEN` | رمز المصادقة من Turso | `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...` |
| `DATABASE_URL` | مسار SQLite محلي (لأوامر Prisma فقط) | `file:./dev.db` |

---

### النشر على Cloudflare Pages

#### الطريقة 1: عبر لوحة تحكم Cloudflare (للمبتدئين)

1. **ارفع الكود إلى GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/taxyield.git
   git push -u origin main
   ```

2. **اتصل بـ Cloudflare Pages**
   - اذهب إلى [لوحة تحكم Cloudflare](https://dash.cloudflare.com/) → Workers & Pages → Create application → Pages
   - اضغط **"Connect to Git"**
   - اسمح لـ Cloudflare بالوصول إلى حساب GitHub الخاص بك
   - اختر مستودع **taxyield**

3. **إعدادات البناء**
   - **إطار العمل:** Next.js (Static Export)
   - **أمر البناء:** `npx @cloudflare/next-on-pages`
   - **مجلد المخرجات:** `.vercel/output/static`
   - **إصدار Node.js:** 20 (عبر متغير البيئة `NODE_VERSION=20`)

4. **أضف متغيرات البيئة:**
   - `TURSO_DATABASE_URL` — رابط اتصال Turso
   - `TURSO_AUTH_TOKEN` — رمز المصادقة من Turso
   - `DATABASE_URL` — `file:./dev.db` (للبناء فقط)
   - `NEXTAUTH_SECRET` — سر المصادقة
   - `NEXTAUTH_URL` — عنوان موقعك (مثال: `https://taxyield.io`)

5. **اضغط "Save and Deploy"** — ستقوم Cloudflare بالبناء والنشر تلقائياً

6. **النشر التلقائي:** كل دفعة إلى فرع `main` ستؤدي إلى نشر جديد

#### الطريقة 2: عبر سطر الأوامر (Wrangler)

1. **ثبّت Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **سجّل الدخول**
   ```bash
   wrangler login
   ```

3. **ابنِ المشروع**
   ```bash
   bun run pages:build
   ```
   هذا يشغّل `npx @cloudflare/next-on-pages` الذي يبني التطبيق لـ Cloudflare Pages.

4. **انشر**
   ```bash
   bun run pages:deploy
   ```
   هذا يبني وينشر في خطوة واحدة. أو انشر يدوياً:
   ```bash
   wrangler pages deploy .vercel/output/static --project-name=taxyield
   ```

5. **النشر الأول** — سيطلب منك Wrangler إنشاء المشروع. أكد بـ "y".

6. **النشرات اللاحقة** — فقط شغّل `bun run pages:deploy`.

---

### أو النشر على Vercel (الأسهل)

Vercel أسهل لأنه منصة صنّاع Next.js نفسهم — كل شيء يعمل تلقائياً بدون إعدادات خاصة.

1. **ارفع إلى GitHub** (نفس الخطوة أعلاه)

2. **اذهب إلى [vercel.com/new](https://vercel.com/new)**

3. **استورد المستودع** — اختر مستودع taxyield من GitHub

4. **أضف متغيرات البيئة:**
   - `TURSO_DATABASE_URL` — رابط اتصال Turso
   - `TURSO_AUTH_TOKEN` — رمز المصادقة من Turso
   - `DATABASE_URL` — `file:./dev.db`
   - `NEXTAUTH_SECRET` — سر المصادقة
   - `NEXTAUTH_URL` — عنوان موقعك

5. **اضغط Deploy** — هذا كل شيء!

**مميزات Vercel:**
- دعم أصلي لـ Next.js (كل الميزات تعمل فوراً)
- تحسين الصور يعمل تلقائياً
- لا حاجة لـ `@cloudflare/next-on-pages` أو إعدادات بناء خاصة
- HTTPS تلقائي ومعاينات لكل طلب سحب
- الخطة المجانية: 100GB عرض نطاق، مواقع غير محدودة

> **ملاحظة:** حتى على Vercel، تحتاج Turso (أو قاعدة بيانات خارجية أخرى) لأن Vercel أيضاً لا يوفر نظام ملفات دائم.

---

### ملخص سريع

| المنصة | الصعوبة | ملاحظات |
|---|---|---|
| **Vercel** | ⭐ سهل | أسهل خيار — كل شيء يعمل تلقائياً |
| **Cloudflare Pages** | ⭐⭐ متوسط | يحتاج `@cloudflare/next-on-pages` وإعدادات خاصة |
| **WordPress** | ❌ لا يعمل | ووردبريس مبني على PHP ولا يمكنه تشغيل Next.js |

### أوامر البناء والنشر السريعة

```bash
# بناء لـ Cloudflare Pages
bun run pages:build

# بناء ونشر لـ Cloudflare Pages
bun run pages:deploy

# بناء عادي (لـ Vercel أو الاستضافة الذاتية)
bun run build
```
