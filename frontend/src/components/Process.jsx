import { Hammer, MapPin, PencilRuler, Sprout } from 'lucide-react';
import { PROCESS_STEPS } from '../data.js';
import { useReveal } from '../hooks.js';
import SectionHeading from './SectionHeading.jsx';

const ICONS = { MapPin, PencilRuler, Hammer, Sprout };

export default function Process() {
  const revealRef = useReveal([]);

  return (
    <section
      id="process"
      className="relative overflow-x-clip bg-sand py-[clamp(4.5rem,8vw,7.5rem)] section-pad"
    >
      {/* soft botanical wash */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-mint/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-lime/20 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative">
        <SectionHeading
          eyebrow="How We Work"
          title="Four clear steps from bare ground to thriving garden"
          lead="No mystery, no moving targets. You always know what happens next, what it costs, and who is responsible for it."
        />

        <ol className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon] || MapPin;
            return (
              <li
                key={step.id}
                className="reveal group relative flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow"
                style={{ '--reveal-delay': `${i * 110}ms` }}
              >
                {/* step number watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-5 font-heading text-[76px] font-extrabold leading-none tracking-tighter text-line/70 transition-colors duration-500 group-hover:text-lime/50"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-forest text-lime shadow-glow transition-transform duration-500 group-hover:scale-110">
                  <Icon size={22} />
                </span>

                <h3 className="relative mt-6 font-heading text-[19px] font-extrabold leading-snug tracking-[-0.02em] text-charcoal sm:min-h-[52px]">
                  {step.title}
                </h3>
                <p className="relative mt-3 flex-1 font-body text-[14.5px] leading-relaxed text-muted">
                  {step.copy}
                </p>

                {/* connector line */}
                {i < PROCESS_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-7 top-12 hidden h-px w-7 bg-line lg:block"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
