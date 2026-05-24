// shared.jsx — Guardian AI design-system primitives, exported to window for use across screens.

// ───────────────────────────────────────────────────────────
// inject design tokens + base styles once
// ───────────────────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('gai-styles')) {
  const s = document.createElement('style');
  s.id = 'gai-styles';
  s.textContent = `
    :root{
      --void-950:#08060d; --void-900:#110a14; --void-850:#17101b; --void-800:#1c1219;
      --void-700:#2a1a22; --void-600:#3b2630;
      --ember-700:#b03a0d; --ember-600:#d94d12; --ember-500:#ff6a1f; --ember-400:#ff8a3d; --ember-300:#ffb375;
      --gold-700:#7a5519; --gold-600:#a87a2c; --gold-500:#d4a24a; --gold-400:#e8c074; --gold-300:#f4dca0;
      --plasma-600:#c41e3a; --plasma-500:#ff3b3b; --plasma-400:#ff6868;
      --cosmic-600:#5840d6; --cosmic-500:#7c5cff; --cosmic-400:#a48dff;
      --stellar-50:#f6f1e6; --stellar-100:#ece4d3; --stellar-200:#cfc6b3; --stellar-300:#9d9485; --stellar-400:#6e665a;
      --grad-ember:linear-gradient(180deg,#ffb375 0%,#ff6a1f 35%,#d94d12 75%,#7a2406 100%);
      --grad-gold:linear-gradient(180deg,#f4dca0 0%,#d4a24a 40%,#a87a2c 70%,#6b4a18 100%);
    }
    .gai-screen{
      width:100%; height:100%;
      font-family:"Space Grotesk", system-ui, sans-serif;
      color:var(--stellar-50);
      background:
        radial-gradient(80% 50% at 50% 0%, rgba(255,106,31,.08) 0%, rgba(255,106,31,0) 60%),
        radial-gradient(60% 40% at 80% 100%, rgba(124,92,255,.05) 0%, rgba(124,92,255,0) 70%),
        var(--void-950);
      overflow:hidden;
      font-size:14px;
      line-height:1.5;
    }
    .gai-display{ font-family:"Big Shoulders Display", sans-serif; text-transform:uppercase; font-weight:800; letter-spacing:.01em; line-height:.92; }
    .gai-mono{ font-family:"JetBrains Mono", monospace; }
    .gai-label{ font-family:"JetBrains Mono", monospace; font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--stellar-300); }
    .gai-card{
      background:linear-gradient(180deg, rgba(255,255,255,.025), rgba(0,0,0,.35));
      border:1px solid rgba(244,220,160,.12);
      border-radius:12px;
      padding:20px;
      box-shadow:0 1px 0 rgba(255,255,255,.05) inset, 0 6px 20px rgba(0,0,0,.4);
    }
    .gai-card.rim{
      box-shadow:inset 0 0 0 1px rgba(244,220,160,.18), 0 22px 60px -20px rgba(255,106,31,.28);
      border-color:rgba(244,220,160,.2);
      position:relative; overflow:hidden;
    }
    .gai-card.rim::before{
      content:""; position:absolute; inset:0; pointer-events:none;
      background:radial-gradient(100% 60% at 50% -10%, rgba(255,138,61,.15), transparent 60%);
    }
    .gai-btn{
      display:inline-flex; align-items:center; gap:8px;
      font-family:"Big Shoulders Display", sans-serif; font-weight:700; text-transform:uppercase;
      letter-spacing:.12em; font-size:14px;
      padding:12px 18px; border-radius:6px; cursor:pointer;
      border:1px solid transparent; transition:transform .15s ease, box-shadow .15s ease;
      white-space:nowrap;
    }
    .gai-btn:hover{ transform:translateY(-1px); }
    .gai-btn-primary{ color:var(--void-950); background:var(--grad-ember); border-color:rgba(255,179,117,.6);
      box-shadow:0 0 0 1px rgba(255,138,61,.25), 0 8px 28px rgba(255,106,31,.32), 0 0 60px rgba(255,106,31,.16); }
    .gai-btn-gold{ color:var(--void-950); background:var(--grad-gold); border-color:rgba(244,220,160,.5);
      box-shadow:0 0 0 1px rgba(244,220,160,.3), 0 8px 22px rgba(212,162,74,.22); }
    .gai-btn-ghost{ color:var(--stellar-50); background:rgba(255,255,255,.02); border-color:rgba(244,220,160,.22); }
    .gai-btn-ghost:hover{ background:rgba(255,138,61,.08); border-color:var(--ember-400); }
    .gai-btn-quiet{ color:var(--stellar-200); background:transparent; border-color:rgba(244,220,160,.12); }
    .gai-btn-danger{ color:var(--stellar-50); background:linear-gradient(180deg, #ff6868, #c41e3a);
      border-color:rgba(255,104,104,.4); box-shadow:0 6px 18px rgba(196,30,58,.3); }
    .gai-btn-sm{ padding:7px 12px; font-size:12px; }
    .gai-btn-lg{ padding:15px 24px; font-size:16px; }
    .gai-badge{
      display:inline-flex; align-items:center; gap:6px;
      font-family:"JetBrains Mono", monospace; font-size:10px; letter-spacing:.18em; text-transform:uppercase;
      padding:3px 9px; border-radius:999px;
      border:1px solid rgba(244,220,160,.2); background:rgba(0,0,0,.3);
      color:var(--stellar-100); white-space:nowrap;
    }
    .gai-badge .gai-dot{ width:6px; height:6px; border-radius:50%; background:var(--stellar-300); }
    .gai-badge.live{ background:rgba(255,106,31,.12); border-color:rgba(255,138,61,.5); color:var(--ember-300); }
    .gai-badge.live .gai-dot{ background:var(--ember-400); box-shadow:0 0 8px var(--ember-400); }
    .gai-badge.warn{ background:rgba(255,59,59,.12); border-color:rgba(255,104,104,.5); color:var(--plasma-400); }
    .gai-badge.warn .gai-dot{ background:var(--plasma-500); box-shadow:0 0 8px var(--plasma-500); }
    .gai-badge.gold{ background:rgba(212,162,74,.12); border-color:rgba(232,192,116,.5); color:var(--gold-400); }
    .gai-badge.gold .gai-dot{ background:var(--gold-500); }
    .gai-badge.cosmic{ background:rgba(124,92,255,.12); border-color:rgba(164,141,255,.5); color:var(--cosmic-400); }
    .gai-badge.cosmic .gai-dot{ background:var(--cosmic-500); box-shadow:0 0 8px var(--cosmic-500); }
    .gai-input{
      background:rgba(0,0,0,.4); border:1px solid rgba(244,220,160,.18);
      color:var(--stellar-50); border-radius:6px; padding:10px 12px;
      font-family:"Space Grotesk", sans-serif; font-size:13px; width:100%;
      outline:none; transition:border .15s, box-shadow .15s;
    }
    .gai-input:focus{ border-color:var(--ember-400); box-shadow:0 0 0 3px rgba(255,138,61,.15); }
    .gai-meter{ background:rgba(244,220,160,.08); border-radius:999px; height:8px; overflow:hidden; }
    .gai-meter .fill{ height:100%; background:var(--grad-ember); box-shadow:0 0 10px rgba(255,106,31,.5); }
    .gai-meter.gold .fill{ background:var(--grad-gold); box-shadow:0 0 10px rgba(212,162,74,.4); }
    .gai-toggle{ display:inline-flex; align-items:center; gap:10px; cursor:pointer; }
    .gai-toggle .track{ width:36px; height:20px; border-radius:999px; background:rgba(244,220,160,.15); position:relative; transition:background .2s; }
    .gai-toggle .track::after{ content:""; position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:50%; background:var(--stellar-100); transition:left .2s; }
    .gai-toggle.on .track{ background:var(--ember-500); box-shadow:0 0 10px rgba(255,106,31,.5); }
    .gai-toggle.on .track::after{ left:18px; background:var(--void-950); }
    .gai-scroll::-webkit-scrollbar{ width:8px; height:8px; }
    .gai-scroll::-webkit-scrollbar-thumb{ background:rgba(244,220,160,.18); border-radius:999px; }
  `;
  document.head.appendChild(s);
}

