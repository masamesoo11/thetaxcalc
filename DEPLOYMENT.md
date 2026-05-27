# TaxYield Deployment Guide

> **⚠️ WordPress is NOT an option for this project.** TaxYield is built with Next.js 16 — a React-based framework that requires a Node.js runtime or edge-compatible hosting. WordPress is a PHP-based CMS and cannot run Next.js applications.

---

## دليل النشر والربط بالدومين — بالعربية

---

# المرحلة 1: شراء الدومين

## الخيار أ: شراء الدومين من Cloudflare (⭐ موصى به — الأسهل)

1. اذهب إلى **[dash.cloudflare.com](https://dash.cloudflare.com/)**
2. سجّل حساب جديد (مجاني)
3. من القائمة الجانبية اضغط **Domain Registration**
4. اضغط **Register Domains**
5. اكتب الدومين المطلوب مثل `taxyield.io`
6. إذا كان متاحاً → اضغط **Purchase**
7. أدخل بيانات الدفع (بطاقة ائتمان)
8. ✅ الدومين جاهز! — لا تحتاج أي إعدادات DNS لأنه على Cloudflare مباشرة

**مميزات الشراء من Cloudflare:**
- أرخص سعر (بالتكلفة بدون رسوم إضافية)
- DNS فوري (بدون انتظار نشر)
- SSL تلقائي
- حماية DDoS مدمجة

## الخيار ب: شراء الدومين من Namecheap

1. اذهب إلى **[namecheap.com](https://www.namecheap.com/)**
2. اكتب الدومين المطلوب في شريط البحث
3. إذا كان متاحاً → اضغط **Add to Cart**
4. اضغط **Checkout**
5. أنشئ حساب أو سجّل الدخول
6. أدخل بيانات الدفع
7. ✅ الدومين جاهز! — لكن ستحتاج نقله إلى Cloudflare أو تعديل DNS يدوياً

## الخيار ج: شراء الدومين من Google Domains (Squarespace الآن)

1. اذهب إلى **[domains.google.com](https://domains.google.com/)**
2. ابحث عن الدومين
3. أضفه للسلة واشترِه
4. ✅ ستحتاج تعديل DNS يدوياً لاحقاً

---

# المرحلة 2: إعداد قاعدة البيانات (Turso)

> **مهم:** SQLite المحلي لا يعمل على أي منصة استضافة. يجب الانتقال إلى Turso.

### الخطوة 1: أنشئ حساب على Turso
1. اذهب إلى **[turso.tech](https://turso.tech/)**
2. اضغط **Start for Free**
3. سجّل باستخدام GitHub أو البريد الإلكتروني

### الخطوة 2: أنشئ قاعدة بيانات
1. من لوحة تحكم Turso، اضغط **Create Database**
2. اسم قاعدة البيانات: `taxyield`
3. اختر المنطقة الأقرب لمستخدميك (مثلاً `aws-us-east-1`)
4. اضغط **Create**

### الخطوة 3: انسخ بيانات الاتصال
1. اضغط على قاعدة البيانات `taxyield`
2. انسخ **URL** — يبدو مثل:
   ```
   libsql://taxyield-yourname-aws-us-east-1.turso.io
   ```
   هذا هو `TURSO_DATABASE_URL`

3. اضغط **Create Auth Token**
4. انسخ الرمز الطويل — يبدو مثل:
   ```
   eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoi...
   ```
   هذا هو `TURSO_AUTH_TOKEN`

### الخطوة 4: رفع البيانات إلى Turso
على جهازك المحلي:
```bash
# ثبّت Turso CLI
curl -sSfL https://get.turso.tech | bash

# سجّل الدخول
turso auth login

# أنشئ قاعدة البيانات (إذا لم تنشئها من الموقع)
turso db create taxyield

# ارفع المخطط
DATABASE_URL="libsql://taxyield-yourname-aws-us-east-1.turso.io" \
TURSO_DATABASE_URL="libsql://taxyield-yourname-aws-us-east-1.turso.io" \
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSI..." \
bun run db:push
```

---

# المرحلة 3: رفع الكود إلى GitHub

### الخطوة 1: أنشئ مستودع على GitHub
1. اذهب إلى **[github.com/new](https://github.com/new)**
2. اسم المستودع: `taxyield`
3. اختر **Private** أو **Public**
4. ❌ لا تختر "Add a README" أو ".gitignore"
5. اضغط **Create repository**

### الخطوة 2: ارفع الكود
على جهازك المحلي:
```bash
cd /path/to/taxyield

# أضف الملفات
git init
git add .

# التزم
git commit -m "TaxYield.io - Initial commit"

# اربط بـ GitHub
git remote add origin https://github.com/YOUR_USERNAME/taxyield.git

# ارفع
git push -u origin main
```

> **إذا طلب GitHub المصادقة:** استخدم Personal Access Token من Settings → Developer settings → Personal access tokens

---

# المرحلة 4: النشر على Cloudflare Pages

### الخطوة 1: اربط GitHub مع Cloudflare
1. اذهب إلى **[dash.cloudflare.com](https://dash.cloudflare.com/)**
2. من القائمة الجانبية اضغط **Workers & Pages**
3. اضغط **Create application**
4. اضغط **Pages** ثم **Connect to Git**
5. اضغط **Connect GitHub** — اسمح لـ Cloudflare بالوصول إلى حسابك
6. اختر مستودع **taxyield**
7. اضغط **Begin setup**

### الخطوة 2: إعدادات البناء
| الإعداد | القيمة |
|---------|--------|
| **Framework preset** | Next.js (Static Export) |
| **Build command** | `npx @cloudflare/next-on-pages` |
| **Build output directory** | `.vercel/output/static` |

> أضف متغير `NODE_VERSION=20` في Environment variables

### الخطوة 3: أضف متغيرات البيئة
اضغط **Environment variables** ثم أضف:

| المتغير | القيمة | أين تجدها |
|---------|--------|-----------|
| `TURSO_DATABASE_URL` | `libsql://taxyield-...turso.io` | من لوحة تحكم Turso |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOiJFZERTQSI...` | من لوحة تحكم Turso |
| `DATABASE_URL` | `file:./dev.db` | ثابت |
| `NEXTAUTH_SECRET` | سلسلة عشوائية طويلة | [أنشئ واحدة](https://generate-secret.vercel.app/32) |
| `NEXTAUTH_URL` | `https://taxyield.io` | دومينك |
| `NEXT_PUBLIC_SITE_URL` | `https://taxyield.io` | دومينك (⭐ مهم!) |
| `NODE_VERSION` | `20` | ثابت |

> ⚠️ **`NEXT_PUBLIC_SITE_URL` مهم جداً!** هذا المتغير يتحكم في كل روابط الموقع (canonical، sitemap، JSON-LD، Open Graph). بدونها ستستخدم القيمة الافتراضية `https://taxyield.io`.

### الخطوة 4: انشر!
1. اضغط **Save and Deploy**
2. انتظر حتى ينتهي البناء (3-5 دقائق)
3. ✅ ستحصل على رابط مثل: `taxyield.pages.dev`

### الخطوة 5: بذر قاعدة البيانات
بعد نجاح النشر:
1. افتح `https://taxyield.pages.dev/api/seed`
2. هذا سيعبئ المقالات والبيانات الأولية

---

# المرحلة 5: ربط الدومين المخصص 🔑

## الحالة أ: الدومين على Cloudflare (الأسهل — خطوتين فقط!)

### الخطوة 1: أضف الدومين للمشروع
1. اذهب إلى **dash.cloudflare.com** → **Workers & Pages**
2. اختر مشروع **taxyield**
3. اضغط **Custom domains**
4. اضغط **Set up a custom domain**
5. اكتب `taxyield.io`
6. Cloudflare سيضيف سجل CNAME تلقائياً ✅
7. اضغط **Activate domain**
8. كرر نفس الخطوات لإضافة `www.taxyield.io`

### الخطوة 2: انتظر
- SSL يُفعّل تلقائياً خلال 5-15 دقيقة
- الموقع سيكون متاحاً على `https://taxyield.io` 🎉

---

## الحالة ب: الدومين على Namecheap أو مزوّد آخر

### الخطوة 1: انقل الدومين إلى Cloudflare DNS (موصى به)

1. اذهب إلى **dash.cloudflare.com**
2. اضغط **Add a site**
3. اكتب دومينك `taxyield.io`
4. اختر الخطة **Free**
5. Cloudflare سيعطيك **سجلي Nameserver** مثل:
   ```
   alice.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```

### الخطوة 2: غيّر Nameservers عند المزوّد الأصلي

1. اذهب إلى **Namecheap** (أو مزوّد الدومين)
2. اذهب إلى **Domain List** → **Manage**
3. اضغط **Domain** → **Nameservers**
4. اختر **Custom DNS**
5. أدخل سجلي Cloudflare:
   ```
   alice.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```
6. اضغط **Save**

### الخطوة 3: انتظر نشر DNS
- ⏱️ يستغرق من **15 دقيقة إلى 24 ساعة** (عادةً أقل من ساعة)
- تحقق من: `https://dash.cloudflare.com` → ستظهر الحالة **Active** بدلاً من **Pending**

### الخطوة 4: أضف سجلات DNS

1. اذهب إلى **dash.cloudflare.com** → اختر دومينك
2. اضغط **DNS** → **Records**
3. أضف السجلات التالية:

| النوع | الاسم | المحتوى | Proxy | TTL |
|-------|-------|---------|-------|-----|
| **CNAME** | `@` | `taxyield.pages.dev` | ✅ Proxied | Auto |
| **CNAME** | `www` | `taxyield.pages.dev` | ✅ Proxied | Auto |

> ⚠️ تأكد أن **Proxy status** = **Proxied** (السحابة البرتقالية) وليس DNS only

### الخطوة 5: أضف الدومين لمشروع Pages

1. اذهب إلى **Workers & Pages** → **taxyield** → **Custom domains**
2. اضغط **Set up a custom domain**
3. اكتب `taxyield.io` → اضغط Continue
4. Cloudflare سيتأكد من سجل DNS → اضغط **Activate domain**
5. كرر لإضافة `www.taxyield.io`

---

## الحالة ج: لا تريد نقل DNS لـ Cloudflare (غير موصى به)

إذا كنت تريد إبقاء DNS عند المزوّد الأصلي:

1. اذهب إلى لوحة تحكم المزوّد (Namecheap مثلاً)
2. اذهب إلى **Advanced DNS**
3. أضف السجلات:

| النوع | Host | Value | TTL |
|-------|------|-------|-----|
| **CNAME** | `@` | `taxyield.pages.dev` | Automatic |
| **CNAME** | `www` | `taxyield.pages.dev` | Automatic |

4. اذهب إلى Cloudflare Pages → taxyield → Custom domains
5. أضف `taxyield.io`
6. Cloudflare سيقوم بتفعيل SSL تلقائياً

> ⚠️ بدون Cloudflare Proxy، لن تحصل على حماية DDoS أو CDN العالمي

---

# المرحلة 6: إعدادات SSL والأمان

### الخطوة 1: فعّل SSL
1. في Cloudflare Dashboard → اختر دومينك
2. اضغط **SSL/TLS**
3. اختر **Full (strict)** ← ⭐ مهم!
4. هذا يضمن اتصال مشفر من المستخدم → Cloudflare → موقعك

### الخطوة 2: فعّل Always Use HTTPS
1. في **SSL/TLS** → **Edge Certificates**
2. فعّل **Always Use HTTPS** ✅
3. فعّل **Automatic HTTPS Rewrites** ✅
4. فعّل **Minimum TLS Version** = **1.2**

### الخطوة 3: تحويل www إلى بدون www (أو العكس)
1. اضغط **Rules** → **Redirect Rules**
2. اضغط **Create rule**
3. الاسم: `Redirect www to apex`
4. إذا كان الطلب = `www.taxyield.io/*`
5. تحويل إلى `https://taxyield.io/$1`
6. نوع التحويل: **301 (Permanent)**
7. اضغط **Deploy**

---

# المرحلة 7: إعدادات SEO بعد ربط الدومين

### الخطوة 1: Google Search Console
1. اذهب إلى **[search.google.com/search-console](https://search.google.com/search-console)**
2. اضغط **Add Property**
3. اكتب `https://taxyield.io`
4. اختر طريقة التحقق: **HTML Tag**
5. ستحصل على رمز مثل: `<meta name="google-site-verification" content="abc123..." />`
6. انسخ القيمة `abc123...`
7. أضفها كمتغير بيئة في Cloudflare:
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = `abc123...`
8. أعد النشر (Redeploy)

### الخطوة 2: قدّم sitemap
1. في Google Search Console
2. اضغط **Sitemaps**
3. اكتب `https://taxyield.io/sitemap.xml`
4. اضغط **Submit**

### الخطوة 3: Google Analytics (اختياري)
1. اذهب إلى **[analytics.google.com](https://analytics.google.com/)**
2. أنشئ حساب → أنشئ خاصية
3. انسخ معرف القياس مثل `G-XXXXXXXXXX`
4. أضفه كمتغير بيئة:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
5. أعد النشر

---

# المرحلة 8: التحقق النهائي ✅

بعد ربط الدومين، تحقق من كل ما يلي:

| # | الفحص | كيف تتحقق | النتيجة المتوقعة |
|---|-------|----------|-----------------|
| 1 | الموقع يفتح | افتح `https://taxyield.io` | الصفحة الرئيسية تظهر |
| 2 | www يحوّل | افتح `https://www.taxyield.io` | يحوّل إلى `https://taxyield.io` |
| 3 | SSL يعمل | تحقق من 🔒 في المتصفح | 🔒 أخضر |
| 4 | sitemap | افتح `https://taxyield.io/sitemap.xml` | قائمة بكل الصفحات |
| 5 | robots.txt | افتح `https://taxyield.io/robots.txt` | يسمح بكل الصفحات |
| 6 | صفحة 404 | افتح `https://taxyield.io/nonexistent` | صفحة مخصصة مع روابط |
| 7 | صفحة الآلة الحاسبة | افتح `https://taxyield.io/paycheck-calculator` | الآلة تعمل |
| 8 | المدونة | افتح `https://taxyield.io/blog` | قائمة المقالات |
| 9 | المقارنة | افتح `https://taxyield.io/compare` | جدول المقارنة |
| 10 | سرعة التحميل | استخدم [PageSpeed Insights](https://pagespeed.web.dev/) | أخضر (>90) |

---

# ⚡ النشر على Vercel (بديل أسهل)

إذا وجدت Cloudflare معقداً، Vercel أبسط بكثير:

### الخطوة 1: ارفع إلى GitHub
(نفس المرحلة 3 أعلاه)

### الخطوة 2: استورد في Vercel
1. اذهب إلى **[vercel.com/new](https://vercel.com/new)**
2. سجّل باستخدام GitHub
3. اختر مستودع **taxyield**
4. Vercel يكتشف Next.js تلقائياً ✅

### الخطوة 3: أضف متغيرات البيئة
| المتغير | القيمة |
|---------|--------|
| `TURSO_DATABASE_URL` | `libsql://taxyield-...turso.io` |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOiJFZERTQSI...` |
| `DATABASE_URL` | `file:./dev.db` |
| `NEXTAUTH_SECRET` | سلسلة عشوائية |
| `NEXTAUTH_URL` | `https://taxyield.io` |
| `NEXT_PUBLIC_SITE_URL` | `https://taxyield.io` |

### الخطوة 4: Deploy
اضغط **Deploy** — انتهى! 🎉

### الخطوة 5: ربط الدومين في Vercel
1. اذهب إلى **Project Settings** → **Domains**
2. اكتب `taxyield.io`
3. أضف سجل CNAME عند مزوّد الدومين:
   - `CNAME @ → cname.vercel-dns.com`
4. أضف `www.taxyield.io` أيضاً
5. Vercel يفعّل SSL تلقائياً ✅

---

# ملخص سريع

| المنصة | الصعوبة | السعر | ملاحظات |
|--------|---------|-------|---------|
| **Vercel** | ⭐ سهل | مجاني | أسهل خيار — كل شيء تلقائي |
| **Cloudflare Pages** | ⭐⭐ متوسط | مجاني | أسرع CDN + حماية DDoS |
| **WordPress** | ❌ لا يعمل | — | مبني على PHP، لا يمكنه تشغيل Next.js |

| شراء الدومين من | السعر | سهولة الربط مع CF |
|-----------------|-------|-------------------|
| **Cloudflare** | ~$8-10/سنة | ⭐⭐⭐ تلقائي |
| **Namecheap** | ~$9-12/سنة | ⭐⭐ تحتاج تغيير NS |
| **Google Domains** | ~$12/سنة | ⭐ تحتاج تغيير NS |
