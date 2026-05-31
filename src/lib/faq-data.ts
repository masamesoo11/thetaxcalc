// ─── FAQ Data for Server & Client Components ──────────────────────────────────
// This file has NO 'use client' so it can be imported by both Server and Client components.

export interface FAQItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate my take-home pay from my salary?',
    answer:
      "Start with your gross salary and chip away at it. Federal income tax uses progressive brackets, so your first dollars are taxed less than your last. Then there's FICA (7.65% for Social Security and Medicare) and whatever your state takes — if you're lucky enough to live in a no-income-tax state, that part's zero. Pre-tax stuff like 401(k) contributions and HSA deposits lower your taxable income for federal and state purposes, but they don't touch FICA. Honestly, the easiest way is just to use a calculator — doing it by hand is a pain.",
  },
  {
    question: 'What is FICA and how much does it take from my paycheck?',
    answer:
      "FICA is the payroll tax that funds Social Security and Medicare. You pay 6.2% for Social Security (capped at $176,100 in earnings for 2026) and 1.45% for Medicare with no cap. So that's 7.65% total coming out of every paycheck. And if you earn over $200,000, there's an extra 0.9% Medicare surcharge on everything above that. Your employer matches what you pay, but that's their problem — you just see the 7.65% on your pay stub.",
  },
  {
    question: 'How much is taken out of a $75,000 salary in taxes?',
    answer:
      "Roughly speaking, a single filer making $75K will lose about $8,700 to federal tax (after the $15,000 standard deduction), another $5,738 to FICA, and then it depends entirely on where you live. In Texas or Florida? Zero state tax, so you're keeping around $60,500. In Illinois? Subtract another $3,575 and you're closer to $57,000. The state you pick makes a real difference.",
  },
  {
    question: 'Does contributing to a 401(k) reduce my taxes?',
    answer:
      "Yep, and it's pretty much the easiest tax win out there. Every dollar you put in a traditional 401(k) drops your taxable income by a dollar for federal and state tax purposes (though not for FICA). Toss in $10,000 on a $75K salary and you're only taxed on $65K — that could save you over $2,200 in federal tax alone if you're in the 22% bracket. The 2026 limit is $23,500 if you want to go hard.",
  },
  {
    question: 'What is the difference between effective tax rate and marginal tax rate?',
    answer:
      "Here's the thing — they sound similar but they're completely different. Your effective rate is your overall average: total tax divided by gross income. Your marginal rate is what hits your last dollar earned, meaning the top bracket you fall into. So someone making $75K has a marginal rate of 22%, but their effective federal rate is more like 11–12% because the first chunk of income gets taxed at way lower rates. People mix these up all the time and it leads to bad decisions.",
  },
];

export const ILLINOIS_FAQS: FAQItem[] = [
  {
    question: 'How much is Illinois state income tax in 2026?',
    answer:
      "It's a flat 4.95%. Doesn't matter if you make $30K or $300K — same rate. That's actually pretty unusual since most states use progressive brackets like the federal government. Whether that's good or bad depends on your income level, but we'll get to that.",
  },
  {
    question: 'What is the Illinois personal exemption for 2026?',
    answer:
      "Illinois gives you a $2,775 personal exemption, which just gets subtracted from your gross income before applying the 4.95% rate. So on a $75K salary, you're taxed on $72,225 — works out to about $3,575 in state tax. It's not a huge break, honestly. Married filers and dependents can claim additional exemptions.",
  },
  {
    question: 'Does Illinois have a standard deduction?',
    answer:
      "Nope. Illinois doesn't do the standard deduction thing. Instead you get that $2,775 personal exemption per person, which is way less generous than the federal $15,000 standard deduction. They're completely separate — the federal deduction only applies to your federal return.",
  },
  {
    question: 'Is Illinois a good state for high-income earners?',
    answer:
      "Honestly, it depends on what you're comparing it to. If you're looking at Texas or Florida with zero income tax, Illinois loses — you'd pay around $9,800 in state tax on a $200K salary that'd be tax-free in those states. But compare it to California (up to 13.3%) or New York (up to 10.9%) and that flat 4.95% starts looking pretty reasonable at higher incomes. It's all relative.",
  },
  {
    question: 'How does the Illinois property tax compare to other states?',
    answer:
      "Brace yourself — Illinois has the second-highest effective property tax rate in the country at around 1.78%, trailing only New Jersey. On a typical $294K home, that's over $5,200 a year. Add that to the 4.95% income tax and close to 9% average sales tax, and yeah, Illinois carries one of the heaviest overall tax burdens in the US. It's rough.",
  },
  {
    question: 'Does Illinois tax Social Security benefits?',
    answer:
      "No, and they don't tax 401(k) withdrawals, IRAs, or pensions either. So Illinois is actually pretty decent for retirees from an income tax perspective. The catch? Those brutal property taxes we just talked about don't go away when you retire.",
  },
];

export const TEXAS_FAQS: FAQItem[] = [
  {
    question: 'Does Texas have a state income tax?',
    answer:
      "Nope, zero. It's written into the Texas Constitution, so changing it would require a constitutional amendment — not happening anytime soon. Texas is one of nine states with no personal income tax on wages.",
  },
  {
    question: 'How does Texas make up for no income tax?',
    answer:
      "Property taxes — and they're hefty. The average effective rate is about 1.71%, which is among the highest in the nation. A typical homeowner is paying around $4,960 a year in property taxes. Then there's the 6.25% state sales tax (8.2% average when you add local taxes), plus revenue from oil and gas production and business franchise taxes. The state gets its money one way or another.",
  },
  {
    question: 'Is Texas really tax-free if property taxes are so high?',
    answer:
      "It really depends on your situation. If you're a high earner who rents or owns a modest home, Texas is fantastic — no income tax and limited property tax exposure. But if you own an expensive house, that 1.71% rate eats into your savings fast. A $500K home means about $8,550 a year just in property taxes. The math works differently for everyone.",
  },
  {
    question: 'What is the true cost of living tax burden in Texas?',
    answer:
      "For a household earning $75K with a $290K home and typical spending, you're looking at roughly $8,650 a year in non-income taxes — about $4,960 in property taxes plus $3,690 in estimated sales taxes. That sounds like a lot, but compare it to Illinois where the same earner would pay $3,575 in income tax AND $5,228 in property taxes. Texas still comes out ahead in most cases.",
  },
  {
    question: 'Does Texas tax retirement income?',
    answer:
      "No. Social Security, 401(k) withdrawals, IRAs, pensions — none of it gets taxed by Texas. With no state income tax at all, it's a solid option for retirees. Just keep those property taxes in mind when you're budgeting.",
  },
];

