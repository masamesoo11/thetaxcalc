import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { getAuthorForCalculator } from '@/lib/authors';
import { ShareButtons } from '@/components/finance/share-buttons';
import { LinkToUs } from '@/components/finance/link-to-us';
import { FreefileIrsClient } from './freefile-irs-client';

// ─── Static generation ──────────────────────────────────────────────────────
export const dynamic = 'force-static';
export const revalidate = 86400;

// ─── Config ─────────────────────────────────────────────────────────────────
const CONFIG = {
  slug: 'freefile-irs',
  title: 'IRS Free File 2026 — Free Federal Tax Filing Guide',
  description: 'File your federal taxes for free with IRS Free File. Guided tax software if your AGI is $84,000 or less, plus Free File Fillable Forms for everyone. Step-by-step guide, eligibility checker, and key dates for 2026.',
  h1: 'IRS Free File — Free Federal Tax Filing 2026',
  metaTitle: 'IRS Free File 2026 — Free Federal Tax Filing | Eligibility & Guide',
  metaDesc: 'File federal taxes free with IRS Free File. AGI under $84K gets guided software; Fillable Forms for everyone. Free extension filing. 2026 guide with eligibility checker.',
  keywords: [
    'freefile irs', 'irs free file', 'irs free file program', 'free federal tax filing',
    'free file fillable forms', 'irs free tax filing', 'free tax return software',
    'free tax return filing', 'irs gov free file', 'freefile', 'free filing taxes',
    'irs free file extension', 'free tax extension', 'free federal income tax filing',
    'irs free efile', 'free tax returns for low income', 'free tax returns for seniors',
    'file tax extension free', 'irs free tax return', 'amended tax return online for free',
    'free 1099 form', 'file taxes online irs', 'free tax return preparation',
    'free online federal tax filing', 'free state and federal tax filing',
    '1040 free file', 'irs free file fillable forms', 'irs free tax preparation',
    'federal free file', 'free tax forms', 'irs free file online',
  ] as string[],
  breadcrumbLabel: 'IRS Free File',
  ogTitle: 'IRS Free File 2026 — Free Federal Tax Filing Guide',
  ogDescription: 'File your federal taxes for free. IRS Free File guided software (AGI ≤ $84K) + Fillable Forms for everyone. Eligibility checker & step-by-step guide.',
  canonicalPath: '/freefile-irs',
  snippetAnswer: 'IRS Free File lets you file your federal tax return for free. If your AGI is $84,000 or less, you can use brand-name tax software through the IRS Free File program at no cost. If your income is higher, Free File Fillable Forms — the electronic equivalent of IRS paper forms — are available to everyone regardless of income. You can also file a free tax extension (Form 4868) through IRS Free File.',
} as const;

