import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { useAppStore } from "../store";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  Search,
  MonitorPlay,
  Zap,
  LayoutDashboard,
  Users,
  Radio,
  Phone,
  Settings,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { setAutonomyMode } = useAppStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden shadow-2xl bg-card/95 backdrop-blur-xl border-border sm:max-w-[600px] border-white/10 [&>button]:hidden">
        <Command className="[&_[cmdk-root]]:w-full [&_[cmdk-input]]:h-14 [&_[cmdk-input]]:bg-transparent [&_[cmdk-input]]:px-4 [&_[cmdk-input]]:outline-none [&_[cmdk-input]]:w-full [&_[cmdk-input]]:text-foreground [&_[cmdk-input]]:placeholder:text-muted-foreground [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-3 [&_[cmdk-item]]:text-sm [&_[cmdk-item]]:flex [&_[cmdk-item]]:items-center [&_[cmdk-item]]:gap-2 [&_[cmdk-item][data-selected='true']]:bg-secondary/50 [&_[cmdk-item][data-selected='true']]:text-foreground [&_[cmdk-item]]:cursor-pointer transition-all">
          <div className="flex items-center px-4 border-b border-white/5">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Command.Input
              placeholder="Type a command or search..."
              autoFocus
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto scroll-slim p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation">
              <Command.Item
                onSelect={() => runCommand(() => setLocation("/today"))}
              >
                <MonitorPlay className="w-4 h-4 text-muted-foreground" /> Today
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() => setLocation("/command-center"))
                }
              >
                <LayoutDashboard className="w-4 h-4 text-muted-foreground" />{" "}
                Command Center
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setLocation("/crm"))}
              >
                <Users className="w-4 h-4 text-muted-foreground" /> CRM
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setLocation("/signal-engine"))}
              >
                <Radio className="w-4 h-4 text-muted-foreground" /> Strategic
                Command
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setLocation("/outbound"))}
              >
                <Phone className="w-4 h-4 text-muted-foreground" /> Outbound
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions">
              <Command.Item
                onSelect={() =>
                  runCommand(() => {
                    setAutonomyMode("Execute Pre-Approved");
                  })
                }
              >
                <Zap className="w-4 h-4 text-amber-500" /> Switch to Autonomous
                Execution
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setLocation("/admin"))}
              >
                <Settings className="w-4 h-4 text-muted-foreground" /> Settings
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
