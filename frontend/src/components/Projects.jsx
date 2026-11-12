import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from 'lucide-react';
import { PROJECTS, PROJECT_TABS } from '../data.js';
import { useBodyLock, useEscape, useReveal } from '../hooks.js';
import SectionHeading from './SectionHeading.jsx';

const labelOf = (id) => PROJECT_TABS.find((t) => t.id === id)?.label || 'Project';

function ProjectCard({ project, index, onOpen }) {
  return (
    <article
      className="reveal shine-card group relative cursor-pointer overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
      style={{ '--reveal-delay': `${index * 80}ms` }}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} in full screen`}
    >
      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — ${labelOf(project.category)} by Star Landscape`}
          className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.12]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

        {/* category tag */}
        <span className="absolute left-4 top-4 rounded-pill bg-cream/95 px-3.5 py-1.5 font-caption text-[10px] font-bold uppercase tracking-[0.16em] text-forest shadow-soft">
          {labelOf(project.category)}
        </span>

        {/* expand affordance */}
        <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-primary text-cream opacity-0 shadow-glow transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Expand size={17} />
        </span>

        {/* caption */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="flex items-center gap-1.5 font-caption text-[10.5px] font-bold uppercase tracking-[0.18em] text-lime">
            <MapPin size={12} /> {project.location}
          </p>
          <h3 className="mt-1.5 font-heading text-[18px] font-bold leading-tight text-cream sm:text-[20px]">
            {project.title}
          </h3>
          <p className="mt-1.5 max-h-0 overflow-hidden font-body text-[13.5px] leading-relaxed text-cream/75 transition-all duration-500 group-hover:max-h-24">
            {project.note}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(
    () => (active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  const revealRef = useReveal([active]);
  useBodyLock(openIndex !== null);
  useEscape(openIndex !== null, () => setOpenIndex(null));

  const current = openIndex === null ? null : filtered[openIndex] || filtered[0];

  const step = (dir) => {
    setOpenIndex((i) => {
      const base = i === null ? 0 : i;
      return (base + dir + filtered.length) % filtered.length;
    });
  };

  /* arrow keys inside the lightbox */
  useEffect(() => {
    if (openIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, filtered.length]);

  return (
    <section
      id="projects"
      className="relative isolate overflow-x-clip bg-charcoal py-[clamp(4.5rem,8vw,7.5rem)] section-pad"
    >
      {/* botanical texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.10]"
        style={{
          backgroundImage: 'radial-gradient(rgba(155,237,43,0.95) 1.1px, transparent 1.1px)',
          backgroundSize: '26px 26px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 z-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative z-10">
        {/* heading */}
        <SectionHeading
          dark
          eyebrow="Our Projects"
          icon={Expand}
          title="Gardens we have built across Singapore"
          lead={`A selection from 500+ completed residential and commercial projects — tap any card to view it full-screen.`}
        />

        {/* filter tabs */}
        <div
          className="reveal no-scrollbar -mx-5 mt-9 flex gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-1 sm:gap-3"
          style={{ '--reveal-delay': '120ms' }}
          role="tablist"
          aria-label="Filter projects"
        >
          {PROJECT_TABS.map((tab) => {
            const isActive = active === tab.id;
            const count =
              tab.id === 'all'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(tab.id);
                  setOpenIndex(null);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-pill px-5 py-2.5 font-heading text-[13.5px] font-bold transition-all duration-300 ${
                  isActive
                    ? 'tab-active-pill bg-lime text-charcoal shadow-[0_14px_30px_-16px_rgba(155,237,43,0.9)]'
                    : 'border border-white/15 bg-white/5 text-cream/80 hover:-translate-y-0.5 hover:border-lime/60 hover:text-lime'
                }`}
              >
                {tab.label}
                <span
                  className={`grid h-5 min-w-5 place-items-center rounded-full px-1 font-caption text-[10px] ${
                    isActive ? 'bg-charcoal text-lime' : 'bg-white/10 text-cream/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* gallery */}
        <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="reveal mt-12 flex flex-col items-center justify-between gap-5 rounded-[26px] border border-white/12 bg-white/[0.06] px-7 py-7 backdrop-blur-sm sm:px-9 lg:flex-row"
          style={{ '--reveal-delay': '140ms' }}
        >
          <div>
            <p className="font-heading text-[19px] font-bold text-cream sm:text-[24px]">
              Your garden could be the next case study
            </p>
            <p className="mt-1.5 font-body text-[15px] text-cream/60">
              Free site visit, 3D concept and fixed-price proposal — usually within 48 hours.
            </p>
          </div>
          <a href="#book" className="btn-pill btn-pill--light shrink-0 px-8">
            Book my free site visit
          </a>
        </div>
      </div>

      {/* ===================== LIGHTBOX ===================== */}
      {current &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpenIndex(null);
            }}
          >
            <div className="lightbox-in relative flex max-h-[90vh] w-full max-w-[1020px] flex-col overflow-hidden rounded-[24px] border border-white/15 bg-charcoal shadow-2xl">
              {/* close button */}
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close gallery"
                className="absolute right-3.5 top-3.5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-charcoal/80 text-cream shadow-md backdrop-blur transition-all duration-300 hover:scale-105 hover:border-lime hover:bg-forest hover:text-lime sm:right-4 sm:top-4 sm:h-11 sm:w-11"
              >
                <X size={20} />
              </button>

              {/* image container */}
              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/40">
                <img
                  src={current.image}
                  alt={current.title}
                  className="max-h-[55vh] sm:max-h-[60vh] w-full object-contain sm:object-cover"
                />
              </div>

              {/* caption bar */}
              <div className="shrink-0 flex flex-col gap-4 border-t border-white/10 bg-charcoal p-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
                <div className="min-w-0 pr-4">
                  <p className="flex items-center gap-2 font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-lime">
                    <MapPin size={13} /> {labelOf(current.category)} · {current.location}
                  </p>
                  <h3 className="mt-1 font-heading text-[18px] font-extrabold text-cream sm:text-[24px]">
                    {current.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 max-w-[70ch] font-body text-[13.5px] leading-relaxed text-cream/70 sm:text-[14.5px]">
                    {current.note}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-cream transition-all duration-300 hover:-translate-x-0.5 hover:border-lime hover:text-lime sm:h-11 sm:w-11"
                  >
                    <ChevronLeft size={19} />
                  </button>
                  <span className="font-caption text-[11px] font-semibold tracking-[0.16em] text-cream/60">
                    {openIndex + 1} / {filtered.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next project"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-cream transition-all duration-300 hover:translate-x-0.5 hover:border-lime hover:text-lime sm:h-11 sm:w-11"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
