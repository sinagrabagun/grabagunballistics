/* GrabAGun Ballistic Calculator — main app shell, state, solver wiring, output tabs. */
(function () {
  const { useState, useMemo } = React;

  const nz = (v, d) => { let s = v.toFixed(d); if (/^-0(\.0+)?$/.test(s)) s = s.slice(1); return s; };

  const DEFAULTS = {
    caliberId: "65creedmoor",
    mfr: "Hornady", line: "ELD Match", loadIdx: 0,
    barrelLength: 24, mvOverride: null,
    zeroRange: 100, sightHeight: 1.5, shootingAngle: 0,
    windSpeed: 10, windDir: 3,
    tempF: 59, altitudeFt: 0,
    scopeUnit: "MIL", reticleType: "MIL Grid",
    maxRange: 1000, increment: 100, dragModel: "Auto",
    showWind: true
  };

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#0973BA",
    "accent2": "#1FA8A4",
    "density": "regular"
  }/*EDITMODE-END*/;

  const TABS = ["Trajectory", "Reticle Holds", "Energy & Velocity", "Data Table"];

  // Read integration params: ?mode=lab|range|plan
  function readUrl() {
    try {
      const q = new URLSearchParams(window.location.search);
      const out = {};
      if (q.get("mode")) { const m = q.get("mode"); out.mode = (m === "lab" || m === "range") ? m : "hunt"; }
      return out;
    } catch (e) { return {}; }
  }

  function StatCard({ label, value, unit, sub }) {
    return (
      <div className="stat-card">
        <span className="stat-label">{label}</span>
        <span className="stat-value mono">{value}<em>{unit}</em></span>
        {sub && <span className="stat-sub">{sub}</span>}
      </div>
    );
  }

  function App() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    const urlInit = React.useRef(readUrl()).current;
    const [mode, setMode] = useState(urlInit.mode || "hunt");
    const [state, setState] = useState(DEFAULTS);
    const [metric, setMetric] = useState(false);
    const [tab, setTab] = useState("Trajectory");
    const [inputsOpen, setInputsOpen] = useState(false);
    const data = window.BALLISTICS_DATA;

    const set = (patch) => setState(s => ({ ...s, ...patch }));

    // Jump a hero setup into the full Ballistics Lab.
    const openLab = (rec) => {
      const cal = rec.caliber;
      const idx = cal.loads.filter(l => l.mfr === rec.load.mfr && l.line === rec.load.line)
        .findIndex(l => l === rec.load);
      setState(s => ({
        ...s, caliberId: cal.id, mfr: rec.load.mfr, line: rec.load.line,
        loadIdx: Math.max(0, idx),
        barrelLength: rec.barrelLength != null ? rec.barrelLength : cal.defaultBarrel,
        mvOverride: null,
        zeroRange: rec.zeroRange != null ? rec.zeroRange : s.zeroRange,
        scopeUnit: rec.scopeUnit || s.scopeUnit,
        reticleType: rec.reticleType || s.reticleType,
        maxRange: rec.maxRange != null ? Math.max(300, rec.maxRange) : Math.max(300, s.maxRange)
      }));
      setMode("lab"); setTab("Trajectory");
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cal = data.find(c => c.id === state.caliberId);
    const loads = cal.loads.filter(l => l.mfr === state.mfr && l.line === state.line);
    const load = loads[state.loadIdx] || loads[0] || cal.loads[0];

    const computedMV = window.BallisticsSolver.adjustMV(load.mv, load.testBarrel, state.barrelLength, cal.fpsPerInch);
    const activeMV = state.mvOverride != null ? state.mvOverride : computedMV;
    const dragModel = state.dragModel === "Auto" ? (load.bcG7 ? "G7" : "G1") : state.dragModel;

    const result = useMemo(() => {
      return window.BallisticsSolver.solve({
        bcG1: load.bcG1, bcG7: load.bcG7, dragModel,
        muzzleVelocity: activeMV, bulletWeight: load.grains,
        sightHeight: state.sightHeight, zeroRange: state.zeroRange,
        shootingAngle: state.shootingAngle,
        windSpeed: state.showWind ? state.windSpeed : 0, windDir: state.windDir,
        tempF: state.tempF, altitudeFt: state.altitudeFt,
        maxRange: state.maxRange, increment: state.increment
      });
    }, [load, dragModel, activeMV, state.sightHeight, state.zeroRange, state.shootingAngle,
        state.showWind, state.windSpeed, state.windDir, state.tempF, state.altitudeFt,
        state.maxRange, state.increment]);

    // summary values
    const last = result.rows[result.rows.length - 1];
    const distUnit = metric ? "m" : "yd";
    const velUnit = metric ? "m/s" : "fps";
    const lenUnit = metric ? "cm" : "in";
    const enUnit = metric ? "J" : "ft·lb";
    const moaOrMil = state.scopeUnit;
    const lastDial = last["drop" + moaOrMil];
    const trans = result.summary.transonicRange;

    React.useEffect(() => {
      document.documentElement.style.setProperty("--accent", t.accent);
      document.documentElement.style.setProperty("--accent-2", t.accent2);
      document.body.dataset.density = t.density;
    }, [t.accent, t.accent2, t.density]);

    const holds = result.rows.filter(r => r.rangeYd > 0);
    const holdSubset = holds.length > 9 ? holds.filter((_, i) => i % Math.ceil(holds.length / 8) === 0) : holds;

    return (
      <div className="app" data-mode={mode}>
        <header className="topbar">
          <window.UI.Wordmark />
          <div className="mode-switch">
            <button className={mode === "hunt" ? "active" : ""} onClick={() => setMode("hunt")}><window.UI.Icon name="gauge" size={16} />Shot Planner</button>
            <button className={mode === "lab" ? "active" : ""} onClick={() => setMode("lab")}><window.UI.Icon name="crosshair" size={16} />Ballistics Lab</button>
            <button className={mode === "range" ? "active" : ""} onClick={() => setMode("range")}><window.UI.Icon name="target" size={16} />Test Your Setup</button>
          </div>
          {(mode === "lab" || mode === "range") && (
            <div className="load-strip">
              <span className="ls-cal">{cal.name}</span>
              <span className="ls-load">{load.mfr} {load.line} · {load.grains}gr {load.type}</span>
            </div>
          )}
          <div className="topbar-right">
            <div className="unit-toggle">
              <button className={!metric ? "active" : ""} onClick={() => setMetric(false)}>Imperial</button>
              <button className={metric ? "active" : ""} onClick={() => setMetric(true)}>Metric</button>
            </div>
          </div>
        </header>

        {mode === "hunt" ? (
          <main className="hunt-page">
            <window.HeroBallistics metric={metric} data={data} onOpenLab={openLab} />
            <footer className="methodology">
              <span>3-DOF point-mass solver · advertised factory velocities adjusted for barrel length. Verify against your own chronograph &amp; drops before relying on a firing solution.</span>
            </footer>
          </main>
        ) : mode === "range" ? (
          <main className="range-page">
            <window.RangeGame state={state} load={load} cal={cal} metric={metric} />
          </main>
        ) : (
        <div className={"layout" + (inputsOpen ? " inputs-open" : "")}>
          <div className="rail-backdrop" onClick={() => setInputsOpen(false)} aria-hidden="true"></div>
          <aside className="rail">
            <div className="rail-sheet-head">
              <span className="rail-sheet-grab" aria-hidden="true"></span>
              <span className="rail-sheet-title">Setup &amp; inputs</span>
              <button className="rail-sheet-done" onClick={() => setInputsOpen(false)}>Done</button>
            </div>
            <window.InputPanel state={state} set={set} metric={metric} data={data} />
          </aside>

          <main className="content">
            <button className="setup-fab" onClick={() => setInputsOpen(true)}>
              <span className="setup-fab-info">
                <span className="setup-fab-cal">{cal.name}</span>
                <span className="setup-fab-load">{load.mfr} {load.line} · {load.grains}gr {load.type}</span>
              </span>
              <span className="setup-fab-cta"><window.UI.Icon name="sliders" size={15} /> Adjust</span>
            </button>
            <div className="summary-strip">
              <StatCard label="Muzzle vel" value={Math.round(window.U.vel.to(activeMV, metric))} unit={" " + velUnit}
                sub={state.mvOverride != null ? "override" : state.barrelLength + '" barrel'} />
              <StatCard label="Zero" value={metric ? Math.round(state.zeroRange * 0.9144) : state.zeroRange} unit={" " + distUnit}
                sub={dragModel + " · BC " + (dragModel === "G7" ? (load.bcG7 || load.bcG1) : load.bcG1).toFixed(3)} />
              <StatCard label={"Drop @ " + (metric ? Math.round(state.maxRange * 0.9144) : state.maxRange) + distUnit}
                value={(window.U.len.to(last.dropIn, metric)).toFixed(1)} unit={" " + lenUnit}
                sub={Math.abs(lastDial).toFixed(moaOrMil === "MIL" ? 1 : 1) + " " + moaOrMil + " come-up"} />
              <StatCard label={"Velocity @ " + (metric ? Math.round(state.maxRange * 0.9144) : state.maxRange) + distUnit}
                value={Math.round(window.U.vel.to(last.velocity, metric))} unit={" " + velUnit}
                sub={"Mach " + last.mach.toFixed(2)} />
              <StatCard label={"Energy @ " + (metric ? Math.round(state.maxRange * 0.9144) : state.maxRange) + distUnit}
                value={Math.round((metric ? 1.35582 : 1) * last.energy)} unit={" " + enUnit} />
              <StatCard label="Supersonic to" value={trans ? (metric ? Math.round(trans * 0.9144) : Math.round(trans)) : "—"}
                unit={trans ? " " + distUnit : ""} sub={trans ? "transonic limit" : "stays supersonic"} />
            </div>

            <nav className="tabs">
              {TABS.map(tb => (
                <button key={tb} className={tab === tb ? "tab active" : "tab"} onClick={() => setTab(tb)}><window.UI.Icon name={{"Trajectory": "arc", "Reticle Holds": "crosshair", "Energy & Velocity": "spark", "Data Table": "sheet"}[tb]} size={15} />{tb}</button>
              ))}
              <button className="export-btn" onClick={() => window.exportBallisticsXLS({ cal, load, state, metric, result, activeMV, dragModel })}
                title="Download the holdover table and all chart data as an Excel workbook">
                <window.UI.Icon name="sheet" size={15} /> Export to Excel
              </button>
            </nav>

            <div className="panel">
              {tab === "Trajectory" && (
                <div className="panel-pad">
                  <div className="panel-head">
                    <h2>Point of impact · trajectory</h2>
                    <p>Bullet path relative to line of sight from muzzle to {metric ? Math.round(state.maxRange * 0.9144) + " m" : state.maxRange + " yd"}, zeroed at {metric ? Math.round(state.zeroRange * 0.9144) + " m" : state.zeroRange + " yd"}.</p>
                  </div>
                  <window.TrajectoryChart result={result} metric={metric} showWind={state.showWind && state.windSpeed > 0} />
                </div>
              )}
              {tab === "Reticle Holds" && (
                <div className="panel-pad reticle-layout">
                  <div className="reticle-main">
                    <div className="panel-head">
                      <h2>{state.reticleType} · holds in {state.scopeUnit}</h2>
                      <p>{state.reticleType === "BDC"
                        ? "Marks are fixed in the glass — each label is the range that mark holds in the current solution."
                        : "Each mark is the hold for that range" + (state.showWind && state.windSpeed > 0 ? " with current wind applied." : ".")}</p>
                    </div>
                    <window.Reticle result={result} reticleType={state.reticleType} scopeUnit={state.scopeUnit}
                      metric={metric} showWind={state.showWind && state.windSpeed > 0} />
                  </div>
                  <div className="hold-list">
                    <div className="hl-head">
                      <span>Range</span><span>Drop</span><span>{state.showWind && state.windSpeed > 0 ? "Wind" : "—"}</span>
                    </div>
                    {holdSubset.map((r, i) => (
                      <div className="hl-row" key={i}>
                        <span className="mono hl-range">{metric ? Math.round(r.rangeM) + "m" : r.rangeYd + "y"}</span>
                        <span className="mono hl-drop">{nz(r["drop" + state.scopeUnit], state.scopeUnit === "MIL" ? 1 : 1)} <em>{state.scopeUnit}</em></span>
                        <span className="mono hl-wind">{state.showWind && state.windSpeed > 0 ? nz(r["wind" + state.scopeUnit], 1) + " " + state.scopeUnit : "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === "Energy & Velocity" && (
                <div className="panel-pad">
                  <div className="panel-head">
                    <h2>Velocity &amp; energy retention</h2>
                    <p>Downrange speed and kinetic energy. Dashed line marks the transonic threshold (Mach 1).</p>
                  </div>
                  <window.RetentionChart result={result} metric={metric} />
                </div>
              )}
              {tab === "Data Table" && (
                <div className="panel-pad">
                  <div className="panel-head">
                    <h2>Drop &amp; windage table</h2>
                    <p>Full solution at {metric ? Math.round(state.increment * 0.9144) + " m" : state.increment + " yd"} increments. Scroll horizontally for all columns.</p>
                  </div>
                  <window.DataTable result={result} metric={metric} />
                </div>
              )}
            </div>

            <footer className="methodology">
              <span>3-DOF point-mass solver · {dragModel} drag model · standard atmosphere modeled from temperature &amp; altitude.</span>
              <span>Velocities are advertised factory data adjusted for barrel length. Verify against your own chronograph &amp; drops before relying on a firing solution.</span>
            </footer>
          </main>
        </div>
        )}

        <footer className="site-footer">
          <window.UI.Wordmark />
          <div className="sf-note">
            Ballistic outputs are planning guidance generated from advertised factory data — verify against your own chronograph and confirmed dope before relying on a firing solution.
          </div>
        </footer>

        <window.TweaksPanel>
          <window.TweakSection label="Theme" />
          <window.TweakColor label="CTA accent (action)" value={t.accent}
            options={["#0973BA", "#1B6BC0", "#3FB37F", "#E5484D", "#74D8D6"]}
            onChange={(v) => setTweak("accent", v)} />
          <window.TweakColor label="Data accent" value={t.accent2}
            options={["#74D8D6", "#0973BA", "#F5C842", "#B7C2CC", "#3FB37F"]}
            onChange={(v) => setTweak("accent2", v)} />
          <window.TweakRadio label="Density" value={t.density} options={["compact", "regular", "comfy"]}
            onChange={(v) => setTweak("density", v)} />
        </window.TweaksPanel>
      </div>
    );
  }

  window.BallisticApp = App;
})();
