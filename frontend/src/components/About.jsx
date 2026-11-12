import { Award, BadgeCheck, Building2, Sun } from 'lucide-react';
import { ABOUT } from '../data.js';
import { useReveal } from '../hooks.js';

const ICONS = [BadgeCheck, Building2, Sun, Award];

export default function About() {
  const revealRef = useReveal([]);

  return (
    <section
      id="about"
      className="relative overflow-x-clip bg-cream py-[clamp(4.5rem,8vw,7.5rem)] section-pad"
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-mint/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-8%] bottom-0 h-72 w-72 rounded-full bg-lime/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        ref={revealRef}
        className="shell relative grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch"
      >
        {/* ---------------- visual ---------------- */}
        <div className="reveal-scale relative order-2 flex flex-col lg:order-1 lg:h-full">
          <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] overflow-hidden rounded-[28px] shadow-lift lg:h-full">
            <img
              src={ABOUT.imageWide}
              alt="Star Landscape team-built tropical garden in Singapore"
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* ---------------- copy ---------------- */}
        <div className="order-1 flex flex-col justify-between lg:order-2 lg:h-full">
          <div>
            <span className="reveal eyebrow">{ABOUT.eyebrow}</span>

            <h2
              className="section-title reveal mt-5 max-w-[20ch] text-[32px] sm:text-[44px] lg:text-[48px]"
              style={{ '--reveal-delay': '90ms' }}
            >
              {ABOUT.title}
            </h2>

            {ABOUT.body.map((para, i) => (
              <p
                key={i}
                className="reveal mt-4 max-w-[58ch] font-body text-[15.5px] leading-relaxed text-muted sm:text-[16px]"
                style={{ '--reveal-delay': `${150 + i * 110}ms` }}
              >
                {para}
              </p>
            ))}

            {/* credentials */}
            <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
              {ABOUT.credentials.map((item, i) => {
                const Icon = ICONS[i] || BadgeCheck;
                return (
                  <li
                    key={item}
                    className="reveal group flex items-center gap-3 rounded-box border border-line bg-white px-4 py-3.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
                    style={{ '--reveal-delay': `${320 + i * 100}ms` }}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint text-forest transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon size={17} />
                    </span>
                    <span className="font-heading text-[13px] font-bold leading-tight text-charcoal">
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="reveal mt-8 flex flex-wrap gap-4" style={{ '--reveal-delay': '720ms' }}>
            <a href="#book" className="btn-pill btn-pill--primary">
              Learn more about us
            </a>
            <a href="#estimate" className="btn-pill btn-pill--outline">
              Estimate my project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
