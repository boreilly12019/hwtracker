import React from 'react';
import { Card } from './ui/Card';
import { TrendingUp, AlertTriangle, Cpu, HardDrive } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900/80 border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Feb 2026 Market State
        </h3>
        <div className="space-y-4 text-sm text-zinc-400">
          <p>
            <strong className="text-zinc-200">The AI Squeeze:</strong> HBM3e production has cannibalized standard DDR5 lines. 32GB kits are now luxury items.
          </p>
          <p>
            <strong className="text-zinc-200">GPU Inflation:</strong> The RTX 50-series launch was plagued by low yields. 5090s are effectively unicorn hardware.
          </p>
          <p>
            <strong className="text-zinc-200">Storage:</strong> NAND flash shortages have hit. Gen5 drives are seeing a "February Surcharge" of ~20%.
          </p>
        </div>
      </Card>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Watchlist</h4>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-emerald-500 bg-emerald-500/10 p-1.5 rounded-md" />
            <div>
              <div className="text-sm font-medium text-zinc-200">Ryzen 9800X3D</div>
              <div className="text-xs text-zinc-500">Target: $550</div>
            </div>
          </div>
          <span className="text-red-400 text-xs font-medium">+$240</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-blue-500 bg-blue-500/10 p-1.5 rounded-md" />
            <div>
              <div className="text-sm font-medium text-zinc-200">Crucial T705 4TB</div>
              <div className="text-xs text-zinc-500">Target: $450</div>
            </div>
          </div>
          <span className="text-red-400 text-xs font-medium">+$220</span>
        </div>
      </div>
    </div>
  );
}
