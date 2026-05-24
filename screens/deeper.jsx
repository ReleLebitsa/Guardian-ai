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
    'Spoofs Standard Bank\'s official online banking domain',
    'Listed on 3 phishing blocklists',
    'SSL cert issued 2 days ago',
    'Final hop loads credential-harvesting form',
  ];
  const recent = [
    { url: 'shopify-payments.com',     who: 'Naledi',  verdict: 'SAFE',      tone: 'gold',  time: '21:14' },
    { url: 'standardbank-online-secure.ru', who: 'Sipho', verdict: 'MALICIOUS', tone: 'warn', time: '22:14' },
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
            defaultValue="standardbank-online-secure.ru"
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
          <div className="gai-mono" style={{ fontSize: 13, color: 'var(--stellar-100)', letterSpacing: '.02em' }}>standardbank-online-secure.ru</div>

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
              <div className="gai-display" style={{ fontSize: 20, color: 'var(--stellar-50)', lineHeight: 1.2, marginTop: 4 }}>Russia</div>
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

    <div style={{ marginBottom: 14 }}>
      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--gold-500)' }}>/ TIPS</div>
      <h1 className="gai-display" style={{ fontSize: 44, margin: '4px 0 0', lineHeight: 1 }}>Security Tips</h1>
      <p style={{ color: 'var(--stellar-200)', fontSize: 13, marginTop: 4 }}>Daily briefing for your team.</p>
    </div>

    {/* Ahead of the curve banner */}
    <div className="gai-card rim" style={{ padding: 22, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid rgba(244,220,160,.3)', background: 'rgba(212,162,74,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="22" height="22" viewBox="0 0 22 22"><polyline points="2,16 8,10 13,14 20,6" fill="none" stroke="#d4a24a" strokeWidth="1.8" strokeLinejoin="round"/><polyline points="16,6 20,6 20,10" fill="none" stroke="#d4a24a" strokeWidth="1.8" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ flex: 1 }}>
        <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)', marginBottom: 4 }}>GUARDIAN AI · INTELLIGENCE BRIEFING</div>
        <div className="gai-display" style={{ fontSize: 22, lineHeight: 1.1 }}>Keeping your business ahead of the curve</div>
        <div style={{ fontSize: 13, color: 'var(--stellar-200)', marginTop: 6, lineHeight: 1.5 }}>
          Cyber threats evolve every day. This briefing pulls live threat intelligence, certified training paths, and recognised professional standards so your team stays one step ahead — always.
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <span className="gai-badge gold"><span className="gai-dot"></span>Proactive Defence</span>
        <span className="gai-badge live"><span className="gai-dot"></span>Updated Daily</span>
      </div>
    </div>

    {/* Featured tip */}
    <div className="gai-card rim" style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 200px', gap: 28, alignItems: 'center' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span className="gai-badge live"><span className="gai-dot"></span>Today's Tip</span>
          <span className="gai-mono" style={{ fontSize: 11, letterSpacing: '.18em', color: 'var(--stellar-300)' }}>24 MAY 2026 · 06:00 SAST</span>
        </div>
        <h2 className="gai-display" style={{ fontSize: 38, margin: 0, lineHeight: 1, background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          Check every link<br />before you click it
        </h2>
        <p style={{ fontSize: 15, color: 'var(--stellar-100)', marginTop: 14, maxWidth: 540, lineHeight: 1.55 }}>
          Phishing domains often look almost identical to the real thing. Paste any link you didn't expect into our Link Checker — it takes 2 seconds and could save your business.
        </p>
        <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
          <button className="gai-btn gai-btn-primary" onClick={() => navigate && navigate('link-checker')}>⟶ Open Link Checker</button>
          <button className="gai-btn gai-btn-ghost">Share with team</button>
        </div>
      </div>
      <div style={{ justifySelf: 'end' }}><Sigil size={180} glow /></div>
    </div>

    {/* Recent attacks in SA */}
    <SectionHead num="THREAT INTEL" title="Recent Attacks in South Africa" sub="Stay aware of what's happening in your region — sourced from ITWeb." />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <a href="https://www.itweb.co.za/article/stats-sa-confirms-data-breach-as-hackers-demand-r17m-ransom/JBwErvn3wpo76Db2" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <div className="gai-card" style={{ padding: 22, height: '100%', borderColor: 'rgba(255,104,104,.35)', background: 'linear-gradient(180deg, rgba(255,59,59,.06), rgba(0,0,0,.3))', cursor: 'pointer', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <span className="gai-badge warn"><span className="gai-dot"></span>Data Breach</span>
            <span className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', letterSpacing: '.18em' }}>ITWEB · SA</span>
          </div>
          <div className="gai-display" style={{ fontSize: 22, color: 'var(--plasma-400)', lineHeight: 1.1, marginBottom: 10 }}>Stats SA Confirms Data Breach — Hackers Demand R17m Ransom</div>
          <p style={{ fontSize: 13, color: 'var(--stellar-200)', lineHeight: 1.55, margin: 0 }}>
            Statistics South Africa confirmed a significant breach. Threat actors exfiltrated sensitive government data and demanded R17 million. A reminder that no organisation is too large or too public to be targeted.
          </p>
          <div className="gai-mono" style={{ marginTop: 14, fontSize: 10, letterSpacing: '.18em', color: 'var(--plasma-400)' }}>READ ON ITWEB →</div>
        </div>
      </a>
      <a href="https://www.itweb.co.za/videos/WnxpE74Y6dZMV8XL" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <div className="gai-card" style={{ padding: 22, height: '100%', borderColor: 'rgba(255,138,61,.35)', background: 'linear-gradient(180deg, rgba(255,106,31,.06), rgba(0,0,0,.3))', cursor: 'pointer', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <span className="gai-badge live"><span className="gai-dot"></span>Video Briefing</span>
            <span className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', letterSpacing: '.18em' }}>ITWEB · CYBER</span>
          </div>
          <div style={{ height: 72, background: 'rgba(0,0,0,.4)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, border: '1px solid rgba(255,138,61,.2)' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,106,31,.2)', border: '1px solid rgba(255,138,61,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="15" viewBox="0 0 13 15"><polygon points="1,1 12,7.5 1,14" fill="#ff8a3d"/></svg>
            </div>
          </div>
          <div className="gai-display" style={{ fontSize: 22, color: 'var(--ember-300)', lineHeight: 1.1, marginBottom: 10 }}>ITWeb Cyber Security Video Briefing</div>
          <p style={{ fontSize: 13, color: 'var(--stellar-200)', lineHeight: 1.55, margin: 0 }}>
            Expert commentary on the latest threats and trends. What South African businesses need to know to stay protected in an evolving threat landscape.
          </p>
          <div className="gai-mono" style={{ marginTop: 14, fontSize: 10, letterSpacing: '.18em', color: 'var(--ember-400)' }}>WATCH ON ITWEB →</div>
        </div>
      </a>
    </div>

    {/* Train your team */}
    <SectionHead num="TRAINING" title="Train Your Team" sub="Certified platforms trusted by security professionals worldwide." />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {[
        {
          href: 'https://www.microsoft.com/en-us/security/business',
          kicker: 'Business Security',
          title: 'Microsoft Security for Business',
          desc: 'End-to-end security tools and training for SMBs. Protect email, devices, identities, and data from modern threats.',
          icon: <svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="1" width="8.5" height="8.5" fill="#f25022"/><rect x="10.5" y="1" width="8.5" height="8.5" fill="#7fba00"/><rect x="1" y="10.5" width="8.5" height="8.5" fill="#00a4ef"/><rect x="10.5" y="10.5" width="8.5" height="8.5" fill="#ffb900"/></svg>,
        },
        {
          href: 'https://www.comptia.org/certifications/security',
          kicker: 'Certification',
          title: 'CompTIA Security+',
          desc: 'Industry-standard certification for employees. Covers threat management, cryptography, and risk mitigation.',
          icon: <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="2" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><path d="M7 10 L9 12 L13 8" stroke="#d4a24a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        },
        {
          href: 'https://www.sans.org/security-awareness-training/',
          kicker: 'Awareness Training',
          title: 'SANS Security Awareness',
          desc: 'World-class programmes that build a human-centred defence layer. Reduces your biggest attack surface: your people.',
          icon: <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><path d="M10 5 L10 10 L13 13" stroke="#d4a24a" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>,
        },
      ].map((r, i) => (
        <a key={i} href={r.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="gai-card" style={{ padding: 18, cursor: 'pointer', height: '100%', boxSizing: 'border-box' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid rgba(244,220,160,.3)', background: 'rgba(212,162,74,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{r.icon}</div>
            <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>{r.kicker.toUpperCase()}</div>
            <div className="gai-display" style={{ fontSize: 17, marginTop: 6, lineHeight: 1.2 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: 'var(--stellar-300)', marginTop: 8, lineHeight: 1.5 }}>{r.desc}</div>
            <div className="gai-mono" style={{ marginTop: 12, fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>VISIT →</div>
          </div>
        </a>
      ))}
    </div>

    {/* Professional bodies */}
    <SectionHead num="BODIES" title="Professional Bodies" sub="Stay connected to the standards bodies that define the industry." />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <a href="https://www.iitpsa.org.za/overview-2/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <div className="gai-card" style={{ padding: 22, cursor: 'pointer', height: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid rgba(244,220,160,.3)', background: 'rgba(212,162,74,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 3 L19 7 L19 15 L11 19 L3 15 L3 7 Z" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><circle cx="11" cy="11" r="3" fill="none" stroke="#d4a24a" strokeWidth="1.2"/></svg>
            </div>
            <div>
              <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>SOUTH AFRICA · PROFESSIONAL BODY</div>
              <div className="gai-display" style={{ fontSize: 22, lineHeight: 1 }}>IITPSA</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--stellar-200)', lineHeight: 1.6 }}>
            The Institute of Information Technology Professionals South Africa is the recognised professional body for IT practitioners in SA. Membership demonstrates commitment to ethics, competence, and continuous professional development.
          </div>
          <div className="gai-mono" style={{ marginTop: 14, fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>EXPLORE MEMBERSHIP →</div>
        </div>
      </a>
      <div className="gai-card" style={{ padding: 22, border: '1px solid rgba(244,220,160,.2)', background: 'rgba(212,162,74,.04)' }}>
        <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)', marginBottom: 10 }}>WHY IT MATTERS</div>
        <div className="gai-display" style={{ fontSize: 20, lineHeight: 1.1, marginBottom: 14 }}>Professional recognition protects your business</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Ensures your IT team meets verified competency standards',
            'Access to peer networks and threat-sharing communities',
            'Signals trustworthiness to clients, partners, and insurers',
            'Supports POPIA and regulatory compliance frameworks',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-500)', marginTop: 5, flexShrink: 0 }}></div>
              <div style={{ fontSize: 13, color: 'var(--stellar-100)', lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Snode resources */}
    <SectionHead num="RESOURCES" title="From Snode" sub="Expert white papers and research from South Africa's cyber intelligence leaders."
      action={<a href="https://snode.co.za/resources" target="_blank" rel="noopener noreferrer" className="gai-btn gai-btn-ghost gai-btn-sm" style={{ textDecoration: 'none' }}>All resources →</a>} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {[
        { title: 'Quantum Computing Risk', kicker: 'White Paper', desc: 'How quantum computing reshapes encryption and what organisations must do to prepare now.', date: '11 Jan 2024' },
        { title: 'Cyber Intelligence Analysis', kicker: 'White Paper', desc: 'Critical insights into advanced persistent threats targeting South African businesses.', date: '20 Aug 2021' },
        { title: 'Data Breaches & Malware', kicker: 'White Paper', desc: 'A cautionary guide for cyber security in the South African business context.', date: '30 Jul 2021' },
      ].map((r, i) => (
        <a key={i} href="https://snode.co.za/resources" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="gai-card" style={{ padding: 18, cursor: 'pointer', height: '100%', boxSizing: 'border-box' }}>
            <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>{r.kicker.toUpperCase()} · {r.date}</div>
            <div className="gai-display" style={{ fontSize: 17, marginTop: 8, lineHeight: 1.2 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: 'var(--stellar-300)', marginTop: 8, lineHeight: 1.5 }}>{r.desc}</div>
            <div className="gai-mono" style={{ marginTop: 12, fontSize: 10, letterSpacing: '.22em', color: 'var(--gold-500)' }}>DOWNLOAD →</div>
          </div>
        </a>
      ))}
    </div>

    {/* Tips grid */}
    <SectionHead num="LIBRARY" title="More tips" sub="One-line rules your whole team can remember."
      action={<button className="gai-btn gai-btn-ghost gai-btn-sm">All 24 tips →</button>} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      <TipCard kicker="Files" title="Never run a file from a chat you weren't expecting" icon={<svg width="20" height="20" viewBox="0 0 20 20"><rect x="4" y="2" width="9" height="14" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><polyline points="11,2 11,5 14,5" fill="none" stroke="#d4a24a" strokeWidth="1.5"/></svg>} />
      <TipCard kicker="Passwords" title="Use a 14-character passphrase, never reuse across sites" icon={<svg width="20" height="20" viewBox="0 0 20 20"><circle cx="7" cy="10" r="3" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><line x1="10" y1="10" x2="17" y2="10" stroke="#d4a24a" strokeWidth="1.5"/><line x1="14" y1="10" x2="14" y2="13" stroke="#d4a24a" strokeWidth="1.5"/><line x1="17" y1="10" x2="17" y2="13" stroke="#d4a24a" strokeWidth="1.5"/></svg>} />
      <TipCard kicker="Updates" title="Restart your devices weekly — patches need a reboot to land" icon={<svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 10 A6 6 0 0 1 16 10" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><polyline points="16,5 16,10 11,10" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><path d="M16 10 A6 6 0 0 1 4 10" fill="none" stroke="#d4a24a" strokeWidth="1.5" opacity=".5"/></svg>} />
      <TipCard kicker="Devices" title="Lock your screen every time you walk away" icon={<svg width="20" height="20" viewBox="0 0 20 20"><rect x="5" y="9" width="10" height="9" fill="none" stroke="#d4a24a" strokeWidth="1.5"/><path d="M7 9 V6 A3 3 0 0 1 13 6 V9" fill="none" stroke="#d4a24a" strokeWidth="1.5"/></svg>} />
    </div>
  </AppShell>
);

Object.assign(window, { ThreatAlerts, AttackTimelines, LinkChecker, SecurityTips });
