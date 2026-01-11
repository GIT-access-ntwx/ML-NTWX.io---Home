"use client";

import React, { useEffect } from 'react';
import { CheckCircle2, Zap, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    useEffect(() => {
        // Handle anchor scrolling
        const hash = window.location.hash;
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">Flexible, Not Fragile.</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Start with a single audit or implement sitewide agent optimization. Cancel anytime.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                {/* Pay As You Go */}
                <div id="pay-as-you-go" className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50"><Zap className="w-12 h-12 text-slate-800 group-hover:text-cyan-500/20 transition-colors" /></div>

                    <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-2">On Demand</h3>
                    <div className="text-4xl font-black text-white mb-6">Pay As You Go</div>
                    <p className="text-slate-400 mb-8 h-12">Perfect for checking specific product pages or testing the waters.</p>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center text-slate-300">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-cyan-500" /> Single URL Audit ($9)
                        </div>
                        <div className="flex items-center text-slate-300">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-cyan-500" /> 5-Pack Audits ($39)
                        </div>
                        <div className="flex items-center text-slate-300">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-cyan-500" /> Competitor Comparisons
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-cyan-900 transition-colors">
                        Buy Credits
                    </button>
                </div>

                {/* Subscriptions */}
                <div id="subscriptions" className="glass-card p-8 rounded-2xl border-2 border-purple-500/30 hover:border-purple-500 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>

                    <h3 className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-2">Full Implementation</h3>
                    <div className="text-4xl font-black text-white mb-6">Subscriptions</div>
                    <p className="text-slate-400 mb-8 h-12">Total store indexing and continuous optimization updates.</p>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center text-slate-300">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-500" /> Starter (<span className="text-white font-bold">$299</span>/mo) - Up to 1k SKUs
                        </div>
                        <div className="flex items-center text-slate-300">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-500" /> Pro (<span className="text-white font-bold">$999</span>/mo) - Up to 10k SKUs
                        </div>
                        <div className="flex items-center text-slate-300">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-purple-500" /> Enterprise (Custom) - Unlimited
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20">
                        Start Free Trial
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {[
                        { q: "Do I need to install code on my site?", a: "Yes, a simple one-line script tag that allows our agents to read and structure your data for LLMs." },
                        { q: "Does this affect my Google Rankings?", a: "It can only help. Structured data is good for traditional SEO, but our focus is specifically on 'Answer Engine Optimization' for chat-based search." },
                        { q: "How do I measure ROI?", a: "Our dashboard tracks 'Agent Referrals' - visits that originate from AI citations (ChatGPT, Perplexity, Gemini, etc.)." }
                    ].map((faq, i) => (
                        <div key={i} className="glass-card p-6 rounded-xl border border-slate-800">
                            <h4 className="font-bold text-white mb-2 flex items-start"><HelpCircle className="w-5 h-5 mr-3 text-slate-500 mt-1 flex-shrink-0" /> {faq.q}</h4>
                            <p className="text-slate-400 text-sm ml-8">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
