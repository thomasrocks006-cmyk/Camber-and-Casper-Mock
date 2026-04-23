import React from "react";
import { useLocation, Link } from "wouter";
import { useAppStore } from "../store";
import { CommandPalette } from "./command-palette";
const logoUrl = `${import.meta.env.BASE_URL}brand/camber-casper-mark.png`;
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Database,
  GitBranch,
  Layers,
  Mail,
  MonitorPlay,
  Phone,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiveCallConsole } from "./live-call-console";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { autonomyMode, setAutonomyMode, viewMode, setViewMode, callConsole } =
    useAppStore();

  if (location === "/login" || location === "/mode-select")
    return <>{children}</>;

  const primaryNav = [
    { path: "/today", label: "Today", icon: MonitorPlay },
    { path: "/command-center", label: "Command", icon: Layers },
    { path: "/crm", label: "CRM", icon: Users },
    { path: "/signal-engine", label: "Strategic Command", icon: Radio },
    { path: "/outbound", label: "Outbound", icon: Phone },
    { path: "/intelligence", label: "Intelligence", icon: Zap },
  ];

  const secondaryNav = [
    { path: "/financial-intelligence", label: "Financial Intelligence", icon: TrendingUp },
    { path: "/inbox", label: "Inbox", icon: Mail },
    { path: "/workflows", label: "Workflows", icon: GitBranch },
    { path: "/records", label: "Records", icon: Database },
    { path: "/readiness-lab", label: "Readiness Lab", icon: ShieldCheck },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground dark">
      {/* Top accent line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-50" />
      <CommandPalette />

      {/* Sidebar — collapses in Simple Mode */}
      <div
        className={`${viewMode === "Simple" ? "w-16" : "w-64"} transition-[width] duration-200 flex-shrink-0 border-r border-border bg-sidebar flex flex-col z-10`}
      >
        <div className="h-16 flex items-center px-4 border-b border-border">
          <div className="font-bold text-lg text-sidebar-foreground flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Logo"
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] object-cover"
            />
            {viewMode !== "Simple" && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none tracking-tight">Camber & Casper</span>
                <span className="text-[10px] text-muted-foreground/60 font-medium mt-0.5">Systems</span>
              </div>
            )}
          </div>
        </div>

        {viewMode !== "Simple" && (
          <div className="px-4 py-2 border-b border-border/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-secondary/30 border border-border/50 text-sm font-medium hover:bg-secondary transition-colors">
                  <span className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-bold text-primary">
                        NA
                      </span>
                    </div>
                    <span className="truncate">Northside Auto Workshop</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Workspace
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-primary">
                      NA
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Northside Auto Workshop
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Demo · Active
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 opacity-50"
                  disabled
                >
                  <div className="w-5 h-5 rounded bg-secondary border border-border flex items-center justify-center">
                    <span className="text-[8px] font-bold text-muted-foreground">
                      CV
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Canning Vale Fleet
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Demo · Not loaded
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-muted-foreground text-sm">
                  + Add Workspace
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {viewMode !== "Simple" && (
          <div className="px-4 py-3 border-b border-border/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-secondary/50 text-sm font-medium hover:bg-secondary transition-colors">
                  <span className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${autonomyMode === "Autonomous Within Policy" ? "bg-primary" : "bg-amber-500"}`}
                    />
                    {autonomyMode}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Execution Policy</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(
                  [
                    "Manual Only",
                    "Review Each Lane",
                    "Execute Pre-Approved",
                    "Autonomous Within Policy",
                  ] as const
                ).map((mode) => (
                  <DropdownMenuItem
                    key={mode}
                    onClick={() => setAutonomyMode(mode)}
                    className="flex items-center justify-between"
                  >
                    {mode}
                    {autonomyMode === mode && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <nav
          className={`flex-1 overflow-y-auto scroll-slim py-3 flex flex-col gap-0.5 ${viewMode === "Simple" ? "px-2 items-center" : "px-2"}`}
        >
          {(viewMode === "Simple"
            ? primaryNav.filter((n) => ["/today", "/inbox"].includes(n.path))
            : primaryNav
          ).map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                title={viewMode === "Simple" ? item.label : undefined}
                className={`${viewMode === "Simple" ? "p-2 justify-center" : "px-3 py-1.5"} rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-3 relative ${
                  isActive
                    ? "bg-white/[0.06] text-foreground"
                    : "text-sidebar-foreground/50 hover:bg-white/[0.04] hover:text-sidebar-foreground/80"
                }`}
              >
                {isActive && viewMode !== "Simple" && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-primary" />
                )}
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                />
                {viewMode !== "Simple" && item.label}
              </Link>
            );
          })}

          {viewMode !== "Simple" && (
            <div className="my-2 mx-3 h-px bg-white/[0.04]" />
          )}

          {(viewMode === "Simple"
            ? []
            : secondaryNav
          ).map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-3 relative ${
                  isActive
                    ? "bg-white/[0.06] text-foreground"
                    : "text-sidebar-foreground/40 hover:bg-white/[0.04] hover:text-sidebar-foreground/70"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-primary" />
                )}
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 border-b border-border bg-background flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] text-sm text-muted-foreground/50 hover:bg-white/[0.05] hover:text-muted-foreground transition-all duration-150 w-56 border border-white/[0.06]">
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search...</span>
              <div className="ml-auto flex items-center gap-0.5">
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px] font-medium font-mono text-muted-foreground/40">
                  ⌘
                </kbd>
                <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px] font-medium font-mono text-muted-foreground/40">
                  K
                </kbd>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-subtle-pulse"></span>
              <span className="text-muted-foreground/70">Healthy</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-white/[0.04] text-muted-foreground transition-all duration-150 relative">
                  <Bell className="w-4.5 h-4.5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  { text: "3 prepared actions await your approval", time: "2m ago", urgent: true },
                  { text: "Brett Kowalski quote expiring tomorrow", time: "18m ago", urgent: true },
                  { text: "Payroll run scheduled for Thursday", time: "1h ago", urgent: false },
                  { text: "RepairDesk pricing change detected", time: "2h ago", urgent: false },
                  { text: "Weekly performance report ready", time: "4h ago", urgent: false },
                ].map((n, i) => (
                  <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 py-2.5 cursor-pointer" onClick={() => setLocation(i < 2 ? '/today' : i === 2 ? '/workflows' : '/command-center')}>
                    <span className={`text-sm ${n.urgent ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.text}</span>
                    <span className="text-[10px] text-muted-foreground/50">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-md hover:bg-secondary transition-colors">
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-bold border border-border/50">
                    EX
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Executive User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    setViewMode(viewMode === "Simple" ? "Detailed" : "Simple")
                  }
                >
                  Switch to {viewMode === "Simple" ? "Detailed" : "Simple"} View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/admin')}>Profile Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="w-full cursor-pointer">
                    Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background flex flex-col relative z-0">
          {children}
        </main>

        {(location === "/outbound" || callConsole.status !== "idle") && (
          <LiveCallConsole />
        )}
      </div>
    </div>
  );
}
