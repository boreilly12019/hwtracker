import React, { useState } from 'react';
import { LayoutDashboard, LineChart, Package, Settings, Bell, Menu, X } from 'lucide-react';
import { MarketTicker } from './components/MarketTicker';
import { Sidebar } from './components/Sidebar';
import { PriceChart } from './components/PriceChart';
import { ProductTable } from './components/ProductTable';
import { Card } from './components/ui/Card';
import pricesData from './data/prices.json';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate stats
  const rtx5090 = pricesData.find(p => p.name.includes('5090'));
  const ddr5 = pricesData.find(p => p.name.includes('DDR5-6400'));
  const ssd = pricesData.find(p => p.name.includes('Gen5'));

  const getTrend = (history: { price: number }[]) => {
    if (!history || history.length < 2) return 0;
    const current = history[history.length - 1].price;
    const prev = history[history.length - 2].price;
    return ((current - prev) / prev) * 100;
  };

  const rtxTrend = rtx5090 ? getTrend(rtx5090.history) : 0;
  const ddr5Trend = ddr5 ? getTrend(ddr5.history) : 0;
  const ssdTrend = ssd ? getTrend(ssd.history) : 0;

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <LineChart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">HW-Tracker <span className="text-indigo-500">2026</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="text-white hover:text-indigo-400 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Components</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Alerts</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Settings</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button 
              className="md:hidden p-2 text-zinc-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <MarketTicker />
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800">
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">Best GPU Price</div>
                <div className="text-2xl font-bold text-white mb-1">${rtx5090?.currentPrice.toLocaleString()}</div>
                <div className={`text-xs flex items-center gap-1 ${rtxTrend > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  <span className={`${rtxTrend > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'} px-1.5 py-0.5 rounded`}>RTX 5090</span>
                  <span>{rtxTrend > 0 ? '+' : ''}{rtxTrend.toFixed(1)}% this month</span>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800">
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">DDR5-6400 32GB</div>
                <div className="text-2xl font-bold text-white mb-1">${ddr5?.currentPrice.toLocaleString()}</div>
                <div className={`text-xs flex items-center gap-1 ${ddr5Trend > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  <span className={`${ddr5Trend > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'} px-1.5 py-0.5 rounded`}>G.Skill</span>
                  <span>{ddr5Trend > 0 ? '+' : ''}{ddr5Trend.toFixed(1)}% this month</span>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800">
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">2TB Gen5 SSD</div>
                <div className="text-2xl font-bold text-white mb-1">${ssd?.currentPrice.toLocaleString()}</div>
                <div className={`text-xs flex items-center gap-1 ${ssdTrend > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  <span className={`${ssdTrend > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10'} px-1.5 py-0.5 rounded`}>Samsung</span>
                  <span>{ssdTrend > 0 ? '+' : ''}{ssdTrend.toFixed(1)}% this month</span>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PriceChart 
                title="RTX 5090 Trend" 
                data={rtx5090?.history || []} 
                color="#6366f1"
              />
              <PriceChart 
                title="DDR5 RAM Trend" 
                data={ddr5?.history || []} 
                color="#ec4899"
              />
            </div>

            {/* Product Table */}
            <ProductTable products={pricesData} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
