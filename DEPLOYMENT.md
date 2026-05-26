# TaxYield Deployment Guide

---

## English

### Prerequisites

Before deploying TaxYield, make sure you have:

- **Cloudflare account** (free tier works) — [signup](https://dash.cloudflare.com/sign-up)
- **Node.js 18+** installed (recommended: 20+)
- **Git** installed and your project in a GitHub repository
- **Bun** package manager installed (`curl -fsSL https://bun.sh/install | bash`)

---

### Method 1: Deploy via Cloudflare Dashboard (Recommended for Beginners)

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

### Method 2: Deploy via CLI (Wrangler)

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
   Or deploy manually:
   ```bash
   wrangler pages deploy .vercel/output/static --project-name=taxyield
   ```

5. **First deployment** — Wrangler will ask you to create the project. Confirm with "y".

6. **Subsequent deployments** — Just run `bun run pages:deploy` after building.

---

### Environment Variables

Set these in the Cloudflare Dashboard under **Pages → taxyield → Settings → Environment variables**, or via CLI:

```bash
wrangler pages secret put DATABASE_URL --project-name taxyield
```

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | Connection string for your database | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js authentication | Yes |
| `NEXTAUTH_URL` | Your site's URL (e.g., `https://taxyield.io`) | Yes |

> **Important:** For Cloudflare Pages, you must use an external database service (see Database section below). Set the `DATABASE_URL` to point to your external database.

---

### Custom Domain Configuration

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

### Database: SQLite/Prisma Won't Work on Cloudflare Pages

TaxYield uses Prisma with SQLite (a local file-based database). **SQLite will NOT work on Cloudflare Pages** because:

- Cloudflare Workers/Pages have no persistent filesystem
- Each request may run on a different isolate
- There's no way to store a `.db` file that persists between requests

**Recommended alternatives:**

| Service | Type | Free Tier | Notes |
|---|---|---|---|
| **[Turso](https://turso.tech/)** | SQLite-compatible edge database | 9GB storage, 1B reads/mo | Best choice — LibSQL is SQLite-compatible, works with Prisma |
| **[PlanetScale](https://planetscale.com/)** | MySQL-compatible serverless | Paid plans only | Great for MySQL, but no free tier anymore |
| **[Neon](https://neon.tech/)** | PostgreSQL serverless | 3GB storage, 100M reads/mo | Good PostgreSQL option, works with Prisma |
| **[Supabase](https://supabase.com/)** | PostgreSQL + extras | 500MB storage, 50K MAU | Full backend-as-a-service with auth |

**Migrating to Turso (recommended for least code changes):**

1. Install the Turso CLI: `curl -sSfL https://get.turso.tech | bash`
2. Create a database: `turso db create taxyield`
3. Get the connection URL: `turso db show taxyield --url`
4. Update your Prisma schema to use `@libsql` provider or use the `@prisma/adapter-libsql` package
5. Set `DATABASE_URL` in Cloudflare to the Turso connection string
6. Run `prisma db push` to sync your schema

---

### Deploying to Vercel (Easiest Alternative)

Vercel is the platform built by the creators of Next.js and provides the smoothest deployment experience.

1. **Push to GitHub** (same as step 1 above)

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Next.js — no configuration needed

3. **Set environment variables** in the Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

4. **Click Deploy** — that's it!

**Why Vercel is easier:**
- Native Next.js support (all features work out of the box)
- Image optimization works automatically
- Serverless functions support Node.js APIs
- Prisma with SQLite works with Vercel Postgres or external DB
- Automatic HTTPS, previews for every PR, and instant rollbacks
- Free tier: 100GB bandwidth, unlimited sites

**Vercel-specific notes:**
- The `sharp` package works natively on Vercel (image optimization)
- All Next.js API routes work as serverless functions
- Server-side rendering works without any Edge Runtime restrictions
- For the database, you still need an external service (Vercel Postgres, Turso, Neon, etc.) unless using Vercel's built-in storage

---

## دليل النشر - بالعربية

### المتطلبات الأساسية

قبل نشر TaxYield، تأكد من وجود:

- **حساب Cloudflare** (الخطة المجانية كافية) — [تسجيل](https://dash.cloudflare.com/sign-up)
- **Node.js 18+** مثبت (يُنصح بـ 20+)
- **Git** مثبت ومشروعك في مستودع GitHub
- **مدير حزم Bun** مثبت (`curl -fsSL https://bun.sh/install | bash`)

---

### الطريقة 1: النشر عبر لوحة تحكم Cloudflare (موصى بها للمبتدئين)

هذه الطريقة تربط مستودع GitHub الخاص بك مباشرةً بـ Cloudflare Pages للنشر التلقائي عند كل دفعة.

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

4. **تعيين متغيرات البيئة** (انظر قسم متغيرات البيئة أدناه)

5. **اضغط "Save and Deploy"** — ستقوم Cloudflare بالبناء والنشر تلقائياً

6. **النشر التلقائي:** كل دفعة إلى فرع `main` ستؤدي إلى نشر جديد

---

### الطريقة 2: النشر عبر سطر الأوامر (Wrangler)

هذه الطريقة تستخدم Wrangler CLI للبناء والنشر من جهازك المحلي.

1. **تثبيت Wrangler عالمياً**
   ```bash
   npm install -g wrangler
   ```

2. **تسجيل الدخول إلى Cloudflare**
   ```bash
   wrangler login
   ```
   سيفتح هذا نافذة المتصفح للمصادقة مع حساب Cloudflare الخاص بك.

3. **بناء المشروع**
   ```bash
   bun run pages:build
   ```
   هذا يشغل `npx @cloudflare/next-on-pages` الذي يبني تطبيق Next.js لـ Cloudflare Pages.

4. **النشر**
   ```bash
   bun run pages:deploy
   ```
   أو النشر يدوياً:
   ```bash
   wrangler pages deploy .vercel/output/static --project-name=taxyield
   ```

5. **النشر الأول** — سيطلب منك Wrangler إنشاء المشروع. أكد بـ "y".

6. **النشرات اللاحقة** — فقط شغّل `bun run pages:deploy` بعد البناء.

---

### متغيرات البيئة

عيّن هذه في لوحة تحكم Cloudflare تحت **Pages → taxyield → Settings → Environment variables**، أو عبر سطر الأوامر:

```bash
wrangler pages secret put DATABASE_URL --project-name taxyield
```

| المتغير | الوصف | مطلوب |
|---|---|---|
| `DATABASE_URL` | سلسلة الاتصال بقاعدة البيانات | نعم |
| `NEXTAUTH_SECRET` | سر المصادقة لـ NextAuth.js | نعم |
| `NEXTAUTH_URL` | عنوان URL لموقعك (مثال: `https://taxyield.io`) | نعم |

> **مهم:** لـ Cloudflare Pages، يجب استخدام خدمة قاعدة بيانات خارجية (انظر قسم قاعدة البيانات أدناه).

---

### إعداد النطاق المخصص

1. اذهب إلى **لوحة تحكم Cloudflare → Pages → taxyield → Custom domains**
2. اضغط **"Set up a custom domain"**
3. أدخل نطاقك (مثال: `taxyield.io`)
4. اتبع تعليمات DNS:
   - إذا كان نطاقك على Cloudflare بالفعل، ستتم إضافة سجل CNAME تلقائياً
   - إذا كان نطاقك في مكان آخر، أضف سجل CNAME يشير إلى `taxyield.pages.dev`
5. ستوفر Cloudflare شهادة SSL تلقائياً

---

### توافق بيئة التشغيل Edge

Cloudflare Pages يعمل على معزولات V8 (نفس محرك Chrome)، وليس Node.js. هذا يعني:

- **يعمل:** Fetch API، Web Streams، WebCrypto، URL، TextEncoder/Decoder، setTimeout، console
- **لا يعمل:** وحدة `fs` الخاصة بـ Node.js، `net`، `child_process`، الإضافات الأصلية، `sharp` (معالجة الصور الأصلية)
- تم تعيين `images.unoptimized = true` في `next.config.ts` لأن Cloudflare Pages لا يدعم تحسين الصور المدمج في Next.js
- الكود من جانب الخادم يجب أن يستخدم واجهات برمجة تطبيقات متوافقة مع Edge Runtime
- بعض حزم npm التي تعتمد على واجهات Node.js لن تعمل

---

### قاعدة البيانات: SQLite/Prisma لن يعمل على Cloudflare Pages

TaxYield يستخدم Prisma مع SQLite (قاعدة بيانات محلية قائمة على الملفات). **SQLite لن يعمل على Cloudflare Pages** لأن:

- Cloudflare Workers/Pages ليس لديه نظام ملفات دائم
- كل طلب قد يعمل على معزل مختلف
- لا توجد طريقة لتخزين ملف `.db` يستمر بين الطلبات

**البدائل الموصى بها:**

| الخدمة | النوع | الخطة المجانية | ملاحظات |
|---|---|---|---|
| **[Turso](https://turso.tech/)** | قاعدة بيانات Edge متوافقة مع SQLite | 9GB تخزين، 1B قراءة/شهر | الخيار الأفضل — LibSQL متوافق مع SQLite |
| **[PlanetScale](https://planetscale.com/)** | MySQL متوافق بدون خادم | خطط مدفوعة فقط | ممتاز لـ MySQL، لكن لا توجد خطة مجانية |
| **[Neon](https://neon.tech/)** | PostgreSQL بدون خادم | 3GB تخزين، 100M قراءة/شهر | خيار PostgreSQL جيد |
| **[Supabase](https://supabase.com/)** | PostgreSQL + إضافات | 500MB تخزين، 50K مستخدم نشط | منصة كاملة مع المصادقة |

**الانتقال إلى Turso (موصى به لأقل تغييرات في الكود):**

1. ثبّت Turso CLI: `curl -sSfL https://get.turso.tech | bash`
2. أنشئ قاعدة بيانات: `turso db create taxyield`
3. احصل على رابط الاتصال: `turso db show taxyield --url`
4. حدّث مخطط Prisma لاستخدام مزوّد `@libsql` أو حزمة `@prisma/adapter-libsql`
5. عيّن `DATABASE_URL` في Cloudflare إلى سلسلة اتصال Turso
6. شغّل `prisma db push` لمزامنة المخطط

---

### النشر على Vercel (الأسهل)

Vercel هي المنصة التي بناها صنّاع Next.js وتوفر أسهل تجربة نشر.

1. **ارفع إلى GitHub** (نفس الخطوة 1 أعلاه)

2. **استورد إلى Vercel**
   - اذهب إلى [vercel.com/new](https://vercel.com/new)
   - استورد مستودع GitHub الخاص بك
   - يكتشف Vercel Next.js تلقائياً — لا حاجة لإعدادات

3. **عيّن متغيرات البيئة** في لوحة تحكم Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

4. **اضغط Deploy** — هذا كل شيء!

**لماذا Vercel أسهل:**
- دعم أصلي لـ Next.js (جميع الميزات تعمل فوراً)
- تحسين الصور يعمل تلقائياً
- الدوال بدون خادم تدعم واجهات Node.js
- Prisma مع SQLite يعمل مع Vercel Postgres أو قاعدة بيانات خارجية
- HTTPS تلقائي، معاينات لكل طلب سحب، واسترجاع فوري
- الخطة المجانية: 100GB عرض نطاق، مواقع غير محدودة

**ملاحظات خاصة بـ Vercel:**
- حزمة `sharp` تعمل أصلياً على Vercel (تحسين الصور)
- جميع مسارات API في Next.js تعمل كدوال بدون خادم
- العرض من جانب الخادم يعمل بدون أي قيود على Edge Runtime
- لقاعدة البيانات، لا تزال بحاجة إلى خدمة خارجية (Vercel Postgres، Turso، Neon، إلخ)
