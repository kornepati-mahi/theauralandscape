import { useCallback, useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   Reveal-on-scroll — a single IntersectionObserver is shared by every
   `.reveal`, `.reveal-left` and `.reveal-scale` element on the page.
------------------------------------------------------------------- */

const REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-scale';

let sharedObserver = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        sharedObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  return sharedObserver;
}

export function observeReveals(root) {
  const scope = root || document;
  if (!scope || typeof scope.querySelectorAll !== 'function') return;
  const observer = getObserver();
  scope.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (!el.classList.contains('is-visible')) observer.observe(el);
  });
}

/**
 * Attach the shared reveal observer to a container (or the whole document).
 * Re-runs whenever `deps` change so freshly rendered children animate in.
 */
export function useReveal(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => observeReveals(ref.current));
    return () => window.cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/* ------------------------------------------------------------------
   Animated number counter — starts when the element scrolls into view.
------------------------------------------------------------------- */

export function useCountUp(target, { duration = 1700, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
        setValue(Number((target * eased).toFixed(decimals)));
        if (t < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      setValue(target);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        run();
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [target, duration, decimals]);

  return [value, ref];
}

/* ------------------------------------------------------------------
   Body scroll lock — used by the fullscreen drawer & lightbox.
------------------------------------------------------------------- */

export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}

/* ------------------------------------------------------------------
   Escape-to-close helper.
------------------------------------------------------------------- */

export function useEscape(active, handler) {
  const saved = useRef(handler);
  saved.current = handler;

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') saved.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);
}

/* ------------------------------------------------------------------
   Smooth anchor scrolling (with fixed-header offset).
------------------------------------------------------------------- */

export function scrollToId(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  /* header offset — the bar is shorter on phones */
  const offset = window.innerWidth >= 1024 ? 84 : 68;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ------------------------------------------------------------------
   Magnetic hover — pulls an element gently toward the cursor.
------------------------------------------------------------------- */

export function useMagnetic(strength = 0.28) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || window.matchMedia('(hover: none)').matches) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0px, 0px)';
  }, []);

  return { ref, onMove, onLeave };
}

/* ------------------------------------------------------------------
   Scroll position helper (used for header + back-to-top states).
------------------------------------------------------------------- */

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return scrolled;
}
