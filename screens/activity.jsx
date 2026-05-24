// activity.jsx — Activity log + Approval modal + Event detail page

// ─── Screen 1 — Activity audit log ───────────────────────────
const ActivityLog = ({ navigate }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRowIdx, setSelectedRowIdx] = React.useState(null);
  const [rowStatuses, setRowStatuses] = React.useState({});

  const rows = [
    { time: '22:26:08', event: 'Brute Force Attempt',     source: '185.220.101.50 (RU)',  status: 'AUTO-BLOCKED', tone: 'critical' },
    { time: '15:12:33', event: 'Phishing Link Blocked',    source: 'kloof-secure-pay.co.za', status: 'BLOCKED',     tone: 'warn' },
    { time: '11:48:15', event: 'Endpoint Scan Complete',   source: 'Internal · 12 hosts',  status: 'COMPLETE',    tone: 'ok' },
    { time: '09:02:41', event: 'SSH Login Success',        source: '124.82.11.192 (US)',   status: 'VERIFIED',    tone: 'gold' },
  ];

  const getRowTone   = (i) => rowStatuses[i]?.tone   ?? rows[i].tone;
  const getRowStatus = (i) => rowStatuses[i]?.status ?? rows[i].status;

  const handleApproveBlock = () => {
    if (selectedRowIdx !== null) {
      setRowStatuses(s => ({ ...s, [selectedRowIdx]: { tone: 'ok', status: 'BLOCKED' } }));
    }
    setModalOpen(false);
  };

  const statusPill = (tone, label) => {
    const map = {
      critical: { bg: 'rgba(255,59,59,.12)',   bd: 'rgba(255,104,104,.45)', c: 'var(--plasma-400)' },
      warn:     { bg: 'rgba(255,106,31,.12)',  bd: 'rgba(255,138,61,.45)',  c: 'var(--ember-300)' },
      gold:     { bg: 'rgba(212,162,74,.12)',  bd: 'rgba(232,192,116,.45)', c: 'var(--gold-400)' },
      ok:       { bg: 'rgba(244,220,160,.08)', bd: 'rgba(244,220,160,.22)', c: 'var(--stellar-200)' },
    };
    const m = map[tone] || map.ok;
    return (
      <span style={{
        padding: '3px 10px', borderRadius: 4,
        background: m.bg, border: `1px solid ${m.bd}`, color: m.c,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '.18em',
      }}>{label}</span>
    );
  };

  return (
    <>
      <AppShell active="activity" navigate={navigate}>
        <BackButton navigate={navigate} />
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--gold-500)' }}>/ AUDIT</div>
            <h1 className="gai-display" style={{ fontSize: 44, margin: '4px 0 0', lineHeight: 1 }}>Activity Log</h1>
            <p style={{ color: 'var(--stellar-200)', marginTop: 4, fontSize: 13 }}>Every move I made, in order. Searchable. Exportable.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="gai-btn gai-btn-ghost gai-btn-sm">⬇ Export CSV</button>
            <button className="gai-btn gai-btn-ghost gai-btn-sm">⛃ Filter</button>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
          <KPI label="Pending approvals"  value="0"          sub="Nothing waiting" />
          <KPI label="Recent blocks"      value="147"        sub="Last 24 hours" tone="gold" />
          <div className="gai-card" style={{ padding: 18, border: '1px solid rgba(255,138,61,.35)' }}>
            <div className="gai-label" style={{ color: 'var(--ember-300)' }}>Threat level</div>
            <div className="gai-display" style={{ fontSize: 36, color: 'var(--ember-400)', marginTop: 6, lineHeight: 1 }}>Elevated</div>
            <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', marginTop: 8, letterSpacing: '.05em' }}>Sustained probing in EU/RU</div>
          </div>
          <div className="gai-card" style={{ padding: 18 }}>
            <div className="gai-label">System health</div>
            <div className="gai-display" style={{ fontSize: 36, marginTop: 6, lineHeight: 1, background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Optimal</div>
            <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', marginTop: 8, letterSpacing: '.05em' }}>CPU 18% · MEM 41% · DISK OK</div>
          </div>
        </div>

        {/* Search bar */}
        <div className="gai-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px',
            borderBottom: '1px solid rgba(244,220,160,.10)',
            background: 'rgba(0,0,0,.25)',
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="#9d9485" strokeWidth="1.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#9d9485" strokeWidth="1.5"/></svg>
            <input className="gai-mono" placeholder="search events, IPs, sources…" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--stellar-200)', fontSize: 12, flex: 1, letterSpacing: '.04em' }} />
            <span className="gai-badge gold"><span className="gai-dot"></span>All time</span>
            <span className="gai-badge"><span className="gai-dot" style={{ background: 'var(--stellar-300)' }}></span>4 results</span>
          </div>

          {/* Table */}
          <div style={{
            display: 'grid', gridTemplateColumns: '140px 1.5fr 1.5fr 130px 90px',
            padding: '10px 18px',
            borderBottom: '1px solid rgba(244,220,160,.08)',
            background: 'rgba(0,0,0,.15)',
          }} className="gai-label">
            <div>Time</div><div>Event</div><div>Source</div><div>Status</div><div style={{ textAlign: 'right' }}>Actions</div>
          </div>

          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '140px 1.5fr 1.5fr 130px 90px',
              padding: '14px 18px', alignItems: 'center',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(244,220,160,.06)' : 'none',
              background: i === 0 && getRowTone(0) === 'critical' ? 'rgba(255,59,59,.05)' : 'transparent',
            }}>
              <div className="gai-mono" style={{ fontSize: 12, color: 'var(--gold-400)', letterSpacing: '.05em' }}>{r.time}</div>
              <div className="gai-display" style={{ fontSize: 15, color: getRowTone(i) === 'critical' ? 'var(--plasma-400)' : 'var(--stellar-50)' }}>{r.event}</div>
              <div className="gai-mono" style={{ fontSize: 12, color: 'var(--stellar-200)', letterSpacing: '.02em' }}>{r.source}</div>
              <div>{statusPill(getRowTone(i), getRowStatus(i))}</div>
              <div style={{ textAlign: 'right' }}>
                <button className="gai-btn gai-btn-ghost gai-btn-sm" onClick={() => { setSelectedRowIdx(i); setModalOpen(true); }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </AppShell>

      {modalOpen && (
        <>
          {/* dim overlay — click outside to dismiss */}
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,6,13,.7)', backdropFilter: 'blur(4px)', zIndex: 50 }} onClick={() => setModalOpen(false)} />

          {/* modal */}
          <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            zIndex: 51, width: 540,
            background: 'linear-gradient(180deg, #1c1219, #110a14)',
            border: '1px solid rgba(244,220,160,.22)',
            borderRadius: 12,
            boxShadow: '0 30px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(244,220,160,.1), 0 0 100px rgba(255,106,31,.15)',
            overflow: 'hidden',
          }}>
            {/* glow strip */}
            <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--ember-500), transparent)' }}></div>

            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span className="gai-badge warn"><span className="gai-dot"></span>Approval Needed</span>
                <span className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', letterSpacing: '.2em' }}>SEC-7724-RU</span>
              </div>

              <h2 className="gai-display" style={{ fontSize: 30, margin: '10px 0 0', lineHeight: 1 }}>Approval needed</h2>

              <p style={{ fontSize: 14, color: 'var(--stellar-100)', marginTop: 12, lineHeight: 1.55 }}>
                Someone in <b style={{ color: 'var(--plasma-400)' }}>Russia</b> has attempted to login{' '}
                <b style={{ color: 'var(--ember-300)' }}>47 times</b> in the last 8 minutes.
              </p>

              {/* Analysis panel */}
              <div style={{
                marginTop: 16, padding: 14,
                border: '1px solid rgba(244,220,160,.14)',
                background: 'rgba(0,0,0,.35)', borderRadius: 8,
              }}>
                <div className="gai-mono" style={{ fontSize: 10, color: 'var(--gold-500)', letterSpacing: '.22em', marginBottom: 6 }}>ANALYSIS</div>
                <div style={{ fontSize: 13, color: 'var(--stellar-100)', lineHeight: 1.55 }}>
                  Pattern matches brute-force automated guessing. Likely credential stuffing
                  from a known botnet range.
                </div>
              </div>

              {/* Source + Risk */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                <div style={{ padding: 12, border: '1px solid rgba(244,220,160,.12)', borderRadius: 6 }}>
                  <div className="gai-mono" style={{ fontSize: 9, color: 'var(--stellar-300)', letterSpacing: '.22em' }}>SOURCE IP</div>
                  <div className="gai-mono" style={{ fontSize: 15, color: 'var(--stellar-50)', marginTop: 3 }}>185.220.101.50</div>
                </div>
                <div style={{ padding: 12, border: '1px solid rgba(255,104,104,.3)', borderRadius: 6, background: 'rgba(255,59,59,.06)' }}>
                  <div className="gai-mono" style={{ fontSize: 9, color: 'var(--plasma-400)', letterSpacing: '.22em' }}>RISK SCORE</div>
                  <div className="gai-display" style={{ fontSize: 22, color: 'var(--plasma-400)', marginTop: 2, lineHeight: 1 }}>0.94 <span style={{ fontSize: 11, color: 'var(--stellar-300)' }}>/ 1.0</span></div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <button className="gai-btn gai-btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleApproveBlock}>Approve and Block</button>
                <button className="gai-btn gai-btn-quiet" onClick={() => setModalOpen(false)}>Ignore for now</button>
              </div>
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <a style={{ fontSize: 12, color: 'var(--gold-400)', cursor: 'pointer', textDecoration: 'underline dotted', textUnderlineOffset: 3 }}>
                  Ask Guardian AI about this →
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// ─── Screen 2 — Event detail modal over audit log ────────────
const ActivityWithModal = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <ActivityLog />

    {/* dim overlay */}
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,6,13,.7)', backdropFilter: 'blur(4px)' }}></div>

    {/* modal */}
    <div style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: 540,
      background: 'linear-gradient(180deg, #1c1219, #110a14)',
      border: '1px solid rgba(244,220,160,.22)',
      borderRadius: 12,
      boxShadow: '0 30px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(244,220,160,.1), 0 0 100px rgba(255,106,31,.15)',
      overflow: 'hidden',
    }}>
      {/* glow strip */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--ember-500), transparent)' }}></div>

      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span className="gai-badge warn"><span className="gai-dot"></span>Approval Needed</span>
          <span className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', letterSpacing: '.2em' }}>SEC-7724-RU</span>
        </div>

        <h2 className="gai-display" style={{ fontSize: 30, margin: '10px 0 0', lineHeight: 1 }}>Approval needed</h2>

        <p style={{ fontSize: 14, color: 'var(--stellar-100)', marginTop: 12, lineHeight: 1.55 }}>
          Someone in <b style={{ color: 'var(--plasma-400)' }}>Russia</b> has attempted to login{' '}
          <b style={{ color: 'var(--ember-300)' }}>47 times</b> in the last 8 minutes.
        </p>

        {/* Analysis panel */}
        <div style={{
          marginTop: 16, padding: 14,
          border: '1px solid rgba(244,220,160,.14)',
          background: 'rgba(0,0,0,.35)', borderRadius: 8,
        }}>
          <div className="gai-mono" style={{ fontSize: 10, color: 'var(--gold-500)', letterSpacing: '.22em', marginBottom: 6 }}>ANALYSIS</div>
          <div style={{ fontSize: 13, color: 'var(--stellar-100)', lineHeight: 1.55 }}>
            Pattern matches brute-force automated guessing. Likely credential stuffing
            from a known botnet range.
          </div>
        </div>

        {/* Source + Risk */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          <div style={{ padding: 12, border: '1px solid rgba(244,220,160,.12)', borderRadius: 6 }}>
            <div className="gai-mono" style={{ fontSize: 9, color: 'var(--stellar-300)', letterSpacing: '.22em' }}>SOURCE IP</div>
            <div className="gai-mono" style={{ fontSize: 15, color: 'var(--stellar-50)', marginTop: 3 }}>185.220.101.50</div>
          </div>
          <div style={{ padding: 12, border: '1px solid rgba(255,104,104,.3)', borderRadius: 6, background: 'rgba(255,59,59,.06)' }}>
            <div className="gai-mono" style={{ fontSize: 9, color: 'var(--plasma-400)', letterSpacing: '.22em' }}>RISK SCORE</div>
            <div className="gai-display" style={{ fontSize: 22, color: 'var(--plasma-400)', marginTop: 2, lineHeight: 1 }}>0.94 <span style={{ fontSize: 11, color: 'var(--stellar-300)' }}>/ 1.0</span></div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button className="gai-btn gai-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Approve and Block</button>
          <button className="gai-btn gai-btn-quiet">Ignore for now</button>
        </div>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <a style={{ fontSize: 12, color: 'var(--gold-400)', cursor: 'pointer', textDecoration: 'underline dotted', textUnderlineOffset: 3 }}>
            Ask Guardian AI about this →
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ─── Screen 3 — Event detail full page ───────────────────────
const EventDetail = () => {
  const [techOpen, setTechOpen] = React.useState(false);
  return (
    <AppShell active="activity">
      {/* Breadcrumb */}
      <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.1em', marginBottom: 12 }}>
        Activity Log &nbsp;/&nbsp; <span style={{ color: 'var(--gold-400)' }}>Event SEC-7724-RU</span>
      </div>

      {/* Hero strip */}
      <div className="gai-card rim" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="gai-badge warn"><span className="gai-dot"></span>Critical</span>
          <span className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.18em' }}>EVENT · SEC-7724-RU</span>
          <span className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.18em' }}>· 22:26:08 SAST</span>
        </div>
        <h1 className="gai-display" style={{ fontSize: 44, margin: 0, lineHeight: 1 }}>
          Brute force attempt detected
        </h1>

        <div style={{
          marginTop: 16, padding: '14px 18px',
          border: '1px solid rgba(244,220,160,.18)',
          borderLeft: '3px solid var(--ember-500)',
          background: 'rgba(0,0,0,.3)', borderRadius: 4,
        }}>
          <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)', marginBottom: 4 }}>GUARDIAN AI · TRANSCRIPT</div>
          <div style={{ fontSize: 15, color: 'var(--stellar-100)', lineHeight: 1.55, fontStyle: 'italic' }}>
            "Someone in Russia tried to guess your password 47 times in the last 8 minutes.
            I've temporarily slowed down their access to keep your data safe."
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="gai-badge gold"><span className="gai-dot"></span>Sentinel Active</span>
          <span className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.1em' }}>
            Containment in 4s · sector 03 sealed
          </span>
        </div>
      </div>

      {/* 3 info panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 14 }}>
        {/* Origin */}
        <div className="gai-card" style={{ padding: 18 }}>
          <div className="gai-label">Origin Location</div>
          <div className="gai-display" style={{ fontSize: 18, marginTop: 6 }}>St. Petersburg, RU</div>

          {/* Dot map */}
          <div style={{
            marginTop: 14, height: 130, borderRadius: 6,
            border: '1px solid rgba(244,220,160,.12)',
            background: 'radial-gradient(60% 60% at 60% 40%, rgba(255,59,59,.15), transparent 70%), rgba(0,0,0,.35)',
            position: 'relative', overflow: 'hidden',
          }}>
            <svg width="100%" height="100%" viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
              {Array.from({ length: 18 }).map((_, r) =>
                Array.from({ length: 28 }).map((_, c) => {
                  const x = c * 7 + 8, y = r * 7 + 6;
                  const inRussia = (
                    (x > 80 && x < 195 && y > 20 && y < 70) ||
                    (x > 100 && x < 180 && y > 55 && y < 90)
                  );
                  const inOther = (
                    (x > 10 && x < 80 && y > 30 && y < 90 && Math.random() > 0.5) ||
                    (x > 60 && x < 130 && y > 95 && y < 120 && Math.random() > 0.6)
                  );
                  if (!inRussia && !inOther) return null;
                  return <circle key={`${r}-${c}`} cx={x} cy={y} r="1.2" fill={inRussia ? '#cfc6b3' : '#6e665a'} opacity={inRussia ? .55 : .3} />;
                })
              )}
              <circle cx="140" cy="36" r="10" fill="rgba(255,59,59,.2)" />
              <circle cx="140" cy="36" r="5" fill="rgba(255,59,59,.5)" />
              <circle cx="140" cy="36" r="2.5" fill="#ff3b3b" />
            </svg>
          </div>

          <div className="gai-mono" style={{ marginTop: 10, fontSize: 11, color: 'var(--stellar-200)', letterSpacing: '.05em' }}>
            <div>IP · 185.220.101.50</div>
            <div style={{ color: 'var(--stellar-300)', marginTop: 2 }}>ASN · 14061 — Tor exit relay</div>
          </div>
        </div>

        {/* Threat analytics */}
        <div className="gai-card" style={{ padding: 18 }}>
          <div className="gai-label">Threat Analytics</div>

          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.1em' }}>RISK SCORE</span>
                <span className="gai-display" style={{ fontSize: 18, color: 'var(--plasma-400)' }}>0.94 <span style={{ fontSize: 11, color: 'var(--stellar-400)' }}>/ 1.0</span></span>
              </div>
              <div className="gai-meter" style={{ marginTop: 6, height: 8 }}>
                <div className="fill" style={{ width: '94%', background: 'linear-gradient(90deg, #ff6a1f, #ff3b3b)' }}></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <div className="gai-label">Attempts</div>
                <div className="gai-display" style={{ fontSize: 26, color: 'var(--ember-400)', lineHeight: 1, marginTop: 2 }}>47</div>
              </div>
              <div>
                <div className="gai-label">Timeframe</div>
                <div className="gai-display" style={{ fontSize: 26, color: 'var(--stellar-50)', lineHeight: 1, marginTop: 2 }}>8 min</div>
              </div>
            </div>

            <div>
              <div className="gai-label">Pattern</div>
              <div style={{ fontSize: 13, color: 'var(--stellar-100)', marginTop: 4, lineHeight: 1.5 }}>
                Cyclical brute force across <b style={{ color: 'var(--gold-400)' }}>5 login portals</b>
              </div>
            </div>
          </div>
        </div>

        {/* Sentinel history */}
        <div className="gai-card" style={{ padding: 18 }}>
          <div className="gai-label">Sentinel History</div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { tone: 'gold',    t: 'Now',     title: 'IP blacklisted automatically', sub: 'Range 185.220.101.0/24 sealed for 24h' },
              { tone: 'stellar', t: '14d ago',  title: 'Similar event on alpha-south',  sub: 'Same ASN · resolved · 9 attempts' },
              { tone: 'stellar', t: '38d ago',  title: 'Single SSH probe blocked',       sub: 'Same ASN · low confidence match' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: h.tone === 'gold' ? 'var(--gold-500)' : 'var(--stellar-400)', boxShadow: h.tone === 'gold' ? '0 0 8px var(--gold-500)' : 'none' }}></div>
                  {i < 2 && <div style={{ width: 1, flex: 1, background: 'rgba(244,220,160,.12)', minHeight: 18 }}></div>}
                </div>
                <div style={{ paddingBottom: 6 }}>
                  <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.2em', color: h.tone === 'gold' ? 'var(--gold-400)' : 'var(--stellar-300)' }}>{h.t.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: 'var(--stellar-50)', marginTop: 2 }}>{h.title}</div>
                  <div className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', marginTop: 2 }}>{h.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech investigation collapsible */}
      <div className="gai-card" style={{ padding: 0, marginTop: 14, overflow: 'hidden' }}>
        <button onClick={() => setTechOpen(o => !o)} style={{
          width: '100%', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 18px', background: 'transparent', border: 'none',
          color: 'var(--stellar-50)', cursor: 'pointer',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>EXPAND</span>
            <span className="gai-display" style={{ fontSize: 18 }}>Technical Investigation Logs</span>
          </span>
          <span style={{ transform: techOpen ? 'rotate(90deg)' : 'none', transition: 'transform .2s', color: 'var(--gold-500)' }}>▶</span>
        </button>
        {techOpen && (
          <div style={{ padding: '0 18px 18px', borderTop: '1px solid rgba(244,220,160,.08)' }}>
            <pre className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-200)', margin: '14px 0 0', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
{`[22:21:14] sshd[8421] auth_failure for user 'backup' from 185.220.101.50
[22:21:18] sshd[8423] auth_failure for user 'backup' from 185.220.101.52
[22:22:02] guardian.detect: brute_force pattern v3 candidate · conf 0.71
[22:23:02] guardian.detect: brute_force confirmed across 5 source IPs
[22:25:51] guardian.score: 0.94 · threshold 0.70 breached
[22:26:05] guardian.act: iptables -A INPUT -s 185.220.101.0/24 -j DROP
[22:26:07] notifier.telegram: dispatched → @naledi`}
            </pre>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, marginTop: 18, justifyContent: 'flex-end' }}>
        <button className="gai-btn gai-btn-ghost">False Positive</button>
        <button className="gai-btn gai-btn-primary">Approve and Block</button>
      </div>
    </AppShell>
  );
};

Object.assign(window, { ActivityLog, ActivityWithModal, EventDetail });