// ───────────────────────────────────────────────────────────
// Logo / Sigil
// ───────────────────────────────────────────────────────────
const Sigil = ({ size = 36, glow = false }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" style={{ filter: glow ? 'drop-shadow(0 0 12px rgba(255,106,31,.5))' : 'none' }}>
    <defs>
      <linearGradient id={`gold-${size}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f4dca0" />
        <stop offset="50%" stopColor="#d4a24a" />
        <stop offset="100%" stopColor="#7a5519" />
      </linearGradient>
    </defs>
    <circle cx="18" cy="18" r="16" fill="none" stroke={`url(#gold-${size})`} strokeWidth="1.5" />
    <rect x="17" y="2" width="2" height="32" fill={`url(#gold-${size})`} />
    <g transform="translate(18 18) rotate(45)">
      <rect x="-7" y="-7" width="14" height="14" fill="none" stroke={`url(#gold-${size})`} strokeWidth="1.5" />
      <rect x="-4" y="-4" width="8" height="8" fill="#ff6a1f" />
    </g>
  </svg>
);

const Logo = ({ size = 'md' }) => {
  const s = size === 'lg' ? 44 : size === 'sm' ? 24 : 32;
  const fs = size === 'lg' ? 26 : size === 'sm' ? 16 : 20;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Sigil size={s} />
      <div className="gai-display" style={{ fontSize: fs, lineHeight: 1, fontWeight: 800 }}>
        Guardian<span style={{ color: 'var(--gold-500)' }}>·AI</span>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────
// Sidebar (used on all desktop screens)
// ───────────────────────────────────────────────────────────
const Sidebar = ({ active = 'dashboard', navigate }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dot' },
    { id: 'activity',  label: 'Activity',  icon: 'list' },
    { id: 'chat',      label: 'Chat',      icon: 'chat' },
    { id: 'settings',  label: 'Settings',  icon: 'gear' },
  ];
  return (
    <aside style={{
      width: 220, flex: '0 0 220px',
      background: 'linear-gradient(180deg, rgba(255,255,255,.025), rgba(0,0,0,.3))',
      borderRight: '1px solid rgba(244,220,160,.10)',
      padding: '20px 16px',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ padding: '4px 8px 18px' }}><Logo size="sm" /></div>

      <div className="gai-label" style={{ padding: '8px 8px 6px' }}>Navigate</div>
      {items.map(it => (
        <button key={it.id} onClick={() => navigate && navigate(it.id)} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 6,
          background: it.id === active ? 'rgba(255,106,31,.10)' : 'transparent',
          border: '1px solid', borderColor: it.id === active ? 'rgba(255,138,61,.35)' : 'transparent',
          color: it.id === active ? 'var(--ember-300)' : 'var(--stellar-100)',
          fontFamily: '"Big Shoulders Display", sans-serif', textTransform: 'uppercase',
          fontWeight: 700, fontSize: 14, letterSpacing: '.1em', textAlign: 'left', cursor: 'pointer',
        }}>
          <NavIcon kind={it.icon} active={it.id === active} />
          {it.label}
        </button>
      ))}

      <div style={{ flex: 1 }}></div>

      <button className="gai-btn gai-btn-ghost gai-btn-sm" style={{ justifyContent: 'center', width: '100%' }}>
        ◇ Scan Network
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12, padding: '0 4px' }}>
        <div className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', letterSpacing: '.18em' }}>SUPPORT · LOGOUT</div>
      </div>

      <div style={{
        marginTop: 12, padding: '10px 12px',
        border: '1px solid rgba(255,138,61,.3)', borderRadius: 6,
        background: 'rgba(255,106,31,.08)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span className="gai-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember-400)', boxShadow: '0 0 8px var(--ember-400)' }}></span>
        <div>
          <div className="gai-mono" style={{ fontSize: 9, letterSpacing: '.2em', color: 'var(--gold-500)' }}>STATUS</div>
          <div className="gai-display" style={{ fontSize: 14, color: 'var(--ember-300)' }}>Vigilance Active</div>
        </div>
      </div>
    </aside>
  );
};

