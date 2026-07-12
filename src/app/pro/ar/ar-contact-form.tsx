'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check, AlertCircle, Send } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const inputClass = cn(
  'w-full rounded-md border border-rule bg-paper-sunken px-3.5 py-2.5',
  'text-sm text-ink placeholder:text-ink-faint',
  'focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/40 transition-colors',
);

export function ArContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast({ title: 'الاسم مطلوب', variant: 'destructive' });
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast({ title: 'البريد الإلكتروني غير صحيح', variant: 'destructive' });
    if (!formData.subject.trim()) return toast({ title: 'الموضوع مطلوب', variant: 'destructive' });
    if (!formData.message.trim()) return toast({ title: 'الرسالة مطلوبة', variant: 'destructive' });

    setIsSubmitting(true);
    setFormStatus(null);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setFormStatus('success');
        toast({ title: 'تم إرسال الرسالة', description: 'برد عليك قريبًا إن شاء الله.' });
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setFormStatus(null);
        }, 1800);
      } else {
        setFormStatus('error');
        toast({
          title: 'فشل الإرسال',
          description: result.error || 'حاول مرة ثانية أو راسلني على الإيميل مباشرة.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Error sending message:', error);
      toast({ title: 'فشل الإرسال', description: 'حاول مرة ثانية أو راسلني على الإيميل مباشرة.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="code-window relative">
      <div className="code-window-header">
        <span className="dot-light bg-[#ff5f56]" />
        <span className="dot-light bg-[#ffbd2e]" />
        <span className="dot-light bg-[#27c93f]" />
        <span className="ms-2 font-mono text-xs text-ink-muted" dir="ltr">
          ~/messages/new.txt
        </span>
      </div>

      <form onSubmit={handleSubmit} className="relative p-5 md:p-7">
        {formStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper-sunken p-6 text-center"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full border border-signal bg-signal/10 text-signal">
              <Check className="h-6 w-6" />
            </div>
            <p className="mt-5 text-2xl font-bold text-ink">تم الإرسال.</p>
            <p className="mt-2 text-sm text-ink-muted">
              <span className="text-signal">←</span> الرد قادم قريبًا.
            </p>
          </motion.div>
        )}

        {formStatus === 'error' && (
          <div className="mb-5 flex items-center gap-2 rounded-md border border-danger/40 bg-danger/10 px-3 py-2">
            <AlertCircle className="h-4 w-4 text-danger" />
            <p className="text-sm text-ink-muted">فشل الإرسال. حاول مرة ثانية أو راسلني على الإيميل.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="الاسم">
            <input id="name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="اسمك" required className={inputClass} />
          </Field>
          <Field label="البريد الإلكتروني">
            <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@domain.com" required dir="ltr" className={inputClass} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="الموضوع">
            <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="استفسار عن مشروع" required className={inputClass} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="الرسالة">
            <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} placeholder="احكِ لي عن مشروعك — النطاق، الجدول الزمني، أي شي يساعد." required className={cn(inputClass, 'resize-none leading-relaxed')} />
          </Field>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint" dir="ltr">
            {'// encrypted in transit'}
          </p>
          <button type="submit" disabled={isSubmitting || formStatus === 'success'} className="btn-signal">
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            {isSubmitting ? 'جارٍ الإرسال' : 'إرسال الرسالة'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
