import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Droplets, LayoutGrid, PencilRuler, Shrub, Waves } from 'lucide-react';
import { SERVICES } from '../data.js';
import { useReveal } from '../hooks.js';
import SectionHeading from './SectionHeading.jsx';

const ICONS = { PencilRuler, Shrub, Droplets, LayoutGrid, Waves };

/**
 * Services — mirrors the layout of the live starlandscape.com.sg section:
 *
 *   LEFT  : a column of service blocks that scroll normally.
 *   RIGHT : a sticky panel that stays pinned while the left column
 *           scrolls past, swapping its artwork to match whichever
 *           service block is currently active.
 *
 * The right panel is pinned with `position: sticky`, so it naturally
 * releases exactly when the left column ends — at which point both
 * columns reach the same height.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const [highlighted, setHighlighted] = useState(null);
  const revealRef = useReveal([]);
  const itemRefs = useRef([]);

  /* Track which service block is in the viewport centre and swap
     the sticky panel's artwork to match. */
  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  /* Deep links from the drawer menu preselect + highlight a service. */
  const handleServiceEvent = useCallback((e) => {
    const id = e.detail;
    const index = SERVICES.findIndex((s) => s.id === id);
    if (index === -1) return;
    setHighlighted(id);
    setActive(index);
    window.setTimeout(() => {
      const card = document.querySelector(`[data-service="${id}"]`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
    window.setTimeout(() => setHighlighted(null), 4200);
  }, []);

  useEffect(() => {
    window.addEventListener('sl:service', handleServiceEvent);
    return () => window.removeEventListener('sl:service', handleServiceEvent);
  }, [handleServiceEvent]);

  return (
    <section
      id="services"
      /* `overflow-x-clip` (not `overflow-hidden`) — it clips the
         decorative bleed without creating a scroll container, so the
         sticky panel on the right still pins correctly. */
      className="relative overflow-x-clip bg-cream py-[clamp(4.5rem,8vw,7.5rem)] section-pad"
    >
      <div
        className="pointer-events-none absolute right-[-10%] top-0 h-96 w-96 rounded-full bg-mint/45 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative">
        {/* Heading */}
        <SectionHeading
          eyebrow="Our Core Services"
          title="Find out what we can do for you"
          lead="Six specialities, one accountable team. Scroll through the list — the panel beside it follows along, and you can jump straight to any service from the menu."
        />

        {/* ---------- two-column scroller ---------- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
          {/* ---------- LEFT: scrolling service blocks ---------- */}
          <div className="order-2 lg:order-1">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon] || Shrub;
              const isActive = active === i;
              const isHighlighted = highlighted === service.id;

              return (
                <article
                  key={service.id}
                  data-index={i}
                  data-service={service.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="reveal scroll-mt-28 border-t border-line py-10 transition-opacity duration-500 first:border-t-0 first:pt-0 lg:py-12"
                  style={{ '--reveal-delay': `${i * 60}ms` }}
                >
                  <div
                    className={`transition-opacity duration-500 ${
                      isActive || isHighlighted ? 'opacity-100' : 'opacity-55'
                    }`}
                  >
                  {/* kicker */}
                  <p className="font-caption text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    {service.kicker}
                  </p>

                  <div className="mt-3 flex items-start gap-4">
                    <span
                      className={`mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-500 ${
                        isActive
                          ? 'bg-forest text-lime shadow-glow'
                          : 'bg-mint/60 text-forest'
                      }`}
                    >
                      <Icon size={21} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-[24px] font-extrabold leading-tight tracking-[-0.025em] text-charcoal sm:text-[30px]">
                        {service.title}
                      </h3>

                      <p className="mt-4 max-w-[54ch] font-body text-[15px] leading-relaxed text-muted sm:text-[16px]">
                        {service.copy}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className="rounded-pill bg-mint/70 px-3 py-1 font-caption text-[10.5px] font-bold uppercase tracking-wider text-forest"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <a
                          href="#book"
                          className="group inline-flex items-center gap-2 font-heading text-[14px] font-bold text-charcoal transition-colors duration-300 hover:text-primary"
                        >
                          Learn more
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1.5"
                          />
                        </a>
                        {service.price && (
                          <span className="rounded-pill bg-lime/90 px-3.5 py-1.5 font-caption text-[10.5px] font-bold uppercase tracking-[0.14em] text-charcoal">
                            {service.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                </article>
              );
            })}
          </div>

          {/* ---------- RIGHT: sticky panel ---------- */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <div className="relative h-[520px] overflow-hidden rounded-[28px] border border-line bg-sand shadow-lift">
                {/* stacked artwork, cross-faded by active index */}
                {SERVICES.map((service, i) => (
                  <div
                    key={service.id}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      active === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
                  </div>
                ))}

                {/* caption */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col p-7 sm:p-9">
                  <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-lime">
                    {SERVICES[active]?.kicker}
                  </p>
                  <p className="mt-2 font-heading text-[22px] font-extrabold leading-tight text-cream sm:text-[26px]">
                    {SERVICES[active]?.title}
                  </p>

                  {/* progress dots */}
                  <div className="mt-5 flex items-center gap-2">
                    {SERVICES.map((service, i) => (
                      <span
                        key={service.id}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === active ? 'w-9 bg-lime' : 'w-4 bg-white/35'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA under the panel */}
              <div className="reveal mt-6 rounded-box border border-line bg-white p-6 shadow-card">
                <p className="font-heading text-[18px] font-bold leading-snug text-charcoal">
                  Not sure which service you need?
                </p>
                <p className="mt-2 font-body text-[14.5px] leading-relaxed text-muted">
                  Get an instant estimate below, or let our landscaper advise you on WhatsApp.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="#estimate" className="btn-pill btn-pill--primary px-7">
                    Open the estimator
                  </a>
                  <a
                    href="https://wa.link/ccoea0"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pill btn-pill--outline px-7"
                  >
                    Chat Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
