import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { ABOUT, HERO, STATS } from '../data.js';
import { scrollToId, useCountUp, useMagnetic } from '../hooks.js';

/* ---------------- animated stat cell ---------------- */
function StatCell({ stat, index }) {
  const [value, ref] = useCountUp(stat.value, { decimals: stat.decimals || 0 });
  const display = stat.decimals ? value.toFixed(stat.decimals) : Math.round(value);

  return (
    <div
      ref={ref}
      className="reveal relative px-4 py-4 text-center sm:px-6 sm:py-5"
      style={{ '--reveal-delay': `${200 + index * 80}ms` }}
    >
      <p className="font-heading text-[26px] font-extrabold leading-none tracking-[-0.03em] text-cream sm:text-[32px]">
        {display}
        <span className="text-lime">{stat.suffix}</span>
      </p>
      <p className="mx-auto mt-1.5 max-w-[22ch] font-caption text-[10.5px] font-bold uppercase leading-snug tracking-[0.14em] text-cream/65">
        {stat.label}
      </p>
    </div>
  );
}

/* ---------------- hero ---------------- */
export default function Hero() {
  const [offset, setOffset] = useState(0);
  const primaryBtn = useMagnetic(0.22);
  const secondaryBtn = useMagnetic(0.16);

  /* gentle parallax on the background plate */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY, 900));
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-24 sm:pt-28 lg:pb-10"
    >
      {/* ---------- parallax background ----------
          NOTE: this layer must live INSIDE the section's own stacking
          context (`isolate` above) so it is not painted behind the page
          background. Previously it used -z-10 and vanished entirely. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO.background}
          alt="Lush tropical garden designed by Star Landscape in Singapore"
          className="h-[118%] w-full object-cover"
          style={{ transform: `translate3d(0, ${offset * 0.24}px, 0) scale(1.06)` }}
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/45 to-charcoal/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(22,26,20,0.3)_0%,_rgba(22,26,20,0.8)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: 'radial-gradient(rgba(155,237,43,0.9) 1.1px, transparent 1.1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-[-10%] h-[420px] w-[420px] rounded-full bg-lime/15 blur-3xl pointer-events-none" />
      </div>

      {/* ---------- content ---------- */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-shell flex-col items-center justify-center px-5 sm:px-8 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* badge */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/10 px-5 py-2 backdrop-blur-md shadow-md"
            style={{ animation: 'badgePulse 3.2s ease-in-out infinite' }}
          >
            <span className="flex h-2 w-2 rounded-full bg-lime animate-pulse" />
            <span className="font-caption text-[11px] font-bold uppercase leading-tight tracking-[0.2em] text-lime sm:text-[12px]">
              {HERO.badge}
            </span>
          </div>

          {/* headline */}
          <h1 className="mt-7 font-heading text-[38px] font-extrabold leading-[1.06] tracking-[-0.035em] text-cream shadow-text sm:text-[54px] md:text-[64px] lg:text-[72px] xl:text-[80px]">
            Transform Your Outdoor Space With{' '}
            <span className="bg-gradient-to-r from-lime via-[#c4f884] to-white bg-clip-text text-transparent">
              Singapore's Premier
            </span>{' '}
            <span className="text-lime">Landscape Company</span>
          </h1>

          {/* subtitle */}
          <p
            className="reveal mt-6 max-w-[56ch] font-body text-[16px] leading-relaxed text-cream/85 sm:text-[19px] md:text-[20px]"
            style={{ '--reveal-delay': '300ms' }}
          >
            {HERO.subtitle}
          </p>

          {/* CTAs */}
          <div
            className="reveal mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ '--reveal-delay': '500ms' }}
          >
            <button
              ref={primaryBtn.ref}
              type="button"
              onMouseMove={primaryBtn.onMove}
              onMouseLeave={primaryBtn.onLeave}
              onClick={() => scrollToId('#projects')}
              className="btn-pill btn-pill--primary w-full sm:w-auto px-9 text-[15px] shadow-[0_16px_36px_-12px_rgba(155,237,43,0.55)]"
              style={{ transition: 'transform .35s cubic-bezier(.22,1,.36,1), background-color .4s, color .4s, box-shadow .4s' }}
            >
              See Our Projects
              <ArrowRight size={19} />
            </button>

            <button
              ref={secondaryBtn.ref}
              type="button"
              onMouseMove={secondaryBtn.onMove}
              onMouseLeave={secondaryBtn.onLeave}
              onClick={() => scrollToId('#book')}
              className="btn-pill btn-pill--glass w-full sm:w-auto px-8 text-[15px]"
              style={{ transition: 'transform .35s cubic-bezier(.22,1,.36,1), background-color .4s, color .4s, border-color .4s' }}
            >
              Request Free Site Visit
            </button>
          </div>

          {/* trust row */}
          <ul
            className="reveal mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2"
            style={{ '--reveal-delay': '700ms' }}
          >
            {HERO.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-caption text-[11.5px] font-semibold uppercase tracking-[0.14em] text-cream/80 sm:text-[12.5px]"
              >
                <ShieldCheck size={16} className="shrink-0 text-lime" />
                {item}
              </li>
            ))}
            <li className="flex items-center gap-2 font-caption text-[11.5px] font-semibold uppercase tracking-[0.14em] text-cream/80 sm:text-[12.5px]">
              <Star size={15} className="shrink-0 fill-current text-[#f5b301]" />
              5.0 Google Rating (23+ Reviews)
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- stats bar ---------- */}
      <div
        className="reveal relative z-10 mx-auto mt-8 w-full max-w-shell px-5 sm:px-8"
        style={{ '--reveal-delay': '800ms' }}
      >
        <div className="grid grid-cols-2 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/15 bg-charcoal/75 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:divide-y-0 sm:divide-x sm:divide-white/10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
