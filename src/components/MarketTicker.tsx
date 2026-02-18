import React from 'react';
import { AlertTriangle, TrendingUp, Zap } from 'lucide-react';

export function MarketTicker() {
  return (
    <div className="bg-amber-500/10 border-y border-amber-500/20 overflow-hidden py-2">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-sm font-medium text-amber-400">
        <span className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          ALERT: DDR5 prices up 25% this month due to HBM3e shortage
        </span>
        <span className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          RTX 5090 stock critical - Scalpers listing at $3,500+
        </span>
        <span className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Gen5 SSDs seeing 30% surcharge
        </span>
        <span className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          ALERT: DDR5 prices up 25% this month due to HBM3e shortage
        </span>
      </div>
    </div>
  );
}
