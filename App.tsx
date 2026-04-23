import React, { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from './store';
import { MOCK_LEADS, MOCK_ACTIONS, MOCK_LANES, MOCK_SIGNALS, MOCK_RESPONSE_PACKS } from './lib/mock-data';
import { AppShell } from './components/app-shell';

/** Shared page-level transition wrapper */
const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col h-full"
    >
      {children}
    </motion.div>
  );
}

import Login from './pages/Login';
import ModeSelect from './pages/ModeSelect';
import Today from './pages/Today';
import CommandCenter from './pages/CommandCenter';
import CRM from './pages/CRM';
import SignalEngine from './pages/SignalEngine';
import Outbound from './pages/Outbound';
import Intelligence from './pages/Intelligence';
import FinancialIntelligence from './pages/FinancialIntelligence';
import Inbox from './pages/Inbox';
import Workflows from './pages/Workflows';
import Records from './pages/Records';
import ReadinessLab from './pages/ReadinessLab';
import Admin from './pages/Admin';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

function DefaultPage() {
  const [location, setLocation] = useLocation();
  useEffect(() => {
    if (location === '/') setLocation('/login');
  }, [location, setLocation]);
  return null;
}

function Router() {
  useEffect(() => {
    useAppStore.setState({
      leads: MOCK_LEADS,
      preparedActions: MOCK_ACTIONS,
      outboundLanes: MOCK_LANES,
      signals: MOCK_SIGNALS,
      responsePacks: MOCK_RESPONSE_PACKS
    });
    useAppStore.setState((s) => ({ stats: { ...s.stats, actionsReady: MOCK_ACTIONS.length } }));
  }, []);

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Switch>
          <Route path="/" component={DefaultPage} />
          <Route path="/login">{() => <PageWrap><Login /></PageWrap>}</Route>
          <Route path="/mode-select">{() => <PageWrap><ModeSelect /></PageWrap>}</Route>
          <Route path="/today">{() => <PageWrap><Today /></PageWrap>}</Route>
          <Route path="/command-center">{() => <PageWrap><CommandCenter /></PageWrap>}</Route>
          <Route path="/crm">{() => <PageWrap><CRM /></PageWrap>}</Route>
          <Route path="/signal-engine">{() => <PageWrap><SignalEngine /></PageWrap>}</Route>
          <Route path="/outbound">{() => <PageWrap><Outbound /></PageWrap>}</Route>
          <Route path="/intelligence">{() => <PageWrap><Intelligence /></PageWrap>}</Route>
          <Route path="/financial-intelligence">{() => <PageWrap><FinancialIntelligence /></PageWrap>}</Route>
          <Route path="/inbox">{() => <PageWrap><Inbox /></PageWrap>}</Route>
          <Route path="/workflows">{() => <PageWrap><Workflows /></PageWrap>}</Route>
          <Route path="/records">{() => <PageWrap><Records /></PageWrap>}</Route>
          <Route path="/readiness-lab">{() => <PageWrap><ReadinessLab /></PageWrap>}</Route>
          <Route path="/admin">{() => <PageWrap><Admin /></PageWrap>}</Route>
          <Route>{() => <PageWrap><NotFound /></PageWrap>}</Route>
        </Switch>
      </AnimatePresence>
    </AppShell>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
