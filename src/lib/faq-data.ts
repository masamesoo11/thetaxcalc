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
