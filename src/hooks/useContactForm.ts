import { useCallback, useState, type FormEvent } from 'react';
import { CONFIG } from '../content';

export type FormValues = {
  name: string; email: string; company: string; phone: string;
  type: string; budget: string; message: string; contactPref: string; website: string;
};
export type FieldKey = keyof FormValues;
export type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

export const EMPTY_FORM: FormValues = {
  name: '', email: '', company: '', phone: '', type: '', budget: '', message: '', contactPref: '', website: '',
};
export const MESSAGE_MAX = 4000;

export const FIELD_IDS: Partial<Record<FieldKey, string>> = {
  name: 'f-name', email: 'f-email', phone: 'f-phone', type: 'f-type', message: 'f-msg', contactPref: 'f-pref-0',
};

export function validate(f: FormValues) {
  const e: Partial<Record<FieldKey, string>> = {};
  if (f.name.trim().length < 2) e.name = 'Informe seu nome.';
  if (!f.email.trim()) e.email = 'Informe seu e-mail.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Este e-mail não parece válido.';
  const digits = f.phone.replace(/\D/g, '');
  const needsPhone = f.contactPref === 'WhatsApp' || f.contactPref === 'Ligação';
  if (f.phone.trim() && (digits.length < 10 || digits.length > 13)) e.phone = 'Use DDD + número, ex.: (11) 91234-5678.';
  else if (needsPhone && !digits) e.phone = 'Informe um número para contato por ' + f.contactPref + '.';
  if (!f.type) e.type = 'Selecione o tipo de projeto.';
  if (f.message.trim().length < 20) e.message = 'Descreva sua necessidade com pelo menos 20 caracteres.';
  if (!f.contactPref) e.contactPref = 'Escolha como prefere ser contatado.';
  return e;
}

export function useContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorDetail, setErrorDetail] = useState('');

  const all = validate(values);
  const errors: Partial<Record<FieldKey, string>> = {};
  (Object.keys(all) as FieldKey[]).forEach((k) => {
    if (submitted || touched[k]) errors[k] = all[k];
  });

  const setField = useCallback((k: FieldKey, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setStatus((s) => (s === 'sending' ? s : 'idle'));
  }, []);
  const touch = useCallback((k: FieldKey) => setTouched((p) => ({ ...p, [k]: true })), []);

  const reset = () => {
    setValues(EMPTY_FORM);
    setSubmitted(false);
    setTouched({});
  };

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    const first = (['name', 'email', 'phone', 'type', 'message', 'contactPref'] as FieldKey[]).find((k) => errs[k]);
    if (first) {
      document.getElementById(FIELD_IDS[first]!)?.focus();
      setStatus('idle');
      return;
    }
    if (values.website) {
      // Honeypot filled: pretend success, send nothing.
      reset();
      setStatus('success');
      return;
    }
    if (!CONFIG.form.endpoint) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    setErrorDetail('');
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000);
      const payload = {
        name: values.name.trim(), email: values.email.trim(), company: values.company.trim(), phone: values.phone.trim(),
        projectType: values.type, budget: values.budget, message: values.message.trim(),
        contactPreference: values.contactPref, sentAt: new Date().toISOString(),
      };
      const res = await fetch(CONFIG.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (!res.ok) {
        // The contact function answers { ok: false, error } with a message meant for the visitor.
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'O servidor respondeu com erro ' + res.status + '.');
      }
      reset();
      setStatus('success');
    } catch (err) {
      const e = err as Error;
      setStatus('error');
      setErrorDetail(e.name === 'AbortError' ? 'O servidor demorou para responder.' : e.message || '');
    }
  }

  return { values, errors, status, errorDetail, setField, touch, submit };
}
