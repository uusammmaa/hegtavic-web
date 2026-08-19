import type { CaseStudyMetric } from '@/lib/content/case-studies';

/**
 * The outcome table on a case study.
 *
 * Rendered as a real <table> rather than a grid of cards: these are
 * before/after pairs, the relationship between the columns is the
 * point, and a screen reader should announce "median time to route,
 * before 31 hours, after 19 minutes" rather than six loose numbers.
 *
 * Scrolls inside its own container on narrow viewports so the page
 * body never scrolls horizontally.
 */
export function OutcomeMetrics({ metrics }: { metrics: readonly CaseStudyMetric[] }) {
  const hasBefore = metrics.some((metric) => metric.before);
  const hasDelta = metrics.some((metric) => metric.delta);

  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[30rem] border-collapse text-left">
        <caption className="sr-only">Measured outcomes</caption>
        <thead>
          <tr className="border-b border-[var(--ground-line-strong)]">
            <th
              scope="col"
              className="py-3 pr-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]"
            >
              Measure
            </th>
            {hasBefore ? (
              <th
                scope="col"
                className="py-3 pr-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]"
              >
                Before
              </th>
            ) : null}
            <th
              scope="col"
              className="py-3 pr-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]"
            >
              After
            </th>
            {hasDelta ? (
              <th
                scope="col"
                className="py-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]"
              >
                Change
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.label} className="border-b border-[var(--ground-line)]">
              <th
                scope="row"
                className="py-4 pr-6 text-[0.9375rem] font-normal text-[var(--ground-ink-muted)]"
              >
                {metric.label}
              </th>
              {hasBefore ? (
                <td className="py-4 pr-6 font-mono text-[0.875rem] text-[var(--ground-ink-muted)]">
                  {metric.before ?? '—'}
                </td>
              ) : null}
              <td className="py-4 pr-6 font-mono text-[1rem] font-medium text-[var(--ground-ink)]">
                {metric.after}
              </td>
              {hasDelta ? (
                <td className="py-4 font-mono text-[0.875rem] text-[var(--ground-accent-ink)]">
                  {metric.delta ?? ''}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
