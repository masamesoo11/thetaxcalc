'use client';

import { useState, useTransition, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TOPIC_OPTIONS = [
  { value: 'general', label: 'General question' },
  { value: 'data-correction', label: 'Report a calculation or data error' },
  { value: 'advertising', label: 'Advertising & media' },
  { value: 'privacy', label: 'Privacy request' },
  { value: 'feedback', label: 'Feedback & suggestions' },
] as const;

type SubmitState = 'idle' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<string>('general');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — humans never see it
  const [state, setState] = useState<SubmitState>('idle');
  const [errorText, setErrorText] = useState('');
  const [isPending, startTransition] = useTransition();

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrorText('');

      startTransition(async () => {
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, topic, message, website }),
          });
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          if (res.ok) {
            setState('success');
          } else {
            setState('error');
            setErrorText(data.error ?? 'Something went wrong. Please try again.');
          }
        } catch {
          setState('error');
          setErrorText('Network error — please check your connection and try again.');
        }
      });
    },
    [name, email, topic, message, website]
  );

  if (state === 'success') {
    return (
      <Card className="min-w-0">
        <CardContent className="p-6 sm:p-8">
          <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <AlertDescription className="text-foreground">
              <span className="font-semibold">Message received.</span> Thank you for reaching
              out — we read every message and typically reply within 1-2 business days. For
              anything urgent, you can also email us directly at{' '}
              <span className="font-medium">contact@thetaxcalc.com</span>.
            </AlertDescription>
          </Alert>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setState('idle');
              setName('');
              setEmail('');
              setTopic('general');
              setMessage('');
            }}
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Send us a message</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll get back to you by email. Fields marked with{' '}
          <span className="text-red-500">*</span> are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-5" noValidate>
          {/* Honeypot — hidden from humans, irresistible to bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">
              Leave this field empty
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">
                Your name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">
                Email address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-topic">
              Topic <span className="text-red-500">*</span>
            </Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="contact-topic" className="w-full">
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent>
                {TOPIC_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind — the more detail, the better we can help."
              className="resize-y"
            />
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {message.trim().length}/5000 characters
            </p>
          </div>

          {state === 'error' && (
            <Alert variant="destructive" role="alert">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
              <AlertDescription>
                {errorText} You can also email us directly at contact@thetaxcalc.com.
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="bg-emerald-600 hover:bg-emerald-700 text-white min-h-11"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                Send message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
