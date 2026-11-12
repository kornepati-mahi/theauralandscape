import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '../data.js';
import { useReveal } from '../hooks.js';
import SectionHeading from './SectionHeading.jsx';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const revealRef = useReveal([]);

  return (
    <section
      id="faq"
      className="relative overflow-x-clip bg-cream py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute right-[-10%] top-0 h-96 w-96 rounded-full bg-mint/40 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ---------------- intro ---------------- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            layout="stack"
            eyebrow="Questions"
            title="Everything you wanted to ask before we start"
            lead="Straight answers on cost, timing and what actually happens on site. Still unsure? WhatsApp us and a landscaper will reply within 30 minutes."
          />

          <a
            href="#book"
            className="btn-pill btn-pill--primary reveal mt-8"
            style={{ '--reveal-delay': '260ms' }}
          >
            Ask us directly
          </a>
        </div>

        {/* ---------------- accordion ---------------- */}
        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-card">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="reveal" style={{ '--reveal-delay': `${i * 70}ms` }}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left transition-colors duration-300 hover:bg-cream/70 sm:px-8 sm:py-7"
                  >
                    <span
                      className={`font-heading text-[16px] font-extrabold leading-snug tracking-[-0.015em] transition-colors duration-300 sm:text-[17.5px] ${
                        isOpen ? 'text-primary' : 'text-charcoal'
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-400 ${
                        isOpen
                          ? 'rotate-180 bg-primary text-cream'
                          : 'bg-mint text-forest'
                      }`}
                    >
                      {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                    </span>
                  </button>
                </h3>

                <div
                  className="grid transition-all duration-500"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-7 pr-14 font-body text-[15px] leading-relaxed text-muted sm:px-8 sm:pb-8 sm:pr-16">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
