"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Info } from 'lucide-react';

export default function ROICalculatorPage() {
  const [devSalaries, setDevSalaries] = useState(150000);
  const [teamSize, setTeamSize] = useState(3);
  const [infraCost, setInfraCost] = useState(2000); // Monthly
  const [subscriptionCost, setSubscriptionCost] = useState(999); // Monthly
  
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const months = 12;
    const monthlyBuildCost = (devSalaries * teamSize) / 12 + infraCost;
    const monthlyRentCost = subscriptionCost;
    
    // Improved type definition for chartData
    interface ChartDataPoint {
      month: string;
      Build: number;
      Rent: number;
      Savings: number;
    }

    const chartData: ChartDataPoint[] = [];
    let cumulativeBuild = 0;
    let cumulativeRent = 0;

    for (let i = 1; i <= months; i++) {
      cumulativeBuild += monthlyBuildCost;
      cumulativeRent += monthlyRentCost;
      chartData.push({
        month: `Month ${i}`,
        Build: Math.round(cumulativeBuild),
        Rent: Math.round(cumulativeRent),
        Savings: Math.round(cumulativeBuild - cumulativeRent)
      });
    }
    setData(chartData);
  }, [devSalaries, teamSize, infraCost, subscriptionCost]);

  const totalSavings = data.length > 0 ? data[data.length - 1].Savings : 0;

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">AI Reference ROI Calculator</h1>
        <p className="text-slate-400">Estimate revenue influenced by AI-driven discovery and referencing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="glass-card p-6 rounded-xl h-fit">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Info className="w-5 h-5 mr-2 text-cyan-400" /> Parameters
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Avg. Developer Salary (Annual)</label>
              <input 
                type="number" 
                value={devSalaries} 
                onChange={(e) => setDevSalaries(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Team Size</label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={teamSize} 
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="text-right text-cyan-400 font-mono">{teamSize} Devs</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Monthly Infrastructure Cost</label>
              <input 
                type="number" 
                value={infraCost} 
                onChange={(e) => setInfraCost(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div className="pt-6 border-t border-slate-800">
               <label className="block text-sm font-medium text-purple-300 mb-2">ML-NTWX Subscription</label>
               <select 
                  value={subscriptionCost} 
                  onChange={(e) => setSubscriptionCost(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-purple-900/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value={299}>Starter ($299/mo)</option>
                  <option value={999}>Professional ($999/mo)</option>
                  <option value={2499}>Enterprise ($2499/mo)</option>
               </select>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-xl font-bold text-white">Cumulative Cost (12 Months)</h2>
             <div className="text-right">
              <span className="text-sm text-slate-400">Estimated Annual Savings</span>
              <div className="text-3xl font-bold text-green-400">${totalSavings.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="flex-grow min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Bar dataKey="Build" fill="#f43f5e" name="Build In-House" />
                <Bar dataKey="Rent" fill="#22d3ee" name="ML-NTWX Agent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
