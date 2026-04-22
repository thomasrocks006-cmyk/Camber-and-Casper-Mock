import React from 'react';
import { useLocation } from 'wouter';
import { useAppStore } from '../store';
import { LayoutDashboard, Maximize2 } from 'lucide-react';

export default function ModeSelect() {
  const [, setLocation] = useLocation();
  const { setViewMode } = useAppStore();

  const handleSelect = (mode: 'Simple' | 'Detailed') => {
    setViewMode(mode);
    setLocation('/today');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground dark p-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Select Operating Mode</h1>
        <p className="text-muted-foreground">Choose the density of information for this session.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Simple Mode */}
        <button 
          onClick={() => handleSelect('Simple')}
          className="text-left p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
            <Maximize2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Executive Brief</h2>
          <p className="text-muted-foreground text-center leading-relaxed">
            High-level summaries. One-tap approvals. Focuses only on what requires immediate attention. Perfect for mobile or quick check-ins.
          </p>
        </button>

        {/* Detailed Mode */}
        <button 
          onClick={() => handleSelect('Detailed')}
          className="text-left p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Command Center</h2>
          <p className="text-muted-foreground text-center leading-relaxed">
            Full intelligence surface. Deep context, dual rails, complete strategic control. The standard operating environment.
          </p>
        </button>
      </div>
    </div>
  );
}