export const FLORIDA_FAQS: FAQItem[] = [
  {
    question: 'Does Florida have a state income tax?',
    answer:
      "No. Zero, zilch. It's in the Florida Constitution — no personal income tax on wages or salaries. That's a big reason why so many people and businesses relocate there.",
  },
  {
    question: 'How does Florida fund government services without income tax?',
    answer:
      "Sales tax is the big one — 6% at the state level, and with local surtaxes the average combined rate is around 7%. Property taxes are actually pretty reasonable by comparison (0.86% average effective rate). Tourism brings in a ton of revenue through hotel taxes and such, plus there's a 5.5% corporate income tax and documentary stamp taxes on real estate deals. Florida basically leans hard on visitors and consumers.",
  },
  {
    question: 'Is Florida the best state for low tax burden?',
    answer:
      "For a lot of people, yeah. No income tax, low property taxes, moderate sales tax — it's a strong combo, especially for retirees and higher earners. Compare the total bill for a $75K earner with a $395K home: roughly $6,760 in Florida versus $8,650 in Texas (thanks to higher property taxes) and over $9,000 in Illinois. Florida's not the cheapest for everyone everywhere, but it's tough to beat overall.",
  },
  {
    question: 'Does Florida tax Social Security and retirement income?',
    answer:
      "Nope. Florida doesn't touch Social Security, pensions, 401(k) withdrawals, IRA distributions — none of it. And there's no estate or inheritance tax either. Pretty much the full retiree tax package.",
  },
  {
    question: 'What is the Florida Homestead Exemption?',
    answer:
      "It knocks up to $50,000 off your home's assessed value for property tax purposes. The first $25,000 exempts all property taxes, and the second $25,000 exempts non-school taxes. Typically saves you $800–$1,500 a year. The real win though is the Save Our Homes cap — it limits annual assessment increases to 3% on your primary residence. Over time, as home values climb, that cap saves you serious money since your taxable value lags way behind market value.",
  },
];

export const CALIFORNIA_FAQS: FAQItem[] = [
  {
    question: 'How much is California state income tax in 2026?',
    answer:
      "California runs a progressive system with 9 brackets ranging from 1% all the way up to 13.3%. For someone making $100K as a single filer, the effective rate works out to roughly 5.4% — well below the top rate because only income above each bracket threshold gets taxed at the higher rate. Still, that's more than what you'd pay in most states.",
  },
  {
    question: 'What is the California standard deduction for 2026?',
    answer:
      "$6,083 for single filers, $12,166 for married filing jointly, and $12,293 for head of household. So a single person earning $100K would have about $93,917 in taxable income for California purposes. It's notably lower than the federal standard deduction.",
  },
  {
    question: 'Does California have the highest state income tax?',
    answer:
      "Yeah, the top rate of 13.3% is the highest in the country — but here's the thing, that only kicks in above $698K for single filers. Most people aren't anywhere near that. At moderate incomes like $75K–$100K, your effective rate is probably 4–6%, which is actually comparable to Illinois's flat 4.95%. The headline number is scary, but the reality for most earners is less dramatic.",
  },
  {
    question: 'Does California tax Social Security benefits?',
    answer:
      "Social Security itself? No. But pretty much everything else — 401(k) withdrawals, IRA distributions, pensions — yeah, California taxes it all. So retirees don't get much of a break here compared to states like Florida or Texas.",
  },
  {
    question: 'How high are California sales taxes?',
    answer:
      "The base state rate is 7.25%, which is already the highest in the nation. Tack on local taxes and the average combined rate is around 8.82% — some cities push past 10%. The one silver lining: groceries are generally exempt from the state portion, though local taxes can still apply. Small comfort when everything else costs more.",
  },
  {
    question: "What is California's property tax rate?",
    answer:
      "Surprisingly, it's only about 0.71% on average — way lower than Illinois (1.78%) or Texas (1.71%). Proposition 13 caps assessed value increases at 2% per year, which keeps the rate down. But here's the catch: California home prices are so high that even a low rate stings. On a median home value of $785K, you're still paying over $5,500 a year in property taxes.",
  },
];

export const NEWYORK_FAQS: FAQItem[] = [
  {
    question: 'How much is New York state income tax in 2026?',
    answer:
      "New York uses progressive brackets from 4% up to 10.9% across 9 brackets. For a single filer at $100K after the $8,100 standard deduction, the effective rate comes out to roughly 4.9%. That top 10.9% rate? It only applies above $25 million in taxable income, so unless you're in that stratosphere, don't sweat it.",
  },
  {
    question: 'What is the New York standard deduction for 2026?',
    answer:
      "$8,100 for single filers, $16,200 for married filing jointly, and $11,200 for head of household. Better than California's deduction, at least.",
  },
  {
    question: 'Does New York City have its own income tax?',
    answer:
      "Oh yeah. NYC residents get hit with a city tax on top of the state tax — ranges from about 3.1% to 3.9% depending on your income. On a $100K salary, that's roughly $3,400 to the city plus around $4,950 to the state. Living in NYC means you're basically paying the highest combined state-and-local income tax in the country. It hurts.",
  },
  {
    question: 'How high are New York property taxes?',
    answer:
      "Pretty high — about 1.62% effective rate on average, which is among the worst in the country. On a median $425K home, that's close to $6,900 a year. And it varies a lot by where you live: Long Island and Westchester can push past 2.5%, while some upstate areas are a bit more reasonable.",
  },
  {
    question: 'Does New York tax Social Security benefits?',
    answer:
      "No, Social Security is safe. And New York also excludes up to $20,000 of retirement income (pensions, 401(k), IRA) from taxation if you're 59½ or older. That's better than California, which taxes most retirement income aside from Social Security. Still not as retiree-friendly as Florida, though.",
  },
  {
    question: 'Is New York the highest-taxed state?',
    answer:
      "It's definitely up there — a lot of rankings put it at #1 overall. If you're a $100K earner living in NYC, your combined state and city income tax alone can exceed $8,300, plus you're dealing with 8.5%+ sales tax and 1.6%+ property tax rates. But here's the nuance: if you live upstate and skip the NYC tax entirely, the burden drops significantly. New York State by itself is expensive; New York City is a whole different level.",
  },
];

export const CAPITAL_GAINS_FAQS: FAQItem[] = [
  {
    question: "What's the difference between short-term and long-term capital gains?",
    answer:
      "The difference is huge and it all comes down to how long you held the asset. Short-term (one year or less) gets taxed at your regular income rate, which can go up to 37%. Long-term (more than a year) gets the preferential rates: 0%, 15%, or 20% depending on your taxable income. For 2026, the 0% rate covers income up to about $47K single / $94K married, 15% goes up to roughly $519K / $584K, and 20% kicks in above that. Holding for that extra day past a year can literally save you thousands.",
  },
  {
    question: 'How are cryptocurrency gains taxed?',
    answer:
      "The IRS treats crypto as property, so it follows the same rules as stocks. Hold for over a year and you get the lower long-term rates. Sell sooner and it's ordinary income rates. Here's what trips people up: swapping one crypto for another counts as a taxable event, not just cashing out to dollars. Using crypto to buy stuff? Also taxable. Keep good records.",
  },
  {
    question: 'What is the Net Investment Income Tax (NIIT)?',
    answer:
      "It's an extra 3.8% tax that kicks in on your investment income — capital gains, dividends, interest, rental income — when your modified AGI goes over $200K (single) or $250K (married). The tax applies to whichever is less: your net investment income or the amount your MAGI exceeds the threshold. So in practice, the top long-term capital gains rate is really 23.8% when you factor this in. Fun times.",
  },
  {
    question: 'How can I reduce my capital gains tax?',
    answer:
      "A few solid moves here. First, just hold longer — getting past that one-year mark drops your rate significantly. Tax-loss harvesting is another big one: sell your losers to offset your winners, and you can deduct up to $3K in net losses against ordinary income per year. If your income happens to be low in a given year, you might qualify for the 0% long-term rate, so timing matters. Stuffing money into tax-advantaged accounts like a 401(k) or IRA lowers your overall taxable income too. And if you're feeling generous, donating appreciated assets to charity lets you skip the capital gains tax entirely while still deducting the fair market value.",
  },
  {
    question: 'Do I have to pay capital gains tax on my primary home?',
    answer:
      "You might not! If you've owned and lived in the home for at least 2 of the last 5 years, you can exclude up to $250K in gains (single) or $500K (married). Anything above that gets taxed as a long-term capital gain. You can use this exclusion once every 2 years. Investment properties and vacation homes don't qualify, though.",
  },
  {
    question: 'What are the 2026 capital gains tax brackets?',
    answer:
      "Long-term rates for 2026: 0% on taxable income up to $47,025 (single) / $94,050 (married) / $63,000 (HOH). Then 15% up to $518,900 / $583,750 / $551,350. Above those thresholds, it's 20%. These brackets are based on your total taxable income, not just the gains. Short-term gains just use the ordinary brackets: 10%, 12%, 22%, 24%, 32%, 35%, and 37%.",
  },
];

