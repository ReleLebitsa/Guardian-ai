// app.jsx — single navigable app

const App = () => {
  const [currentPage, setCurrentPage] = React.useState('welcome');
  const navigate = (page) => setCurrentPage(page);

  switch (currentPage) {
    case 'welcome':           return <OnboardWelcome navigate={navigate} />;
    case 'onboard-setup':     return <OnboardSetup navigate={navigate} />;
    case 'onboard-learning':  return <OnboardLearning navigate={navigate} />;
    case 'dashboard':         return <Dashboard navigate={navigate} />;
    case 'activity':          return <ActivityLog navigate={navigate} />;
    case 'chat':              return <Chat navigate={navigate} />;
    case 'settings':          return <Dashboard navigate={navigate} />;
    case 'threat-alerts':     return <ThreatAlerts navigate={navigate} />;
    case 'attack-timelines':  return <AttackTimelines navigate={navigate} />;
    case 'link-checker':      return <LinkChecker navigate={navigate} />;
    case 'security-tips':     return <SecurityTips navigate={navigate} />;
    default:                  return <OnboardWelcome navigate={navigate} />;
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
