import { useState } from 'react';
import {
  ArrowUp,
  Clock,
  Droplets,
  LayoutGrid,
  Mail,
  MapPin,
  PencilRuler,
  Phone,
  Shrub,
  Sprout,
  Waves,
  X,
} from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data.js';
import { scrollToId, useScrolled } from '../hooks.js';
import AuraLogo from './AuraLogo.jsx';
import { WhatsAppIcon } from './Navbar.jsx';

export function InstagramIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

/* ==================================================================
   Floating action widgets — WhatsApp with hover services menu,
   floating Instagram, and back-to-top
   ================================================================== */

const WHATSAPP_SERVICES = [
  {
    id: 'design',
    title: 'Landscape Design',
    desc: 'Thematic gardens, 3D concepts, patio design',
    icon: PencilRuler,
    message: "Hi Star Landscape! 👋 I'm interested in your Landscape Design services for my property. Could you please share more details and arrange a consultation?",
  },
  {
    id: 'maintenance',
    title: 'Landscape Maintenance',
    desc: 'Regular garden upkeep, pruning, plant health',
    icon: Shrub,
    message: "Hi Star Landscape! 👋 I would like to inquire about regular Landscape Maintenance & ongoing garden care packages.",
  },
  {
    id: 'greenwall',
    title: 'Vertical Green Wall',
    desc: 'Indoor & outdoor biophilic green living walls',
    icon: LayoutGrid,
    message: "Hi Star Landscape! 👋 I would like to get a quote for a Vertical Green Wall installation.",
  },
  {
    id: 'paludarium',
    title: 'Paludarium & Terrarium',
    desc: 'Custom water features, bio-active tanks',
    icon: Waves,
    message: "Hi Star Landscape! 👋 I'm interested in custom Paludarium / Terrarium water features.",
  },
  {
    id: 'irrigation',
    title: 'Smart Irrigation Systems',
    desc: 'Automated timers, micro-drip & sprinkler setup',
    icon: Droplets,
    message: "Hi Star Landscape! 👋 I would like to inquire about installing an automated Smart Irrigation System.",
  },
  {
    id: 'visit',
    title: 'Book Free Site Visit',
    desc: '45-minute on-site assessment & advice',
    icon: Sprout,
    message: "Hi Star Landscape! 👋 I'd like to book a Free 45-minute on-site garden assessment with your landscape specialist.",
  },
];

const getWhatsAppUrl = (msg) => {
  const text = msg || "Hi Star Landscape! 👋 I have an inquiry about your landscaping services.";
  return `https://wa.me/${BRAND.whatsappNumber || '919110649999'}?text=${encodeURIComponent(text)}`;
};

