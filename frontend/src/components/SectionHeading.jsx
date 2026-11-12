/**
 * Shared section heading block — keeps every section on the page using
 * the same eyebrow → title → lead rhythm.
 *
 * `layout="row"`    → eyebrow/title on the left, lead on the right.
 * `layout="stack"`  → everything stacked in one column (for use inside
 *                      a narrow side column, where a %-based max-width
 *                      would collapse the heading to one word per line).
 */
export default function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
  lead,
  dark = false,
  delay = 0,
  action,
  layout = 'row',
  titleClass = '',
}) {
  const titleTone = dark ? 'text-cream' : 'text-charcoal';
  const leadTone = dark ? 'text-cream/65' : 'text-muted';

  const heading = (
    <>
      {eyebrow && (
        <span className={dark ? 'eyebrow eyebrow--dark' : 'eyebrow'}>
          {Icon ? <Icon size={13} /> : null}
          {eyebrow}
        </span>
      )}
      <h2
        className={`section-title mt-5 text-[32px] sm:text-[44px] lg:text-[52px] ${titleTone} ${titleClass}`}
        style={{ '--reveal-delay': `${90 + delay}ms` }}
      >
        {title}
      </h2>
    </>
  );

  if (layout === 'stack') {
    return (
      <div className="reveal">
        {heading}
        {(lead || action) && (
          <div className="mt-5 flex flex-col items-start gap-5">
            {lead && (
              <p className={`section-lead ${leadTone}`} style={{ '--reveal-delay': `${170 + delay}ms` }}>
                {lead}
              </p>
            )}
            {action}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="reveal flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-14">
      <div className="w-full lg:w-auto lg:max-w-[58%]">{heading}</div>

      {(lead || action) && (
        <div className="flex w-full flex-col items-start gap-5 lg:w-auto lg:max-w-[40%] lg:items-end lg:text-right">
          {lead && (
            <p
              className={`section-lead ${leadTone}`}
              style={{ '--reveal-delay': `${170 + delay}ms` }}
            >
              {lead}
            </p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
