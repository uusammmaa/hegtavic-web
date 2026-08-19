/**
 * How an engagement runs — the hero diagram.
 *
 * ⚠️  Why this exists. The homepage used to render SystemDiagram
 * twice: once in the hero and again in the Generative AI spotlight.
 * The ids were namespaced so the markup was valid, but the two were
 * the same picture, which on mobile means passing an identical
 * diagram twice on one scroll. The RAG pipeline belongs in the
 * Gen-AI section, which is literally about retrieval and grounding;
 * the hero needed a broader statement.
 *
 * Follows the same house rules as SystemDiagram — see that file.
 * Deliberately shares its viewBox and coordinate system so the two
 * read as one family rather than two illustration styles.
 */
export function DeliveryDiagram({
  className,
  id = 'delivery-diagram',
}: {
  className?: string;
  /** Namespace for this instance's ids. Must be unique per page. */
  id?: string;
}) {
  const titleId = `${id}-title`;
  const arrowId = `${id}-arrow`;
  const arrowAccentId = `${id}-arrow-accent`;

  const node = 'fill-[var(--ground-raised)] stroke-[var(--ground-line-strong)]';
  const label = 'fill-[var(--ground-ink-muted)] font-mono text-[9px] tracking-[0.12em] uppercase';
  const nodeText = 'fill-[var(--ground-ink)] font-mono text-[10px]';
  const subText = 'fill-[var(--ground-ink-muted)] font-mono text-[9px]';

  return (
    <svg
      viewBox="0 4 420 248"
      fill="none"
      role="img"
      aria-labelledby={titleId}
      className={className}
    >
      <title id={titleId}>
        How an engagement runs: your goals, existing systems and domain knowledge feed an
        engineering team, which ships to production and is measured, with what is learned
        feeding back into the next iteration.
      </title>

      <defs>
        <marker id={arrowId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1l6 3-6 3z" className="fill-[var(--ground-line-strong)]" />
        </marker>
        <marker
          id={arrowAccentId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 1l6 3-6 3z" className="fill-brand-green" />
        </marker>
      </defs>

      {/* ── What you bring ──────────────────────────────── */}
      <g>
        <text x="18" y="28" className={label}>
          Your side
        </text>
        {[44, 84, 124].map((y) => (
          <rect key={y} x="18" y={y} width="88" height="30" rx="5" className={node} strokeWidth="1" />
        ))}
        <text x="47" y="63" className={nodeText}>
          goals
        </text>
        <text x="41" y="103" className={nodeText}>
          systems
        </text>
        <text x="44" y="143" className={nodeText}>
          domain
        </text>
      </g>

      {/* ── Into the engineering team ───────────────────── */}
      <g className="stroke-[var(--ground-line-strong)]" strokeWidth="1" markerEnd={`url(#${arrowId})`}>
        <path d="M106 59 C 140 59, 140 96, 168 96" />
        <path d="M106 99 H 168" />
        <path d="M106 139 C 140 139, 140 102, 168 102" />
      </g>

      {/* ── The team ────────────────────────────────────── */}
      <rect
        x="168"
        y="76"
        width="96"
        height="46"
        rx="6"
        className="fill-[var(--ground-sunken)] stroke-brand-green"
        strokeWidth="1.5"
      />
      <text x="216" y="95" textAnchor="middle" className={nodeText}>
        engineering
      </text>
      <text x="216" y="110" textAnchor="middle" className={subText}>
        build · verify
      </text>

      {/* ── Team → production ───────────────────────────── */}
      <g className="stroke-brand-green" strokeWidth="1.5" markerEnd={`url(#${arrowAccentId})`}>
        <path d="M264 99 H 306" />
      </g>

      <rect
        x="306"
        y="76"
        width="96"
        height="46"
        rx="6"
        className="fill-[var(--ground-raised)] stroke-[var(--ground-line-strong)]"
        strokeWidth="1"
      />
      <text x="354" y="95" textAnchor="middle" className={nodeText}>
        production
      </text>
      <text x="354" y="110" textAnchor="middle" className={subText}>
        measured
      </text>

      {/* ── Down to what ships ──────────────────────────── */}
      <g className="stroke-[var(--ground-line-strong)]" strokeWidth="1" markerEnd={`url(#${arrowId})`}>
        <path d="M354 122 V 176" />
      </g>

      <text x="18" y="176" className={label}>
        What you get
      </text>
      <rect
        x="18"
        y="188"
        width="384"
        height="52"
        rx="6"
        className="fill-[var(--ground-sunken)] stroke-[var(--ground-line-strong)]"
        strokeWidth="1"
      />
      <text x="38" y="210" className={nodeText}>
        working software
      </text>
      <text x="38" y="226" className={subText}>
        tested · documented · handed over
      </text>

      <circle cx="366" cy="214" r="5" className="fill-brand-green" />
      <text x="352" y="218" textAnchor="end" className={subText}>
        you own it
      </text>

      {/* ── Iteration feedback ──────────────────────────── */}
      <g
        className="stroke-[var(--ground-line-strong)]"
        strokeWidth="1"
        strokeDasharray="3 3"
        markerEnd={`url(#${arrowId})`}
      >
        <path d="M402 214 H 412 V 60 H 216 V 76" />
      </g>
      <text x="300" y="54" textAnchor="middle" className={label}>
        iteration
      </text>
    </svg>
  );
}
