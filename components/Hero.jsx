/* Hero ballistics band — the simple, visual top of the Shot Planner page.
   COMPARE-FIRST: pick one cartridge+load (single-caliber behavior) OR stack several
   and see every trajectory overlaid on ONE shared, fixed Y-axis so drop differences
   are read at a glance. The active line drives the control row, reticle holds and
   the holdover-call strip. Reuses the real solver + TrajectoryCompareChart + Reticle.
   Exposes window.HeroBallistics. */
(function () {
  const { useState, useMemo, useRef } = React;

  const nz = (v, d) => { let s = v.toFixed(d); if (/^-0(\.0+)?$/.test(s)) s = s.slice(1); return s; };

  // distinct series colors — share a chroma/lightness band, vary hue, legible on dark.
  const PALETTE = ["#74D8D6", "#F2B544", "#7AA2F7", "#E06C9F", "#8BD17C"];
  const MAX_LINES = 4;

  // sensible "add another" order — popular, flat-shooting centerfire first.
  const ADD_ORDER = ["308win", "65creedmoor", "300winmag", "6creedmoor", "270win", "3006", "7remmag", "223rem"];

  let _uid = 0;

  // Prefer a sensible supersonic hunting/match load as the default for a caliber.
  function defaultLoadIdx(cal) {
    let best = 0, bestScore = -1e9;
    cal.loads.forEach((l, i) => {
      let sc = 0;
      if (/ELD-X|Precision Hunter|ELD Match|AccuBond|Terminal Ascent|Fusion|Elite Hunter/i.test(l.line)) sc += 3;
      if (l.bcG7) sc += 1;
      if (/subsonic/i.test(l.type) || l.mv < 1125) sc -= 8;
      sc += l.mv / 2000;
      if (sc > bestScore) { bestScore = sc; best = i; }
    });
    return best;
  }

  function makeEntry(caliberId, data, color) {
    const cal = data.find(c => c.id === caliberId);
    return { id: ++_uid, caliberId, loadIdx: defaultLoadIdx(cal), barrel: cal.defaultBarrel, color };
  }

  function HeroBallistics({ metric, data, onOpenLab }) {
    // comparison stack. entry[0] starts active. Each entry = a caliber line.
    const [entries, setEntries] = useState(() => [makeEntry("65creedmoor", data, PALETTE[0])]);
    const [activeId, setActiveId] = useState(() => entries[0].id);
    // shared comparison frame — applied to every line so axes are identical.
    const [zeroRange, setZeroRange] = useState(100);
    const [scopeUnit, setScopeUnit] = useState("MIL");
    const [maxRange, setMaxRange] = useState(500);

    const active = entries.find(e => e.id === activeId) || entries[0];
    const activeCal = data.find(c => c.id === active.caliberId);

    const distUnit = metric ? "m" : "yd";
    const lenUnit = metric ? "cm" : "in";
    const lenC = metric ? 2.54 : 1;
    const velUnit = metric ? "m/s" : "fps";
    const velC = metric ? 0.3048 : 1;

    // ---- mutators ----
    const updateActive = (patch) => setEntries(arr => arr.map(e => e.id === active.id ? { ...e, ...patch } : e));

    function chooseCaliber(id) {
      const c = data.find(x => x.id === id);
      updateActive({ caliberId: id, loadIdx: defaultLoadIdx(c), barrel: c.defaultBarrel });
      // only re-frame zero/range automatically when comparing a single line
      if (entries.length === 1) {
        if (["Pistol", "Rimfire", "Lever"].includes(c.category)) {
          setZeroRange(50); setMaxRange(c.category === "Pistol" ? 150 : 300);
        } else { setZeroRange(100); setMaxRange(500); }
      }
    }

    function addLine() {
      if (entries.length >= MAX_LINES) return;
      const used = new Set(entries.map(e => e.caliberId));
      const usedColors = new Set(entries.map(e => e.color));
      const color = PALETTE.find(c => !usedColors.has(c)) || PALETTE[entries.length % PALETTE.length];
      let pick = ADD_ORDER.find(id => !used.has(id) && data.find(c => c.id === id));
      if (!pick) pick = (data.find(c => !used.has(c.id)) || data[0]).id;
      const entry = makeEntry(pick, data, color);
      setEntries(arr => [...arr, entry]);
      setActiveId(entry.id);
    }

    function removeLine(id) {
      setEntries(arr => {
        if (arr.length <= 1) return arr;
        const next = arr.filter(e => e.id !== id);
        if (id === activeId) setActiveId(next[0].id);
        return next;
      });
    }

    // ---- solve every line on the shared frame ----
    const solved = useMemo(() => entries.map(en => {
      const cal = data.find(c => c.id === en.caliberId);
      const load = cal.loads[en.loadIdx] || cal.loads[0];
      const dragModel = load.bcG7 ? "G7" : "G1";
      const mv = window.BallisticsSolver.adjustMV(load.mv, load.testBarrel, en.barrel, cal.fpsPerInch);
      const result = window.BallisticsSolver.solve({
        bcG1: load.bcG1, bcG7: load.bcG7, dragModel,
        muzzleVelocity: mv, bulletWeight: load.grains,
        sightHeight: 1.8, zeroRange, shootingAngle: 0,
        windSpeed: 0, windDir: 12, tempF: 59, altitudeFt: 0,
        maxRange, increment: maxRange > 300 ? 100 : 50
      });
      return { ...en, cal, load, mv, result, label: cal.name };
    }), [entries, zeroRange, maxRange, data]);

    const activeSolved = solved.find(s => s.id === active.id) || solved[0];
    const reticleType = scopeUnit === "MIL" ? "MIL Grid" : "MOA Grid";
    const calls = activeSolved.result.rows.filter(r => r.rangeYd > 0);
    const last = activeSolved.result.rows[activeSolved.result.rows.length - 1];

    const loadOptions = activeCal.loads.map((l, i) => ({ i, label: `${l.mfr} ${l.line} · ${l.grains}gr ${l.type}` }));
    const groups = useMemo(() => {
      const g = {}; data.forEach(c => { (g[c.category] = g[c.category] || []).push(c); }); return g;
    }, [data]);

    const comparing = entries.length > 1;
    const rangeOpts = activeCal.category === "Pistol" ? [100, 150, 200]
      : activeCal.category === "Rimfire" ? [150, 200, 300]
      : [300, 500, 700];

    return (
      <section className="hero">
        <div className="hero-head">
          <div>
            <div className="hero-kicker">Round &amp; target planning</div>
            <h1 className="hero-title">Compare drop across calibers</h1>
            <p className="hero-sub">Stack multiple cartridges on one fixed-scale chart — see exactly which round shoots flatter at distance, plus exact scope holds.</p>
          </div>
          <div className="hero-quickstats">
            <div className="hqs"><span>Muzzle{comparing ? " · " + activeCal.name : ""}</span><b className="mono">{Math.round(activeSolved.mv * velC)}<em>{velUnit}</em></b></div>
            <div className="hqs"><span>Drop @ {metric ? Math.round(maxRange * 0.9144) : maxRange}{distUnit}</span><b className="mono">{nz(last.dropIn * lenC, 0)}<em>{lenUnit}</em></b></div>
            <div className="hqs accent"><span>Hold @ {metric ? Math.round(maxRange * 0.9144) : maxRange}{distUnit}</span><b className="mono">{nz(last["drop" + scopeUnit], 1)}<em>{scopeUnit}</em></b></div>
          </div>
        </div>

        {/* control row edits the ACTIVE line; accent border ties it to the active color */}
        <div className="hero-controls" style={{ boxShadow: comparing ? `inset 4px 0 0 ${active.color}` : "none" }}>
          <label className="hctl">
            <span>Caliber{comparing ? " · editing" : ""}</span>
            <select className="select" value={active.caliberId} onChange={(e) => chooseCaliber(e.target.value)}>
              {Object.keys(groups).map(cat => (
                <optgroup key={cat} label={cat}>
                  {groups[cat].map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="hctl hctl-load">
            <span>Ammo &amp; load</span>
            <select className="select" value={active.loadIdx} onChange={(e) => updateActive({ loadIdx: parseInt(e.target.value) })}>
              {loadOptions.map(o => <option key={o.i} value={o.i}>{o.label}</option>)}
            </select>
          </label>
          <label className="hctl hctl-barrel">
            <span>Barrel <b className="mono">{active.barrel.toFixed(1)}"</b></span>
            <input type="range" min="4" max={activeCal.id === "50bmg" ? 45 : (activeCal.category === "Pistol" ? 10 : 30)} step="0.5"
              value={active.barrel} onChange={(e) => updateActive({ barrel: parseFloat(e.target.value) })} />
          </label>
          <label className="hctl hctl-narrow">
            <span>Zero <em className="hctl-shared">all</em></span>
            <div className="seg-mini">
              {[50, 100, 200].map(z => (
                <button key={z} type="button" className={zeroRange === z ? "active" : ""} onClick={() => setZeroRange(z)}>{metric ? Math.round(z * 0.9144) : z}</button>
              ))}
            </div>
          </label>
          <label className="hctl hctl-narrow">
            <span>Optic <em className="hctl-shared">all</em></span>
            <div className="seg-mini">
              {["MIL", "MOA"].map(u => (
                <button key={u} type="button" className={scopeUnit === u ? "active" : ""} onClick={() => setScopeUnit(u)}>{u}</button>
              ))}
            </div>
          </label>
        </div>

        {/* comparison stack — chips select active / remove; + adds a line */}
        <div className="hero-compare">
          <span className="hcmp-label">{comparing ? "Comparing " + entries.length : "Comparison"}<em>tap to edit</em></span>
          <div className="hcmp-chips">
            {solved.map((s) => (
              <span key={s.id} className={"hcmp-chip" + (s.id === active.id ? " active" : "")}
                style={{ "--chip": s.color }}>
                <button type="button" className="hcmp-pick" onClick={() => setActiveId(s.id)}>
                  <i className="hcmp-dot" style={{ background: s.color }}></i>
                  <span className="hcmp-cal">{s.cal.name}</span>
                </button>
                {entries.length > 1 && (
                  <button type="button" className="hcmp-x" title="Remove from comparison" onClick={() => removeLine(s.id)}>×</button>
                )}
              </span>
            ))}
            {entries.length < MAX_LINES && (
              <button type="button" className="hcmp-add" onClick={addLine}>+ Add caliber</button>
            )}
          </div>
        </div>

        <div className="hero-body">
          <div className="hero-panel hero-drop">
            <div className="hp-head">
              <h3>{comparing ? "Bullet drop · shared scale" : "Bullet drop"}</h3>
              <div className="hp-range">
                <span>Show to</span>
                {rangeOpts.map(d => (
                  <button key={d} type="button" className={maxRange === d ? "active" : ""} onClick={() => setMaxRange(d)}>{metric ? Math.round(d * 0.9144) : d}{distUnit}</button>
                ))}
              </div>
            </div>
            <window.TrajectoryCompareChart series={solved} metric={metric} zeroRange={zeroRange} maxRange={maxRange} />
          </div>

          <div className="hero-panel hero-holds">
            <div className="hp-head"><h3>Reticle holdover · {scopeUnit}{comparing ? " · " + activeCal.name : ""}</h3></div>
            <window.Reticle result={activeSolved.result} series={solved} activeId={active.id}
              reticleType={reticleType} scopeUnit={scopeUnit} metric={metric} showWind={false} />
          </div>
        </div>

        <div className="hero-calls">
          <div className="hc-label">Holdover calls<em>{comparing ? activeCal.name : "dial or hold"}</em></div>
          <div className="hc-track">
            {calls.map((r, i) => (
              <div className="call-card" key={i}>
                <div className="cc-range mono">{metric ? Math.round(r.rangeM) : r.rangeYd}<em>{distUnit}</em></div>
                <div className="cc-hold mono">{nz(r["drop" + scopeUnit], 1)}<em>{scopeUnit}</em></div>
                <div className="cc-drop mono">{nz(r.dropIn * lenC, 1)} {lenUnit}</div>
                <div className="cc-vel mono">{Math.round(r.velocity * velC)} {velUnit}</div>
              </div>
            ))}
          </div>
          <button className="hc-lab" onClick={() => onOpenLab({ caliber: activeCal, load: activeSolved.load, barrelLength: active.barrel, zeroRange, maxRange, scopeUnit, reticleType })}>
            Full ballistics &amp; wind →
          </button>
        </div>
      </section>
    );
  }

  window.HeroBallistics = HeroBallistics;
})();
