// dashboard.jsx — Main dashboard

const HeroStatus = () => (
  <div className="gai-card rim" style={{ padding: 28, overflow: 'hidden', position: 'relative' }}>
    <div style={{ position: 'absolute', right: -40, top: -40, width: 260, height: 260, opacity: .35, pointerEvents: 'none' }}>
      <Sigil size={260} glow />
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <span className="gai-badge live"><span className="gai-dot"></span>All Systems Nominal</span>
      <span className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.18em' }}>SHIELD HOLDING · 99.94%</span>
    </div>

    <h1 className="gai-display" style={{
      fontSize: 64, margin: 0, lineHeight: .92,
      background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
    }}>
      Your business is protected
    </h1>

    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 16, color: 'var(--stellar-200)', fontSize: 13 }}>
      <div className="gai-mono" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-500)' }}></span>
        LAST CHECKED · 22:26:05 SAST
      </div>
      <div className="gai-mono" style={{ color: 'var(--stellar-300)' }}>web-server-01 · Cape Town</div>
    </div>
  </div>
);

const KPIRow = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 14 }}>
    <KPI label="Threats blocked today"  value="147" sub="+ 23 vs yesterday" tone="gold" big />
    <KPI label="Awaiting your approval" value="0"   sub="Nothing needs you" big />
    <div className="gai-card" style={{ padding: 18, border: '1px solid rgba(255,138,61,.35)', background: 'linear-gradient(180deg, rgba(255,106,31,.10), rgba(0,0,0,.3))' }}>
      <div className="gai-label" style={{ color: 'var(--ember-300)' }}>Active incidents · Contained</div>
      <div className="gai-display" style={{ fontSize: 48, color: 'var(--ember-400)', marginTop: 6, lineHeight: 1 }}>1</div>
      <div className="gai-mono" style={{ fontSize: 11, color: 'var(--ember-300)', marginTop: 8, letterSpacing: '.05em' }}>
        Brute-force · sector 03 · sealed off
      </div>
    </div>
  </div>
);

