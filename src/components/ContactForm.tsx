'use client';

import { useId, useState } from 'react';
import { CTA } from '@/config/cta';
import {
  LIMITS,
  hasErrors,
  validateContact,
  type ContactKind,
  type ContactPayload,
  type FieldErrors,
  type ResultSummary,
} from '@/lib/contact-schema';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-bad">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[12px] text-ink-mute">{hint}</p>
      ) : null}
    </div>
  );
}

const inputClass =
  'w-full rounded border border-rule-strong bg-ground px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-mute';

export default function ContactForm({
  kind,
  result,
  submitLabel,
  successTitle,
  successBody,
  mailtoFallback,
  noteLabel,
  notePlaceholder,
  disclosure,
}: {
  kind: ContactKind;
  result: ResultSummary;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  mailtoFallback: string;
  noteLabel: string;
  notePlaceholder: string;
  disclosure?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState({
    studentName: '',
    studentEmail: '',
    parentEmail: '',
    note: '',
    website: '',
  });

  function set(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload: ContactPayload = { kind, ...values, result };

    const found = validateContact(payload);
    setErrors(found);
    if (hasErrors(found)) return;

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok: boolean; errors?: FieldErrors };
      if (data.ok) {
        setStatus('sent');
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col gap-2 rounded border border-good bg-good-bg p-4">
        <p className="font-serif text-lg font-semibold text-good">{successTitle}</p>
        <p className="text-[14px] leading-relaxed text-ink-soft">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Your name" error={errors.studentName}>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.studentName}
            onChange={(e) => set('studentName', e.target.value)}
            aria-invalid={Boolean(errors.studentName)}
            aria-describedby={errors.studentName ? `${uid}-name-error` : undefined}
            className={inputClass}
          />
        </Field>

        <Field id={`${uid}-email`} label="Your email" error={errors.studentEmail}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.studentEmail}
            onChange={(e) => set('studentEmail', e.target.value)}
            aria-invalid={Boolean(errors.studentEmail)}
            aria-describedby={errors.studentEmail ? `${uid}-email-error` : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      {kind === 'parent' ? (
        <Field
          id={`${uid}-parent`}
          label="Parent’s email"
          hint="We send them your score, the topics to work on, and who wrote the test."
          error={errors.parentEmail}
        >
          <input
            id={`${uid}-parent`}
            name="parentEmail"
            type="email"
            inputMode="email"
            maxLength={LIMITS.email}
            value={values.parentEmail}
            onChange={(e) => set('parentEmail', e.target.value)}
            aria-invalid={Boolean(errors.parentEmail)}
            aria-describedby={errors.parentEmail ? `${uid}-parent-error` : undefined}
            className={inputClass}
          />
        </Field>
      ) : null}

      <Field id={`${uid}-note`} label={noteLabel} error={errors.note}>
        <textarea
          id={`${uid}-note`}
          name="note"
          rows={3}
          maxLength={LIMITS.note}
          placeholder={notePlaceholder}
          value={values.note}
          onChange={(e) => set('note', e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Ловушка для ботов. Скрыта от людей и от скринридеров. */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: '-9999px' }}>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-fit rounded bg-ink px-6 py-3.5 text-sm font-semibold text-ground hover:opacity-90 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : submitLabel}
        </button>

        {disclosure ? <p className="text-[12px] leading-relaxed text-ink-mute">{disclosure}</p> : null}

        {status === 'failed' ? (
          <p role="alert" className="rounded border border-rule-strong bg-surface p-3 text-[13px] leading-relaxed text-ink-soft">
            The message could not be sent just now. You can write directly to{' '}
            <a href={mailtoFallback} className="font-medium text-ochre underline underline-offset-2">
              {CTA.email}
            </a>{' '}
            instead — nothing is lost.
          </p>
        ) : null}
      </div>
    </form>
  );
}