export const SELF_EMPLOYMENT_FAQS: FAQItem[] = [
  {
    question: 'What is the self-employment tax rate for 2026?',
    answer:
      "15.3% on 92.35% of your net business income. That's 12.4% for Social Security (capped at $176,100 in income) and 2.9% for Medicare (no cap). Once you cross $200K in net SE income, tack on another 0.9% Medicare surcharge on everything above that. Basically, you're covering both the employee and employer sides of FICA since you are both.",
  },
  {
    question: 'How do quarterly estimated tax payments work?',
    answer:
      "If you're self-employed, the IRS wants its money throughout the year, not just at tax time. You make four payments — April 15, June 15, September 15, and January 15 — each covering roughly a quarter of what you expect to owe (income tax plus SE tax). To dodge underpayment penalties, you generally need to pay at least 100% of last year's tax bill (110% if your AGI was over $150K) or 90% of this year's. You can pay online through IRS Direct Pay or EFTPS.",
  },
  {
    question: 'Can I deduct half of my self-employment tax?',
    answer:
      "Yes! It's an above-the-line deduction, meaning you get it whether you itemize or not. If your SE tax is, say, $14,130, you deduct $7,065 from your income before calculating income tax. It lowers your AGI, which can help with state taxes too and maybe keep you under certain income thresholds. Just know it doesn't reduce the SE tax itself — that still needs to be paid in full.",
  },
  {
    question: 'How does self-employment tax compare to W-2 FICA withholding?',
    answer:
      "W-2 employees pay 7.65% and their employer matches another 7.65%. When you're self-employed, you're both — so you pay the full 15.3%. The 92.35% adjustment and the half-of-SE-tax deduction help soften the blow somewhat, but on $100K of income, you're still paying roughly $7,000 more in payroll taxes than a W-2 worker making the same amount. It's the cost of being your own boss.",
  },
  {
    question: 'What tax deductions are available for self-employed individuals?',
    answer:
      "There's actually a lot to work with. Half your SE tax is deductible above the line. You can stash up to $70,000 in a Solo 401(k) for 2026 (including the employer portion). Health insurance premiums? Deductible above the line. Home office — $5 per square foot up to 300 sq ft using the simplified method, or actual expenses if you want to go that route. Business expenses like software, travel, meals (50%), supplies, and professional services all count. And don't forget the Qualified Business Income deduction, which can shave up to 20% off your qualified business income. That one's easy to miss.",
  },
  {
    question: 'Should I form an S-Corporation to save on self-employment tax?',
    answer:
      "Maybe. The play is to split your income between a reasonable salary (subject to FICA/SE tax) and distributions (not subject to SE tax). On $150K of net income, you might take a $75K salary and $75K in distributions, saving SE tax on that second half. But — and it's a big but — S-Corps come with extra paperwork, payroll requirements, state fees, and more complex tax returns. The math usually makes sense once you're consistently clearing $60K–$80K in net income. Below that, the hassle probably isn't worth it. Talk to a CPA about your specific situation.",
  },
  {
    question: "What happens if I don't pay quarterly estimated taxes?",
    answer:
      "You'll probably get hit with an underpayment penalty when you file your return — even if you pay everything by April 15. The penalty is basically interest on what you should've paid each quarter, usually running 3–8% annually depending on the IRS rate that quarter. Easiest way to avoid it: hit the safe harbor by paying 100% of last year's tax (110% if your AGI was over $150K) or 90% of this year's through withholding and estimated payments.",
  },
];

export const RETIREMENT_FAQS: FAQItem[] = [
  {
    question: 'How does a 401(k) grow over time?',
    answer:
      "Compound interest does the heavy lifting. Your contributions earn returns, and those returns earn their own returns, and it snowballs from there. Toss in $10K a year at 7% average return and you're looking at roughly $150K after 10 years, $400K after 20, and over a million after 30. The earlier you start, the less you have to contribute overall — time in the market really does matter more than timing.",
  },
  {
    question: 'What is employer matching and how does it work?',
    answer:
      "It's free money, plain and simple. Your employer kicks in extra based on what you contribute. A common setup is 50% match on up to 6% of your salary — so if you earn $100K and put in $6K, they add $3,000. Not contributing enough to get the full match is literally leaving money on the table. Always, always get the full match first before worrying about anything else.",
  },
  {
    question: 'How much should I contribute to my 401(k)?',
    answer:
      "At minimum, contribute enough to grab the full employer match — usually 4–6% of salary. Beyond that, most financial folks suggest aiming for 10–15% of gross income including the match. The 2026 contribution cap is $23,500, plus a $7,500 catch-up if you're 50+ and an extra $11,250 catch-up for ages 60–63. But honestly, anything is better than nothing, so just start somewhere.",
  },
  {
    question: 'What is the difference between traditional and Roth 401(k)?',
    answer:
      "Traditional = pre-tax now, taxed when you withdraw in retirement. Roth = taxed now, tax-free withdrawals later. The basic rule of thumb: if you think you'll be in a lower tax bracket in retirement, go traditional. If you think rates will be higher or you just want the certainty of tax-free income later, Roth makes sense. A lot of people split between both for flexibility.",
  },
  {
    question: 'When can I withdraw from my 401(k) without penalties?',
    answer:
      "Age 59½ is the magic number for penalty-free withdrawals. Pull money out before that and you're generally looking at a 10% early withdrawal penalty plus income tax. There are a few exceptions — certain medical expenses, hardship cases, or if you leave your job at 55 or older. Once you hit 73, Required Minimum Distributions kick in whether you want to take the money out or not.",
  },
];