const NavIcon = ({ kind, active }) => {
  const c = active ? '#ff8a3d' : '#d4a24a';
  if (kind === 'dot')  return <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.5"/><circle cx="8" cy="8" r="2" fill={c}/></svg>;
  if (kind === 'list') return <svg width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="2" fill={c}/><rect x="2" y="7" width="12" height="2" fill={c}/><rect x="2" y="11" width="12" height="2" fill={c}/></svg>;
  if (kind === 'chat') return <svg width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="9" fill="none" stroke={c} strokeWidth="1.5"/><circle cx="5.5" cy="7.5" r="1" fill={c}/><circle cx="8" cy="7.5" r="1" fill={c}/><circle cx="10.5" cy="7.5" r="1" fill={c}/></svg>;
  if (kind === 'gear') return <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" fill="none" stroke={c} strokeWidth="1.5"/><rect x="7" y="1" width="2" height="3" fill={c}/><rect x="7" y="12" width="2" height="3" fill={c}/><rect x="1" y="7" width="3" height="2" fill={c}/><rect x="12" y="7" width="3" height="2" fill={c}/></svg>;
  return null;
};

// ───────────────────────────────────────────────────────────
// Topbar
// ───────────────────────────────────────────────────────────
const TopBar = ({ subtitle }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '14px 28px',
    borderBottom: '1px solid rgba(244,220,160,.10)',
    background: 'rgba(0,0,0,.25)',
  }}>
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(0,0,0,.35)', border: '1px solid rgba(244,220,160,.12)',
      borderRadius: 6, padding: '8px 14px', maxWidth: 380,
    }}>
      <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="#9d9485" strokeWidth="1.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#9d9485" strokeWidth="1.5"/></svg>
      <input className="gai-mono" placeholder="search incidents, IPs, endpoints…" style={{
        background: 'transparent', border: 'none', outline: 'none',
        color: 'var(--stellar-200)', fontSize: 12, letterSpacing: '.05em', flex: 1,
      }} />
      <span className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-400)', letterSpacing: '.2em' }}>⌘K</span>
    </div>
    <div style={{ flex: 1 }}></div>

    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', padding: 6 }}>
      <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2 C 6 2 5 5 5 8 L 5 12 L 3 14 L 15 14 L 13 12 L 13 8 C 13 5 12 2 9 2 Z" fill="none" stroke="#cfc6b3" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', background: 'var(--ember-500)', boxShadow: '0 0 6px var(--ember-500)' }}></span>
    </button>
    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
      <Sigil size={20} />
    </button>

    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 14, borderLeft: '1px solid rgba(244,220,160,.12)' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'linear-gradient(135deg, #d4a24a, #7a5519)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--void-950)', fontFamily: '"Big Shoulders Display"', fontWeight: 800, fontSize: 14,
      }}>KC</div>
      <div>
        <div className="gai-display" style={{ fontSize: 13, lineHeight: 1 }}>Kloof Coffee House</div>
        <div className="gai-mono" style={{ fontSize: 9, letterSpacing: '.2em', color: 'var(--stellar-300)', marginTop: 2 }}>OWNER · ACCOUNT</div>
      </div>
    </div>
  </div>
);