// ─── Content ────────────────────────────────────────────────────────────────
const FREEFILE_CONTENT = {
  howItWorks: [
    'IRS Free File is a partnership between the IRS and private tax software companies. If your adjusted gross income (AGI) is $84,000 or less for the 2025 tax year (filed in 2026), you qualify for <strong>Guided Tax Preparation</strong> — that\'s brand-name software like TaxSlayer, OLT, or FreeTaxUSA walking you through your return step by step, asking you questions and doing the math for you. No charge for the federal return. Some partners also include free state filing, though that varies. The whole thing runs through <a href="https://apps.irs.gov/app/freeFile" target="_blank" rel="noopener noreferrer nofollow">irs.gov/freefile</a> — you pick a partner, create an account on their site, and file. The IRS doesn\'t see your data until you hit submit.',
    'If your AGI is over $84,000, or you\'re comfortable doing your own taxes without hand-holding, <strong>Free File Fillable Forms</strong> are the other option. These are electronic versions of IRS paper forms — Form 1040, Schedule A, Schedule C, Schedule SE, and dozens more. No income limit, no age restriction. You type in the numbers, the forms do basic math, and you e-file directly. It\'s free. The tradeoff: you\'re on your own. No interview process, no "did you forget about this deduction?" prompts. If you know what forms you need and how to fill them out, it\'s fantastic. If you\'re new to taxes, stick with Guided Preparation.',
    'A lot of people don\'t realize you can also <strong>file a free tax extension</strong> through IRS Free File. Form 4868 gives you until October 15 to file your return — but you still have to pay what you owe by April 15. The extension is just for the paperwork, not the payment. Free File partners let you e-file Form 4868 for free. If you\'re owed a refund, there\'s no penalty for filing late, but getting that money sooner is always better. For detailed IRS rules, check the <a href="https://www.irs.gov/e-file-providers/irs-free-file-program-for-online-tax-preparation" target="_blank" rel="noopener noreferrer nofollow">official IRS Free File page</a>.\n\nKey things to know:\n- IRS Free File opens in late January each year\n- Your AGI threshold is $84,000 for Guided Preparation (2026 filing season)\n- Free File Fillable Forms have no income limit\n- Active-duty military with AGI ≤ $84,000 get free state filing too\n- Seniors (57+) and low-income taxpayers may have additional free options through VITA/TCE\n- You can file Form 4868 (extension) for free through IRS Free File',
  ],
  keyRates: [
    { label: 'Guided Prep AGI Limit', value: '$84,000 (2025 tax year)' },
    { label: 'Fillable Forms Income Limit', value: 'No limit' },
    { label: 'VITA/TCE Income Limit', value: '$64,000 (VITA), 60+ (TCE)' },
    { label: 'Free File Partners (2026)', value: '8+ software providers' },
    { label: 'Filing Deadline', value: 'April 15, 2026' },
    { label: 'Extension Deadline', value: 'October 15, 2026' },
    { label: 'Extension Form', value: 'Form 4868 (free via Free File)' },
    { label: 'Military AGI Threshold', value: '$84,000 (free state filing)' },
  ],
  faqs: [
    {
      question: 'What is IRS Free File and how does it work?',
      answer: 'IRS Free File is a partnership between the IRS and private tax software companies that lets you file your federal tax return for free. If your AGI is $84,000 or less, you can use guided tax software (think TurboTax-style interview process) at no cost. If your income is higher, Free File Fillable Forms — electronic versions of IRS paper forms — are available to everyone. You access both through irs.gov/freefile.',
    },
    {
      question: 'Who qualifies for IRS Free File guided tax preparation?',
      answer: 'Anyone with a 2025 adjusted gross income (AGI) of $84,000 or less qualifies for IRS Free File Guided Tax Preparation. That covers roughly 70% of all taxpayers. Active-duty military personnel with AGI ≤ $84,000 also get free state filing. Taxpayers 57 and older may have access to additional partner options. There\'s no age minimum — you just need to meet the income threshold.',
    },
    {
      question: 'What are Free File Fillable Forms?',
      answer: 'Free File Fillable Forms are electronic versions of IRS paper forms that anyone can use to file their federal taxes for free, regardless of income. They\'re available at freefilefillableforms.com and include Form 1040, Schedules A through SE, and most other common IRS forms. The forms do basic math calculations, but there\'s no interview process or guidance — you need to know which forms to fill out and how. There\'s no income limit, making them the go-to option for taxpayers who earn more than $84,000.',
    },
    {
      question: 'Can I file a free tax extension through IRS Free File?',
      answer: 'Yes. IRS Free File partners allow you to e-file Form 4868 (Application for Automatic Extension of Time to File) for free. This gives you until October 15 to file your return. Important: the extension only gives you more time to file the paperwork — you still have to pay any tax you owe by April 15. If you expect a refund, there\'s no penalty for filing late, but you should still file as soon as possible to get your money.',
    },
    {
      question: 'Is IRS Free File really free? What\'s the catch?',
      answer: 'It\'s genuinely free for federal filing if you access it through irs.gov/freefile. The catch? If you go directly to a tax software company\'s website instead of through the IRS portal, you may end up on their paid version. Always start at irs.gov/freefile to get the free version. Some Free File partners charge for state returns (though some include it free). Free File Fillable Forms don\'t include state filing at all — you\'ll need to file your state return separately.',
    },
    {
      question: 'Can I use IRS Free File if I\'m self-employed?',
      answer: 'Yes, but it depends on which option you choose. Some IRS Free File Guided Preparation partners support self-employment income (Schedule C, Schedule SE, 1099-NEC) — check each partner\'s offerings before you start. Free File Fillable Forms definitely support self-employment forms, but you need to know which schedules to fill out. If your self-employment income is complex (multiple 1099s, inventory, home office, vehicle expenses), guided preparation may be easier.',
    },
    {
      question: 'How do I file an amended tax return for free?',
      answer: 'To file an amended return (Form 1040-X) for free, you can use Free File Fillable Forms, which include Form 1040-X. Not all Guided Preparation partners support amended returns, so check before starting. You can also file Form 1040-X by mail — download it from irs.gov. There\'s no fee for filing an amended return either way. Note: you can\'t e-file an amended return for a year before 2020 — those must be mailed.',
    },
    {
      question: 'What free tax help is available for seniors and low-income taxpayers?',
      answer: 'Two excellent programs: VITA (Volunteer Income Tax Assistance) offers free tax preparation for people earning $64,000 or less, persons with disabilities, and limited English speakers. TCE (Tax Counseling for the Elderly) specializes in tax questions for people 60 and older. Both use IRS-certified volunteers and are available at community centers, libraries, and churches nationwide. Find locations at irs.gov/vita. Some AARP Tax-Aide sites also provide free preparation regardless of income or age.',
    },
    {
      question: 'Can I file state taxes for free through IRS Free File?',
      answer: 'It depends on your Free File partner. Some Guided Preparation partners include free state filing, while others charge a fee (typically $15–$40). Active-duty military with AGI ≤ $84,000 get free state filing from all partners. Free File Fillable Forms do not include state filing — you\'ll need to file separately through your state\'s tax website or a state-specific free file program. Many states offer their own free filing options.',
    },
    {
      question: 'What\'s the difference between IRS Free File and paid tax software?',
      answer: 'The core difference is cost and support. IRS Free File Guided Preparation gives you the same brand-name software (TaxSlayer, OLT, etc.) for free — but only if you access it through irs.gov/freefile and meet the AGI threshold. Paid versions may include live chat support, audit protection, or more complex form coverage (like rental properties or K-1s). If your taxes are relatively straightforward — W-2 income, standard deduction, maybe some 1099s — Free File covers everything you need.',
    },
    {
      question: 'When does IRS Free File open for 2026?',
      answer: 'IRS Free File typically opens in mid-to-late January. For the 2026 filing season (tax year 2025), the portal is expected to open around January 27, 2026. You can prepare your return early through a Free File partner, but the IRS won\'t start processing returns until late January. If you file early, your return is held and processed when the IRS systems open — you don\'t lose your place in line.',
    },
    {
      question: 'How do I get my 1099 form for free?',
      answer: 'Your 1099 forms are provided by the payer (employer, bank, investment platform) — you don\'t pay for them. If you\'re missing a 1099, request a copy from the issuer or find it in your online account. The IRS also has a tool to view your wage and income transcripts (which include 1099 data) at irs.gov/transcript. Free File Fillable Forms support 1099-NEC, 1099-MISC, 1099-INT, 1099-DIV, and other common 1099 variants.',
    },
  ],
  relatedCalculators: [
    { slug: 'paycheck-calculator', label: 'Paycheck Calculator' },
    { slug: 'tax-refund-calculator', label: 'Tax Refund Calculator' },
    { slug: 'self-employment-tax-calculator', label: 'Self-Employment Calculator' },
    { slug: 'irs-withholding-calculator', label: 'IRS Withholding Calculator' },
    { slug: 'capital-gains-calculator', label: 'Capital Gains Calculator' },
    { slug: 'salary', label: 'Salary After Tax' },
  ],
} as const;