export const RELOCATION_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate equivalent salary between two states?',
    answer:
      "You've gotta look at the full picture — state income tax, property taxes, sales taxes, and overall cost of living all factor in. The basic idea is to figure out your current take-home pay after everything, then find the gross salary in the new state that gives you the same net. Our relocation calculator does this automatically so you don't have to crunch all the numbers yourself.",
  },
  {
    question: 'Is moving to a no-income-tax state always better?',
    answer:
      "Not always. States without income tax still need revenue, so they get it elsewhere — usually through higher property taxes and sales taxes. Texas is the classic example: 0% income tax but a 1.71% average property tax rate, which is nearly double Florida's 0.86%. On a $400K home, that's an extra $3,400 a year in Texas. The bottom line? Look at your total tax bill, not just income tax.",
  },
  {
    question: 'What is cost of living and why does it matter for relocation?',
    answer:
      "Cost of living is basically how much it costs to maintain your lifestyle in a given place — housing, groceries, healthcare, transportation, all of it. $100K in Texas goes way further than $100K in California because housing costs and taxes are so different. Never compare just the gross salary when you're looking at a relocation offer. The number on paper can be misleading.",
  },
  {
    question: 'How much more salary do I need to move from Texas to California?',
    answer:
      "Usually 15–25% more, depending on your income level. Someone making $100K in Texas takes home around $79K after federal tax and FICA. To get similar take-home pay in California, you'd need roughly $120K–$125K because California's income tax (1%–13.3%) can eat another $5K–$8K compared to Texas's zero. And that's before accounting for California's higher housing costs.",
  },
  {
    question: 'Does relocating affect my federal taxes?',
    answer:
      "Federal income tax and FICA stay the same no matter where you live — they're based on your income, not your zip code. What changes is your state and local tax situation, and those differences can be massive. Some states also offer different deductions and credits. So relocating doesn't touch your federal return, but it can dramatically change what ends up in your bank account.",
  },
];

export const MORTGAGE_FAQS: FAQItem[] = [
  {
    question: 'How is a monthly mortgage payment calculated?',
    answer:
      "It's based on your loan amount, interest rate, and term length. The math formula is kinda ugly, but the concept is simple: the bank calculates a fixed monthly payment that pays off both interest and principal over the full term. Your rate divided by 12 gives the monthly rate, and the total number of payments is years times 12. Just use a mortgage calculator — nobody's doing this by hand.",
  },
  {
    question: 'How much can extra mortgage payments save?',
    answer:
      "It's kind of absurd how much difference a little extra makes. On a $280K loan at 6.5% over 30 years, adding $200/month extra saves you roughly $77K in interest and pays off the loan about 5 years early. Bump it to $500/month and you're saving over $140K and cutting more than a decade off the term. Every extra dollar goes straight to principal, which means less interest accruing going forward.",
  },
  {
    question: 'Should I choose a 15-year or 30-year mortgage?',
    answer:
      "15-year saves you a ton in interest and usually comes with a lower rate (often 0.5–1% less), but the monthly payment is significantly higher. On a $280K loan: 15-year at 5.5% is about $2,287/month with ~$132K total interest, while 30-year at 6.5% is $1,769/month with ~$357K in interest. If you can comfortably swing the higher payment, 15-year is the financial winner. But a lot of people go 30-year and just make extra payments when they can — gives you flexibility if money gets tight.",
  },
  {
    question: 'What percentage of my mortgage payment goes to interest?',
    answer:
      "Early on, most of it. On a 30-year $280K loan at 6.5%, your very first payment is about 86% interest and only 14% principal. It slowly flips — around year 15 you're at roughly 50/50, and by year 25 almost everything goes to principal. That's amortization for you. It's also why making extra payments in the early years has the biggest impact on your total interest costs.",
  },
  {
    question: 'How much house can I afford?',
    answer:
      "The old rule of thumb is the 28/36 rule: no more than 28% of gross monthly income on housing costs (mortgage + taxes + insurance), and no more than 36% on total debt. For a $75K salary, that caps your monthly housing payment around $1,750. With 20% down at 6.5%, you're looking at a home in the $250K–$280K range depending on local property taxes and insurance. But honestly, just because you can qualify for that much doesn't mean you should max it out — leave yourself some breathing room.",
  },
];

export const TAX_REFUND_FAQS: FAQItem[] = [
  {
    question: 'How do I use a tax refund calculator?',
    answer:
      "Enter your total gross income, filing status, taxes already withheld from your paychecks (federal and state), and any deductions or credits you qualify for. The calculator compares what you've already paid through withholding to what you actually owe — if you paid more, that's your refund. If you paid less, that's what you still owe. It's that simple. Our calculator uses 2026 federal tax brackets and supports all 50 states.",
  },
  {
    question: 'How accurate is a tax refund calculator?',
    answer:
      "Pretty accurate for estimation purposes. This calculator uses official 2026 federal tax brackets, standard deductions, FICA rates, and state tax rates. It accounts for the Child Tax Credit ($2,000 per child) and the Earned Income Credit. It won't be exact — things like alternative minimum tax, education credits, or complex self-employment situations can change your actual refund — but for most W-2 employees, the estimate will be within a few hundred dollars of your actual refund.",
  },
  {
    question: 'Is my tax refund calculated from federal or state taxes?',
    answer:
      "Both, actually. You can get separate refunds from the federal government and your state. Your federal refund is the difference between what was withheld for federal taxes and what you actually owe the IRS. Your state refund works the same way — what was withheld minus what you owe the state. This calculator estimates both and shows you the combined total.",
  },
  {
    question: 'What is the average tax refund in 2026?',
    answer:
      "Based on IRS data, the average federal tax refund is typically around $2,800–$3,200. But that number doesn't mean much for your specific situation — your refund depends entirely on how much was withheld versus how much you owe. A big refund isn't necessarily good; it usually means you had too much withheld and gave the government an interest-free loan all year. A small refund or slight balance due often means your withholding is dialed in correctly.",
  },
  {
    question: 'Why is my tax refund different from what I estimated?',
    answer:
      "Several things can cause differences. If you have multiple jobs or a working spouse, the withholding tables might not account for your combined income correctly. Capital gains, freelance income, or investment dividends that didn't have tax withheld can reduce your refund. Credits you didn't account for (like the Child Tax Credit, Earned Income Credit, or education credits) can increase it. And if you itemize instead of taking the standard deduction, that changes everything. This calculator gives you a solid estimate, but your actual tax return may differ.",
  },
  {
    question: 'How long does it take to get a tax refund?',
    answer:
      "If you e-file and choose direct deposit, most refunds arrive within 21 days. Paper returns take 6–8 weeks. The IRS typically starts accepting returns in late January, and filing early usually means faster processing. If you claim the Earned Income Credit or Additional Child Tax Credit, the IRS is required by law to hold your refund until mid-February. You can check your refund status on the IRS website using the 'Where's My Refund?' tool.",
  },
  {
    question: 'Should I itemize deductions or take the standard deduction?',
    answer:
      "About 90% of taxpayers take the standard deduction because it's higher than what they could itemize. For 2026, the standard deduction is $15,000 (single), $30,000 (married), or $22,500 (head of household). Itemizing only makes sense if your mortgage interest, charitable contributions, and state/local taxes (SALT, capped at $10,000) add up to more than the standard deduction. This calculator lets you try both and see which gives you a bigger refund.",
  },
  {
    question: 'What tax credits can increase my refund?',
    answer:
      "The biggest ones: Child Tax Credit ($2,000 per qualifying child, up to $1,700 refundable), Earned Income Credit (up to $7,430 for families with 3+ children), and the Child and Dependent Care Credit. Credits are way better than deductions — they reduce your tax bill dollar for dollar instead of just reducing your taxable income. Refundable credits can even give you money back if your credits exceed your tax liability. Our calculator includes the Child Tax Credit and Earned Income Credit.",
  },
];