// ───────────────────────────────────────────────────────────
// AppShell — Sidebar + TopBar wrapper used by most screens
// ───────────────────────────────────────────────────────────
const AppShell = ({ active, children, navigate }) => (
  <div className="gai-screen" style={{ display: 'flex' }}>
    <Sidebar active={active} navigate={navigate} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <TopBar />
      <div style={{ flex: 1, padding: '24px 28px', overflow: 'auto' }} className="gai-scroll">
        {children}
      </div>
    </div>
  </div>
);

// ───────────────────────────────────────────────────────────
// Centered shell (onboarding, chat)
// ───────────────────────────────────────────────────────────
const CenterShell = ({ children, footer }) => (
  <div className="gai-screen" style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(244,220,160,.08)' }}>
      <Logo size="sm" />
      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--stellar-300)' }}>POPIA · ZA · LOCAL-ONLY</div>
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ width: '100%', maxWidth: 720 }}>{children}</div>
    </div>
    {footer && (<div style={{ padding: '16px 32px', borderTop: '1px solid rgba(244,220,160,.08)' }}>{footer}</div>)}
  </div>
);

// ───────────────────────────────────────────────────────────
// Step indicator
// ───────────────────────────────────────────────────────────
const StepDots = ({ current, total }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        height: 3, flex: 1, maxWidth: 64, borderRadius: 999,
        background: i + 1 === current ? 'var(--ember-500)' :
                    i + 1 < current ? 'var(--gold-500)' : 'rgba(244,220,160,.15)',
        boxShadow: i + 1 === current ? '0 0 12px var(--ember-500)' : 'none',
      }}></div>
    ))}
    <span className="gai-mono" style={{ marginLeft: 8, fontSize: 10, letterSpacing: '.2em', color: 'var(--stellar-300)' }}>
      STEP {current} / {total}
    </span>
  </div>
);

