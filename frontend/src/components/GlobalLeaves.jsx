import { useMemo } from 'react';
import { Leaf } from 'lucide-react';

/* ------------------------------------------------------------------
   GlobalLeaves — ambient biophilic floating leaves drifting across
   the entire page at 60fps without impacting layout or pointer events.
   ------------------------------------------------------------------ */
export default function GlobalLeaves() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        // Distribute gracefully across the screen width (2% to 96%)
        const left = (i * 5.6 + ((i * 37) % 23)) % 96;
        const size = 13 + ((i * 11) % 16); // 13px - 28px
        const duration = 14 + ((i * 7) % 15); // 14s - 28s
        const delay = -(i * 2.1) % duration; // Staggered start so leaves are immediately visible on load
        const x = ((i * 47) % 160) - 70; // Horizontal drift (-70px to +90px)
        const spin = 200 + ((i * 61) % 240); // Tumble angle
        const opacity = 0.3 + ((i % 4) * 0.08); // Crisp visibility against both dark & cream sections
        const isPrimary = i % 4 === 0; // Natural blend of signature lime with occasional rich emerald
        const color = isPrimary ? 'var(--color-primary)' : 'var(--color-lime)';

        return { left, size, duration, delay, x, spin, opacity, color };
      }),
    []
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {leaves.map((l, i) => (
        <span
          key={i}
          className="leaf-particle"
          style={{
            left: `${l.left}%`,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
            '--leaf-x': `${l.x}px`,
            '--leaf-spin': `${l.spin}deg`,
            '--leaf-opacity': l.opacity,
            color: l.color,
          }}
        >
          <Leaf size={l.size} strokeWidth={1.75} />
        </span>
      ))}
    </div>
  );
}