export const IRS_WITHHOLDING_FAQS: FAQItem[] = [
  {
    question: 'How do I calculate my federal withholding per paycheck?',
    answer:
      "Your federal withholding is calculated by estimating your annual tax liability and dividing by the number of pay periods. First, subtract pre-tax deductions (401(k), HSA) from your gross pay to get taxable wages. Then subtract the standard deduction ($15,000 single, $30,000 married, $22,500 head of household). Apply the progressive tax brackets (10%–37%) and any credits. Finally, divide the annual tax by your pay periods (52 weekly, 26 bi-weekly, 24 semi-monthly, or 12 monthly).",
  },
  {
    question: 'How much should I withhold from my paycheck for federal taxes?',
    answer:
      "The right amount depends on your income, filing status, dependents, and pre-tax deductions. A common rule of thumb: single filers earning $50K–$100K typically need $200–$400 withheld per bi-weekly paycheck. But the only way to know for sure is to calculate based on your specific situation. This calculator does that for you using IRS Publication 15-T methodology and 2026 tax brackets.",
  },
  {
    question: 'What is the W-4 form and how does it affect my withholding?',
    answer:
      "Form W-4 tells your employer how much federal income tax to withhold from each paycheck. The 2020+ W-4 no longer uses allowances. Instead, you fill out five steps: (1) personal info and filing status, (2) multiple jobs or working spouse, (3) claim dependents ($2,000 credit per child), (4) other income or extra withholding, (5) sign and date. You can submit a new W-4 to your employer at any time to adjust your withholding.",
  },
  {
    question: 'What happens if I have too little federal tax withheld?',
    answer:
      "If your withholding is too low, you'll owe money when you file your tax return. If you owe more than $1,000, you may also face an underpayment penalty. The IRS safe harbor rule requires you to withhold at least 90% of your current-year tax or 100% of your prior-year tax (110% if your AGI exceeded $150,000). This calculator shows you if you're under-withheld and how much extra to add on W-4 Step 4(c).",
  },
  {
    question: 'What happens if I have too much federal tax withheld?',
    answer:
      "You'll get a refund when you file your taxes. While a big refund feels nice, it means you gave the government an interest-free loan all year. That money could have been in your paycheck each month instead — earning interest in a savings account, paying down debt, or contributing to your 401(k). If your projected refund exceeds $3,000, consider reducing your withholding by updating your W-4.",
  },
  {
    question: 'Do 401(k) and HSA contributions reduce my federal withholding?',
    answer:
      "Yes. 401(k) contributions reduce both your federal income tax withholding and your taxable wages. HSA contributions work the same way. For example, if you contribute $200 per paycheck to a 401(k) and you're in the 22% marginal bracket, your federal withholding drops by about $44 per paycheck. That's $1,144 less in federal tax over the year — on top of the $5,200 you're saving for retirement.",
  },
  {
    question: 'How do dependents affect my withholding?',
    answer:
      "Each qualifying dependent gives you a $2,000 tax credit for 2026 (Child Tax Credit / Other Dependent Credit). Credits reduce your tax bill dollar for dollar, unlike deductions which only reduce taxable income. If you have 2 children, that's $4,000 less in federal tax, which reduces your required withholding by about $154 per bi-weekly paycheck ($4,000 ÷ 26). You claim dependents on Step 3 of your W-4.",
  },
  {
    question: 'When should I update my W-4?',
    answer:
      "You should update your W-4 whenever you experience a major life change: getting married or divorced, having a child, starting a second job, or experiencing a significant income change. The IRS also recommends checking your withholding annually, especially after tax law changes. You can submit a new W-4 to your employer's HR or payroll department at any time — there's no limit on how often you can update it.",
  },
];

export const SALES_TAX_FAQS: FAQItem[] = [
  {
    question: 'How is sales tax calculated?',
    answer:
      "Multiply the purchase price by the combined tax rate. A $100 purchase at 8.25% combined rate = $8.25 in sales tax, for a total of $108.25. The combined rate includes both the state base rate and any local taxes from your county, city, or special district.",
  },
  {
    question: 'Which states have no sales tax?',
    answer:
      "Four states charge 0% state sales tax: Delaware, Montana, New Hampshire, and Oregon. Alaska has no state sales tax but allows local taxes, with an average combined rate of about 1.82%.",
  },
  {
    question: 'What is the reverse sales tax formula?',
    answer:
      "Divide the total by (1 + tax rate) to find the original price. A $108.25 total with 8.25% tax = $108.25 ÷ 1.0825 = $100.00 original price. This is essential for expense reports and bookkeeping when you only know the total amount paid.",
  },
  {
    question: 'Which state has the highest sales tax?',
    answer:
      "Louisiana and Tennessee tie for the highest average combined rate at 9.56%. Some individual cities in California, Louisiana, and Alabama push past 10% when all local taxes are combined. The average combined rate across the US is about 6.6%.",
  },
  {
    question: 'Do I have to pay sales tax on online purchases?',
    answer:
      "Since the 2018 Supreme Court decision in South Dakota v. Wayfair, states can require online retailers to collect sales tax regardless of physical presence. Most online purchases now include sales tax based on the buyer's location.",
  },
];

export const INCOME_TAX_FAQS: FAQItem[] = [
  {
    question: 'How does the federal income tax bracket system work?',
    answer:
      "Your income is divided into chunks, and each chunk is taxed at a different rate. For 2026, brackets range from 10% on your first dollars earned up to 37% on income above $609,350 (single). Only the income within each bracket gets that rate — so a $75,000 earner pays 10% on the first $11,600, 12% on the next chunk, and 22% only on the amount above $47,150.",
  },
  {
    question: 'What is the standard deduction for 2026?',
    answer:
      "$15,000 for single filers, $30,000 for married filing jointly, and $22,500 for head of household. This comes off the top of your gross income before any brackets apply. So a single person making $75,000 is only taxed on $60,000.",
  },
  {
    question: 'What is FICA and how does it affect my income tax?',
    answer:
      "FICA is separate from income tax — it's 6.2% for Social Security (up to $176,100) plus 1.45% for Medicare (no cap), totaling 7.65%. Add 0.9% more Medicare if you earn above $200,000. Unlike income tax, FICA is calculated on gross pay before any deductions, including 401(k) contributions.",
  },
  {
    question: 'How do state income taxes differ from federal?',
    answer:
      "State income taxes vary dramatically. Texas and Florida charge 0%. Illinois charges a flat 4.95%. California runs 1%–13.3% progressive. New York does 4%–10.9% progressive, plus NYC residents pay an additional 3.078%–3.876% city tax. The state you live in can easily mean thousands of dollars difference on the same salary.",
  },
  {
    question: 'What deductions can reduce my taxable income?',
    answer:
      "The biggest ones: 401(k) contributions (up to $23,500 in 2026), HSA contributions, and the standard deduction. Pre-tax deductions reduce your taxable income for federal and state income tax but not for FICA. At a 22% marginal rate, every $1,000 in 401(k) contributions saves you $220 in federal tax plus whatever your state charges.",
  },
];

