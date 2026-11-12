import { useMemo, useRef, useState } from 'react';
import {
  CalendarClock,
  CheckCircle2,
  Leaf,
  MessageCircle,
  Ruler,
  SlidersHorizontal,
} from 'lucide-react';
import { BRAND, ESTIMATE_SERVICES, PROPERTY_TYPES } from '../data.js';
import { WhatsAppIcon } from './Navbar.jsx';

const MIN_AREA = 100;
const MAX_AREA = 5000;

export const CURRENCY_CONFIG = {
  INR: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    label: '₹ INR (India)',
    rateMultiplier: 10,
    monthlyMultiplier: 6,
    unit: 'rupee',
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    locale: 'en-SG',
    label: 'S$ SGD (Singapore)',
    rateMultiplier: 1,
    monthlyMultiplier: 1,
    unit: 'dollar',
  },
};

const money = (n, cur = 'INR') => {
  const cfg = CURRENCY_CONFIG[cur] || CURRENCY_CONFIG.INR;
  return new Intl.NumberFormat(cfg.locale, { maximumFractionDigits: 0 }).format(Math.round(n));
};

export default function Calculator() {
  const [currency, setCurrency] = useState('INR');
  const [property, setProperty] = useState(PROPERTY_TYPES[0]);
  const [service, setService] = useState(ESTIMATE_SERVICES[0]);
  const [area, setArea] = useState(900);
  const areaRef = useRef(null);

  const cfg = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;

  const { low, high, weeksLow, weeksHigh, monthly } = useMemo(() => {
    const raw = area * service.rate * property.multiplier * cfg.rateMultiplier;
    const min = Math.max(1800 * cfg.rateMultiplier, raw * 0.85);
    const max = Math.max(2600 * cfg.rateMultiplier, raw * 1.18);
    const areaFactor = 1 + Math.floor(area / 1500) * 0.35;
    const propFactor = property.id === 'commercial' ? 1.2 : 1;
    return {
      low: min,
      high: max,
      weeksLow: Math.max(1, Math.round(service.weeks[0] * areaFactor * propFactor)),
      weeksHigh: Math.max(2, Math.round(service.weeks[1] * areaFactor * propFactor)),
      monthly: Math.max(
        180 * cfg.monthlyMultiplier,
        (area * 0.9 + 150) * (property.id === 'landed' ? 1.15 : 1) * cfg.monthlyMultiplier
      ),
    };
  }, [area, service, property, cfg]);

  const progress = ((area - MIN_AREA) / (MAX_AREA - MIN_AREA)) * 100;

  return (
    <section
      id="estimate"
      className="relative isolate overflow-x-clip py-[clamp(4.5rem,8vw,7.5rem)] section-pad"
    >
      {/* Green stage — kept inside the section stacking context so it
          actually renders (it previously sat at -z-10 and vanished). */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-forest via-[#3f6514] to-[#2c4a0e]" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.16]"
        style={{
          backgroundImage: 'radial-gradient(rgba(155,237,43,0.9) 1.2px, transparent 1.2px)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/3 z-0 h-72 w-72 rounded-full bg-lime/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-[1fr] lg:gap-12 lg:items-stretch">
        {/* Left copy */}
        <div className="reveal-left flex h-full min-h-full flex-col justify-between text-cream">
          <div>
            <span className="inline-flex items-center gap-2 rounded-pill border border-lime/40 bg-white/10 px-4 py-1.5 font-caption text-[11px] font-bold uppercase tracking-[0.22em] text-lime">
              <SlidersHorizontal size={13} /> Instant Garden Estimate
            </span>

            <h2 className="section-title mt-4 max-w-[15ch] text-[32px] text-cream sm:text-[42px] lg:text-[46px]">
              Know your budget in 15 seconds
            </h2>

            <p className="mt-3.5 max-w-[48ch] font-body text-[15px] leading-relaxed text-mint/90 sm:text-[15.5px]">
              Move the sliders and watch your estimated investment and timeline update live. Every
              project still gets a free on-site assessment before a single {cfg.unit} is quoted.
            </p>

            {/* Quick credentials strip */}
            <div className="mt-5 grid grid-cols-3 gap-2.5 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
              <div className="text-center">
                <p className="font-heading text-[20px] font-extrabold text-lime sm:text-[24px]">15+</p>
                <p className="font-caption text-[10px] uppercase tracking-wider text-mint/80">
                  {currency === 'INR' ? 'Years Experience' : 'Years in SG'}
                </p>
              </div>
              <div className="border-x border-white/15 text-center">
                <p className="font-heading text-[20px] font-extrabold text-lime sm:text-[24px]">500+</p>
                <p className="font-caption text-[10px] uppercase tracking-wider text-mint/80">Gardens Built</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-[20px] font-extrabold text-lime sm:text-[24px]">5.0★</p>
                <p className="font-caption text-[10px] uppercase tracking-wider text-mint/80">Google Rating</p>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5">
              {[
                'Free 45-minute on-site consultation & concept advice',
                'Itemized, fixed-price proposal delivered within 48 hours',
                '12-month workmanship warranty on every build',
                'NParks compliant & BCA registered in-house specialists',
              ].map((item, i) => (
                <li
                  key={item}
                  className="reveal flex items-center gap-3 font-body text-[14px] text-cream sm:text-[14.5px]"
                  style={{ '--reveal-delay': `${i * 80}ms` }}
                >
                  <CheckCircle2 size={18} className="shrink-0 text-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom highlight card */}
          <div
            className="reveal mt-auto pt-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
            style={{ '--reveal-delay': '240ms' }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/20 text-lime">
                  <Leaf size={18} />
                </span>
                <div>
                  <p className="font-heading text-[13.5px] font-bold text-cream">
                    Estimated recurring care
                  </p>
                  <p className="font-caption text-[11.5px] uppercase tracking-wider text-mint">
                    from {cfg.symbol} {money(monthly, currency)} / month
                  </p>
                </div>
              </div>
              <span className="rounded-pill bg-white/10 px-2.5 py-1 font-caption text-[10px] font-semibold uppercase tracking-wider text-lime">
                Optional Care
              </span>
            </div>

            <p className="mt-2.5 border-t border-white/10 pt-2.5 font-body text-[12.5px] leading-relaxed text-cream/70">
              All Star Landscape quotes include complete design, materials, in-house installation, and full site clearance. Zero surprise variations.
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-2 font-caption text-[10px] uppercase tracking-wider text-mint">
              <span className="rounded-md bg-white/10 px-2 py-0.5">✓ BCA Registered</span>
              <span className="rounded-md bg-white/10 px-2 py-0.5">✓ NParks Compliant</span>
              <span className="rounded-md bg-white/10 px-2 py-0.5">✓ In-House Crews</span>
            </div>
          </div>
        </div>

        {/* Right — calculator card */}
        <div
          className="reveal-scale flex h-full min-h-full flex-col justify-between rounded-[28px] border border-white/70 bg-cream/95 p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-7"
          style={{ '--reveal-delay': '140ms' }}
        >
          {/* Property type with integrated currency switcher */}
          <fieldset>
            <div className="flex items-center justify-between gap-2">
              <legend className="flex items-center gap-2 font-heading text-[12.5px] font-bold uppercase tracking-[0.14em] text-charcoal">
                <Ruler size={14} className="text-primary" /> 1. Property Type
              </legend>
              <div className="inline-flex items-center rounded-full border border-line bg-white/90 p-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`rounded-full px-2.5 py-0.5 font-heading text-[10.5px] font-bold transition-all ${currency === 'INR'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-muted hover:text-charcoal'
                    }`}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('SGD')}
                  className={`rounded-full px-2.5 py-0.5 font-heading text-[10.5px] font-bold transition-all ${currency === 'SGD'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-muted hover:text-charcoal'
                    }`}
                >
                  S$ SGD
                </button>
              </div>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {PROPERTY_TYPES.map((p) => {
                const active = property.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProperty(p)}
                    aria-pressed={active}
                    className={`rounded-xl border px-3 py-2 text-left font-heading text-[12.5px] font-semibold transition-all duration-300 ${active
                        ? 'tab-active-pill border-primary bg-primary text-cream shadow-[0_12px_26px_-14px_rgba(90,158,31,0.9)]'
                        : 'border-line bg-white text-charcoal hover:-translate-y-0.5 hover:border-primary/50'
                      }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Service */}
          <fieldset className="mt-3.5">
            <legend className="flex items-center gap-2 font-heading text-[12.5px] font-bold uppercase tracking-[0.14em] text-charcoal">
              <SlidersHorizontal size={14} className="text-primary" /> 2. Desired Service
            </legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ESTIMATE_SERVICES.map((s) => {
                const active = service.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setService(s)}
                    aria-pressed={active}
                    className={`rounded-pill border px-3 py-1 font-heading text-[12px] font-semibold transition-all duration-300 ${active
                        ? 'tab-active-pill border-charcoal bg-charcoal text-cream'
                        : 'border-line bg-white text-charcoal hover:-translate-y-0.5 hover:border-primary hover:text-primary'
                      }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Area slider */}
          <fieldset className="mt-3.5">
            <div className="flex items-end justify-between gap-3">
              <legend className="flex items-center gap-2 font-heading text-[12.5px] font-bold uppercase tracking-[0.14em] text-charcoal">
                3. Approx. Area
              </legend>
              <p className="font-heading text-[18px] font-extrabold text-primary">
                {area}
                <span className="ml-1 font-caption text-[11px] font-bold uppercase tracking-wider text-muted">
                  sqft
                </span>
              </p>
            </div>
            <input
              ref={areaRef}
              type="range"
              className="sl-range mt-2"
              min={MIN_AREA}
              max={MAX_AREA}
              step={50}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              style={{ '--range-progress': `${progress}%` }}
              aria-label="Approximate area in square feet"
            />
            <div className="mt-1 flex justify-between font-caption text-[10px] uppercase tracking-widest text-muted">
              <span>{MIN_AREA} sqft</span>
              <span>{MAX_AREA} sqft</span>
            </div>
          </fieldset>

          {/* Result */}
          <div className="mt-4 overflow-hidden rounded-[20px] border border-line bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="font-caption text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Estimated investment ({cfg.code})
                </p>
                <p className="mt-1.5 whitespace-nowrap font-heading text-[clamp(1.25rem,5.6vw,2rem)] font-extrabold leading-none tracking-[-0.025em] tabular-nums text-charcoal">
                  {cfg.symbol}{money(low, currency)}
                  <span className="mx-1.5 font-body text-[0.78em] font-normal text-muted">–</span>
                  {cfg.symbol}{money(high, currency)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2.5 self-start rounded-xl border border-line bg-sand px-3.5 py-2.5 sm:self-auto">
                <CalendarClock size={16} className="shrink-0 text-primary" />
                <div>
                  <p className="font-caption text-[9.5px] uppercase tracking-widest text-muted">
                    Timeline
                  </p>
                  <p className="font-heading text-[14px] font-bold text-charcoal">
                    {weeksLow}–{weeksHigh} weeks
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3.5 border-t border-line/60 pt-3 font-body text-[12.5px] leading-relaxed text-muted">
              Indicative range for {property.label.toLowerCase()} · {service.label} · {area} sqft.
              Final pricing confirmed after your free site visit.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={`${BRAND.whatsapp}?text=${encodeURIComponent(
                `Hi Star Landscape, I calculated an estimate for ${property.label} (${service.label}, ${area} sqft): ${cfg.symbol}${money(low, currency)} - ${cfg.symbol}${money(high, currency)}. I would like to book a free site visit.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-pill--primary group flex-1 !h-[48px] !text-[13.5px]"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Get my WhatsApp quote
            </a>
            <a href="#book" className="btn-pill btn-pill--outline flex-1 !h-[48px] !text-[13.5px]">
              Book free site visit
            </a>
          </div>

          <p className="mt-3 flex items-center justify-center gap-2 font-caption text-[10px] uppercase tracking-[0.16em] text-muted">
            <MessageCircle size={12} className="text-primary" /> No obligation · Reply within 30 mins
          </p>
        </div>
      </div>
    </section>
  );
}
