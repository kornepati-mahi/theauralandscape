import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { POSTS } from '../data.js';
import { useBodyLock, useEscape, useReveal } from '../hooks.js';
import SectionHeading from './SectionHeading.jsx';
import TechText from './TechText.jsx';

/* ==================================================================
   Article reader — opens over the journal, scrollable, with the
   interactive wordmark signing off the piece.
   ================================================================== */

function ArticleReader({ post, onClose, onPrev, onNext, index, total }) {
  if (!post) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-charcoal/92 p-0 backdrop-blur-md sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article className="lightbox-in relative my-0 w-full max-w-[900px] overflow-hidden bg-cream shadow-2xl sm:my-6 sm:rounded-[26px]">
        {/* close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-charcoal/75 text-cream shadow-md backdrop-blur transition-all duration-300 hover:scale-105 hover:border-lime hover:bg-forest hover:text-lime sm:right-5 sm:top-5 sm:h-11 sm:w-11"
        >
          <X size={20} />
        </button>

        {/* hero */}
        <div className="relative h-52 overflow-hidden sm:h-72">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />
          <span className="absolute bottom-4 left-5 rounded-pill bg-lime px-3.5 py-1.5 font-caption text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal">
            {post.category}
          </span>
        </div>

        {/* body */}
        <div className="px-5 pb-10 pt-7 sm:px-10 sm:pb-12 sm:pt-9">
          <p className="flex flex-wrap items-center gap-3 font-caption text-[10.5px] uppercase tracking-[0.16em] text-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-primary" /> {post.readTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-line" />
            <span>
              {index + 1} / {total}
            </span>
          </p>

          <h2 className="mt-3 max-w-[22ch] font-heading text-[26px] font-extrabold leading-[1.12] tracking-[-0.03em] text-charcoal sm:text-[36px]">
            {post.title}
          </h2>

          <div className="mt-6 space-y-5">
            {post.body.map((para, i) => (
              <p
                key={i}
                className="max-w-[68ch] font-body text-[16px] leading-[1.75] text-ink/85 sm:text-[17px]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* interactive sign-off */}
          <div className="mt-10 border-t border-line pt-8">
            <p className="font-caption text-[10.5px] font-bold uppercase tracking-[0.2em] text-muted">
              Written by the Star Landscape team
            </p>
            <div className="mt-3 h-[54px] w-full max-w-[340px] sm:h-[66px]">
              <TechText
                text="the aura landscape"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontWeight={800}
                fontSize={58}
                letterSpacing={-0.045}
                align="left"
                color="#161A14"
                accentColor="#5A9E1F"
                reveal="letter"
                reach={150}
                specks={12}
                selection
                labels={false}
                draggable
                clickKick
                intro="type"
                introDuration={1.6}
                guides={false}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* actions */}
          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="#book"
              onClick={onClose}
              className="btn-pill btn-pill--primary w-full sm:w-auto"
            >
              Book a free site visit
              <ArrowUpRight size={17} />
            </a>

            <div className="flex items-center justify-center gap-2.5 sm:justify-end">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous article"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-charcoal transition-all duration-300 hover:-translate-x-0.5 hover:border-primary hover:text-primary"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next article"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-charcoal transition-all duration-300 hover:translate-x-0.5 hover:border-primary hover:text-primary"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>,
    document.body
  );
}

export default function Blog() {
  const [openIndex, setOpenIndex] = useState(null);
  const revealRef = useReveal([]);

  useBodyLock(openIndex !== null);
  useEscape(openIndex !== null, () => setOpenIndex(null));

  const current = openIndex === null ? null : POSTS[openIndex];

  const step = (dir) => {
    setOpenIndex((i) => (i === null ? 0 : (i + dir + POSTS.length) % POSTS.length));
  };

  /* arrow keys inside the reader */
  useEffect(() => {
    if (openIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  return (
    <section id="blog" className="relative overflow-x-clip bg-cream py-[clamp(4.5rem,8vw,7.5rem)] section-pad">
      <div
        className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-limeSoft/60 blur-3xl"
        aria-hidden="true"
      />

      <div ref={revealRef} className="shell relative">
        {/* heading */}
        <SectionHeading
          eyebrow="Garden Journal"
          title="Fresh from the Star Landscape blog"
          lead="Practical guides from our horticulturists and carpenters — written for Singapore homes, not generic landscaping advice."
          action={
            <a
              href="#book"
              className="group inline-flex items-center gap-2 font-heading text-[14px] font-bold text-charcoal transition-colors hover:text-primary"
            >
              Talk to a horticulturist
              <ArrowUpRight
                size={17}
                className="text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          }
        />

        {/* posts */}
        <div className="mt-9 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <article
              key={post.id}
              className="reveal group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 to-transparent" />
                <span className="absolute left-4 top-4 rounded-pill bg-lime px-3.5 py-1.5 font-caption text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-3 font-caption text-[10.5px] uppercase tracking-[0.16em] text-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-primary" /> {post.readTime}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-line" />
                  <span>{post.date}</span>
                </p>

                <h3 className="mt-3 font-heading text-[18px] font-bold leading-snug tracking-[-0.015em] text-charcoal transition-colors duration-300 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 font-body text-[14.5px] leading-relaxed text-muted">
                  {post.excerpt}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="mt-5 inline-flex items-center gap-2 self-start font-heading text-[13.5px] font-bold text-charcoal transition-colors hover:text-primary"
                >
                  Read article
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ===================== READER ===================== */}
      {current && (
        <ArticleReader
          post={current}
          index={openIndex}
          total={POSTS.length}
          onClose={() => setOpenIndex(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </section>
  );
}
