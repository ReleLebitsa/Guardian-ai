// deeper.jsx — Threat Alerts · Attack Timelines · Link Checker · Security Tips

// ─── Page 1 — Threat Alerts ──────────────────────────────────
const ThreatAlerts = ({ navigate }) => {
  const alerts = [
    {
      sev: 'critical', label: 'CRITICAL',
      title: 'Distributed brute-force', sub: '5 IPs targeting \'backup\' · auto-blocked',
      meta: '22:26 · 185.220.101.0/24', risk: 0.94,
      desc: 'Coordinated credential spray across five source IPs in the same /24 block. Range sealed; owner notified via Telegram.',
    },
    {
      sev: 'warn', label: 'ELEVATED',
      title: 'High inbound traffic', sub: 'Possible DDoS on port 443 · monitoring',
      meta: '21:50 · multiple ASNs', risk: 0.61,
      desc: 'Sustained traffic above the seven-day baseline. Rate-limits engaged on edge; no service degradation detected.',
    },
    {
      sev: 'review', label: 'REVIEW',
      title: 'Suspicious file downloaded', sub: 'EP-04 fetched .exe from unverified domain · quarantined',
      meta: '22:33 · cdn-update-server.ru', risk: 0.78,
      desc: 'Endpoint EP-04 retrieved a Windows executable from a domain registered three days ago. File quarantined; process terminated.',
    },
  ];

  return (
    <AppShell active="dashboard" navigate={navigate}>
      <BackButton navigate={navigate} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18 }}>
        <div>
          <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--gold-500)' }}>/ ALERTS</div>
          <h1 className="gai-display" style={{ fontSize: 44, margin: '4px 0 0', lineHeight: 1 }}>
            Threat Alerts <span style={{ color: 'var(--ember-400)' }}>— 3 active patterns</span>
          </h1>
          <p style={{ color: 'var(--stellar-200)', fontSize: 13, marginTop: 4 }}>
            Live patterns I'm watching right now. Auto-responses already engaged.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="gai-btn gai-btn-ghost gai-btn-sm">Mute non-critical</button>
          <button className="gai-btn gai-btn-primary gai-btn-sm">⟶ Engage all</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {alerts.map((a, i) => {
          const accent =
            a.sev === 'critical' ? { c: 'var(--plasma-400)', bg: 'rgba(255,59,59,.06)', bd: 'rgba(255,104,104,.4)' } :
            a.sev === 'warn'     ? { c: 'var(--ember-400)',  bg: 'rgba(255,106,31,.06)', bd: 'rgba(255,138,61,.4)' } :
                                   { c: 'var(--gold-400)',   bg: 'rgba(212,162,74,.06)', bd: 'rgba(232,192,116,.35)' };
          return (
            <div key={i} className="gai-card" style={{
              padding: 22,
              borderColor: accent.bd, background: `linear-gradient(180deg, ${accent.bg}, rgba(0,0,0,.3))`,
              display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 18,
            }}>
              {/* sev block */}
              <div style={{
                width: 60, height: '100%', minHeight: 80,
                background: a.sev === 'critical' ? 'linear-gradient(180deg, #ff3b3b, #c41e3a)' :
                            a.sev === 'warn'     ? 'var(--grad-ember)' :
                                                   'var(--grad-gold)',
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--void-950)',
                writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                fontFamily: '"Big Shoulders Display"', fontSize: 14, fontWeight: 800, letterSpacing: '.2em',
              }}>{a.label}</div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <h3 className="gai-display" style={{ fontSize: 24, margin: 0, color: accent.c }}>{a.title}</h3>
                  <span className="gai-mono" style={{ fontSize: 11, letterSpacing: '.1em', color: 'var(--stellar-300)' }}>{a.meta}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--stellar-100)', marginTop: 4 }}>{a.sub}</div>
                <div style={{ fontSize: 13, color: 'var(--stellar-200)', marginTop: 10, lineHeight: 1.55, maxWidth: 620 }}>{a.desc}</div>

                {/* risk meter */}
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className="gai-mono" style={{ fontSize: 10, letterSpacing: '.18em', color: 'var(--stellar-300)' }}>RISK</span>
                  <div style={{ flex: 1, maxWidth: 260, height: 6, background: 'rgba(244,220,160,.08)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${a.risk * 100}%`, background: `linear-gradient(90deg, var(--ember-500), ${accent.c})`, borderRadius: 999 }}></div>
                  </div>
                  <span className="gai-mono" style={{ fontSize: 11, color: accent.c }}>{a.risk.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10, alignItems: 'flex-end' }}>
                <span className="gai-badge" style={{ borderColor: accent.bd, color: accent.c }}>
                  <span className="gai-dot" style={{ background: accent.c }}></span>
                  Engaged
                </span>
                <button className="gai-btn gai-btn-primary gai-btn-sm">Investigate →</button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
};

// ─── Page 2 — Attack Timelines ───────────────────────────────
const TimelineEntry = ({ time, text, last }) => (
  <div style={{ display: 'flex', gap: 14, position: 'relative' }}>
    <div style={{ width: 100, flexShrink: 0, textAlign: 'right' }}>
      <span className="gai-mono" style={{ fontSize: 11, color: 'var(--gold-400)', letterSpacing: '.05em' }}>{time}</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember-500)', boxShadow: '0 0 8px var(--ember-500)' }}></div>
      {!last && <div style={{ width: 1, flex: 1, background: 'rgba(244,220,160,.15)', marginTop: 4, minHeight: 22 }}></div>}
    </div>
    <div style={{ flex: 1, paddingBottom: last ? 0 : 14 }}>
      <div style={{ fontSize: 13, color: 'var(--stellar-100)', lineHeight: 1.5 }}>{text}</div>
    </div>
  </div>
);

const TimelineCategory = ({ title, count, badgeTone, events, defaultOpen = false }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="gai-card" style={{ padding: 0, overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', textAlign: 'left',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 22px', background: 'transparent', border: 'none', cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .2s', color: 'var(--gold-500)' }}>▶</span>
          <span className="gai-display" style={{ fontSize: 22, color: 'var(--stellar-50)' }}>{title}</span>
          <span className={`gai-badge ${badgeTone}`}>
            <span className="gai-dot"></span>{count} incident{count > 1 ? 's' : ''}
          </span>
        </div>
        <span className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--stellar-300)' }}>
          {open ? 'COLLAPSE' : 'EXPAND'} →
        </span>
      </button>
      {open && (
        <div style={{ padding: '18px 22px 22px', borderTop: '1px solid rgba(244,220,160,.08)', background: 'rgba(0,0,0,.2)' }}>
          {events.map((e, i) => (
            <TimelineEntry key={i} time={e.t} text={e.text} last={i === events.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const AttackTimelines = ({ navigate }) => (
  <AppShell active="dashboard" navigate={navigate}>
    <BackButton navigate={navigate} />
    <div style={{ marginBottom: 22 }}>
      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--gold-500)' }}>/ TIMELINES</div>
      <h1 className="gai-display" style={{ fontSize: 44, margin: '4px 0 0', lineHeight: 1 }}>Attack Timelines</h1>
      <p style={{ color: 'var(--stellar-200)', fontSize: 13, marginTop: 4 }}>Replay every incident, step by step.</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <TimelineCategory
        title="Brute-Force"
        count={1} badgeTone="warn" defaultOpen
        events={[
          { t: '22:21:14', text: 'First login attempt from 185.220.101.50 targeting \'backup\'' },
          { t: '22:23:02', text: 'Pattern recognised across 5 source IPs' },
          { t: '22:25:51', text: 'Risk score crosses threshold: 90 ≥ 70' },
          { t: '22:26:05', text: 'Auto-blocked. Range temporarily blacklisted' },
          { t: '22:26:07', text: 'Owner notified via Telegram' },
        ]}
      />

      <TimelineCategory
        title="Malware Download"
        count={1} badgeTone="warn"
        events={[
          { t: '22:33:08', text: 'EP-04 downloaded suspicious.exe from cdn-update-server.ru' },
          { t: '22:39:21', text: 'CPU spike detected on endpoint — likely execution' },
          { t: '22:42:47', text: 'Process killed, file quarantined' },
          { t: '22:45:12', text: 'Endpoint scanned clean, returned to normal' },
        ]}
      />

      <TimelineCategory
        title="Phishing"
        count={1} badgeTone="gold"
        events={[
          { t: '15:12:33', text: 'Inbound Telegram link blocked: kloof-secure-pay.co.za' },
          { t: '15:12:34', text: 'Spoof match detected — looks like kloofcoffee.co.za' },
          { t: '15:12:35', text: 'Sender flagged, all team chats screened' },
        ]}
      />
    </div>
  </AppShell>
);

// ─── Page 3 — Link Checker ───────────────────────────────────
const LinkChecker = ({ navigate }) => {
  const findings = [
    'Spoof of kloofcoffee.co.za',
    'Listed on 3 phishing blocklists',
    'SSL cert issued 2 days ago',
    'Final hop loads credential-harvesting form',
  ];
  const recent = [
    { url: 'shopify-payments.com',     who: 'Naledi',  verdict: 'SAFE',      tone: 'gold',  time: '21:14' },
    { url: 'kloof-secure-pay.co.za',   who: 'Sipho',   verdict: 'MALICIOUS', tone: 'warn',  time: '22:14' },
    { url: 'docs.google.com/...abc',   who: 'Naledi',  verdict: 'SAFE',      tone: 'gold',  time: '17:02' },
    { url: 'tinyurl.com/m3xz9',        who: 'Thandi',  verdict: 'SUSPECT',   tone: 'live',  time: '14:08' },
  ];

  return (
    <AppShell active="dashboard" navigate={navigate}>
      <BackButton navigate={navigate} />
      <div style={{ marginBottom: 22 }}>
        <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--gold-500)' }}>/ LINK CHECKER</div>
        <h1 className="gai-display" style={{ fontSize: 44, margin: '4px 0 0', lineHeight: 1 }}>Link Checker</h1>
        <p style={{ color: 'var(--stellar-200)', fontSize: 13, marginTop: 4 }}>Paste a URL. I'll tell you whether to trust it.</p>
      </div>

      {/* Scan input */}
      <div className="gai-card rim" style={{ padding: 18 }}>
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center',
          background: 'rgba(0,0,0,.45)', border: '1px solid rgba(244,220,160,.18)', borderRadius: 8,
          padding: '8px 8px 8px 14px',
        }}>
          <span className="gai-mono" style={{ fontSize: 11, color: 'var(--gold-500)', letterSpacing: '.15em' }}>HTTPS://</span>
          <input
            defaultValue="kloof-secure-pay.co.za"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--stellar-50)', fontFamily: '"JetBrains Mono", monospace', fontSize: 14, letterSpacing: '.02em' }}
          />
          <button className="gai-btn gai-btn-primary">⟶ Scan</button>
        </div>
      </div>

      {/* Result */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14, marginTop: 14 }}>
        {/* Verdict */}
        <div className="gai-card" style={{ padding: 22, borderColor: 'rgba(255,104,104,.4)', background: 'linear-gradient(180deg, rgba(255,59,59,.08), rgba(0,0,0,.3))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="gai-badge warn"><span className="gai-dot"></span>Malicious</span>
            <span className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.15em' }}>SCANNED · 22:14 SAST</span>
          </div>
          <h2 className="gai-display" style={{ fontSize: 32, margin: '12px 0 4px', color: 'var(--plasma-400)' }}>"Don't open this"</h2>
          <div className="gai-mono" style={{ fontSize: 13, color: 'var(--stellar-100)', letterSpacing: '.02em' }}>kloof-secure-pay.co.za</div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 12, border: '1px solid rgba(244,220,160,.12)', borderRadius: 6 }}>
              <div className="gai-label">Reputation</div>
              <div className="gai-display" style={{ fontSize: 28, color: 'var(--plasma-400)', lineHeight: 1, marginTop: 2 }}>2 <span style={{ fontSize: 14, color: 'var(--stellar-300)' }}>/ 100</span></div>
            </div>
            <div style={{ padding: 12, border: '1px solid rgba(244,220,160,.12)', borderRadius: 6 }}>
              <div className="gai-label">Domain age</div>
              <div className="gai-display" style={{ fontSize: 28, color: 'var(--ember-400)', lineHeight: 1, marginTop: 2 }}>3 <span style={{ fontSize: 14, color: 'var(--stellar-300)' }}>days</span></div>
            </div>
            <div style={{ padding: 12, border: '1px solid rgba(244,220,160,.12)', borderRadius: 6 }}>
              <div className="gai-label">Hosted in</div>
              <div className="gai-display" style={{ fontSize: 20, color: 'var(--stellar-50)', lineHeight: 1.2, marginTop: 4 }}>Bulgaria</div>
            </div>
            <div style={{ padding: 12, border: '1px solid rgba(244,220,160,.12)', borderRadius: 6 }}>
              <div className="gai-label">Redirect chain</div>
              <div className="gai-display" style={{ fontSize: 28, color: 'var(--stellar-50)', lineHeight: 1, marginTop: 2 }}>4 <span style={{ fontSize: 14, color: 'var(--stellar-300)' }}>hops</span></div>
            </div>
          </div>
        </div>

        {/* Findings */}
        <div className="gai-card" style={{ padding: 22 }}>
          <div className="gai-label" style={{ marginBottom: 12 }}>Findings · 4</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {findings.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', border: '1px solid rgba(244,220,160,.10)', borderRadius: 6, background: 'rgba(0,0,0,.25)', alignItems: 'flex-start' }}>
                <div style={{ width: 18, height: 18, borderRadius: 3, background: 'rgba(255,59,59,.18)', border: '1px solid rgba(255,104,104,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'var(--plasma-400)', fontSize: 12, fontWeight: 700 }}>!</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--stellar-100)', lineHeight: 1.45 }}>{f}</div>
              </div>
            ))}
          </div>
          <button className="gai-btn gai-btn-ghost gai-btn-sm" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
            ⛃ Report to team
          </button>
        </div>
      </div>

      {/* Recent team scans */}
      <SectionHead num="RECENT" title="Recent team scans" sub="What your colleagues have been checking." />
      <div className="gai-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 110px', padding: '10px 18px', background: 'rgba(0,0,0,.15)', borderBottom: '1px solid rgba(244,220,160,.08)' }} className="gai-label">
          <div>URL</div><div>Who scanned</div><div>Verdict</div><div style={{ textAlign: 'right' }}>Time</div>
        </div>
        {recent.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 110px', padding: '12px 18px', alignItems: 'center', borderBottom: i < recent.length - 1 ? '1px solid rgba(244,220,160,.06)' : 'none' }}>
            <div className="gai-mono" style={{ fontSize: 12, color: 'var(--stellar-100)' }}>{r.url}</div>
            <div style={{ fontSize: 13, color: 'var(--stellar-200)' }}>{r.who}</div>
            <div><span className={`gai-badge ${r.tone}`}><span className="gai-dot"></span>{r.verdict}</span></div>
            <div className="gai-mono" style={{ fontSize: 11, color: 'var(--gold-400)', textAlign: 'right' }}>{r.time}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
};

// ─── Page 4 — Security Tips ──────────────────────────────────
const TipCard = ({ icon, kicker, title }) => (
  <div className="gai-card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{
      width: 40, height: 40, borderRadius: 8,
      border: '1px solid rgba(244,220,160,.3)', background: 'rgba(212,162,74,.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{icon}</div>
    <div>
      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>{kicker.toUpperCase()}</div>
      <div className="gai-display" style={{ fontSize: 17, marginTop: 6, lineHeight: 1.2 }}>{title}</div>
    </div>
  </div>
);

const SecurityTips = ({ navigate }) => (
  <AppShell active="dashboard" navigate={navigate}>
    <BackButton navigate={navigate} />
    <div style={{ marginBottom: 22 }}>
      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--gold-500)' }}>/ TIPS</div>
      <h1 className="gai-display" style={{ fontSize: 44, margin: '4px 0 0', lineHeight: 1 }}>Security Tips</h1>
      <p style={{ color: 'var(--stellar-200)', fontSize: 13, marginTop: 4 }}>Daily briefing for your team.</p>
    </div>

    {/* Featured */}
    <div className="gai-card rim" style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 240px', gap: 28, alignItems: 'center' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span className="gai-badge live"><span className="gai-dot"></span>Today's Tip</span>
          <span className="gai-mono" style={{ fontSize: 11, letterSpacing: '.18em', color: 'var(--stellar-300)' }}>23 MAY 2026 · 06:00 SAST</span>
        </div>
        <h2 className="gai-display" style={{
          fontSize: 38, margin: 0, lineHeight: 1,
          background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}>
          Check every link<br />before you click it
        </h2>
        <p style={{ fontSize: 15, color: 'var(--stellar-100)', marginTop: 14, maxWidth: 540, lineHeight: 1.55 }}>
          Phishing domains often look almost identical to the real thing. Paste any link you didn't expect
          into our Link Checker — it takes 2 seconds and could save your business.
        </p>
        <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
          <button className="gai-btn gai-btn-primary" onClick={() => navigate && navigate('link-checker')}>⟶ Open Link Checker</button>
          <button className="gai-btn gai-btn-ghost">Share with team</button>
        </div>
      </div>
      <div style={{ aspectRatio: '1/1', position: 'relative', maxWidth: 240, justifySelf: 'end' }}>
        <Sigil size={200} glow />
      </div>
    </div>

    {/* Tip grid */}
    <SectionHead num="LIBRARY" title="More tips" sub="One-line rules your whole team can remember."
      action={<button className="gai-btn gai-btn-ghost gai-btn-sm">All 24 tips →</button>} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      <TipCard
        kicker="Files"
        title="Never run a file from a chat you weren't expecting"
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><rect x="4" y="2" width="9" height="14" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><polyline points="11,2 11,5 14,5" fill="none" stroke="#d4a24a" strokeWidth="1.5"/></svg>}
      />
      <TipCard
        kicker="Passwords"
        title="Use a 14-character passphrase, never reuse across sites"
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="7" cy="10" r="3" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><line x1="10" y1="10" x2="17" y2="10" stroke="#d4a24a" strokeWidth="1.5"/><line x1="14" y1="10" x2="14" y2="13" stroke="#d4a24a" strokeWidth="1.5"/><line x1="17" y1="10" x2="17" y2="13" stroke="#d4a24a" strokeWidth="1.5"/></svg>}
      />
      <TipCard
        kicker="Updates"
        title="Restart your devices weekly — patches need a reboot to land"
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 10 A6 6 0 0 1 16 10" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><polyline points="16,5 16,10 11,10" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><path d="M16 10 A6 6 0 0 1 4 10" fill="none" stroke="#d4a24a" strokeWidth="1.5" opacity=".5"/></svg>}
      />
      <TipCard
        kicker="Devices"
        title="Lock your screen every time you walk away"
        icon={<svg width="20" height="20" viewBox="0 0 20 20"><rect x="5" y="9" width="10" height="9" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><path d="M7 9 V6 A3 3 0 0 1 13 6 V9" fill="none" stroke="#d4a24a" strokeWidth="1.5"/></svg>}
      />
    </div>
  </AppShell>
);

Object.assign(window, { ThreatAlerts, AttackTimelines, LinkChecker, SecurityTips });
