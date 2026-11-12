import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { BRAND } from '../data.js';
import { WhatsAppIcon } from './Navbar.jsx';
import { useReveal } from '../hooks.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+?91|0)?[6-9]\d{9}$|^(\+?65)?[3689]\d{7}$|^\+?\d{8,14}$/;

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  details: '',
  visitDate: '',
};

function validate(values) {
  const errors = {};
  if (values.firstName.trim().length < 2) errors.firstName = 'Please enter your first name.';
  if (values.lastName.trim().length < 2) errors.lastName = 'Please enter your last name.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!PHONE_RE.test(values.phone.replace(/[\s-]/g, '')))
    errors.phone = 'Please enter a valid phone number (e.g. 91106 49999).';
  if (values.details.trim().length < 10)
    errors.details = 'Tell us a little more — at least 10 characters.';
  if (!values.visitDate) errors.visitDate = 'Pick your preferred visit date.';
  else {
    const picked = new Date(`${values.visitDate}T23:59:59`);
    if (picked.getTime() < Date.now() - 86400000)
      errors.visitDate = 'Please choose today or a later date.';
  }
  return errors;
}

const todayISO = new Date().toISOString().split('T')[0];

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const revealRef = useReveal([]);

  const success = status === 'done';

  const set = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const fieldClass = (field) =>
    `sl-input ${touched[field] && errors[field] ? 'is-invalid' : ''}`;

  const fieldError = (field) =>
    touched[field] && errors[field] ? (
      <p className="mt-1.5 font-caption text-[11.5px] font-semibold text-danger" role="alert">
        {errors[field]}
      </p>
    ) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      details: true,
      visitDate: true,
    });
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('done');
  };

  const summary = useMemo(() => {
    if (!success) return null;
    const d = new Date(`${values.visitDate}T00:00:00`);
    return {
      name: `${values.firstName} ${values.lastName}`.trim(),
      date: Number.isNaN(d.getTime())
        ? values.visitDate
        : d.toLocaleDateString('en-SG', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
    };
  }, [success, values]);

  return (
    <section
      id="book"
      className="relative isolate overflow-x-clip bg-gradient-to-br from-forest via-[#3f6514] to-[#2c4a0e] py-[clamp(4.5rem,8vw,7.5rem)] section-pad"
    >
      {/* texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(rgba(155,237,43,0.9) 1.2px, transparent 1.2px)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-[-8%] z-0 h-96 w-96 rounded-full bg-lime/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-[-6%] z-0 h-80 w-80 rounded-full bg-mint/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        ref={revealRef}
        className="shell relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
      >
        {/* ---------------- left column ---------------- */}
        <div className="text-cream">
          <span
            className="reveal inline-flex items-center gap-2 rounded-pill border border-lime/40 bg-white/10 px-4 py-1.5 font-caption text-[11px] font-bold uppercase tracking-[0.22em] text-lime"
          >
            <CalendarDays size={13} /> Free Site Visit
          </span>

          <h2
            className="section-title reveal mt-5 max-w-[15ch] text-[32px] text-cream sm:text-[44px] lg:text-[50px]"
            style={{ '--reveal-delay': '90ms' }}
          >
            Book your free site visit
          </h2>

          <p
            className="reveal mt-5 max-w-[50ch] font-body text-[16px] leading-relaxed text-mint/90"
            style={{ '--reveal-delay': '150ms' }}
          >
            Tell us a little about your space. A Star Landscape specialist will confirm your
            preferred date within 30 minutes — no obligation, no pressure, no hidden fees.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              { icon: Clock, text: 'Reply within 30 minutes, 9am–6pm Mon–Sat' },
              { icon: ShieldCheck, text: 'Free 45-minute on-site consultation' },
              { icon: Check, text: 'Fixed-price proposal within 48 hours' },
            ].map((item, i) => (
              <li
                key={item.text}
                className="reveal flex items-center gap-3 font-body text-[15.5px] text-cream"
                style={{ '--reveal-delay': `${220 + i * 110}ms` }}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime/20 text-lime">
                  <item.icon size={16} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>

          {/* direct contact card */}
          <div
            className="reveal mt-9 grid gap-3 rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:grid-cols-2"
            style={{ '--reveal-delay': '560ms' }}
          >
            <a
              href={BRAND.phoneHref}
              className="group flex items-center gap-3 rounded-box border border-white/15 bg-white/10 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime/60 hover:bg-white/20"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-forest">
                <Phone size={16} />
              </span>
              <span>
                <span className="block font-caption text-[9.5px] uppercase tracking-[0.18em] text-mint/80">
                  Call us
                </span>
                <span className="block font-heading text-[14px] font-bold">{BRAND.phone}</span>
              </span>
            </a>

            <a
              href={BRAND.emailHref}
              className="group flex items-center gap-3 rounded-box border border-white/15 bg-white/10 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime/60 hover:bg-white/20"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-forest">
                <Mail size={16} />
              </span>
              <span>
                <span className="block font-caption text-[9.5px] uppercase tracking-[0.18em] text-mint/80">
                  Email
                </span>
                <span className="block break-all font-heading text-[13.5px] font-bold">
                  {BRAND.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-3 rounded-box border border-white/15 bg-white/10 px-4 py-3.5 sm:col-span-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-forest">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block font-caption text-[9.5px] uppercase tracking-[0.18em] text-mint/80">
                  Singapore Office
                </span>
                <span className="block font-heading text-[14px] font-bold">{BRAND.address}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- right column: glass form ---------------- */}
        <div
          className="reveal-scale glass rounded-[28px] p-6 sm:p-8 lg:p-10"
          style={{ '--reveal-delay': '180ms' }}
        >
          {success ? (
            /* --------------- success state --------------- */
            <div className="flex min-h-[440px] flex-col items-center justify-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-cream shadow-glow">
                <svg viewBox="0 0 52 52" className="check-svg h-10 w-10" fill="none">
                  <path
                    d="M14 27l8.5 8.5L38 19"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <h3 className="mt-7 font-heading text-[26px] font-extrabold tracking-[-0.02em] text-charcoal sm:text-[32px]">
                Request received, {summary?.name?.split(' ')[0] || 'friend'}!
              </h3>
              <p className="mt-3 max-w-[46ch] font-body text-[15.5px] leading-relaxed text-muted">
                Your preferred visit date is{' '}
                <span className="font-semibold text-charcoal">{summary?.date}</span>. Our team will
                confirm the slot by phone within 30 minutes during working hours.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill btn-pill--primary"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  Speed it up on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setValues(EMPTY);
                    setTouched({});
                    setErrors({});
                    setStatus('idle');
                  }}
                  className="btn-pill btn-pill--outline"
                >
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            /* --------------- form --------------- */
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex items-center justify-between gap-4">
                <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
                  Site visit request
                </p>
                <p className="font-caption text-[10.5px] uppercase tracking-[0.16em] text-muted">
                  100% free · No obligation
                </p>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* first name */}
                <div>
                  <label className="sl-label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Wei Ling"
                    value={values.firstName}
                    onChange={set('firstName')}
                    onBlur={blur('firstName')}
                    className={fieldClass('firstName')}
                    aria-invalid={Boolean(touched.firstName && errors.firstName)}
                  />
                  {fieldError('firstName')}
                </div>

                {/* last name */}
                <div>
                  <label className="sl-label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Tan"
                    value={values.lastName}
                    onChange={set('lastName')}
                    onBlur={blur('lastName')}
                    className={fieldClass('lastName')}
                    aria-invalid={Boolean(touched.lastName && errors.lastName)}
                  />
                  {fieldError('lastName')}
                </div>

                {/* email */}
                <div>
                  <label className="sl-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={set('email')}
                    onBlur={blur('email')}
                    className={fieldClass('email')}
                    aria-invalid={Boolean(touched.email && errors.email)}
                  />
                  {fieldError('email')}
                </div>

                {/* phone */}
                <div>
                  <label className="sl-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="91106 49999"
                    value={values.phone}
                    onChange={set('phone')}
                    onBlur={blur('phone')}
                    className={fieldClass('phone')}
                    aria-invalid={Boolean(touched.phone && errors.phone)}
                  />
                  {fieldError('phone')}
                </div>

                {/* visit date */}
                <div>
                  <label className="sl-label" htmlFor="visitDate">
                    Preferred Visit Date
                  </label>
                  <input
                    id="visitDate"
                    name="visitDate"
                    type="date"
                    min={todayISO}
                    value={values.visitDate}
                    onChange={set('visitDate')}
                    onBlur={blur('visitDate')}
                    className={fieldClass('visitDate')}
                    aria-invalid={Boolean(touched.visitDate && errors.visitDate)}
                  />
                  {fieldError('visitDate')}
                </div>

                {/* project type (soft extra — keeps the row balanced) */}
                <div>
                  <label className="sl-label" htmlFor="projectType">
                    Property Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="sl-input"
                    defaultValue="landed"
                  >
                    <option value="landed">Landed House</option>
                    <option value="condo">Condominium / Balcony</option>
                    <option value="commercial">Commercial / Rooftop</option>
                    <option value="bungalow">Bungalow</option>
                  </select>
                </div>

                {/* details */}
                <div className="sm:col-span-2">
                  <label className="sl-label" htmlFor="details">
                    Project Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    placeholder="e.g. 900 sqft back garden in Bukit Timah — lawn, deck and some privacy planting along the side wall."
                    value={values.details}
                    onChange={set('details')}
                    onBlur={blur('details')}
                    className={`sl-input resize-y ${touched.details && errors.details ? 'is-invalid' : ''}`}
                    aria-invalid={Boolean(touched.details && errors.details)}
                  />
                  {fieldError('details')}
                </div>
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-pill btn-pill--primary group mt-7 w-full disabled:cursor-wait"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending your request…
                  </>
                ) : (
                  <>
                    Request My Free Site Visit
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-center font-caption text-[10.5px] uppercase tracking-[0.14em] text-muted">
                <ShieldCheck size={13} className="text-primary" /> Your details stay private — used
                only to arrange your visit
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
