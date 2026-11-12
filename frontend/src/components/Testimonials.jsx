import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from 'lucide-react';
import { REVIEW_META, TESTIMONIALS } from '../data.js';
import { useReveal } from '../hooks.js';

function Stars({ count = 5, size = 16 }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={size} className="fill-current text-[#f5b301]" />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [minHeight, setMinHeight] = useState(340);
  const revealRef = useReveal([]);
  const total = TESTIMONIALS.length;
  const timer = useRef(null);
  const slideRefs = useRef([]);

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused) return undefined;
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => window.clearInterval(timer.current);
  }, [paused, total]);

  /* Ensure card has enough height for the longest review,
     while matching the left column on desktop via grid stretch. */
  useLayoutEffect(() => {
    const slides = slideRefs.current.filter(Boolean);
    if (!slides.length) return undefined;

    const measure = () => {
      const tallest = slides.reduce((max, el) => Math.max(max, el.scrollHeight), 0);
      setMinHeight(Math.max(tallest, 340));
    };
    measure();

    const ro = new ResizeObserver(measure);
    slides.forEach((el) => ro.observe(el));
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [total]);

  return (
    <section
      id="testimonials"
      className="relative overflow-x-clip bg-cream py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[720px] max-w-full -translate-x-1/2 rounded-full bg-mint/50 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:items-stretch">
          {/* ---------------- left: proof ---------------- */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="reveal eyebrow">Social Proof</span>

              <h2
                className="section-title reveal mt-5 max-w-[15ch] text-[32px] sm:text-[44px] lg:text-[48px]"
                style={{ '--reveal-delay': '90ms' }}
              >
                Loved by homeowners island-wide
              </h2>

              <p
                className="reveal mt-4 max-w-[46ch] font-body text-[15.5px] leading-relaxed text-muted"
                style={{ '--reveal-delay': '160ms' }}
              >
                Every review below comes from a completed Star Landscape project — design, build or
                maintenance — right here in Singapore.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {/* rating badge */}
              <div
                className="reveal flex w-fit items-center gap-5 rounded-[24px] border border-line bg-white px-6 py-5 shadow-soft"
                style={{ '--reveal-delay': '240ms' }}
              >
                <div className="text-center">
                  <p className="font-heading text-[44px] font-extrabold leading-none text-charcoal">
                    {REVIEW_META.score}
                  </p>
                  <p className="font-caption text-[10.5px] uppercase tracking-[0.16em] text-muted">
                    out of {REVIEW_META.outOf}
                  </p>
                </div>
                <span className="h-14 w-px bg-line" />
                <div>
                  <Stars size={18} />
                  <p className="mt-2 flex items-center gap-1.5 font-heading text-[13.5px] font-bold text-charcoal">
                    <BadgeCheck size={15} className="text-primary" />
                    {REVIEW_META.count}+ verified local reviews
                  </p>
                  <p className="font-caption text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    Google Reviews · Singapore
                  </p>
                </div>
              </div>

              {/* controls */}
              <div
                className="reveal flex items-center gap-3"
                style={{ '--reveal-delay': '320ms' }}
              >
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous review"
                  className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-charcoal shadow-soft transition-all duration-300 hover:-translate-x-1 hover:border-primary hover:bg-primary hover:text-cream"
                >
                  <ArrowLeft size={19} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next review"
                  className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-charcoal shadow-soft transition-all duration-300 hover:translate-x-1 hover:border-primary hover:bg-primary hover:text-cream"
                >
                  <ArrowRight size={19} />
                </button>

                <div className="ml-2 flex items-center gap-2">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Go to review ${i + 1}`}
                      aria-current={i === index}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === index ? 'w-8 bg-primary' : 'w-2.5 bg-line hover:bg-mint'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- right: slider ---------------- */}
          <div
            className="reveal-scale relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-lift lg:h-full"
            style={{ '--reveal-delay': '180ms' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* decorative quote */}
            <Quote
              size={130}
              className="pointer-events-none absolute -right-3 -top-4 text-mint/60"
              aria-hidden="true"
            />

            {/* Stacked slides filling the card height */}
            <div
              className="relative flex-1 min-h-[340px] sm:min-h-[360px] lg:min-h-0"
              style={{ minHeight: `${minHeight}px` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={t.id}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  aria-hidden={i !== index}
                  className={`absolute inset-0 flex flex-col justify-between p-7 sm:p-9 lg:p-10 transition-opacity duration-500 ${
                    i === index ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Stars size={18} />
                    <span className="inline-flex items-center gap-1.5 rounded-pill bg-mint/70 px-3 py-1 font-caption text-[10.5px] font-bold uppercase tracking-[0.14em] text-forest">
                      <BadgeCheck size={13} /> Verified
                    </span>
                  </div>

                  <blockquote className="my-auto py-5 font-body text-[17px] leading-relaxed text-charcoal sm:text-[19px] lg:text-[21px]">
                    “{t.text}”
                  </blockquote>

                  <figcaption className="flex items-center gap-4 border-t border-line pt-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest font-heading text-[15px] font-extrabold text-lime shadow-sm">
                      {t.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading text-[15.5px] font-bold text-charcoal">
                        {t.name}
                      </p>
                      <p className="truncate font-caption text-[11px] uppercase tracking-[0.14em] text-muted">
                        {t.context}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 font-caption text-[11.5px] font-medium text-muted">
                      <span className="font-bold text-forest">{i + 1}</span>
                      <span className="text-line">/</span>
                      <span>{total}</span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
