import { useReveal } from '../hooks.js';
import TechText from './TechText.jsx';

/* ==================================================================
   Brand statement — the wordmark rendered as interactive type.
   Sits as its own section right above the free site visit block.
   ================================================================== */

export default function BrandStatement() {
  const revealRef = useReveal();

  return (
    <section
      id="brand"
      className="relative isolate overflow-hidden bg-cream py-[clamp(3.5rem,6vw,6rem)]"
    >
      {/* dotted field */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.09]"
        style={{
          backgroundImage: 'radial-gradient(rgba(90,158,31,0.9) 1.1px, transparent 1.1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-28 top-1/4 z-0 h-72 w-72 rounded-full bg-mint/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 z-0 h-64 w-64 rounded-full bg-lime/25 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative z-10">
        <p className="reveal text-center font-caption text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          The house behind the hedges
        </p>

        {/* interactive wordmark */}
        <div className="reveal mt-6 h-[120px] w-full sm:h-[180px]">
          <TechText
            text="the aura landscape"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight={800}
            fontSize={190}
            letterSpacing={-0.05}
            align="center"
            color="#161A14"
            accentColor="#5A9E1F"
            reveal="letter"
            reach={220}
            specks={18}
            selection
            labels={false}
            draggable
            bounce={0.4}
            clickKick
            intro="type"
            introDuration={2.2}
            guides={false}
            className="h-full w-full"
          />
        </div>

        <div
          className="reveal mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5"
          style={{ '--reveal-delay': '220ms' }}
        >
          {['Design & build', 'Maintenance', 'Irrigation', 'Vertical green'].map((item) => (
            <span
              key={item}
              className="font-caption text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal/45"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
