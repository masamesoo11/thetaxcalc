'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ChevronRight, FileText, DollarSign, Users, Clock, Shield, ExternalLink } from 'lucide-react';

interface EligibilityResult {
  eligible: boolean;
  program: 'guided' | 'fillable' | 'vita' | 'none';
  message: string;
  details: string[];
  partnerLink?: string;
}

export function FreefileIrsClient() {
  const [agi, setAgi] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [state, setState] = useState<string>('');
  const [isSelfEmployed, setIsSelfEmployed] = useState(false);
  const [hasForeignIncome, setHasForeignIncome] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const checkEligibility = () => {
    const agiNum = parseInt(agi.replace(/[^0-9]/g, '')) || 0;
    const ageNum = parseInt(age) || 0;
    const details: string[] = [];

    // IRS Free File Guided Tax Preparation: AGI ≤ $84,000 (2026)
    if (agiNum <= 84000 && !hasForeignIncome) {
      details.push('Your AGI is within the $84,000 threshold for IRS Free File Guided Preparation.');
      if (ageNum >= 57) {
        details.push('Taxpayers 57+ may access additional Free File partner options.');
      }
      details.push('You can choose from 8+ IRS-partnered tax software providers.');
      setResult({
        eligible: true,
        program: 'guided',
        message: 'You qualify for IRS Free File Guided Tax Preparation!',
        details,
        partnerLink: 'https://apps.irs.gov/app/freeFile',
      });
      return;
    }

    // Free File Fillable Forms: No income limit
    if (!hasForeignIncome || agiNum > 84000) {
      details.push('Free File Fillable Forms has no income limit — available to everyone.');
      details.push('This is the electronic version of IRS paper forms — you fill them out yourself.');
      if (agiNum > 84000) {
        details.push('Since your AGI exceeds $84,000, Guided Preparation is not available, but Fillable Forms are.');
      }
      if (hasForeignIncome) {
        details.push('Note: Some forms related to foreign income may not be available in Fillable Forms.');
      }
      setResult({
        eligible: true,
        program: 'fillable',
        message: 'You can use IRS Free File Fillable Forms!',
        details,
        partnerLink: 'https://www.freefilefillableforms.com/',
      });
      return;
    }

    // VITA/TCE for low-income/seniors
    if (agiNum <= 64000 || ageNum >= 60) {
      details.push('Volunteer Income Tax Assistance (VITA) serves taxpayers earning $64,000 or less.');
      details.push('Tax Counseling for the Elderly (TCE) specializes in tax questions for those 60+.');
      setResult({
        eligible: true,
        program: 'vita',
        message: 'You qualify for free in-person tax help!',
        details,
        partnerLink: 'https://www.irs.gov/individuals/find-a-location-for-free-tax-prep',
      });
      return;
    }

    setResult({
      eligible: false,
      program: 'none',
      message: 'Based on your answers, explore the options below.',
      details,
    });
  };

  const resetForm = () => {
    setAgi('');
    setAge('');
    setFilingStatus('single');
    setState('');
    setIsSelfEmployed(false);
    setHasForeignIncome(false);
    setResult(null);
  };

  const programIcons = {
    guided: <Shield className="h-5 w-5 text-emerald-400" />,
    fillable: <FileText className="h-5 w-5 text-sky-400" />,
    vita: <Users className="h-5 w-5 text-amber-400" />,
    none: <XCircle className="h-5 w-5 text-red-400" />,
  };

  const programColors = {
    guided: 'border-emerald-500/30 bg-emerald-500/5',
    fillable: 'border-sky-500/30 bg-sky-500/5',
    vita: 'border-amber-500/30 bg-amber-500/5',
    none: 'border-border/30 bg-card/50',
  };

  return (
    <div className="space-y-6">
      {/* Eligibility Checker */}
      <Card className="border-emerald-500/20 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            IRS Free File Eligibility Checker
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Answer a few questions to find out which free IRS filing option is right for you.
          </p>
        </CardHeader>
        <CardContent>
          {!showCalculator ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Not sure which IRS Free File option you qualify for? Our checker walks you through it in 30 seconds.
              </p>
              <Button
                onClick={() => setShowCalculator(true)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400"
              >
                Check My Eligibility
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ) : !result ? (
            <div className="space-y-4">
              {/* AGI Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Adjusted Gross Income (AGI) for 2025
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 45000"
                    value={agi}
                    onChange={(e) => setAgi(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full rounded-lg border border-border/50 bg-background/50 pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Find your AGI on last year&apos;s tax return (Line 11 of Form 1040).</p>
              </div>

              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Your Age
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 35"
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              {/* Filing Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Filing Status
                </label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value)}
                  className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                >
                  <option value="single">Single</option>
                  <option value="mfj">Married Filing Jointly</option>
                  <option value="mfs">Married Filing Separately</option>
                  <option value="hoh">Head of Household</option>
                  <option value="qw">Qualifying Widow(er)</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  State of Residence
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                >
                  <option value="">Select your state</option>
                  <option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="FL">Florida</option>
                  <option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option>
                  <option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option>
                  <option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option>
                  <option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option>
                  <option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option>
                  <option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option><option value="WY">Wyoming</option><option value="DC">Washington D.C.</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelfEmployed}
                    onChange={(e) => setIsSelfEmployed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border/50 text-emerald-500 focus:ring-emerald-500/20"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">Self-employed or independent contractor</span>
                    <p className="text-xs text-muted-foreground">1099 workers, freelancers, gig workers</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasForeignIncome}
                    onChange={(e) => setHasForeignIncome(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border/50 text-emerald-500 focus:ring-emerald-500/20"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">Foreign income or foreign accounts</span>
                    <p className="text-xs text-muted-foreground">Includes Form 2555, 1116, or FBAR filings</p>
                  </div>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={checkEligibility}
                  disabled={!agi}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400"
                >
                  Check Eligibility
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-border/50"
                >
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            /* Result */
            <div className={`rounded-xl border p-6 ${programColors[result.program]}`}>
              <div className="flex items-start gap-3 mb-4">
                {programIcons[result.program]}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{result.message}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.program === 'guided' && 'IRS Free File Guided Preparation — brand-name tax software for free.'}
                    {result.program === 'fillable' && 'Free File Fillable Forms — electronic versions of IRS paper forms.'}
                    {result.program === 'vita' && 'VITA/TCE — free in-person tax preparation by IRS-certified volunteers.'}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {result.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    {detail}
                  </li>
                ))}
              </ul>

              {result.partnerLink && (
                <a
                  href={result.partnerLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm font-medium text-white hover:from-emerald-500 hover:to-emerald-400 transition-all"
                >
                  {result.program === 'guided' && 'Go to IRS Free File'}
                  {result.program === 'fillable' && 'Open Fillable Forms'}
                  {result.program === 'vita' && 'Find VITA Location'}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <button
                onClick={resetForm}
                className="ml-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Check again
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Comparison Table */}
      <Card className="border-border/30 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-400" />
            IRS Free File Options at a Glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-3 px-3 font-semibold text-emerald-400">Guided Prep</th>
                  <th className="text-center py-3 px-3 font-semibold text-sky-400">Fillable Forms</th>
                  <th className="text-center py-3 px-3 font-semibold text-amber-400">VITA/TCE</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/20">
                  <td className="py-2.5 px-3">Income Limit</td>
                  <td className="py-2.5 px-3 text-center">$84,000 AGI</td>
                  <td className="py-2.5 px-3 text-center">No limit</td>
                  <td className="py-2.5 px-3 text-center">$64,000 AGI</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-2.5 px-3">Cost</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400">Free federal</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400">Free federal</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400">Free federal + state</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-2.5 px-3">State Filing</td>
                  <td className="py-2.5 px-3 text-center">Varies by partner</td>
                  <td className="py-2.5 px-3 text-center">Not included</td>
                  <td className="py-2.5 px-3 text-center">Included</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-2.5 px-3">Difficulty</td>
                  <td className="py-2.5 px-3 text-center">Easy (guided Q&amp;A)</td>
                  <td className="py-2.5 px-3 text-center">Advanced (DIY forms)</td>
                  <td className="py-2.5 px-3 text-center">Easy (in-person help)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Self-Employment</td>
                  <td className="py-2.5 px-3 text-center">Some partners</td>
                  <td className="py-2.5 px-3 text-center">Yes (Schedule C, SE)</td>
                  <td className="py-2.5 px-3 text-center">Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 2026 Key Dates */}
      <Card className="border-border/30 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-400" />
            2026 Tax Season Key Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { date: 'January 27, 2026', event: 'IRS Free File opens', note: 'Software available, returns held until processing starts' },
              { date: 'January 29, 2026', event: 'IRS begins processing returns', note: 'E-filed returns start being accepted' },
              { date: 'April 15, 2026', event: 'Filing deadline', note: 'Last day to file or request extension (Form 4868)' },
              { date: 'April 15, 2026', event: 'Extension deadline', note: 'File Form 4868 for Oct 15 extension — free via IRS Free File' },
              { date: 'October 15, 2026', event: 'Extension filing deadline', note: 'Last day to file if you got an extension' },
              { date: 'Mid-October 2026', event: 'Free File closes', note: 'IRS Free File portal shuts down for the season' },
            ].map((item) => (
              <div key={item.date + item.event} className="rounded-lg border border-border/20 bg-background/30 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">{item.date}</p>
                <p className="text-sm font-medium text-foreground">{item.event}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
