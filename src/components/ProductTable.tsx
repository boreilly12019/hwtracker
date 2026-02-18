import React, { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, Badge } from './ui/Card';

interface Product {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  status: string;
  history: { month: string; price: number }[];
}

export function ProductTable({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const getTrend = (history: { price: number }[]) => {
    if (history.length < 2) return 0;
    const current = history[history.length - 1].price;
    const prev = history[history.length - 2].price;
    return ((current - prev) / prev) * 100;
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-zinc-100">Component Prices</h3>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-950/50 text-zinc-400 font-medium">
            <tr>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">1-Mo Trend</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((product) => {
              const trend = getTrend(product.history);
              const isPositive = trend > 0;
              
              return (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-zinc-200">{product.name}</td>
                  <td className="px-4 py-3 text-zinc-500">{product.category}</td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-300">
                    ${product.currentPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className={`inline-flex items-center gap-1 ${isPositive ? 'text-red-400' : 'text-emerald-400'}`}>
                      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(trend).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant={product.status === 'In Stock' ? 'success' : product.status === 'Low Stock' ? 'warning' : 'danger'}>
                      {product.status}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
