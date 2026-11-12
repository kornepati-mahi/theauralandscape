import { ArrowUpRight, Mail, MapPin, Phone, Sprout } from 'lucide-react';
import { BRAND, NAV_LINKS, SERVICES } from '../data.js';
import { scrollToId, useReveal } from '../hooks.js';
import { WhatsAppIcon } from './Navbar.jsx';
import SectionHeading from './SectionHeading.jsx';

/* ==================================================================
   Site map — every route on the page in one glance.
   ================================================================== */

const COMPANY_LINKS = [
  { label: 'Home', target: '#home' },
  { label: 'About Us', target: '#about' },
  { label: 'Our Services', target: '#services' },
  { label: 'How We Work', target: '#process' },
  { label: 'Instant Estimate', target: '#estimate' },
  { label: 'Before & After', target: '#beforeafter' },
  { label: 'Our Projects', target: '#projects' },
  { label: 'Garden Journal', target: '#blog' },
  { label: 'Reviews', target: '#testimonials' },
  { label: 'FAQ', target: '#faq' },
  { label: 'Book a Site Visit', target: '#book' },
];

const SERVICE_LINKS = SERVICES.map((s) => ({
  label: s.title,
  target: '#services',
  service: s.id,
}));

export default function SiteMap() {
  const revealRef = useReveal([]);

  return (
    <section
      id="sitemap"
      className="relative isolate overflow-x-clip bg-sand py-[clamp(4.5rem,8vw,7.5rem)] section-pad"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(90,158,31,0.9) 1.1px, transparent 1.1px)',
          backgroundSize: '26px 26px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 z-0 h-72 w-72 rounded-full bg-mint/60 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative z-10">
        <SectionHeading
          eyebrow="Site Map"
          icon={Sprout}
          title="Every corner of the site, one click away"
          lead="A quick index of the pages, services and ways to reach us — no hunting through menus."
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {/* pages */}
          <div className="reveal">
            <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
              Pages
            </p>
            <ul className="mt-4 grid gap-1 sm:grid-cols-2 md:grid-cols-1">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.target}
                    className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 font-body text-[14.5px] text-charcoal transition-colors duration-300 hover:bg-white hover:text-primary"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-line transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div className="reveal" style={{ '--reveal-delay': '90ms' }}>
            <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
              Services
            </p>
            <ul className="mt-4 grid gap-1">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(
                        new CustomEvent('sl:service', { detail: link.service })
                      );
                      window.setTimeout(
                        () => scrollToId('#services'),
                        420
                      );
                    }}
                    className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 font-body text-[14.5px] text-charcoal transition-colors duration-300 hover:bg-white hover:text-primary"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-line transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#estimate"
                  className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 font-body text-[14.5px] text-charcoal transition-colors duration-300 hover:bg-white hover:text-primary"
                >
                  <span>Instant Garden Estimate</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-line transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div className="reveal" style={{ '--reveal-delay': '180ms' }}>
            <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-primary">
              Get in touch
            </p>

            <div className="mt-4 rounded-[22px] border border-line bg-white p-5 shadow-card">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-forest">
                    <Phone size={14} />
                  </span>
                  <a
                    href={BRAND.phoneHref}
                    className="font-heading text-[14.5px] font-bold text-charcoal transition-colors hover:text-primary"
                  >
                    {BRAND.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-forest">
                    <Mail size={14} />
                  </span>
                  <a
                    href={BRAND.emailHref}
                    className="break-all font-heading text-[14.5px] font-bold text-charcoal transition-colors hover:text-primary"
                  >
                    {BRAND.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-forest">
                    <MapPin size={14} />
                  </span>
                  <p className="font-body text-[13.5px] leading-relaxed text-muted">
                    {BRAND.address}
                  </p>
                </li>
              </ul>

              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-pill--primary mt-5 w-full !h-[46px] !text-[13.5px]"
              >
                <WhatsAppIcon className="h-[17px] w-[17px]" />
                Chat on WhatsApp
              </a>
            </div>

            <p className="mt-4 font-body text-[13px] leading-relaxed text-muted">
              Mon–Sat, 9am–6pm · Site visits typically booked within 48 hours across Singapore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
