import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
const logoUrl = `${import.meta.env.BASE_URL}brand/camber-casper-mark.png`;

export default function Login() {
  const [, setLocation] = useLocation();
  const [visible, setVisible] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => setLocation("/mode-select"), 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground dark overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div
        className={`flex flex-col items-center text-center max-w-sm w-full px-6 transition-all duration-500 ease-out ${visible && !entering ? "opacity-100 translate-y-0" : entering ? "opacity-0 -translate-y-4" : "opacity-0 translate-y-4"}`}
      >
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <img
            src={logoUrl}
            alt="Logo"
            className="w-10 h-10 rounded-lg object-cover"
          />
        </div>

        {/* Identity */}
        <h1 className="text-2xl font-bold heading-tight text-foreground mb-1">
          AtlasOS
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Camber & Casper Systems
        </p>

        {/* Entry button */}
        <button
          onClick={handleEnter}
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-medium text-sm transition-all duration-150 active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-px"
        >
          Sign In
        </button>

        {/* Status line */}
        <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-subtle-pulse" />
          System online
        </div>
      </div>
    </div>
  );
}
