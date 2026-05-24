// chat.jsx — Conversational interface

const ChatMessage = ({ who, children, time }) => {
  const isUser = who === 'user';
  return (
    <div style={{
      display: 'flex', gap: 12,
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      marginBottom: 18,
    }}>
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isUser ? 'linear-gradient(135deg, #d4a24a, #7a5519)' : 'rgba(0,0,0,.5)',
        border: isUser ? 'none' : '1px solid rgba(244,220,160,.3)',
        color: 'var(--void-950)',
        fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 800, fontSize: 13,
      }}>
        {isUser ? 'N' : <Sigil size={22} />}
      </div>

      {/* Bubble */}
      <div style={{ maxWidth: 540, display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div className="gai-mono" style={{
          fontSize: 9, letterSpacing: '.22em',
          color: isUser ? 'var(--gold-500)' : 'var(--ember-400)',
          marginBottom: 6,
        }}>
          {isUser ? 'NALEDI · 22:31' : 'GUARDIAN AI · 22:31'}
          {time && <span style={{ color: 'var(--stellar-400)' }}> · {time}</span>}
        </div>
        <div style={{
          padding: '12px 16px',
          borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
          background: isUser
            ? 'linear-gradient(180deg, rgba(212,162,74,.18), rgba(212,162,74,.08))'
            : 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,0,0,.3))',
          border: '1px solid',
          borderColor: isUser ? 'rgba(232,192,116,.35)' : 'rgba(244,220,160,.14)',
          color: 'var(--stellar-50)', fontSize: 14, lineHeight: 1.55,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// reference card embedded in assistant reply
const ReferenceCard = () => (
  <div style={{
    marginTop: 12, padding: '12px 14px',
    border: '1px solid rgba(255,138,61,.4)',
    background: 'rgba(255,106,31,.08)',
    borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 14,
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 6,
      background: 'rgba(255,59,59,.15)', border: '1px solid rgba(255,104,104,.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2 L16 15 L2 15 Z" fill="none" stroke="#ff6868" strokeWidth="1.5"/><rect x="8.2" y="6.5" width="1.6" height="4.5" fill="#ff6868"/><circle cx="9" cy="12.5" r=".9" fill="#ff6868"/></svg>
    </div>
    <div style={{ flex: 1 }}>
      <div className="gai-display" style={{ fontSize: 14, color: 'var(--stellar-50)', lineHeight: 1.2 }}>
        Distributed brute-force blocked
      </div>
      <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.1em', color: 'var(--stellar-300)', marginTop: 3 }}>
        22:26 · 185.220.101.50 · RU
      </div>
    </div>
    <a style={{
      fontFamily: '"Big Shoulders Display"', textTransform: 'uppercase', fontSize: 11,
      letterSpacing: '.15em', color: 'var(--gold-400)', cursor: 'pointer', whiteSpace: 'nowrap',
    }}>View Logs →</a>
  </div>
);

const Chat = ({ navigate }) => {
  const [newMessages, setNewMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const msgEndRef = React.useRef(null);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNewMessages(msgs => [...msgs, trimmed]);
    setInput('');
  };

  React.useEffect(() => {
    if (msgEndRef.current) msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [newMessages]);

  return (
    <div className="gai-screen" style={{ display: 'flex' }}>
      <Sidebar active="chat" navigate={navigate} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar />

        {/* Chat header */}
        <div style={{
          padding: '18px 32px',
          borderBottom: '1px solid rgba(244,220,160,.08)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <Sigil size={36} glow />
          <div>
            <div className="gai-display" style={{ fontSize: 22, lineHeight: 1 }}>Guardian AI</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
              <span className="gai-badge live" style={{ padding: '2px 8px' }}><span className="gai-dot"></span>Online</span>
              <span className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-300)', letterSpacing: '.15em' }}>RESPONDS IN ≈ 200MS</span>
            </div>
          </div>
          <div style={{ flex: 1 }}></div>
          <button className="gai-btn gai-btn-ghost gai-btn-sm">⚏ Clear</button>
          <button className="gai-btn gai-btn-ghost gai-btn-sm">⬇ Export</button>
        </div>

        {/* Conversation */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 40px 12px', display: 'flex', flexDirection: 'column' }} className="gai-scroll">

          {/* Date label */}
          <div style={{
            alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24,
          }}>
            <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, rgba(244,220,160,.25))' }}></div>
            <span className="gai-mono" style={{ fontSize: 10, letterSpacing: '.25em', color: 'var(--gold-500)' }}>
              TODAY · PRETORIA STANDARD TIME
            </span>
            <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, rgba(244,220,160,.25), transparent)' }}></div>
          </div>

          <ChatMessage who="user">
            What happened overnight?
          </ChatMessage>

          <ChatMessage who="ai">
            <div>
              <span style={{ color: 'var(--ember-300)' }}>Everything is quiet now</span>, but I did step in at <b className="gai-mono" style={{ color: 'var(--gold-400)' }}>22:26</b>.
            </div>
            <div style={{ marginTop: 10 }}>
              I blocked a <b style={{ color: 'var(--plasma-400)' }}>distributed brute-force attempt</b> from Russia —
              5 IPs trying to guess your <b className="gai-mono" style={{ color: 'var(--gold-400)' }}>'backup'</b> password.
              Your server stayed safe and accessible throughout.
            </div>
            <ReferenceCard />
          </ChatMessage>

          {/* New messages from state */}
          {newMessages.map((msg, i) => (
            <ChatMessage key={'new-' + i} who="user">{msg}</ChatMessage>
          ))}

          {/* scroll anchor */}
          <div ref={msgEndRef} />

          {/* typing indicator (subtle, faint) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, opacity: .5 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(244,220,160,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sigil size={22} />
            </div>
            <div className="gai-mono" style={{ fontSize: 10, letterSpacing: '.22em', color: 'var(--stellar-300)' }}>
              GUARDIAN AI · WAITING FOR YOU
            </div>
          </div>
        </div>

        {/* Suggested chips */}
        <div style={{ padding: '8px 40px', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="gai-mono" style={{ fontSize: 10, letterSpacing: '.2em', color: 'var(--gold-500)' }}>SUGGESTED</span>
          <button className="gai-btn gai-btn-ghost gai-btn-sm" onClick={() => sendMessage('Run full system audit')}>▷ Run full system audit</button>
          <button className="gai-btn gai-btn-ghost gai-btn-sm" onClick={() => sendMessage('Check backup status')}>◇ Check backup status</button>
        </div>

        {/* Composer */}
        <div style={{ padding: '14px 40px 24px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 18px',
            background: 'rgba(0,0,0,.45)',
            border: '1px solid rgba(244,220,160,.18)',
            borderRadius: 10,
            boxShadow: '0 0 0 1px rgba(255,138,61,.06), 0 12px 30px -10px rgba(255,106,31,.18)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ember-500)', boxShadow: '0 0 8px var(--ember-500)' }}></span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask Guardian AI anything..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--stellar-50)', fontSize: 15, fontFamily: '"Space Grotesk", sans-serif',
              }}
            />
            <span className="gai-mono" style={{ fontSize: 10, color: 'var(--stellar-400)', letterSpacing: '.15em' }}>↵ SEND</span>
            <button className="gai-btn gai-btn-primary gai-btn-sm" onClick={() => sendMessage(input)}>⟶</button>
          </div>
          <div className="gai-mono" style={{ marginTop: 8, fontSize: 10, color: 'var(--stellar-400)', letterSpacing: '.12em', textAlign: 'center' }}>
            // Guardian AI may suggest actions · approvals always confirmed first
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Chat });