// ─── JSON-LD ────────────────────────────────────────────────────────────────
const FREEFILE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@id': `${SITE_URL}/freefile-irs#breadcrumb`, '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'IRS Free File' },
    ]},
    { '@id': `${SITE_URL}/freefile-irs#webpage`, '@type': 'WebPage', name: 'IRS Free File 2026 — Free Federal Tax Filing Guide', description: 'File your federal taxes for free with IRS Free File. Guided tax software if your AGI is $84,000 or less, plus Free File Fillable Forms for everyone.', url: `${SITE_URL}/freefile-irs`, inLanguage: 'en-US', dateModified: '2026-01-15', author: { '@id': `${SITE_URL}/freefile-irs#author` }, reviewedBy: { '@id': `${SITE_URL}/freefile-irs#author` }, publisher: { '@id': `${SITE_URL}/#organization` }, breadcrumb: { '@id': `${SITE_URL}/freefile-irs#breadcrumb` } },
    { '@id': `${SITE_URL}/freefile-irs#webapp`, '@type': 'SoftwareApplication', name: 'IRS Free File Eligibility Checker', url: `${SITE_URL}/freefile-irs`, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' }, author: { '@id': `${SITE_URL}/freefile-irs#author` }, publisher: { '@id': `${SITE_URL}/#organization` } },
    { '@id': `${SITE_URL}/freefile-irs#howto`, '@type': 'HowTo', name: 'How to File Your Taxes for Free with IRS Free File', step: [
      { '@type': 'HowToStep', position: 1, name: 'Go to IRS Free File', text: 'Visit irs.gov/freefile to access the IRS Free File portal. Do not go directly to a tax software site — start from the IRS to get the free version.' },
      { '@type': 'HowToStep', position: 2, name: 'Choose Your Option', text: 'If your AGI is $84,000 or less, choose Guided Tax Preparation. If higher, or you prefer doing your own taxes, choose Free File Fillable Forms.' },
      { '@type': 'HowToStep', position: 3, name: 'Create an Account', text: 'Sign up with your chosen Free File partner. You\'ll need your Social Security number, last year\'s AGI for verification, and your W-2s/1099s.' },
      { '@type': 'HowToStep', position: 4, name: 'Complete Your Return', text: 'Follow the guided interview (Guided Prep) or fill in the forms directly (Fillable Forms). Double-check all entries before submitting.' },
      { '@type': 'HowToStep', position: 5, name: 'E-File Your Return', text: 'Submit your federal return electronically. You\'ll receive a confirmation when the IRS accepts it. File state taxes separately if needed.' },
    ] },
    {
      '@id': `${SITE_URL}/freefile-irs#faq`,
      '@type': 'FAQPage',
      mainEntity: FREEFILE_CONTENT.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

// ─── Next Steps ─────────────────────────────────────────────────────────────
const NEXT_STEPS = [
  { href: '/paycheck-calculator', icon: '💵', title: 'Paycheck Calculator', description: 'See your take-home pay after all taxes' },
  { href: '/tax-refund-calculator', icon: '💰', title: 'Tax Refund Calculator', description: 'Estimate your 2025 tax refund' },
  { href: '/irs-withholding-calculator', icon: '📋', title: 'IRS Withholding Calculator', description: 'Optimize your W-4 for 2026' },
  { href: '/self-employment-tax-calculator', icon: '🛡️', title: 'Self-Employment Calculator', description: '15.3% SE tax + quarterly estimates' },
];

// ─── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const author = getAuthorForCalculator('home');
  return {
    title: { absolute: CONFIG.metaTitle },
    description: CONFIG.metaDesc,
    keywords: CONFIG.keywords,
    authors: [{ name: author.name, url: `${SITE_URL}/about#${author.id}` }],
    alternates: {
      canonical: `${SITE_URL}${CONFIG.canonicalPath}`,
    },
    openGraph: {
      title: CONFIG.ogTitle,
      description: CONFIG.ogDescription,
      url: `${SITE_URL}${CONFIG.canonicalPath}`,
      siteName: 'TheTaxCalc',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: CONFIG.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: CONFIG.ogTitle,
      description: CONFIG.ogDescription,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default async function FreefileIrsPage() {
  const author = getAuthorForCalculator('home');

  const jsonLdWithAuthor = {
    ...FREEFILE_JSONLD,
    '@graph': [
      ...FREEFILE_JSONLD['@graph'],
      {
        '@id': `${SITE_URL}/freefile-irs#author`,
        '@type': 'Person',
        name: author.name,
        jobTitle: `${author.title}, ${author.credentials}`,
        url: `${SITE_URL}/about#${author.id}`,
        description: author.bio,
        knowsAbout: author.knowsAbout,
        sameAs: author.sameAs,
        worksFor: { '@type': 'Organization', name: 'TheTaxCalc', url: SITE_URL },
        ...(author.image ? { image: author.image } : {}),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWithAuthor) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="text-muted-foreground" aria-hidden="true">/</span>
        <span className="text-foreground font-medium">{CONFIG.breadcrumbLabel}</span>
      </nav>

      {/* Share Buttons */}
      <div className="mb-4 flex justify-center">
        <ShareButtons
          url={`${SITE_URL}${CONFIG.canonicalPath}`}
          title={CONFIG.title}
          description={CONFIG.metaDesc}
        />
      </div>

      {/* H1 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {CONFIG.h1}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {CONFIG.description}
        </p>
        {/* Featured Snippet — Direct answer for position zero */}
        <p className="mt-3 text-sm text-foreground max-w-2xl mx-auto leading-relaxed">
          {CONFIG.snippetAnswer}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last reviewed: January 2026 · By {author.name}, {author.credentials} · Information verified against IRS.gov &amp; Free File Alliance
        </p>
      </div>

      {/* Quick Summary Box */}
      <div className="mb-8 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-foreground mb-4">
          IRS Free File Quick Summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border/30 bg-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Guided Preparation</p>
            <p className="text-2xl font-bold text-foreground">AGI ≤ $84K</p>
            <p className="text-sm text-muted-foreground mt-1">Brand-name tax software. Interview-style Q&amp;A. Free federal e-file.</p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">Fillable Forms</p>
            <p className="text-2xl font-bold text-foreground">No Income Limit</p>
            <p className="text-sm text-muted-foreground mt-1">Electronic IRS forms. Do the math yourself. Free federal e-file.</p>
          </div>
          <div className="rounded-lg border border-border/30 bg-card/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">Free Extension</p>
            <p className="text-2xl font-bold text-foreground">Form 4868</p>
            <p className="text-sm text-muted-foreground mt-1">File for an Oct 15 extension for free through IRS Free File.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://apps.irs.gov/app/freeFile"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-medium text-white hover:from-emerald-500 hover:to-emerald-400 transition-all"
          >
            Go to IRS Free File →
          </a>
          <a
            href="https://www.freefilefillableforms.com/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/5 px-4 py-2 text-sm font-medium text-sky-400 hover:bg-sky-500/10 transition-all"
          >
            Open Fillable Forms →
          </a>
        </div>
      </div>

      {/* Client-Side Eligibility Checker + Comparison + Dates */}
      <FreefileIrsClient />

      {/* Next Steps */}
      <section className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          Related Tax Calculators &amp; Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NEXT_STEPS.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="flex items-start gap-2 rounded-lg p-2 hover:bg-emerald-500/10 transition-colors"
            >
              <span>{step.icon}</span>
              <div>
                <span className="text-sm font-medium text-foreground">{step.title}</span>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Server-Rendered Content for SEO */}
      <div className="mt-12 space-y-10">
        {/* How This Works */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How IRS Free File Works — Complete Guide
          </h2>
          <div className="space-y-4">
            {FREEFILE_CONTENT.howItWorks.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br/>') }} />
            ))}
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            How to File Your Taxes for Free with IRS Free File — Step by Step
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Gather Your Documents', desc: 'Collect your W-2(s), 1099(s), last year\'s tax return (for AGI verification), Social Security numbers for all household members, and bank account info for direct deposit.' },
              { step: 2, title: 'Go to irs.gov/freefile', desc: 'Always start from the IRS website — going directly to a tax software site may lead you to their paid version. Click "Choose a Free File Company" to see available partners.' },
              { step: 3, title: 'Pick a Free File Partner', desc: 'Browse the list of IRS-approved partners. Each has different features — some support self-employment income, some include free state filing, some are better for itemized deductions. Use the IRS lookup tool to find the best match.' },
              { step: 4, title: 'Create an Account & Verify', desc: 'Sign up on the partner\'s site. You\'ll verify your identity using last year\'s AGI or a self-select PIN. If it\'s your first time filing, you\'ll need to mail in a signature form (Form 8453) in some cases.' },
              { step: 5, title: 'Complete Your Return', desc: 'Follow the guided interview for Guided Preparation, or enter data directly into forms for Fillable Forms. Double-check everything — Social Security numbers, bank details, and math.' },
              { step: 6, title: 'E-File & Confirm', desc: 'Submit electronically. You\'ll get an acknowledgment within 24–48 hours confirming the IRS accepted your return. If rejected, the error message tells you what to fix — resubmit for free.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free File Fillable Forms Deep Dive */}
        <section className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Free File Fillable Forms — No Income Limit
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Free File Fillable Forms are the electronic equivalent of IRS paper forms. There is <strong className="text-foreground">no income limit</strong> — anyone can use them regardless of how much they earn. The forms include basic math calculations (they add up lines and carry numbers forward), but they don&apos;t guide you through the process like paid software would.
            </p>
            <p>
              <strong className="text-foreground">Available forms include:</strong> Form 1040, Schedule A (Itemized Deductions), Schedule B (Interest and Dividends), Schedule C (Business Income), Schedule D (Capital Gains), Schedule E (Rental Income), Schedule SE (Self-Employment Tax), Form 8812 (Child Tax Credit), Form 2441 (Child and Dependent Care), and many more.
            </p>
            <p>
              <strong className="text-foreground">What&apos;s NOT included:</strong> State tax returns (file separately through your state), some less common forms, and any hand-holding. If you need to file Form 2555 (Foreign Earned Income) or Form 1116 (Foreign Tax Credit), check availability first — not all international forms are supported.
            </p>
            <p>
              <strong className="text-foreground">Best for:</strong> Taxpayers who know which forms they need, have straightforward returns above the $84,000 AGI threshold, or previously filed with paper forms and want the convenience of e-filing. If you&apos;re comfortable reading IRS instructions and filling in the numbers yourself, this is a solid free option.
            </p>
          </div>
        </section>

        {/* Free Tax Extension Section */}
        <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Free Tax Extension — File Form 4868 for Free
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Can&apos;t file by April 15? You can <strong className="text-foreground">file a free tax extension</strong> through IRS Free File. Form 4868 gives you an automatic 6-month extension until October 15 — no questions asked. Here&apos;s the critical distinction:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 my-4">
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-emerald-400 mb-1">Extension = More Time to File</p>
                <p className="text-xs text-muted-foreground">You get until October 15 to submit your completed return. No penalty for late filing.</p>
              </div>
              <div className="rounded-lg border border-border/30 bg-card/60 p-4">
                <p className="text-sm font-semibold text-red-400 mb-1">NOT More Time to Pay</p>
                <p className="text-xs text-muted-foreground">You still owe taxes by April 15. Late payment = 0.5% per month penalty + interest.</p>
              </div>
            </div>
            <p>
              <strong className="text-foreground">How to file a free extension:</strong> Go to <a href="https://apps.irs.gov/app/freeFile" target="_blank" rel="noopener noreferrer nofollow">irs.gov/freefile</a>, choose any partner, and look for the &quot;File an Extension&quot; option. Most partners support free extension filing. You can also use Free File Fillable Forms to complete and e-file Form 4868 directly. If you expect a refund, there&apos;s no penalty for filing late — but don&apos;t wait, because that&apos;s your money sitting with the IRS.
            </p>
          </div>
        </section>

        {/* Free Tax Filing for Seniors & Low Income */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Free Tax Filing for Seniors &amp; Low-Income Taxpayers
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Beyond IRS Free File, there are dedicated programs for <strong className="text-foreground">seniors</strong> and <strong className="text-foreground">low-income taxpayers</strong>:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 my-4">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">VITA — Volunteer Income Tax Assistance</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>&#8226; Free for taxpayers earning ≤ $64,000</li>
                  <li>&#8226; IRS-certified volunteers prepare your return</li>
                  <li>&#8226; Available at libraries, community centers, malls</li>
                  <li>&#8226; Includes persons with disabilities &amp; limited English speakers</li>
                  <li>&#8226; Both federal AND state returns typically included</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">TCE — Tax Counseling for the Elderly</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>&#8226; Specialized for taxpayers age 60+</li>
                  <li>&#8226; Focus on pensions, retirement, Social Security issues</li>
                  <li>&#8226; AARP Tax-Aide is the largest TCE program</li>
                  <li>&#8226; No income limit for most TCE locations</li>
                  <li>&#8226; Both federal AND state returns typically included</li>
                </ul>
              </div>
            </div>
            <p>
              To find a VITA or TCE site near you, visit <a href="https://www.irs.gov/individuals/find-a-location-for-free-tax-prep" target="_blank" rel="noopener noreferrer nofollow">irs.gov/individuals/find-a-location-for-free-tax-prep</a> or call 1-800-906-9887. Many sites operate on a first-come, first-served basis, so arrive early during peak season (February–March).
            </p>
          </div>
        </section>

        {/* Amended Returns */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How to File an Amended Tax Return for Free
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Made a mistake on your return? You can <strong className="text-foreground">file an amended tax return online for free</strong> using Form 1040-X. Here&apos;s how:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://www.freefilefillableforms.com/" target="_blank" rel="noopener noreferrer nofollow">Free File Fillable Forms</a> — they support Form 1040-X</li>
              <li>Complete Form 1040-X with the corrected information</li>
              <li>Include any changed schedules or forms</li>
              <li>E-file the amended return (available for 2020 tax year and later)</li>
              <li>For years before 2020, download Form 1040-X from irs.gov and mail it</li>
            </ol>
            <p>
              <strong className="text-foreground">Important:</strong> Amended returns can take up to 16 weeks to process. If you&apos;re owed an additional refund, wait until you receive your original refund before filing Form 1040-X. Track your amended return status using the <a href="https://www.irs.gov/refunds" target="_blank" rel="noopener noreferrer nofollow">IRS Where&apos;s My Amended Return?</a> tool.
            </p>
          </div>
        </section>

        {/* Key Rates & Data */}
        {FREEFILE_CONTENT.keyRates.length > 0 && (
          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              IRS Free File — Key Data for 2026 Filing Season
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FREEFILE_CONTENT.keyRates.map((rate) => (
                <div
                  key={rate.label}
                  className="rounded-lg border border-border/30 bg-card/60 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {rate.label}
                  </p>
                  <p className="text-base font-bold text-foreground">
                    {rate.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Free File Partners Section */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            IRS Free File Partners for 2026
          </h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              The IRS partners with multiple tax software companies to offer free federal tax filing. Each partner has different features and eligibility criteria. Here are the typical offerings (check <a href="https://apps.irs.gov/app/freeFile" target="_blank" rel="noopener noreferrer nofollow">irs.gov/freefile</a> for the current list):
            </p>
            <div className="grid gap-3 sm:grid-cols-2 mt-4">
              {[
                { name: 'TaxSlayer', features: 'Free federal + some free state, supports 1099/SE income, military-friendly', agi: '≤ $84,000' },
                { name: 'OLT (OnLine Taxes)', features: 'Free federal + free state, supports most schedules, all ages', agi: '≤ $84,000' },
                { name: 'FreeTaxUSA', features: 'Free federal, $14.99 state, supports self-employment & itemized deductions', agi: '≤ $84K (Free File)' },
                { name: '1040.com', features: 'Free federal, supports EITC and child tax credits, guided Q&A', agi: '≤ $84,000' },
              ].map((partner) => (
                <div key={partner.name} className="rounded-lg border border-border/30 bg-background/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">{partner.name}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">AGI {partner.agi}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{partner.features}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Partner availability and features change annually. Always verify current offerings at irs.gov/freefile before starting your return.
            </p>
          </div>
        </section>

        {/* FAQ */}
        {FREEFILE_CONTENT.faqs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              IRS Free File FAQ
            </h2>
            <div className="space-y-3">
              {FREEFILE_CONTENT.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border/30 bg-card/50 overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors">
                    <h3 className="text-sm sm:text-base">{faq.question}</h3>
                    <svg
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Calculators */}
        {FREEFILE_CONTENT.relatedCalculators.length > 0 && (
          <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
            <p className="text-lg font-semibold text-foreground mb-4">
              Related Calculators
            </p>
            <div className="flex flex-wrap gap-3">
              {FREEFILE_CONTENT.relatedCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {calc.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Link to Us */}
        <div className="mt-8">
          <LinkToUs
            url={`${SITE_URL}${CONFIG.canonicalPath}`}
            title={CONFIG.title}
            slug={CONFIG.slug}
          />
        </div>

        {/* Next Steps */}
        <section className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Next Steps
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/paycheck-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">💰</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Paycheck Calculator</span>
                <p className="text-xs text-muted-foreground mt-0.5">See your take-home pay after all taxes</p>
              </div>
            </Link>
            <Link href="/irs-withholding-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📋</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">IRS Withholding</span>
                <p className="text-xs text-muted-foreground mt-0.5">Optimize your W-4 for 2026</p>
              </div>
            </Link>
            <Link href="/self-employment-tax-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">🛡️</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Self-Employment Tax</span>
                <p className="text-xs text-muted-foreground mt-0.5">15.3% SE tax + quarterly estimates</p>
              </div>
            </Link>
            <Link href="/tax-refund-calculator" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">💵</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Tax Refund Calculator</span>
                <p className="text-xs text-muted-foreground mt-0.5">Estimate your 2025 refund</p>
              </div>
            </Link>
            <Link href="/salary" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📈</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Salary After Tax</span>
                <p className="text-xs text-muted-foreground mt-0.5">Take-home pay for all 50 states</p>
              </div>
            </Link>
            <Link href="/federal-tax-brackets" className="group flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
              <span className="text-lg">📋</span>
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">Tax Brackets 2026</span>
                <p className="text-xs text-muted-foreground mt-0.5">Full federal bracket breakdown</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Explore More Tools */}
        <section className="rounded-xl border border-border/30 bg-card/50 p-6 sm:p-8">
          <p className="text-lg font-semibold text-foreground mb-4">
            Explore More Tools
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link href="/compare" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📊 Compare States</span>
              <span className="text-xs text-muted-foreground">Side-by-side tax comparison</span>
            </Link>
            <Link href="/salary" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">💰 Salary After Tax</span>
              <span className="text-xs text-muted-foreground">Take-home for $30K–$500K</span>
            </Link>
            <Link href="/federal-tax-brackets" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📋 Tax Brackets 2026</span>
              <span className="text-xs text-muted-foreground">Federal brackets &amp; rates</span>
            </Link>
            <Link href="/glossary" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📖 Tax Glossary</span>
              <span className="text-xs text-muted-foreground">Key terms explained</span>
            </Link>
            <Link href="/blog" className="flex items-center gap-2 rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors">
              <span className="text-sm font-medium">📝 Tax Guides &amp; Blog</span>
              <span className="text-xs text-muted-foreground">Expert tax tips &amp; guides</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
