// onboarding.jsx — 3 onboarding screens

const TrustStrip = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
    flexWrap: 'wrap',
    padding: '12px 16px',
    border: '1px solid rgba(244,220,160,.10)',
    borderRadius: 6, background: 'rgba(0,0,0,.25)',
  }}>
    {[
      'Runs on your server',
      'POPIA-friendly',
      'No data leaves your country',
    ].map((t, i) => (
      <React.Fragment key={t}>
        {i > 0 && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--stellar-400)' }}></span>}
        <span className="gai-mono" style={{ fontSize: 11, letterSpacing: '.18em', color: 'var(--stellar-200)', textTransform: 'uppercase' }}>
          {t}
        </span>
      </React.Fragment>
    ))}
  </div>
);

// ─── Screen 1 — Welcome ──────────────────────────────────────
const OnboardWelcome = ({ navigate }) => (
  <CenterShell footer={<StepDots current={1} total={3} />}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', marginBottom: 28 }}>
        <Sigil size={88} glow />
      </div>

      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.3em', color: 'var(--gold-500)', marginBottom: 16 }}>
        ● WELCOME · GUARDIAN AI
      </div>

      <h1 className="gai-display" style={{
        fontSize: 76, lineHeight: .95, margin: 0,
        background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        filter: 'drop-shadow(0 2px 0 #6b4a18)',
      }}>
        Guardian AI watches<br />your server so<br />you don't have to
      </h1>

      <p style={{
        marginTop: 24, fontSize: 17, color: 'var(--stellar-200)',
        maxWidth: 580, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55,
      }}>
        I'll learn what's normal for your business, block the obvious threats on my own,
        and only ask for your help when it really matters.
      </p>

      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <button className="gai-btn gai-btn-primary gai-btn-lg" onClick={() => navigate && navigate('dashboard')}>⟶ Get started</button>
        <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.1em' }}>
          About 5 minutes · you can pause any time
        </div>
      </div>

      <div style={{ marginTop: 40 }}><TrustStrip /></div>
    </div>
  </CenterShell>
);