export const TAX_CALC_FAQS: FAQItem[] = [
  {
    question: 'How much tax will I pay on my salary?',
    answer:
      "It depends on three things: your gross income, your filing status, and your state. Federal tax uses progressive brackets (10%–37%) with a $15,000 standard deduction for singles. FICA adds 7.65% on top. Then state tax ranges from 0% (TX, FL) to over 13% (CA). On a $75,000 salary as a single filer, you'd pay roughly $14,400 in federal tax and FICA combined, plus whatever your state charges. Use the calculator to see your exact breakdown.",
  },
  {
    question: 'What is the difference between effective and marginal tax rate?',
    answer:
      "Your effective rate is your overall average — total tax divided by gross income. Your marginal rate is what hits your last dollar earned, meaning the top bracket you fall into. Someone making $75K has a marginal rate of 22%, but their effective federal rate is closer to 11–12% because the first chunk of income gets taxed at lower rates.",
  },
  {
    question: 'Does the state I live in really make that much difference?',
    answer:
      "Huge difference. A $100,000 earner pays $0 state income tax in Texas or Florida, about $4,800 in Illinois, roughly $5,400 in California, and over $8,000 in New York City. That's an $8,000+ swing on the exact same salary. State tax is not a small factor.",
  },
  {
    question: 'How can I reduce my tax burden?',
    answer:
      "Max out your 401(k) ($23,500 in 2026) — every dollar reduces your taxable income at both federal and state level. HSA contributions work the same way. If you're self-employed, you can deduct half your self-employment tax and contribute to a Solo 401(k) with limits up to $70,000. Tax credits like the Child Tax Credit ($2,000 per child) reduce your bill dollar for dollar.",
  },
  {
    question: 'Does this calculator include self-employment tax?',
    answer:
      "This calculator focuses on W-2 income tax and withholding. If you're self-employed, you'll also owe self-employment tax (15.3% on 92.35% of net income) on top of regular income tax. Check our Self-Employment Tax Calculator for that.",
  },
];

export const OVERTIME_FAQS: FAQItem[] = [
  {
    question: 'What is the No Tax on Overtime law?',
    answer:
      "Under the 2025 Trump tax law (the 'One Big Beautiful Bill Act'), overtime pay is exempt from federal income tax for tax years 2025 through 2028. This means if you earn overtime pay — defined as hours worked beyond 40 per week at 1.5x your regular rate or higher — that portion of your income is not subject to federal income tax. However, FICA taxes (Social Security 6.2% + Medicare 1.45%) still apply to overtime pay. The exemption sunsets after December 31, 2028 unless Congress extends it.",
  },
  {
    question: 'Does the overtime tax exemption apply to my state income tax?',
    answer:
      "In most states, no. Only the federal income tax exemption is automatic. Most states have not conformed to the federal OT exemption, meaning your state will still tax overtime pay as regular income. States with no income tax (like Texas, Florida, Washington, Nevada, etc.) effectively don't tax overtime at the state level since they don't tax any income. Check with your state's revenue department for conformity updates.",
  },
  {
    question: 'How much can I save with no tax on overtime?',
    answer:
      "It depends on your hourly wage, overtime hours, and federal tax bracket. A worker earning $30/hour who works 10 hours of overtime per week saves roughly $2,000–$4,000 per year in federal income tax, depending on their bracket. Higher earners in the 22% or 24% brackets see the biggest savings. Use this calculator to see your exact savings based on your situation.",
  },
  {
    question: 'When does the overtime tax exemption expire?',
    answer:
      "The exemption is currently scheduled to sunset after December 31, 2028. This means it applies to tax years 2025, 2026, 2027, and 2028. After that, overtime pay will once again be taxed as regular income at the federal level unless Congress passes legislation to extend or make the exemption permanent.",
  },
  {
    question: 'Does the overtime exemption apply to salaried employees?',
    answer:
      "Generally no. The exemption applies to overtime pay as defined by the Fair Labor Standards Act (FLSA) — hours worked beyond 40 in a workweek at a rate of at least 1.5x your regular hourly rate. Most salaried employees classified as 'exempt' under FLSA don't receive overtime pay, so there's nothing to exempt. However, non-exempt salaried workers who do receive overtime pay would qualify for the federal income tax exemption on those overtime payments.",
  },
  {
    question: 'Is FICA (Social Security and Medicare) still taken from overtime pay?',
    answer:
      "Yes, absolutely. The No Tax on Overtime law only exempts overtime pay from federal income tax. FICA taxes — 6.2% for Social Security (up to the $176,100 wage cap for 2026) and 1.45% for Medicare (no cap) — still apply to all wages including overtime. If you earn over $200,000, the additional 0.9% Medicare tax also applies. Don't confuse the income tax exemption with a total tax exemption.",
  },
];

export const BONUS_TAX_FAQS: FAQItem[] = [
  {
    question: 'How are bonuses taxed?',
    answer:
      "The IRS treats bonuses as 'supplemental wages,' and your employer can use one of two methods to tax them. The Percentage Method applies a flat 22% federal withholding rate on your bonus (37% on any amount above $1 million). The Aggregate Method adds your bonus to your regular paycheck and taxes the whole thing through normal progressive brackets (10%–37%), then subtracts the tax on regular wages alone. Both methods also include FICA (6.2% Social Security + 1.45% Medicare) and state income tax. The method your employer uses can make a real difference in how much tax comes out of your bonus.",
  },
  {
    question: 'What is the flat 22% supplemental wage rate?',
    answer:
      "It's the IRS's simplified withholding rate for supplemental wages (bonuses, commissions, severance) under $1 million. Instead of running your bonus through progressive tax brackets, your employer just withholds 22% for federal income tax. It's quick and predictable — a $5,000 bonus means $1,100 in federal withholding. If your bonus exceeds $1,000,000, the rate jumps to 37% on the amount above $1M. This flat rate is optional for employers; they can choose the aggregate method instead.",
  },
  {
    question: 'Which method should I choose — percentage or aggregate?',
    answer:
      "It depends on your marginal tax bracket. If you're in the 24%, 32%, 35%, or 37% bracket, the flat 22% percentage method is almost always better — you're locking in a rate below what your regular wages get taxed at. If you're in the 12% or lower bracket, the aggregate method typically wins because your bonus gets taxed at or near 12% instead of a flat 22%. At the 22% bracket, it's roughly a wash, though the aggregate method can be slightly more due to bracket overlap. Our calculator shows you both results so you can see the exact difference.",
  },
  {
    question: 'Does FICA apply to bonuses?',
    answer:
      "Yes, always. FICA taxes (6.2% for Social Security up to the $176,100 wage cap in 2026, plus 1.45% for Medicare with no cap) apply to all wages including bonuses, regardless of which federal income tax method your employer uses. If your total income exceeds $200,000, there's an additional 0.9% Medicare surtax on wages above that threshold. FICA is calculated on gross wages before any deductions — there's no way around it.",
  },
  {
    question: 'Are bonuses taxed at a higher rate?',
    answer:
      "It can feel that way, but technically no — bonuses are just subject to withholding rules that can result in more tax being taken out upfront. With the 22% flat rate method, a $5,000 bonus has $1,100 withheld for federal tax, which for someone in the 12% bracket feels like a lot. But here's the thing: withholding is not the same as what you actually owe. When you file your tax return, your bonus is just part of your total income and gets taxed through the same brackets. If too much was withheld, you get it back as a refund. The 'bonus tax' people complain about is really just the withholding being higher than necessary for lower-bracket earners.",
  },
  {
    question: 'What is the aggregate method for bonus taxation?',
    answer:
      "Under the aggregate method, your employer adds your bonus to your most recent regular paycheck and calculates federal income tax on the total amount using the standard progressive brackets (10%–37%). Then they subtract the tax that would have been on your regular wages alone, and the difference becomes the withholding on your bonus. This method tends to produce more accurate withholding if your bonus is small relative to your regular pay, but can result in higher withholding for high earners since the bonus gets pushed into your top bracket. Your employer chooses the method — you generally can't pick — but knowing which one they use helps you understand your pay stub.",
  },
];

