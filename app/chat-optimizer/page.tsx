"use client";

import React, { useState } from 'react';
import { Bot, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ChatOptimizerPage() {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalysis = () => {
        if (!url) return;
        setIsAnalyzing(true);
        // Mock analysis simulation
        setTimeout(() => {
            setResult({
                score: 72,
                issues: [
                    { type: 'critical', msg: 'Missing schema.org product markup' },
                    { type: 'warning', msg: 'Description too vague for intent matching' },
                    { type: 'success', msg: 'Fast server response time' }
                ]
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">AI Reference Optimizer</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    See your site through the eyes of an AI Agent. Identify blockers that prevent LLMs from citing your content.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="glass-card p-8 rounded-2xl border border-slate-800 mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://yourstore.com/product/xyz"
                            className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        <button
                            onClick={handleAnalysis}
                            disabled={isAnalyzing}
                            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {isAnalyzing ? 'Scanning...' : 'Analyze URL'}
                        </button>
                    </div>
                </div>

                {result && (
                    <div className="glass-card p-8 rounded-2xl border border-slate-800 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-8">
                            <div>
                                <div className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">Agent Confidence Score</div>
                                <div className="text-5xl font-black text-white">{result.score}/100</div>
                            </div>
                            <Bot className={`w-16 h-16 ${result.score > 80 ? 'text-green-500' : 'text-yellow-500'}`} />
                        </div>

                        <div className="space-y-4">
                            {result.issues.map((issue: any, i: number) => (
                                <div key={i} className={`p-4 rounded-lg border flex items-start gap-4 ${issue.type === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-200' :
                                        issue.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200' :
                                            'bg-green-500/10 border-green-500/20 text-green-200'
                                    }`}>
                                    {issue.type === 'critical' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                    {issue.type === 'warning' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                    {issue.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                                    <div>{issue.msg}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