// ─── Screen 2 — Quick setup ──────────────────────────────────
const OnboardSetup = ({ navigate }) => {
  const [quietWake, setQuietWake] = React.useState(true);
  const [from, setFrom] = React.useState('20:00');
  const [to, setTo] = React.useState('06:00');

  return (
    <CenterShell footer={<StepDots current={2} total={3} />}>
      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.3em', color: 'var(--gold-500)', marginBottom: 10 }}>
        / SETUP · 4 STEPS
      </div>
      <h1 className="gai-display" style={{ fontSize: 52, margin: 0, color: 'var(--stellar-50)' }}>Quick setup</h1>
      <p style={{ color: 'var(--stellar-200)', marginTop: 6, fontSize: 14 }}>
        Three short steps to bring me online. I'll handle the rest from there.
      </p>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CheckItem
          state="done"
          title="Connect your server"
          detail="web-server-01 · Cape Town · linked"
        />
        <CheckItem
          state="done"
          title="Choose how I should reach you"
          detail="Telegram · @naledi · verified"
        />

        {/* Active step — quiet hours panel */}
        <div style={{
          border: '1px solid rgba(255,138,61,.35)',
          background: 'rgba(255,106,31,.06)',
          borderRadius: 10, padding: 18,
          boxShadow: '0 0 0 1px rgba(255,138,61,.1), 0 20px 50px -25px rgba(255,106,31,.4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: '1.5px solid var(--ember-500)',
              background: 'rgba(255,106,31,.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(255,106,31,.4)',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember-500)' }}></div>
            </div>
            <div className="gai-display" style={{ fontSize: 18 }}>Set your quiet hours</div>
            <span className="gai-badge live" style={{ marginLeft: 'auto' }}><span className="gai-dot"></span>Now</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 32px 1fr', gap: 12, marginTop: 16, alignItems: 'end' }}>
            <div>
              <div className="gai-label" style={{ marginBottom: 6 }}>From</div>
              <input className="gai-input gai-mono" value={from} onChange={e => setFrom(e.target.value)} style={{ fontSize: 18, textAlign: 'center', letterSpacing: '.1em' }} />
            </div>
            <div className="gai-mono" style={{ textAlign: 'center', color: 'var(--gold-500)', fontSize: 18, paddingBottom: 12 }}>—</div>
            <div>
              <div className="gai-label" style={{ marginBottom: 6 }}>To</div>
              <input className="gai-input gai-mono" value={to} onChange={e => setTo(e.target.value)} style={{ fontSize: 18, textAlign: 'center', letterSpacing: '.1em' }} />
            </div>
          </div>

          <div style={{
            marginTop: 14, padding: '10px 12px',
            border: '1px solid rgba(244,220,160,.12)', borderRadius: 6,
            background: 'rgba(0,0,0,.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--stellar-50)' }}>Always wake me for things I <i>must</i> approve</div>
              <div className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', letterSpacing: '.1em', marginTop: 2 }}>
                CRITICAL EVENTS WILL BYPASS QUIET HOURS
              </div>
            </div>
            <div className={`gai-toggle ${quietWake ? 'on' : ''}`} onClick={() => setQuietWake(!quietWake)}>
              <div className="track"></div>
            </div>
          </div>
        </div>

        <CheckItem
          state="pending"
          title="Done"
          detail="Locked until step 3 complete"
        />
      </div>

      <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="gai-btn gai-btn-quiet" onClick={() => navigate && navigate('welcome')}>← Back</button>
        <button className="gai-btn gai-btn-primary gai-btn-lg" onClick={() => navigate && navigate('onboard-learning')}>Save quiet hours →</button>
      </div>
    </CenterShell>
  );
};

// ─── Screen 3 — Learning ──────────────────────────────────────
const OnboardLearning = () => (
  <CenterShell footer={<StepDots current={3} total={3} />}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <span className="gai-badge live" style={{ fontSize: 11, padding: '4px 12px' }}><span className="gai-dot"></span>Learning</span>
      <span className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--stellar-300)' }}>
        EST. 24 HOURS · ~04:18 REMAINING
      </span>
    </div>

    <h1 className="gai-display" style={{ fontSize: 52, margin: 0, lineHeight: .95, color: 'var(--stellar-50)' }}>
      I'm learning what's normal<br />for your server
    </h1>

    <p style={{ color: 'var(--stellar-200)', marginTop: 12, fontSize: 15, maxWidth: 600, lineHeight: 1.6 }}>
      This takes about 24 hours. I'll watch quietly, build a picture of your normal day,
      and start protecting you the moment I'm ready. You don't need to wait around — I'll let you know.
    </p>

    {/* Progress overall meter */}
    <div style={{ marginTop: 24, padding: 18, border: '1px solid rgba(244,220,160,.12)', borderRadius: 10, background: 'rgba(0,0,0,.25)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span className="gai-label">Overall Learning</span>
        <span className="gai-mono" style={{ fontSize: 11, color: 'var(--ember-300)' }}>42%</span>
      </div>
      <div className="gai-meter" style={{ height: 10 }}>
        <div className="fill" style={{ width: '42%' }}></div>
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <CheckItem state="done" title="Watching what runs on your server" />
        <CheckItem state="active" title="Learning who logs in and from where" badge="Now" />
        <CheckItem state="pending" title="Recognising your normal traffic" />
        <CheckItem state="pending" title="Ready to protect" />
      </div>
    </div>

    <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <div className="gai-mono" style={{ fontSize: 11, color: 'var(--stellar-300)', letterSpacing: '.1em' }}>
        // I'll send a Telegram when I'm ready
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="gai-btn gai-btn-ghost">Notify me when ready</button>
        <button className="gai-btn gai-btn-primary">⟶ Talk to me while I learn</button>
      </div>
    </div>
  </CenterShell>
);

Object.assign(window, { OnboardWelcome, OnboardSetup, OnboardLearning });