export const LOTTERY_TAX_FAQS: FAQItem[] = [
  {
    question: 'How are lottery winnings taxed?',
    answer:
      "Lottery winnings are taxed as ordinary income at both the federal and state level — there's no special 'lottery tax rate.' At the federal level, the full amount is subject to progressive income tax brackets (10%–37% for 2026), minus the standard deduction ($15,000 single / $30,000 married). The key difference from regular wages: lottery winnings are NOT subject to FICA (Social Security and Medicare taxes), which saves you 7.65%. For state taxes, it depends on where you live — some states don't tax lottery winnings at all. The IRS also requires 24% mandatory federal withholding on winnings over $5,000, but your actual tax may be higher or lower depending on your bracket.",
  },
  {
    question: 'What is the federal tax rate on lottery winnings?',
    answer:
      "There's no single rate — lottery winnings are taxed through the same progressive brackets as all other income. For 2026, the brackets range from 10% to 37%. On a $1,000,000 lump sum for a single filer, after the $15,000 standard deduction, the effective federal rate works out to roughly 30%–33%. The top 37% rate only applies to income above $609,350 for single filers. The IRS withholds 24% on winnings over $5,000, but if you're in a higher bracket, you'll owe the difference at tax time. Many winners are surprised by a big tax bill the following April.",
  },
  {
    question: 'Do I have to pay FICA (Social Security and Medicare) on lottery winnings?',
    answer:
      "No — and this is a major tax advantage. Lottery winnings, gambling income, and prize winnings are NOT subject to FICA taxes. That means you don't pay the 6.2% Social Security tax or the 1.45% Medicare tax that comes out of every regular paycheck. On a $500,000 lump sum, that's a savings of over $38,000 compared to earning the same amount as wages. This is one of the few silver linings of winning the lottery from a tax perspective. However, if you earn other wages during the year, those wages are still subject to FICA as normal.",
  },
  {
    question: 'What is the difference between lump sum and annuity for lottery winnings?',
    answer:
      "When you win a large jackpot, you typically choose between a lump sum (cash option) and an annuity paid over 30 years. The lump sum is significantly less than the advertised jackpot — usually 50–60% — because it represents the present cash value needed to fund the annuity payments. For example, a $1,000,000 advertised jackpot might have a $500,000–$600,000 lump sum. With the annuity, you receive the full advertised amount spread over 30 annual payments. The tax implications differ: a lump sum pushes all income into one tax year (potentially hitting the 37% bracket hard), while annuity payments are taxed each year at potentially lower rates. Our calculator shows both scenarios side by side.",
  },
  {
    question: 'Which states don\'t tax lottery winnings?',
    answer:
      "Several states have no income tax at all, which means they don't tax lottery winnings: Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska, Tennessee, and New Hampshire. Some states with income taxes specifically exempt lottery winnings or have special rules. California and Pennsylvania don't tax in-state lottery winnings (like Powerball or Mega Millions sold in that state), but they do tax winnings from out-of-state lotteries. Illinois, New York, and most other states tax lottery winnings at their standard income tax rates. If you buy a ticket in one state but live in another, you generally owe tax in both states, though your home state may offer a credit for taxes paid to the other state.",
  },
  {
    question: 'What is the mandatory withholding on lottery winnings?',
    answer:
      "The IRS requires 24% federal income tax withholding on gambling winnings over $5,000. This is mandatory — the lottery commission automatically deducts it before you see a dime. But here's the catch: 24% is just the withholding, not your actual tax. If your total income puts you in the 32%, 35%, or 37% bracket, you'll owe significantly more when you file your return. On a $500,000 lump sum, 24% withholding is $120,000, but if your actual federal tax is $160,000+, you'll owe an extra $40,000+ at tax time. Some states also require their own withholding on lottery winnings. Always set aside extra money for the tax bill.",
  },
  {
    question: 'Can I deduct gambling losses from lottery winnings?',
    answer:
      "Yes, but only if you itemize deductions — and only up to the amount of your winnings. You can't deduct more in losses than you won. For example, if you won $10,000 but lost $15,000 on lottery tickets over the year, you can only deduct $10,000 in losses. The deduction goes on Schedule A as a miscellaneous itemized deduction, and it only helps if your total itemized deductions exceed the standard deduction ($15,000 single / $30,000 married for 2026). Most lottery winners take the standard deduction because their winnings are too high for itemizing to help, meaning the loss deduction provides little to no benefit for big winners.",
  },
];

export const PROPERTY_TAX_FAQS: FAQItem[] = [
  {
    question: 'How is property tax calculated?',
    answer:
      "Property tax is calculated by multiplying your home's assessed value by the local property tax rate (often called a mill rate). The formula is straightforward: Annual Property Tax = Assessed Value × Effective Tax Rate. For example, a $350,000 home at a 1.78% effective rate = $6,230 per year. Most jurisdictions use an assessed value that may differ from market value — some states assess at 100% of market value, while others use a fraction (like 10% or 40%). This calculator uses average effective rates, which already account for assessment ratios, so you can simply enter your home's market value.",
  },
  {
    question: 'Which state has the highest property tax?',
    answer:
      "New Jersey takes the crown with an average effective property tax rate of 2.49%. On a $350,000 home, that's roughly $8,715 per year. Illinois is second at 1.78%, followed by New Hampshire at 2.06% and Vermont at 1.86%. The Northeast dominates the top of the property tax rankings — most of the highest-tax states are in that region. It's worth noting that some of these states offset high property taxes with other advantages (like New Hampshire having no income or sales tax).",
  },
  {
    question: 'Which state has the lowest property tax?',
    answer:
      "Hawaii wins with an average effective rate of just 0.31%. On a $350,000 home, that's only about $1,085 per year. Alabama (0.41%), Colorado and Louisiana (0.55% each), and Delaware (0.57%) round out the bottom five. But here's the catch with Hawaii: while the rate is low, the median home value in Hawaii is around $800K+, so the actual tax bill isn't as small as the rate suggests. Low rate doesn't always mean low taxes if home values are high.",
  },
  {
    question: 'What is the average property tax rate in the US?',
    answer:
      "The average effective property tax rate across the United States is approximately 1.1%. That means on a $350,000 home, the typical American homeowner pays around $3,850 per year in property taxes. But averages are misleading — the range is massive, from 0.31% in Hawaii to 2.49% in New Jersey. Even within a single state, rates can vary significantly by county, city, and school district.",
  },
  {
    question: 'Does Texas have high property taxes?',
    answer:
      "Yes, Texas has the 6th highest effective property tax rate in the country at about 1.71%. On a $350,000 home, that's roughly $5,985 per year. The reason is straightforward: Texas has no state income tax, so local governments rely heavily on property taxes to fund schools, roads, and services. It's the classic trade-off — you save on income tax but pay more on your home. For renters and people with modest homes, Texas is still a great deal. But for homeowners with expensive properties, the property tax bill can eat into the income tax savings significantly.",
  },
  {
    question: 'What is a homestead exemption?',
    answer:
      "A homestead exemption reduces the taxable value of your primary residence, which lowers your property tax bill. Florida is the most well-known example — it exempts up to $50,000 of your home's assessed value. The first $25,000 exempts you from all property taxes, and the second $25,000 exempts you from non-school taxes. On a $300,000 home in Florida, that could save you $800–$1,500 per year. Other states with homestead exemptions include South Carolina ($50,000), Colorado ($55,000 for seniors 65+), and Georgia (varies by county). Some states also cap annual assessment increases — Florida's Save Our Homes cap limits increases to 3% per year, which creates a growing gap between market value and taxable value over time.",
  },
  {
    question: 'How do property taxes vary within a state?',
    answer:
      "Significantly. Property tax rates are set at the county, city, and school district level — not the state level. The state rates shown in this calculator are averages. Within Illinois, for example, Cook County (Chicago) has different assessment rules than downstate counties. In Texas, rates vary by county from about 1.4% to over 2.3%. School district taxes are usually the biggest component of your property tax bill — often 50–60% of the total. Urban areas with more services tend to have higher rates, while rural areas are often lower. Always check your specific county tax assessor's website for the most accurate rate for your address.",
  },
  {
    question: 'Can I lower my property tax bill?',
    answer:
      "Yes, several ways. First, check if you qualify for a homestead exemption — many homeowners leave money on the table by not applying. Second, appeal your assessment if you think your home's assessed value is too high — success rates vary, but it's worth trying, especially if home values in your area have declined. Third, look into senior, veteran, or disability exemptions offered by your state or county. Fourth, some states offer freezes on assessed value increases for seniors or long-term residents. Finally, understand that property tax rates and assessments are local — attending city council or school board meetings where budgets are set can give you advance notice of rate changes.",
  },
];

