import React, { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from './store';
import { MOCK_LEADS, MOCK_ACTIONS, MOCK_LANES, MOCK_SIGNALS, MOCK_RESPONSE_PACKS } from './lib/mock-data';
import { AppShell } from './components/app-shell';

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

function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="p-8 rounded-lg border border-border border-dashed text-center text-muted-foreground">
        {title} surface coming soon.
      </div>
    </div>
  );
}

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
      <Switch>
        <Route path="/" component={DefaultPage} />
        <Route path="/login" component={Login} />
        <Route path="/mode-select" component={ModeSelect} />
        <Route path="/today" component={Today} />
        <Route path="/command-center" component={CommandCenter} />
        <Route path="/crm" component={CRM} />
        <Route path="/signal-engine" component={SignalEngine} />
        <Route path="/outbound" component={Outbound} />
        <Route path="/intelligence" component={Intelligence} />
        <Route path="/financial-intelligence" component={FinancialIntelligence} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/workflows" component={Workflows} />
        <Route path="/records" component={Records} />
        <Route path="/readiness-lab" component={ReadinessLab} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
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
