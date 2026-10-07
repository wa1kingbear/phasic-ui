const phases = [
  { label: 'Idle', note: 'Ready for input', tone: 'neutral' },
  { label: 'Pending', note: 'Work in progress', tone: 'info' },
  { label: 'Success', note: 'Action resolved', tone: 'success' },
  { label: 'Error', note: 'Recovery available', tone: 'danger' },
] as const;

export function App() {
  return (
    <main className="site-shell">
      <header className="masthead">
        <a className="brand" href="#top" aria-label="Phasic UI home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Phasic UI</span>
        </a>
        <p className="masthead-note">UI components for real product states.</p>
        <span className="release-tag">Primitives / phase 03</span>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Open-source React UI kit · phase 00</p>
          <h1 id="hero-title">
            Interfaces that account for what happens next.
          </h1>
          <p className="lede">
            State-aware, adaptive primitives for loading, success, error,
            offline, and every useful moment in between.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#foundation">
              Inspect foundation
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/wa1kingbear/phasic-ui"
            >
              View source
            </a>
          </div>
        </div>

        <div className="phase-panel" aria-label="Canonical action phases">
          <div className="panel-label">
            <span>Action lifecycle</span>
            <span>01—04</span>
          </div>
          <ol className="phase-list">
            {phases.map((phase, index) => (
              <li key={phase.label} className={`phase phase-${phase.tone}`}>
                <span className="phase-index">0{index + 1}</span>
                <span className="phase-dot" aria-hidden="true" />
                <strong>{phase.label}</strong>
                <small>{phase.note}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="foundation-grid"
        id="foundation"
        aria-labelledby="foundation-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Repository signal</p>
          <h2 id="foundation-title">The workspace is ready.</h2>
        </div>

        <article className="foundation-card foundation-card-wide">
          <span className="card-number">01</span>
          <h3>Package boundaries</h3>
          <p>
            Core behavior stays framework-agnostic. React owns rendering. Tokens
            remain portable. Icons stay tree-shakeable.
          </p>
          <ul className="package-list" aria-label="Workspace packages">
            <li>@phasic-ui/core</li>
            <li>@phasic-ui/react</li>
            <li>@phasic-ui/tokens</li>
            <li>@phasic-ui/icons</li>
          </ul>
        </article>

        <article className="foundation-card">
          <span className="card-number">02</span>
          <h3>Quality gates</h3>
          <p>
            Typecheck, lint, tests, builds, and Storybook run from one
            workspace.
          </p>
          <div className="status-line">
            <span className="status-pulse" aria-hidden="true" />
            <span>Layout and typography primitives connected</span>
          </div>
        </article>

        <article className="foundation-card foundation-card-dark">
          <span className="card-number">03</span>
          <h3>Next phase</h3>
          <p>Button and IconButton will turn the foundation interactive.</p>
          <code>provider ✓ → primitives ✓ → actions</code>
        </article>
      </section>
    </main>
  );
}
