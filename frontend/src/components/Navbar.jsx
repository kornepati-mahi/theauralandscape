import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, X } from 'lucide-react';
import { BRAND, NAV_LINKS, TOP_NAV } from '../data.js';
import { scrollToId, useBodyLock, useEscape, useScrolled } from '../hooks.js';
import AuraLogo from './AuraLogo.jsx';

/* ---- Brand glyphs (lucide dropped brand icons) ---- */
function FacebookGlyph({ className = 'h-[17px] w-[17px]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.9 3.77-3.9 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.44 2.9h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

function XGlyph({ className = 'h-[15px] w-[15px]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

/* ---- Official WhatsApp glyph (also used by the calculator + FAB) ---- */
export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   The brand logo has been removed from the header per request — the
   wordmark below carries the brand instead.
   ------------------------------------------------------------------ */

/* ------------------------------------------------------------------
   Navbar
   ------------------------------------------------------------------ */
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState('home');
  const timerRef = useRef(null);

  const scrolled = useScrolled(40);
  useBodyLock(mounted);
  useEscape(mounted, () => closeDrawer());

  /* Highlight the section currently in view */
  useEffect(() => {
    const ids = ['home', 'about', 'services', 'projects', 'blog', 'testimonials'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const openDrawer = () => {
    window.clearTimeout(timerRef.current);
    setMounted(true);
    setClosing(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setVisible(true));
    });
  };

  const closeDrawer = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setClosing(true);
    setVisible(false);
    timerRef.current = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, 380);
  }, []);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  /* Drawer links: anchors scroll, service links ping the Services grid */
  const handleLink = (link) => {
    closeDrawer();
    if (link.service) {
      window.setTimeout(
        () => window.dispatchEvent(new CustomEvent('sl:service', { detail: link.service })),
        420
      );
    } else if (link.target) {
      window.setTimeout(() => scrollToId(link.target), 400);
    }
  };

  const handleJump = (selector) => {
    closeDrawer();
    window.setTimeout(() => scrollToId(selector), 400);
  };

  return (
    <>
      {/* ============================ HEADER ============================ */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`nav-shell ${scrolled ? 'nav-shell--solid' : 'nav-shell--top'} border-b`}
        >
          <div className="shell flex h-[60px] items-center justify-between gap-3 sm:h-[68px] sm:gap-6 lg:h-[84px]">
            {/* ---------------- brand logo ---------------- */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex shrink-0 items-center transition-opacity duration-300 hover:opacity-90"
              aria-label="The Aura Landscape Co. Home"
            >
              <AuraLogo
                variant={scrolled ? 'dark' : 'white'}
                className="h-8 w-auto transition-all duration-300 sm:h-10 lg:h-12"
              />
            </a>

            {/* ---------------- desktop nav ---------------- */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 xl:flex xl:gap-8"
            >
              {TOP_NAV.map((link) => (
                <a
                  key={link.id}
                  href={link.target}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.target === '#home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      scrollToId(link.target);
                    }
                  }}
                  className={`nav-link ${scrolled ? '' : 'nav-link--on-hero'} ${
                    active === link.id ? 'is-active' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ---------------- actions ---------------- */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href={BRAND.phoneHref}
                className={`group hidden items-center gap-2.5 rounded-pill border px-3 py-2 transition-all duration-300 hover:border-primary/60 hover:bg-white md:flex md:px-3.5 md:py-2.5 ${
                  scrolled
                    ? 'border-line bg-white/70 hover:bg-white'
                    : 'border-white/25 bg-white/10 text-cream backdrop-blur-md hover:bg-white/20'
                }`}
                title={`Call ${BRAND.phone}`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-mint text-forest transition-transform duration-300 group-hover:scale-110">
                  <Phone size={13} />
                </span>
                <span className="hidden font-heading text-[12.5px] font-bold tracking-tight sm:inline">
                  {BRAND.phone}
                </span>
              </a>

              <a
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('#book');
                }}
                className="btn-pill btn-pill--primary hidden !h-[44px] !px-6 !text-[13.5px] lg:inline-flex"
              >
                Free Site Visit
                <ArrowUpRight size={16} />
              </a>

              {/* burger — mobile / tablet only (desktop uses the inline nav) */}
              <button
                type="button"
                onClick={openDrawer}
                aria-expanded={mounted}
                aria-controls="site-drawer"
                aria-label="Open navigation menu"
                className={`burger-btn group flex items-center gap-2 rounded-full border px-3 py-2 transition-colors duration-300 sm:gap-2.5 sm:px-5 sm:py-2.5 xl:hidden ${
                  scrolled
                    ? 'border-line bg-white/70 hover:bg-white'
                    : 'burger-btn--on-hero border-white/25 bg-white/10 backdrop-blur-md hover:bg-white/20'
                }`}
              >
                <span className="flex w-[21px] flex-col items-end gap-[4px] sm:w-[26px] sm:gap-[5px]">
                  <span className="burger-line" />
                  <span className="burger-line" />
                  <span className="burger-line" />
                </span>
                <span className="burger-label hidden font-heading text-[11px] font-extrabold tracking-[0.16em] text-primary sm:inline">
                  MENU
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================== DRAWER ============================= */}
      {mounted && (
        <div
          id="site-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`drawer-overlay fixed inset-0 z-[70] overflow-x-hidden overflow-y-auto bg-cream ${
            closing ? 'is-closing' : ''
          }`}
          style={{ opacity: visible ? 1 : 0, transition: 'opacity .3s ease' }}
        >
          {/* Decorative blobs - strictly contained to avoid horizontal scroll */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-mint/50 blur-3xl"
            />
            <div
              className="absolute -bottom-40 right-[-10%] h-[460px] w-[460px] rounded-full bg-lime/20 blur-3xl"
            />
          </div>

          <div className="relative mx-auto flex min-h-full max-w-[1320px] flex-col px-5 pb-10 pt-6 sm:px-8 sm:pt-8">
            {/* Top bar with brand logo & close button */}
            <div className="flex items-center justify-between gap-4">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  closeDrawer();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2"
                aria-label="The Aura Landscape Co. Home"
              >
                <AuraLogo
                  variant="dark"
                  className="h-10 sm:h-11 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close navigation menu"
                className="drawer-close grid h-10 w-10 place-items-center rounded-full border border-charcoal/80 bg-white/70 text-charcoal shadow-xs sm:h-12 sm:w-12"
              >
                <X size={20} strokeWidth={2.4} className="sm:hidden" />
                <X size={24} strokeWidth={2.4} className="hidden sm:block" />
              </button>
            </div>

            {/* Links + aside */}
            <div className="mt-8 grid flex-1 gap-10 lg:mt-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
              {/* ---- nav links ---- */}
              <nav aria-label="Main navigation">
                <ul>
                  {NAV_LINKS.map((link, i) => (
                    <li
                      key={link.id}
                      className="drawer-link relative border-b border-line/80"
                      style={{ '--i': i }}
                    >
                      <span className="drawer-bar" aria-hidden="true" />
                      <button
                        type="button"
                        onClick={() => handleLink(link)}
                        className="group flex w-full min-w-0 items-center justify-between gap-3 py-3 pl-3 pr-1 text-left transition-colors hover:bg-forest/[0.03] rounded-lg sm:py-3.5 sm:pl-4 sm:pr-2"
                      >
                        <span className="flex min-w-0 items-baseline gap-2.5 sm:gap-4">
                          <span className="shrink-0 font-caption text-[11px] font-bold tracking-[0.16em] text-muted">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="drawer-label min-w-0 font-heading text-[16px] font-extrabold leading-tight tracking-[-0.015em] text-charcoal sm:text-[24px] lg:text-[32px]">
                            {link.label}
                          </span>
                        </span>
                        <span className="drawer-arrow ml-2 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-cream shadow-xs sm:h-8 sm:w-8">
                          <ArrowUpRight size={14} className="sm:hidden" />
                          <ArrowUpRight size={16} className="hidden sm:block" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* ---- aside details ---- */}
              <div
                className="drawer-link flex flex-col gap-5 pb-4"
                style={{ '--i': NAV_LINKS.length }}
              >
                <div className="rounded-box border border-line bg-white p-6 shadow-card">
                  <p className="flex items-center gap-2 font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
                    <MapPin size={14} /> Singapore Office
                  </p>
                  <p className="mt-3 font-body text-[16px] leading-relaxed text-charcoal">
                    {BRAND.address}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={BRAND.phoneHref}
                      className="flex items-center gap-2.5 font-heading text-[15px] font-bold text-charcoal transition-colors hover:text-primary"
                    >
                      <Phone size={16} className="text-primary" /> {BRAND.phone}
                    </a>
                    <a
                      href={BRAND.emailHref}
                      className="flex items-center gap-2.5 font-heading text-[15px] font-bold text-charcoal transition-colors hover:text-primary"
                    >
                      <Mail size={16} className="text-primary" /> {BRAND.email}
                    </a>
                  </div>
                </div>

                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill btn-pill--primary w-full !h-[48px] !text-[13.5px]"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  Chat with our landscaper
                </a>

                <button
                  type="button"
                  onClick={() => handleJump('#book')}
                  className="btn-pill btn-pill--outline w-full !h-[48px] !text-[13.5px]"
                >
                  Book a free site visit
                </button>

                <div className="mt-1 flex items-center gap-3">
                  <span className="font-caption text-[10.5px] uppercase tracking-[0.2em] text-muted">
                    Follow us
                  </span>
                  <span className="h-px flex-1 bg-line" />
                  <div className="flex items-center gap-2.5">
                    <a
                      href={BRAND.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Star Landscape on Facebook"
                      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-cream"
                    >
                      <FacebookGlyph />
                    </a>
                    <a
                      href={BRAND.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Star Landscape on X (Twitter)"
                      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-cream"
                    >
                      <XGlyph />
                    </a>
                    <a
                      href={BRAND.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Star Landscape on WhatsApp"
                      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-cream"
                    >
                      <WhatsAppIcon className="h-[17px] w-[17px]" />
                    </a>
                  </div>
                </div>

                <p className="font-body text-[13.5px] leading-relaxed text-muted">
                  Mon–Sat, 9am–6pm · Site visits typically booked within 48 hours across Singapore.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
