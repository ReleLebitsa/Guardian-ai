# Guardian AI

An AI-powered cybersecurity monitoring and threat detection dashboard for small businesses.

Guardian AI watches your servers 24/7, automatically blocks threats, and notifies you only when human approval is needed.

---

## What It Does

- **Real-time threat detection** — monitors server activity and flags suspicious behaviour automatically
- **Approval workflow** — escalates borderline events to the business owner via Telegram before acting
- **Activity log** — full searchable audit trail of every security event
- **Attack timelines** — replay incidents step-by-step to understand what happened
- **Link checker** — scan URLs for phishing and malware before clicking
- **AI chat** — ask Guardian AI questions about overnight activity or specific threats
- **Security tips** — daily guidance for your team on files, passwords, devices, and updates

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 (loaded from CDN) |
| Styling | Vanilla CSS with custom design tokens |
| JSX Compilation | Babel Standalone (browser-side, no build step) |
| Dev Server | Python built-in HTTP server |
| Backend | Not yet implemented (frontend prototype) |

No `node_modules`. No build pipeline. React and Babel load from CDN at runtime.

---

## Getting Started

**Requirements:** Python 3 (for the local dev server)

```bash
cd "Guardian ai"
python -m http.server 5173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

The app starts at the onboarding welcome screen.

---

## Project Structure

```
Guardian ai/
├── index.html              # Entry point — loads React, Babel, and all screens
├── screens/
│   ├── shared.jsx          # Design system: colours, typography, reusable components
│   ├── app.jsx             # Router — state-based navigation between pages
│   ├── onboarding.jsx      # 3-step setup flow (welcome → connect → learn)
│   ├── dashboard.jsx       # Main dashboard: status, KPIs, live telemetry
│   ├── activity.jsx        # Activity log with approval modals and event detail
│   ├── chat.jsx            # Conversational interface with the AI
│   └── deeper.jsx          # Threat alerts, attack timelines, link checker, tips
└── README.md
```

---

## Pages

### Onboarding
Three steps: welcome pitch → server connection + Telegram setup → 24-hour learning period.

### Dashboard
- Live shield status card
- KPI cards: threats blocked, pending approvals, active incidents
- MTTD comparison: Guardian AI (4 min) vs SA industry average (227 days)
- Live telemetry feed

### Activity Log
Searchable table of security events. Each event can be expanded to view the full timeline, technical logs, and — for suspicious activity — an approval modal.

### Chat
Conversational interface for asking Guardian AI about threats, incidents, or security posture.

### Deeper Surveillance
Four sub-pages accessible from the dashboard:
- **Threat Alerts** — active threat patterns ranked by severity
- **Attack Timelines** — step-by-step incident replay
- **Link Checker** — phishing and malware URL scanner
- **Security Tips** — daily tips for your team

---

## Design System

Guardian AI uses a custom dark theme defined in `screens/shared.jsx`.

**Colour palette:**

| Name | Role | Value |
|---|---|---|
| Void | Background | `#08060d` |
| Ember | Primary accent / danger | `#ff6a1f` |
| Gold | Secondary accent | `#d4a24a` |
| Plasma | Critical alerts | `#ff3b3b` |
| Cosmic | Tertiary accent | `#7c5cff` |
| Stellar | Body text | `#f6f1e6` |

**Fonts:**
- `Big Shoulders Display` — display headings
- `Space Grotesk` — body text
- `JetBrains Mono` — code and data values

---

## Status

This is a frontend prototype. The UI and UX are complete. The following are not yet wired up:

- [ ] Real server monitoring backend
- [ ] Telegram notification integration
- [ ] Functional link scanner (currently shows a hardcoded example)
- [ ] Live AI chat responses (currently shows a static example conversation)
- [ ] User authentication

---

## Compliance

Designed with South African data compliance in mind. All data processing is intended to remain local (`POPIA · ZA · LOCAL-ONLY`).
