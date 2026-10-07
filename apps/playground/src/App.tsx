export function App() {
  return (
    <main className="playground-shell">
      <header>
        <p>Phasic UI · local lab</p>
        <span>Viewport-aware manual testing</span>
      </header>
      <section aria-labelledby="playground-title">
        <div>
          <p className="kicker">Scenario 00</p>
          <h1 id="playground-title">Interaction playground</h1>
          <p className="summary">
            A neutral workspace for focus, keyboard, overlay, scrolling, and
            responsive interaction checks.
          </p>
        </div>
        <aside aria-label="Workspace status">
          <span aria-hidden="true" />
          <strong>Foundation ready</strong>
          <small>No runtime components mounted yet</small>
        </aside>
      </section>
    </main>
  );
}
