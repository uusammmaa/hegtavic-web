/**
 * House diagram style — hand-authored SVG, theme-aware, no
 * external asset. This is the dominant visual element of the
 * site and the replacement for stock photography.
 *
 * Rules for anything added to components/diagrams:
 *   • stroke widths of 1 or 1.5 only
 *   • colour comes from --ground-* and --color-brand-green, so a
 *     diagram works on either ground without a second copy
 *   • text is real <text>, never a path, so it stays selectable
 *     and legible to assistive technology
 *   • decorative diagrams are aria-hidden; explanatory ones get
 *     a <title> and role="img"
 */
export function SystemDiagram({ className }: { className?: string }) {
  const node = 'fill-[var(--ground-raised)] stroke-[var(--ground-line-strong)]';
  const label = 'fill-[var(--ground-ink-muted)] font-mono text-[9px] tracking-[0.12em] uppercase';

  return (
    <svg
      viewBox="0 4 420 248"
      fill="none"
      role="img"
      aria-labelledby="system-diagram-title"
      className={className}
    >
      <title id="system-diagram-title">
        A delivery pipeline: data sources feed a model and retrieval layer, which serve an
        application, with evaluation feeding back into the model.
      </title>

      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1l6 3-6 3z" className="fill-[var(--ground-line-strong)]" />
        </marker>
        <marker
          id="arrow-accent"
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

      {/* ── Sources ─────────────────────────────────────── */}
      <g>
        <text x="18" y="28" className={label}>
          Sources
        </text>
        {[44, 84, 124].map((y) => (
          <rect key={y} x="18" y={y} width="88" height="30" rx="5" className={node} strokeWidth="1" />
        ))}
        <text x="34" y="63" className="fill-[var(--ground-ink)] font-mono text-[10px]">
          documents
        </text>
        <text x="41" y="103" className="fill-[var(--ground-ink)] font-mono text-[10px]">
          systems
        </text>
        <text x="49" y="143" className="fill-[var(--ground-ink)] font-mono text-[10px]">
          events
        </text>
      </g>

      {/* ── Sources → pipeline ──────────────────────────── */}
      <g className="stroke-[var(--ground-line-strong)]" strokeWidth="1" markerEnd="url(#arrow)">
        <path d="M106 59 C 140 59, 140 96, 168 96" />
        <path d="M106 99 H 168" />
        <path d="M106 139 C 140 139, 140 102, 168 102" />
      </g>

      {/* ── Pipeline ────────────────────────────────────── */}
      <rect
        x="168"
        y="76"
        width="96"
        height="46"
        rx="6"
        className="fill-[var(--ground-sunken)] stroke-brand-green"
        strokeWidth="1.5"
      />
      <text x="216" y="95" textAnchor="middle" className="fill-[var(--ground-ink)] font-mono text-[10px]">
        pipeline
      </text>
      <text
        x="216"
        y="110"
        textAnchor="middle"
        className="fill-[var(--ground-ink-muted)] font-mono text-[9px]"
      >
        index · embed
      </text>

      {/* ── Pipeline → retrieval & model ────────────────── */}
      <g className="stroke-brand-green" strokeWidth="1.5" markerEnd="url(#arrow-accent)">
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
      <text x="354" y="95" textAnchor="middle" className="fill-[var(--ground-ink)] font-mono text-[10px]">
        retrieval
      </text>
      <text
        x="354"
        y="110"
        textAnchor="middle"
        className="fill-[var(--ground-ink-muted)] font-mono text-[9px]"
      >
        grounded
      </text>

      {/* ── Down to application ─────────────────────────── */}
      <g className="stroke-[var(--ground-line-strong)]" strokeWidth="1" markerEnd="url(#arrow)">
        <path d="M354 122 V 176" />
      </g>

      <text x="18" y="176" className={label}>
        Application
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
      <text x="38" y="210" className="fill-[var(--ground-ink)] font-mono text-[10px]">
        interface
      </text>
      <text x="38" y="226" className="fill-[var(--ground-ink-muted)] font-mono text-[9px]">
        cited · reviewable · reversible
      </text>

      <circle cx="366" cy="214" r="5" className="fill-brand-green" />
      <text
        x="352"
        y="218"
        textAnchor="end"
        className="fill-[var(--ground-ink-muted)] font-mono text-[9px]"
      >
        human review
      </text>

      {/* ── Evaluation feedback ─────────────────────────── */}
      <g
        className="stroke-[var(--ground-line-strong)]"
        strokeWidth="1"
        strokeDasharray="3 3"
        markerEnd="url(#arrow)"
      >
        <path d="M402 214 H 412 V 60 H 216 V 76" />
      </g>
      <text x="300" y="54" textAnchor="middle" className={label}>
        evaluation
      </text>
    </svg>
  );
}
