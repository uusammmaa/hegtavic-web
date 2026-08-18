/**
 * Capability page content.
 *
 * Headings and summaries are taken from the brand brief. The
 * supporting detail describes engineering practice, not client
 * work — nothing here asserts an outcome, a metric or a named
 * engagement, so none of it requires verification before launch.
 *
 * The six headline capabilities appear in the primary nav and on
 * the homepage. `digital-platforms` is deliberately excluded from
 * both: it is a retained service, kept reachable but demoted so it
 * does not define the positioning. See lib/navigation.ts.
 */

export type Capability = {
  slug: string;
  title: string;
  /** Short label for nav and cards. */
  navLabel: string;
  /** One line for the mega-menu. Shorter than `summary`. */
  navDescription: string;
  /** Homepage section heading, where the brief specifies one. */
  sectionHeading?: string;
  summary: string;
  lede: string;
  /** What the engagement actually produces. */
  delivers: { title: string; body: string }[];
  /** How the work is approached — the part buyers actually read. */
  approach: { title: string; body: string }[];
  stack: string[];
  /** Excluded from the primary nav and homepage grid. */
  demoted?: boolean;
};

export const capabilities: Capability[] = [
  {
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    navLabel: 'AI & Machine Learning',
    navDescription: 'Machine learning, NLP, computer vision and predictive systems.',
    sectionHeading: 'Turn Data Into Intelligence',
    summary:
      'Turn data into intelligence with machine learning, deep learning, NLP, computer vision and predictive analytics.',
    lede: 'Most machine learning work fails on the way to production, not in the notebook. We build models that are evaluated honestly, deployed properly and monitored once they are live.',
    delivers: [
      {
        title: 'Predictive models',
        body: 'Forecasting, classification, scoring and ranking against your own historical data — with a baseline you can compare to.',
      },
      {
        title: 'Natural language processing',
        body: 'Extraction, classification and summarisation over documents, transcripts, tickets and correspondence.',
      },
      {
        title: 'Computer vision',
        body: 'Detection, recognition and quality inspection, including models exported to run at the edge.',
      },
      {
        title: 'Evaluation harnesses',
        body: 'A held-out set, an agreement metric and a regression gate — so a model change cannot quietly make things worse.',
      },
    ],
    approach: [
      {
        title: 'A baseline before a model',
        body: 'The first deliverable is the simplest thing that could work and a number to beat. It is common for that baseline to be good enough, and knowing so early saves the budget for the problems that genuinely need a model.',
      },
      {
        title: 'Evaluation is the deliverable',
        body: 'A model without a held-out set and a defined success metric cannot be improved or defended. We build the evaluation harness first and treat accuracy regressions as build failures, not as discoveries made in production.',
      },
      {
        title: 'Built to be deployed',
        body: 'Inference behind a versioned API, reproducible training, monitored drift. A model that only runs on the researcher’s machine has not been delivered.',
      },
    ],
    stack: ['Python', 'PyTorch', 'scikit-learn', 'ONNX', 'FastAPI', 'Docker', 'MLflow'],
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI & Intelligent Automation',
    navLabel: 'Generative AI & Intelligent Automation',
    navDescription: 'LLMs, RAG, AI agents, document intelligence and workflow automation.',
    sectionHeading: 'Build With Generative AI',
    summary:
      'Build intelligent applications with LLMs, RAG, AI assistants, agents, document intelligence and workflow automation.',
    lede: 'Language models are easy to demonstrate and hard to put into production. The difference is almost entirely in grounding, evaluation and knowing where a human still belongs in the loop.',
    delivers: [
      {
        title: 'Retrieval-augmented generation',
        body: 'Answers grounded in your own documents and data, with citations back to the source rather than plausible-sounding invention.',
      },
      {
        title: 'AI assistants and agents',
        body: 'Tool-using systems that read, retrieve and act inside your existing software, with explicit limits on what they may do unsupervised.',
      },
      {
        title: 'Document intelligence',
        body: 'Classification, extraction and routing across PDFs, scans, email and transcripts, normalised into structured records.',
      },
      {
        title: 'Workflow automation',
        body: 'The repetitive judgement work between systems — triage, routing, summarising, drafting — with review where the cost of being wrong is high.',
      },
    ],
    approach: [
      {
        title: 'Grounded, and able to show its work',
        body: 'Every factual claim a system makes should point at the source it came from. Citation is not a feature we add for polish; it is what makes an answer checkable, and it is usually what gets a system approved internally.',
      },
      {
        title: 'A human stays where it matters',
        body: 'We set an explicit confidence threshold above which nothing proceeds without review, and record every override. Those overrides become the evaluation set, so the system improves from real disagreements.',
      },
      {
        title: 'Evaluated on your data, not a benchmark',
        body: 'Public benchmarks say little about your documents. We build a held-out set from your material and re-score it on every deployment, so a prompt or model change that degrades quality fails before release.',
      },
      {
        title: 'Cost and latency are design constraints',
        body: 'Token cost, context strategy and caching are decided early, because they determine whether a working prototype is affordable at your actual volume.',
      },
    ],
    stack: ['Python', 'LLM APIs', 'RAG', 'pgvector', 'LangGraph', 'FastAPI', 'TypeScript'],
  },
  {
    slug: 'software-product-engineering',
    title: 'Software & Product Engineering',
    navLabel: 'Software & Product Engineering',
    navDescription: 'Web applications, SaaS platforms, APIs and custom software.',
    sectionHeading: 'Build Digital Products That Scale',
    summary:
      'Scalable digital products, web applications, SaaS platforms, APIs and custom software built around your requirements.',
    lede: 'Software that has to keep working for years is a different discipline from software that has to demo well. We build for the second year, not the first sprint.',
    delivers: [
      {
        title: 'Web applications and SaaS platforms',
        body: 'Multi-tenant products with the parts that are genuinely hard done properly: authentication, permissions, billing and audit.',
      },
      {
        title: 'APIs and integrations',
        body: 'Versioned, documented interfaces, and the unglamorous work of talking to systems that were not designed to be talked to.',
      },
      {
        title: 'Custom internal software',
        body: 'The operational tools a business runs on, built around how the work is actually done rather than how a generic product assumes it is.',
      },
      {
        title: 'Full-stack engineering',
        body: 'From considered interfaces to the services behind them, on architectures chosen for the problem rather than for fashion.',
      },
    ],
    approach: [
      {
        title: 'Boring architecture on purpose',
        body: 'A relational database and a well-structured monolith carry most products a long way. We introduce complexity when there is a specific reason, and we can name the reason.',
      },
      {
        title: 'Tests where they earn their keep',
        body: 'Heavy coverage on money, permissions and data integrity; light coverage on presentation. Coverage percentage is a poor target — what matters is whether the paths that would be expensive to get wrong are protected.',
      },
      {
        title: 'Deployable from the first week',
        body: 'CI, environments and a release path exist before features accumulate. Teams that cannot deploy safely stop shipping, and recovering from that costs more than doing it at the start.',
      },
    ],
    stack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    slug: 'data-engineering',
    title: 'Data Engineering & Analytics',
    navLabel: 'Data Engineering & Analytics',
    navDescription: 'Pipelines, warehouses and analytics that decisions can rest on.',
    summary:
      'Reliable data foundations, pipelines, analytics and dashboards that help businesses make better decisions.',
    lede: 'Analytics is only worth as much as the pipeline underneath it. Most reporting problems are not dashboard problems.',
    delivers: [
      {
        title: 'Pipelines and ingestion',
        body: 'Scheduled and event-driven movement of data between systems, with alerting that names what failed instead of failing silently.',
      },
      {
        title: 'Warehouse modelling',
        body: 'Layered, tested and documented models, so a number on a dashboard can be traced back to where it came from.',
      },
      {
        title: 'Legacy migration',
        body: 'Replacing undocumented reporting systems by running old and new side by side until they agree, and investigating every disagreement.',
      },
      {
        title: 'Dashboards and reporting',
        body: 'Reporting built around the decisions it supports, rather than every metric that happens to be available.',
      },
    ],
    approach: [
      {
        title: 'Reconciliation is the deliverable',
        body: 'When replacing a system nobody fully understands, the parallel-run period is where the value is. It is where genuine long-standing errors surface, and we quote for it rather than treating it as overhead.',
      },
      {
        title: 'Tested like software',
        body: 'Data models get tests, version control and lineage. A pipeline without tests is a report nobody can defend when a number looks wrong.',
      },
      {
        title: 'Failures are loud',
        body: 'A partial failure that silently publishes incomplete data is worse than an outage, because the numbers still look plausible. Runs alert, and they refuse to publish partial results.',
      },
    ],
    stack: ['Python', 'dbt', 'PostgreSQL', 'Airflow', 'Dagster', 'Snowflake', 'BigQuery'],
  },
  {
    slug: 'cloud-modernization',
    title: 'Cloud & Modernization',
    navLabel: 'Cloud & Modernization',
    navDescription: 'Modernising existing systems for scale, reliability and maintainability.',
    summary:
      'Modernize existing applications and infrastructure to improve scalability, reliability and maintainability.',
    lede: 'Most systems that need modernising do not need rewriting. They need to become deployable, observable and safe to change.',
    delivers: [
      {
        title: 'Observability first',
        body: 'Error tracking, structured logging and alerting, so incidents are diagnosed from data rather than from customer emails.',
      },
      {
        title: 'Deployment and CI',
        body: 'A pipeline, environments and a release path that make deploying an ordinary weekday activity rather than a Friday-night event.',
      },
      {
        title: 'Infrastructure migration',
        body: 'Moving between hosts or into containers once deploys are boring enough to make it safe, with cost as an explicit goal.',
      },
      {
        title: 'Incremental refactoring',
        body: 'Strangling problem areas behind stable interfaces, without a feature freeze and without a rewrite nobody can afford.',
      },
    ],
    approach: [
      {
        title: 'Measure before fixing',
        body: 'Fixing the incidents that hurt most recently is the wrong order. Observability comes first, because the real distribution of failures is rarely what anyone guessed.',
      },
      {
        title: 'No rewrite unless it is genuinely warranted',
        body: 'A working system that makes money is an asset. Rewrites are the most expensive available answer and are rarely the right one; we will say so plainly when we think so.',
      },
      {
        title: 'Capability, not dependency',
        body: 'The point is that your team can maintain what we leave behind. We pair rather than work in isolation, and the engagement is designed to end.',
      },
    ],
    stack: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GCP', 'GitHub Actions', 'OpenTelemetry'],
  },
  {
    slug: 'dedicated-teams',
    title: 'Dedicated Engineering Teams',
    navLabel: 'Dedicated Engineering Teams',
    navDescription: 'Skilled engineers working as an extension of your team.',
    sectionHeading: 'Extend Your Engineering Team',
    summary:
      'Extend your capacity with AI/ML, software, backend, frontend and data engineers working as part of your team.',
    lede: 'The failure mode of outsourced engineering is a team that never develops any real understanding of the product, so every task has to be specified to a depth that makes delegation pointless. Continuity is the whole answer.',
    delivers: [
      {
        title: 'A dedicated team',
        body: 'Named engineers working only on your product, in your standups, on your board — not a pool of interchangeable capacity.',
      },
      {
        title: 'Individual augmentation',
        body: 'One or two senior engineers into an existing team, working inside your process rather than alongside it.',
      },
      {
        title: 'Specialist capability',
        body: 'A specific skill your team does not have and does not need permanently — usually AI/ML or data engineering.',
      },
    ],
    approach: [
      {
        title: 'Small and senior, deliberately',
        body: 'We staff squads of two to four experienced engineers. We are a small team and we say so: a buyer who discovers that after signing is right to be annoyed, and being explicitly small and senior is a stronger position than a vague claim to scale.',
      },
      {
        title: 'Continuity over headcount',
        body: 'Rotation is the thing that destroys the value of a long engagement. We plan handovers with overlap and treat an unplanned rotation as a failure on our side.',
      },
      {
        title: 'Working hours that overlap yours',
        body: 'For North American engagements our engineers work afternoons and evenings Pakistan time, which is morning on the US East Coast. Every engagement has one named engineer reachable in your working hours and a written handover waiting when you start.',
      },
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    slug: 'digital-platforms',
    title: 'Digital & E-Commerce Platforms',
    navLabel: 'Digital & E-Commerce Platforms',
    navDescription: 'Websites, e-commerce and content platforms, engineered properly.',
    summary:
      'Business websites, e-commerce and content-driven platforms built on the right technology for your needs.',
    lede: 'Content and commerce platforms engineered with the same standards as the rest of our work: fast, accessible, measurable and maintainable by the people who own them.',
    delivers: [
      {
        title: 'Content platforms',
        body: 'Editorial and marketing sites with a CMS the marketing team can actually use, statically delivered for speed.',
      },
      {
        title: 'E-commerce',
        body: 'Storefronts and checkout flows, including integration with existing inventory, payment and fulfilment systems.',
      },
      {
        title: 'Performance and accessibility',
        body: 'Core Web Vitals and WCAG conformance treated as budgets that fail a build, not as a report delivered afterwards.',
      },
    ],
    approach: [
      {
        title: 'Static where possible',
        body: 'Pre-rendered pages are faster, cheaper and have far less to attack than a CMS answering every request. Dynamic behaviour is added where it is genuinely needed.',
      },
      {
        title: 'Owned by the client',
        body: 'Code in your repository, hosting on your account, CMS access held by you. Handover is the default rather than a negotiation.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Headless CMS', 'PostgreSQL', 'Vercel'],
    demoted: true,
  },
];

export const headlineCapabilities = capabilities.filter((c) => !c.demoted);

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}

/**
 * Same lookup, but throws instead of returning undefined.
 *
 * Use this for the fixed slugs referenced by page layouts. A typo
 * there would otherwise remove an entire section with no type error
 * and a green build — invisible until someone eyeballs the page.
 * Called at module scope, this fails the build instead.
 */
export function requireCapability(slug: string): Capability {
  const capability = getCapability(slug);
  if (!capability) {
    throw new Error(
      `Unknown capability slug "${slug}". Known slugs: ${capabilities.map((c) => c.slug).join(', ')}`,
    );
  }
  return capability;
}
