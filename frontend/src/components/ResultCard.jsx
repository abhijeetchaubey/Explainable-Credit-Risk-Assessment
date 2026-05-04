import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isApproved = result.decision === "Approved";
  const statusColor = isApproved ? "text-emerald-400" : "text-destructive";
  const bgGlow = isApproved ? "bg-emerald-500/20" : "bg-destructive/20";
  const Icon = isApproved ? CheckCircle2 : XCircle;

  return (
    <div className="glass rounded-xl p-8 w-full max-w-2xl mx-auto border border-white/10 shadow-2xl relative overflow-hidden group mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`absolute -top-24 -left-24 w-48 h-48 ${bgGlow} rounded-full blur-3xl transition-all duration-500`}></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className={`p-4 rounded-full bg-background/50 border border-white/5 ${statusColor}`}>
          <Icon size={48} strokeWidth={1.5} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">AI Decision</h3>
          <p className={`text-4xl font-bold tracking-tight ${statusColor}`}>
            {result.decision}
          </p>
        </div>

        <div className="text-center md:text-right bg-background/40 p-4 rounded-lg border border-white/5">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Risk Score</h3>
          <div className="flex items-baseline justify-center md:justify-end gap-1">
            <span className="text-3xl font-bold text-foreground">{result.risk_score}</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