// ───────────────────────────────────────────────────────────
// Checklist item
// ───────────────────────────────────────────────────────────
const CheckItem = ({ state, title, detail, badge }) => {
  const stateColor = state === 'done' ? 'var(--gold-500)' : state === 'active' ? 'var(--ember-500)' : 'var(--stellar-400)';
  return (
    <div style={{
      display: 'flex', gap: 14, padding: '14px 16px',
      border: '1px solid', borderColor: state === 'active' ? 'rgba(255,138,61,.35)' : 'rgba(244,220,160,.10)',
      background: state === 'active' ? 'rgba(255,106,31,.06)' : 'transparent',
      borderRadius: 8, alignItems: 'center',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: `1.5px solid ${stateColor}`,
        background: state === 'done' ? stateColor : state === 'active' ? 'rgba(255,106,31,.15)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: state === 'active' ? '0 0 12px rgba(255,106,31,.4)' : 'none',
      }}>
        {state === 'done' && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6 L5 9 L10 3" stroke="var(--void-950)" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
        {state === 'active' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember-500)' }}></div>}
      </div>
      <div style={{ flex: 1 }}>
        <div className="gai-display" style={{ fontSize: 16, color: state === 'pending' ? 'var(--stellar-300)' : 'var(--stellar-50)' }}>{title}</div>
        {detail && <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', marginTop: 3, letterSpacing: '.05em' }}>{detail}</div>}
      </div>
      {badge && <span className="gai-badge live"><span className="gai-dot"></span>{badge}</span>}
    </div>
  );
};

// ───────────────────────────────────────────────────────────
// KPI card
// ───────────────────────────────────────────────────────────
const KPI = ({ label, value, sub, tone = 'default', big = false }) => {
  const valColor =
    tone === 'live'    ? 'var(--ember-400)' :
    tone === 'warn'    ? 'var(--plasma-400)' :
    tone === 'gold'    ? 'var(--gold-400)' :
    'var(--stellar-50)';
  return (
    <div className="gai-card" style={{ padding: 18 }}>
      <div className="gai-label">{label}</div>
      <div className="gai-display" style={{ fontSize: big ? 48 : 36, color: valColor, marginTop: 6, lineHeight: 1,
        background: tone === 'gold' ? 'var(--grad-gold)' : 'none',
        WebkitBackgroundClip: tone === 'gold' ? 'text' : 'unset', backgroundClip: tone === 'gold' ? 'text' : 'unset',
        WebkitTextFillColor: tone === 'gold' ? 'transparent' : 'unset',
      }}>{value}</div>
      {sub && <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', marginTop: 8, letterSpacing: '.05em' }}>{sub}</div>}
    </div>
  );
};

// ───────────────────────────────────────────────────────────
// Section heading
// ───────────────────────────────────────────────────────────
const SectionHead = ({ num, title, sub, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 16, marginTop: 24 }}>
    <div style={{ flex: 1 }}>
      {num && <div className="gai-mono" style={{ fontSize: 10, color: 'var(--gold-500)', letterSpacing: '.25em' }}>/ {num}</div>}
      <div className="gai-display" style={{ fontSize: 28, marginTop: 4 }}>{title}</div>
      {sub && <div style={{ color: 'var(--stellar-200)', fontSize: 13, marginTop: 4 }}>{sub}</div>}
    </div>
    {action}
  </div>
);

// ───────────────────────────────────────────────────────────
// Back button — navigates to dashboard
// ───────────────────────────────────────────────────────────
const BackButton = ({ navigate }) => (
  <button
    className="gai-btn gai-btn-ghost gai-btn-sm"
    onClick={() => navigate && navigate('dashboard')}
    style={{ marginBottom: 18, alignSelf: 'flex-start' }}
  >
    ← Back to Dashboard
  </button>
);

// ───────────────────────────────────────────────────────────
// Export to window so other Babel scripts can use them
// ───────────────────────────────────────────────────────────
Object.assign(window, {
  Sigil, Logo, Sidebar, TopBar, AppShell, CenterShell,
  StepDots, CheckItem, KPI, SectionHead, NavIcon, BackButton,
});
