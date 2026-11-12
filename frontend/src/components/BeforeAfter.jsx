import { useCallback, useEffect, useRef, useState } from 'react';
import { MoveHorizontal, Sparkles } from 'lucide-react';
import { BEFORE_AFTER } from '../data.js';
import { useReveal } from '../hooks.js';
import SectionHeading from './SectionHeading.jsx';

export default function BeforeAfter() {
  const [split, setSplit] = useState(50);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const revealRef = useReveal([]);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(97, Math.max(3, pct)));
  }, []);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const stopDrag = () => {
    draggingRef.current = false;
  };

  /* Keyboard control */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setSplit((s) => Math.max(3, s - 4));
    if (e.key === 'ArrowRight') setSplit((s) => Math.min(97, s + 4));
  };

  /* Gentle auto-demo on first view so users discover the interaction */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const from = 50;
        const to = 68;
        const tick = (now) => {
          const t = Math.min((now - start) / 1400, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          if (!draggingRef.current) setSplit(from + (to - from) * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="beforeafter" className="relative overflow-x-clip bg-cream py-[clamp(4.5rem,8vw,7.5rem)] section-pad">
      <div ref={revealRef} className="shell">
        {/* Heading */}
        <SectionHeading
          eyebrow="Before & After"
          icon={MoveHorizontal}
          title="Drag to watch a bare patio become a retreat"
          lead={`${BEFORE_AFTER.title} — ${BEFORE_AFTER.subtitle}`}
        />

        {/* Slider */}
        <div
          ref={containerRef}
          className="ba-container reveal-scale mt-10 aspect-[16/11] w-full rounded-[26px] shadow-soft sm:aspect-[16/9]"
          style={{ '--ba-split': `${split}%`, '--reveal-delay': '120ms' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onPointerLeave={stopDrag}
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          onKeyDown={onKeyDown}
        >
          {/* BEFORE (base layer) */}
          <img
            src={BEFORE_AFTER.before}
            alt="Bare rooftop patio before landscaping"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            loading="lazy"
          />

          {/* AFTER (clipped layer) */}
          <div className="ba-after">
            <img
              src={BEFORE_AFTER.after}
              alt="Lush tropical patio after Star Landscape transformation"
              className="h-full w-full object-cover"
              draggable={false}
              loading="lazy"
            />
          </div>

          {/* Labels */}
          <span className="absolute left-4 top-4 rounded-pill bg-charcoal/80 px-4 py-1.5 font-caption text-[11px] font-bold uppercase tracking-[0.2em] text-cream backdrop-blur sm:left-6 sm:top-6">
            Before
          </span>
          <span
            className="absolute top-4 rounded-pill bg-primary px-4 py-1.5 font-caption text-[11px] font-bold uppercase tracking-[0.2em] text-cream backdrop-blur sm:top-6"
            style={{
              left: `calc(${split}% + 16px)`,
              right: 'auto',
              opacity: split < 84 ? 1 : 0,
              transition: 'opacity .3s ease',
            }}
          >
            After
          </span>

          {/* Handle */}
          <div className="ba-handle" style={{ left: `${split}%` }}>
            <div className="ba-knob">
              <MoveHorizontal size={22} className="text-primary" />
            </div>
          </div>

          {/* Hint */}
          <span
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-pill bg-cream/90 px-4 py-2 font-caption text-[10.5px] font-bold uppercase tracking-[0.18em] text-charcoal shadow-soft backdrop-blur transition-opacity duration-500 sm:bottom-6"
            style={{ opacity: split > 46 && split < 54 ? 1 : 0.55 }}
          >
            <MoveHorizontal size={14} className="text-primary" /> Drag the handle
          </span>
        </div>

        {/* CTA row */}
        <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-5 rounded-box border border-line bg-white p-6 shadow-card sm:p-7">
          <div className="flex items-start gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
              <Sparkles size={19} />
            </span>
            <div>
              <p className="font-heading text-[16px] font-bold text-charcoal">
                Your space could be next — transformation in as little as 14 days
              </p>
              <p className="mt-1 font-body text-[14.5px] text-muted">
                Free site visit, 3D concept and fixed-price proposal at no cost.
              </p>
            </div>
          </div>
          <a href="#book" className="btn-pill btn-pill--primary group px-8">
            Book my free site visit
          </a>
        </div>
      </div>
    </section>
  );
}
