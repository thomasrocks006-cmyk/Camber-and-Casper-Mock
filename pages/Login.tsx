import React from "react";
import { useLocation } from "wouter";
const logoUrl = `${import.meta.env.BASE_URL}brand/camber-casper-mark.png`;
import { Command, Shield, Zap } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground dark overflow-hidden relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 p-8 items-center z-10">
        {/* Left: Login Card */}
        <div className="p-10 rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
          <img
            src={logoUrl}
            alt="Logo"
            className="w-20 h-20 rounded-xl bg-primary/10 object-cover mb-8 shadow-inner border border-white/5"
          />

          <div className="mb-8 text-center">
            <div className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-2">
              Business Operating System
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
              [Product Name]
            </h1>
            <p className="text-sm text-muted-foreground">by Camber & Casper</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="w-10 h-[1px] bg-border" />
              <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
                Powered by Ironbark
              </span>
              <span className="w-10 h-[1px] bg-border" />
            </div>
          </div>

          <button
            onClick={() => setLocation("/mode-select")}
            className="w-full py-3.5 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] flex items-center justify-center gap-2 mt-2"
          >
            Enter Demo Environment
          </button>

          <div className="mt-8 text-xs text-muted-foreground">
            Secure connection established. VICKI orchestration online.
          </div>
        </div>

        {/* Right: Value Pillars */}
        <div className="flex flex-col gap-8 hidden md:flex">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Premium Business Operating System
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Intelligent infrastructure that prepares work before you ask.
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Command className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Command your business
              </h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                See what is happening across every system, unified into a single
                strategic surface.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Execute with confidence
              </h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Work prepared automatically. You decide, not assemble.
                Intelligent execution at scale.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Controllable autonomy
              </h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Always visible. Always controllable. Scale autonomy as
                confidence grows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