export const GEORGIA_FAQS: FAQItem[] = [
  {
    question: 'How much is Georgia state income tax in 2026?',
    answer:
      "Georgia uses a flat 5.49% rate — that's it, one rate for all taxable income. This is a recent change; Georgia used to have a graduated bracket system but transitioned to the flat rate starting in 2024. Whether that's better for you depends on your income level, but it does simplify the math considerably.",
  },
  {
    question: 'What deductions does Georgia offer?',
    answer:
      "Georgia gives you both a standard deduction and a personal exemption, which is nice. The standard deduction is $5,400 for single filers, $7,100 for married filing jointly, and $5,400 for head of household. On top of that, you get a personal exemption of $2,700 per person ($5,400 for married couples). So a single filer making $75K would subtract $2,700 + $5,400 = $8,100 before applying the 5.49% rate — that brings taxable income down to $66,900.",
  },
  {
    question: 'Does Georgia tax Social Security benefits?',
    answer:
      "Nope, Georgia does not tax Social Security benefits. They also exclude up to $35,000 of retirement income ($65,000 for couples) for folks 62 and older. That includes 401(k) withdrawals, IRA distributions, and pensions. Combined with the flat 5.49% rate, Georgia is actually one of the more retiree-friendly states with an income tax.",
  },
  {
    question: 'How does Georgia compare to neighboring states for taxes?',
    answer:
      "Georgia's 5.49% flat rate is pretty middle-of-the-road for the Southeast. Florida and Tennessee have no income tax, so they win on that front. But Georgia's property taxes are quite reasonable — about 0.92% average effective rate compared to North Carolina's 0.82% or South Carolina's 0.57%. The sales tax averages around 7.35% (4% state + local). Overall, Georgia isn't the cheapest or the most expensive — it's a reasonable middle ground.",
  },
  {
    question: 'What is the Georgia standard deduction for 2026?',
    answer:
      "$5,400 for single filers, $7,100 for married filing jointly, and $5,400 for head of household. It's not as generous as the federal $15,000 standard deduction, but combined with the $2,700 personal exemption, a single filer gets $8,100 knocked off their income before the 5.49% rate applies. That's actually better than what Illinois offers — they don't have a standard deduction at all.",
  },
  {
    question: 'Is Georgia a good state for retirees?',
    answer:
      "Surprisingly, yes. No tax on Social Security, the $35,000/$65,000 retirement income exclusion for those 62+, moderate property taxes, and the flat 5.49% income tax rate. Georgia consistently ranks as one of the more tax-friendly states for retirees. The cost of living is also below the national average, which helps stretch those retirement dollars further. It's not Florida-level tax-free, but it's solid.",
  },
];

export const VIRGINIA_FAQS: FAQItem[] = [
  {
    question: 'How much is Virginia state income tax in 2026?',
    answer:
      "Virginia uses a progressive bracket system with four rates: 2%, 3%, 5%, and 5.75%. For a single filer making $75K after the $8,300 standard deduction, your effective rate works out to roughly 4.7%. That top 5.75% rate kicks in above $17,000 of taxable income, so most working professionals hit the top bracket pretty quickly.",
  },
  {
    question: 'What is the Virginia standard deduction for 2026?',
    answer:
      "$8,300 for single filers, $16,600 for married filing jointly, and $8,300 for head of household. Virginia also offers a personal exemption of $930 per person ($1,860 for married couples). So a single filer earning $75K subtracts $8,300 + $930 = $9,230 before applying the brackets. Better than Georgia's standard deduction, but Georgia's personal exemption is larger.",
  },
  {
    question: 'Does Virginia tax Social Security benefits?',
    answer:
      "No, Virginia does not tax Social Security benefits. And for residents 65 and older, there's an additional age deduction of up to $12,000 per person ($24,000 for couples) on other retirement income, subject to income thresholds. Between that and the personal exemption, Virginia gives retirees a decent break compared to some states.",
  },
  {
    question: 'How does Virginia compare to neighboring states for taxes?',
    answer:
      "Virginia's top rate of 5.75% is a bit higher than Georgia's 5.49% flat rate, but the lower brackets help for moderate incomes. North Carolina has a flat 4.5% rate, Maryland goes up to 5.75% with local county taxes on top, and West Virginia tops out at 5.12%. Virginia sits in the middle — not the cheapest, not the most expensive. The 5.3% average sales tax is reasonable, and property taxes average 0.82%, which is below the national average.",
  },
  {
    question: 'Does Virginia have local income taxes like Maryland?',
    answer:
      "No, Virginia does not have local income taxes. That's a big advantage over Maryland, where county piggyback taxes add 2.25%–3.2% on top of the state rate. In Virginia, you just pay the state rate — what you see is what you get. Some cities in Virginia are independent (not part of any county), but they don't levy their own income taxes either.",
  },
  {
    question: 'Is Virginia tax-friendly for retirees?',
    answer:
      "Fairly tax-friendly. No tax on Social Security, the age deduction of up to $12,000 per person for those 65+, the $930 personal exemption, and moderate property taxes. Virginia's not in the same league as Florida or Texas for retirees (those have zero income tax), but it's much better than most Northern states. If you're staying in the Mid-Atlantic region for retirement, Virginia is one of the better options.",
  },
];
