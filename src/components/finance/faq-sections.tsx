'use client';

import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FAQItem } from '@/lib/faq-data';

// Re-export FAQ data from the shared file for backward compatibility
export type { FAQItem } from '@/lib/faq-data';
export {
  HOME_FAQS,
  ILLINOIS_FAQS,
  TEXAS_FAQS,
  FLORIDA_FAQS,
  CALIFORNIA_FAQS,
  NEWYORK_FAQS,
  MORTGAGE_FAQS,
  CAPITAL_GAINS_FAQS,
  SELF_EMPLOYMENT_FAQS,
} from '@/lib/faq-data';

interface FAQSectionProps {
  title: string;
  faqs: FAQItem[];
}

export function FAQSection({ title, faqs }: FAQSectionProps) {
  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <HelpCircle className="h-5 w-5 text-emerald-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-1.5">
            <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