// Side-by-side cards
const MttdCard = () => (
  <div className="gai-card" style={{ padding: 22 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
      <div>
        <div className="gai-label">Mean time to detect</div>
        <div className="gai-display" style={{ fontSize: 22, marginTop: 4 }}>Faster than the industry</div>
      </div>
      <span className="gai-badge gold"><span className="gai-dot"></span>Verified</span>
    </div>

    {/* GuardianAI bar — tiny dot */}
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <div className="gai-display" style={{ fontSize: 16, color: 'var(--ember-300)' }}>Guardian AI</div>
        <div className="gai-display" style={{ fontSize: 28, color: 'var(--ember-400)', lineHeight: 1 }}>4 <span style={{ fontSize: 14, color: 'var(--stellar-300)' }}>min</span></div>
      </div>
      <div style={{ position: 'relative', height: 12, background: 'rgba(244,220,160,.06)', borderRadius: 999 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '0.5%', background: 'var(--grad-ember)', borderRadius: 999, boxShadow: '0 0 16px var(--ember-500)' }}></div>
      </div>
    </div>

    {/* SA industry bar — way longer */}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <div className="gai-display" style={{ fontSize: 16, color: 'var(--stellar-300)' }}>SA Industry Average</div>
        <div className="gai-display" style={{ fontSize: 28, color: 'var(--stellar-200)', lineHeight: 1 }}>227 <span style={{ fontSize: 14, color: 'var(--stellar-400)' }}>days</span></div>
      </div>
      <div style={{ position: 'relative', height: 12, background: 'rgba(244,220,160,.06)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', background: 'repeating-linear-gradient(90deg, rgba(207,198,179,.4) 0 6px, rgba(207,198,179,.15) 6px 12px)', borderRadius: 999 }}></div>
      </div>
    </div>

    <div className="gai-mono" style={{ marginTop: 14, fontSize: 11, color: 'var(--gold-400)', letterSpacing: '.1em' }}>
      // ≈ 81,720× faster · IBM Cost of a Data Breach 2024
    </div>
  </div>
);

const FeedCard = () => {
  const lines = [
    { t: '22:26:05', lvl: 'INFO',    body: 'DISTRIBUTED_BRUTEFORCE — 185.220.101.50 — score=90 — ', tail: 'CRITICAL — 5 IPs targeting username \'backup\' — password spray', color: 'var(--plasma-400)' },
    { t: '22:26:05', lvl: 'WARNING', body: 'AUTO-BLOCKING 185.220.101.50 — threshold breach: 90 ≥ 70', color: 'var(--ember-300)' },
    { t: '22:26:05', lvl: 'INFO',    body: 'Blocked 185.220.101.50 — approved_by=guardianai-auto', color: 'var(--gold-400)' },
  ];
  return (
    <div className="gai-card" style={{ padding: 22, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div className="gai-label">Live telemetry</div>
          <div className="gai-display" style={{ fontSize: 22, marginTop: 4 }}>What I'm seeing right now</div>
        </div>
        <span className="gai-badge live"><span className="gai-dot"></span>Streaming</span>
      </div>

      <div style={{
        flex: 1,
        background: 'rgba(0,0,0,.45)',
        border: '1px solid rgba(244,220,160,.08)',
        borderRadius: 6, padding: 14,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11.5, lineHeight: 1.75,
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--stellar-400)' }}>{l.t}</span>
            <span style={{ color: l.lvl === 'WARNING' ? 'var(--ember-400)' : 'var(--gold-500)' }}>{l.lvl}</span>
            <span style={{ color: 'var(--stellar-100)', flex: 1, minWidth: 200 }}>
              {l.body}
              {l.tail && <span style={{ color: l.color }}>{l.tail}</span>}
            </span>
          </div>
        ))}
        <div style={{ marginTop: 8, color: 'var(--ember-300)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 14, background: 'var(--ember-400)', display: 'inline-block', animation: 'gai-blink 1s steps(2) infinite' }}></span>
          <style>{`@keyframes gai-blink { 50% { opacity: 0; } }`}</style>
          <span style={{ color: 'var(--stellar-400)' }}>// awaiting next event...</span>
        </div>
      </div>
    </div>
  );
};

// Deeper surveillance entry tiles
const DeeperTile = ({ icon, title, sub, accent, onClick }) => (
  <div className="gai-card" style={{ padding: 18, cursor: 'pointer', transition: 'transform .15s, box-shadow .15s' }} onClick={onClick}>
    <div style={{
      width: 40, height: 40, borderRadius: 8,
      border: `1px solid ${accent === 'ember' ? 'rgba(255,138,61,.4)' : 'rgba(244,220,160,.3)'}`,
      background: accent === 'ember' ? 'rgba(255,106,31,.1)' : 'rgba(212,162,74,.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: 14,
    }}>{icon}</div>
    <div className="gai-display" style={{ fontSize: 18, lineHeight: 1.1 }}>{title}</div>
    <div style={{ fontSize: 12, color: 'var(--stellar-300)', marginTop: 6 }}>{sub}</div>
    <div className="gai-mono" style={{ marginTop: 12, fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>OPEN →</div>
  </div>
);

const DeeperSection = ({ navigate }) => (
  <>
    <SectionHead num="DEEPER" title="Deeper Surveillance" sub="Dig into the systems behind the headlines." />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      <DeeperTile
        accent="ember"
        title="Threat Alerts"
        sub="3 active patterns under watch"
        onClick={() => navigate && navigate('threat-alerts')}
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2 L18 17 L2 17 Z" fill="none" stroke="#ff8a3d" strokeWidth="1.5"/><rect x="9" y="7" width="2" height="5" fill="#ff8a3d"/><circle cx="10" cy="14" r="1" fill="#ff8a3d"/></svg>}
      />
      <DeeperTile
        title="Attack Timelines"
        sub="Incident playback by category"
        onClick={() => navigate && navigate('attack-timelines')}
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="4" cy="10" r="2" fill="#d4a24a"/><circle cx="10" cy="10" r="2" fill="#d4a24a"/><circle cx="16" cy="10" r="2" fill="#d4a24a"/><line x1="4" y1="10" x2="16" y2="10" stroke="#d4a24a" strokeWidth="1"/></svg>}
      />
      <DeeperTile
        title="Link Checker"
        sub="Scan a URL before you trust it"
        onClick={() => navigate && navigate('link-checker')}
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="8" cy="8" r="5" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><line x1="12" y1="12" x2="17" y2="17" stroke="#d4a24a" strokeWidth="1.5"/></svg>}
      />
      <DeeperTile
        title="Security Tips"
        sub="Daily briefing for your team"
        onClick={() => navigate && navigate('security-tips')}
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><line x1="6" y1="7" x2="14" y2="7" stroke="#d4a24a" strokeWidth="1.2"/><line x1="6" y1="10" x2="14" y2="10" stroke="#d4a24a" strokeWidth="1.2"/><line x1="6" y1="13" x2="11" y2="13" stroke="#d4a24a" strokeWidth="1.2"/></svg>}
      />
    </div>
  </>
);

const RecentActivity = ({ navigate }) => {
  const rows = [
    { time: '22:26', title: 'Distributed brute-force from 185.220.101.50', detail: 'Auto-blocked across 5 IPs', sev: 'critical' },
    { time: '15:12', title: 'Phishing link blocked — kloof-secure-pay.co.za', detail: 'Spoof detected · sender flagged', sev: 'high' },
    { time: '11:48', title: '12 endpoints scanned',                          detail: '0 findings · all clean', sev: 'info' },
  ];
  const sevBadge = (s) => {
    if (s === 'critical') return <span className="gai-badge warn"><span className="gai-dot"></span>Critical</span>;
    if (s === 'high')     return <span className="gai-badge live"><span className="gai-dot"></span>High</span>;
    return <span className="gai-badge"><span className="gai-dot" style={{ background: 'var(--gold-500)' }}></span>Routine</span>;
  };
  return (
    <>
      <SectionHead num="RECENT" title="Recent Activity" sub="The last 24 hours, in plain language."
        action={<button className="gai-btn gai-btn-ghost gai-btn-sm" onClick={() => navigate && navigate('activity')}>View all →</button>} />
      <div className="gai-card" style={{ padding: 0, overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 18, alignItems: 'center',
            padding: '14px 18px',
            borderTop: i > 0 ? '1px solid rgba(244,220,160,.08)' : 'none',
          }}>
            <div className="gai-mono" style={{ fontSize: 13, color: 'var(--gold-400)', letterSpacing: '.08em' }}>{r.time}</div>
            <div>
              <div style={{ fontSize: 14, color: 'var(--stellar-50)' }}>{r.title}</div>
              <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', marginTop: 3, letterSpacing: '.05em' }}>{r.detail}</div>
            </div>
            {sevBadge(r.sev)}
          </div>
        ))}
      </div>
    </>
  );
};

const Dashboard = ({ navigate }) => (
  <AppShell active="dashboard" navigate={navigate}>
    <HeroStatus />
    <KPIRow />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
      <MttdCard />
      <FeedCard />
    </div>
    <DeeperSection navigate={navigate} />
    <RecentActivity navigate={navigate} />
  </AppShell>
);

Object.assign(window, { Dashboard });
