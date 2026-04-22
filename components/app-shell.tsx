import React from "react";
import { useLocation, Link } from "wouter";
import { useAppStore } from "../store";
import { CommandPalette } from "./command-palette";
const logoUrl = `${import.meta.env.BASE_URL}brand/camber-casper-mark.png`;
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Command,
  Database,
  GitBranch,
  Layers,
  Mail,
  MonitorPlay,
  Phone,
  Radio,
  Search,
  Settings,
  ShieldAlert,
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
  const [location] = useLocation();
  const { autonomyMode, setAutonomyMode, viewMode, setViewMode, callConsole } =
    useAppStore();

  if (location === "/login" || location === "/mode-select")
    return <>{children}</>;

  const navigation = [
    { path: "/today", label: "Today", icon: MonitorPlay },
    { path: "/command-center", label: "Command", icon: Layers },
    { path: "/crm", label: "CRM", icon: Users },
    { path: "/signal-engine", label: "Strategic Command", icon: Radio },
    { path: "/outbound", label: "Outbound", icon: Phone },
    { path: "/intelligence", label: "Intelligence", icon: Zap },
    {
      path: "/financial-intelligence",
      label: "Financial Intelligence",
      icon: TrendingUp,
    },
    { path: "/inbox", label: "Inbox", icon: Mail },
    { path: "/workflows", label: "Workflows", icon: GitBranch },
    { path: "/records", label: "Records", icon: Database },
    { path: "/readiness-lab", label: "Readiness Lab", icon: ShieldCheck },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground dark">
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
              className="w-8 h-8 rounded bg-primary/20 object-cover"
            />
            {viewMode !== "Simple" && (
              <div className="flex flex-col">
                <span className="leading-none tracking-tight">Ironbark</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Camber & Casper
                </span>
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
          className={`flex-1 overflow-y-auto py-4 flex flex-col gap-1 ${viewMode === "Simple" ? "px-2 items-center" : "px-2"}`}
        >
          {(viewMode === "Simple"
            ? navigation.filter((n) => ["/today", "/inbox"].includes(n.path))
            : navigation
          ).map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                title={viewMode === "Simple" ? item.label : undefined}
                className={`${viewMode === "Simple" ? "p-2 justify-center" : "px-3 py-2"} rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground/70 hover:bg-secondary hover:text-sidebar-foreground"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-primary" : "text-sidebar-foreground/50"}`}
                />
                {viewMode !== "Simple" && item.label}
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
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 text-sm text-muted-foreground hover:bg-secondary transition-colors w-64 border border-border/50">
              <Search className="w-4 h-4" />
              <span>Search everything...</span>
              <div className="ml-auto flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-medium font-mono text-muted-foreground">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-medium font-mono text-muted-foreground">
                  K
                </kbd>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Healthy
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-4 text-center text-sm text-muted-foreground">
                  3 prepared actions await approval
                </div>
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
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
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