export function FloatingWidgets() {
  const showTop = useScrolled(520);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-6">
      {/* back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`grid h-11 w-11 place-items-center rounded-full border border-line bg-cream/95 text-charcoal shadow-soft backdrop-blur transition-all duration-500 hover:border-primary hover:bg-primary hover:text-cream ${
          showTop ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp size={19} />
      </button>

      {/* floating Instagram button directly above WhatsApp — matching 60px diameter & centered */}
      <div className="group relative">
        <span className="pointer-events-none absolute right-full top-1/2 mr-3.5 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-charcoal/90 px-3 py-1.5 font-caption text-[11px] font-bold text-cream shadow-md backdrop-blur group-hover:block transition-all">
          Follow on Instagram
        </span>
        <a
          href={BRAND.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Star Landscape on Instagram"
          className="grid h-[60px] w-[60px] place-items-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_16px_36px_-12px_rgba(220,39,67,0.75)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <InstagramIcon className="h-7 w-7" />
        </a>
      </div>

      {/* interactive WhatsApp Floating Widget with Services Menu */}
      <div
        className="relative"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        {/* Services Dropdown Menu (revealed on hover / tap) */}
        <div
          className={`absolute bottom-[72px] right-0 w-[310px] sm:w-[340px] origin-bottom-right rounded-2xl border border-white/20 bg-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] transition-all duration-300 ${
            menuOpen
              ? 'pointer-events-auto scale-100 opacity-100 translate-y-0'
              : 'pointer-events-none scale-95 opacity-0 translate-y-2'
          }`}
          style={{ backdropFilter: 'blur(16px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-[#075e54] p-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-[#25d366]">
                <WhatsAppIcon className="h-5 w-5 fill-current" />
              </span>
              <div>
                <p className="font-heading text-[13.5px] font-bold leading-tight">Star Landscape</p>
                <p className="flex items-center gap-1.5 font-caption text-[10.5px] text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#25d366] animate-pulse" />
                  Online • Replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close services menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* Prompt */}
          <div className="bg-[#e5ddd5]/30 p-3 border-b border-line/60">
            <div className="rounded-xl bg-white p-2.5 text-[12px] leading-relaxed text-charcoal shadow-xs">
              👋 <strong>Hi! How can we help you?</strong>
              <p className="mt-0.5 text-muted text-[11.5px]">Click any service below to chat directly with our specialist on WhatsApp:</p>
            </div>
          </div>

          {/* Services Quick Select List */}
          <div className="max-h-[290px] overflow-y-auto p-2 space-y-1">
            {WHATSAPP_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={getWhatsAppUrl(s.message)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl p-2.5 transition-all hover:bg-forest/5 hover:border-primary/30 border border-transparent"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-mint text-forest transition-transform group-hover:scale-110">
                      <Icon size={16} />
                    </span>
                    <div className="text-left">
                      <p className="font-heading text-[12.5px] font-bold text-charcoal group-hover:text-primary transition-colors">
                        {s.title}
                      </p>
                      <p className="font-caption text-[10px] text-muted line-clamp-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-[#25d366] opacity-0 group-hover:opacity-100 transition-opacity">
                    Chat ➔
                  </span>
                </a>
              );
            })}
          </div>

          {/* Footer Call Option */}
          <div className="rounded-b-2xl border-t border-line/60 bg-sand/50 p-2.5 text-center">
            <a
              href={BRAND.phoneHref}
              className="inline-flex items-center gap-1.5 font-heading text-[11px] font-bold text-charcoal hover:text-primary transition-colors"
            >
              <Phone size={12} className="text-primary" />
              Or call directly: <span className="text-primary">{BRAND.phone}</span>
            </a>
          </div>
        </div>

        {/* Main WhatsApp pulsing button */}
        <div className="fab-wrap relative">
          <span className="fab-tooltip" role="tooltip">
            Chat on WhatsApp
          </span>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with our landscaper on WhatsApp"
            onClick={(e) => {
              if (window.innerWidth < 768 && !menuOpen) {
                e.preventDefault();
                setMenuOpen(true);
              }
            }}
            className="whatsapp-fab"
          >
            <span className="fab-ripple" aria-hidden="true" />
            <span className="fab-ripple delay" aria-hidden="true" />
            <WhatsAppIcon className="h-7 w-7" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   Footer
   ================================================================== */

const SERVICE_LINKS = NAV_LINKS.filter((l) => l.service);
const PAGE_LINKS = NAV_LINKS.filter((l) => l.target);

export default function Footer() {
  const go = (link) => (e) => {
    e.preventDefault();
    if (link.service) {
      window.dispatchEvent(new CustomEvent('sl:service', { detail: link.service }));
    } else {
      scrollToId(link.target);
    }
  };

  return (
    <footer className="relative isolate overflow-x-clip bg-charcoal pt-16 section-pad sm:pt-20">
      {/* glow */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 z-0 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(155,237,43,0.9) 1.1px, transparent 1.1px)',
          backgroundSize: '26px 26px',
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_0.85fr_0.85fr_1fr] lg:gap-8">
          {/* ---------- brand ---------- */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block w-full max-w-[360px] transition-opacity duration-300 hover:opacity-90"
              aria-label="The Aura Landscape Co. Home"
            >
              <AuraLogo
                variant="white"
                className="h-auto w-full max-w-[220px]"
              />
            </a>

            <p className="mt-4 max-w-[34ch] font-heading text-[16.5px] font-bold leading-snug text-cream">
              {BRAND.tagline}
            </p>
            <p className="mt-2.5 max-w-[42ch] font-body text-[14px] leading-relaxed text-cream/55">
              Designing, building and caring for bespoke gardens — one
              accountable in-house team from concept to the final hedge trim.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-charcoal"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.9 3.77-3.9 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.44 2.9h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
                </svg>
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-[#dc2743] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-[#25d366] hover:bg-[#25d366] hover:text-white"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* ---------- services ---------- */}
          <nav aria-label="Services">
            <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-lime">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href="#services"
                    onClick={go(link)}
                    className="group inline-flex items-center gap-2 font-body text-[14.5px] text-cream/65 transition-colors duration-300 hover:text-lime"
                  >
                    <span className="h-px w-0 bg-lime transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- company ---------- */}
          <nav aria-label="Company">
            <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-lime">
              Company
            </p>
            <ul className="mt-5 space-y-3">
              {PAGE_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.target}
                    onClick={go(link)}
                    className="group inline-flex items-center gap-2 font-body text-[14.5px] text-cream/65 transition-colors duration-300 hover:text-lime"
                  >
                    <span className="h-px w-0 bg-lime transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- contact ---------- */}
          <div>
            <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-lime">
              Get in touch
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-lime">
                  <MapPin size={15} />
                </span>
                <a
                  href="https://maps.google.com/?q=111+Somerset+Road+Singapore+238164"
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-[14.5px] leading-relaxed text-cream/65 transition-colors hover:text-lime"
                >
                  {BRAND.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-lime">
                  <Phone size={15} />
                </span>
                <a
                  href={BRAND.phoneHref}
                  className="font-heading text-[15px] font-bold text-cream transition-colors hover:text-lime"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-lime">
                  <Mail size={15} />
                </span>
                <a
                  href={BRAND.emailHref}
                  className="break-all font-heading text-[15px] font-bold text-cream transition-colors hover:text-lime"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-lime">
                  <Clock size={15} />
                </span>
                <span className="font-body text-[14.5px] text-cream/65">Mon–Sat, 9am–6pm</span>
              </li>
            </ul>

            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-pill--light mt-6 w-full"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              WhatsApp us now
            </a>
          </div>
        </div>

        {/* ---------- trust strip ---------- */}
        <div className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-3">
          {[
            { icon: Sprout, title: '90-day plant guarantee', copy: 'We replace anything that struggles.' },
            { icon: ShieldCheckIcon, title: 'BCA registered contractor', copy: 'Full compliance paperwork handled.' },
            { icon: Clock, title: 'Reply within 30 minutes', copy: 'Mon–Sat, 9am–6pm working hours.' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime/15 text-lime">
                <item.icon size={19} />
              </span>
              <div>
                <p className="font-heading text-[14px] font-bold text-cream">{item.title}</p>
                <p className="mt-0.5 font-body text-[13px] text-cream/50">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="flex flex-col items-center justify-between gap-4 pb-20 pt-7 sm:flex-row sm:pb-7">
          <p className="font-body text-[13.5px] text-center text-cream/50 sm:text-left">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. ·{' '}
            {BRAND.addressShort}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-2 font-caption text-[10.5px] uppercase tracking-[0.16em] text-cream/45">
            BCA Registered Contractor
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            NParks-Compliant Crews
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            5.0★ Google Rating
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Small inline shield glyph so the footer trust strip needs no extra import */
function ShieldCheckIcon({ size = 24, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
