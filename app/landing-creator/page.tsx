"use client";

import React from 'react';
import { Layout } from 'lucide-react';
import Link from 'next/link';

export default function LandingCreatorPage() {
    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <div className="glass-card p-12 rounded-2xl border border-slate-800 max-w-3xl mx-auto">
                <div className="bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Layout className="w-10 h-10 text-orange-500" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Landing Page Creator</h1>
                <p className="text-xl text-slate-400 mb-8">
                    Generative UI layouts optimized for conversion.
                </p>
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 mb-8">
                    <p className="text-slate-500">
                        This tool is currently being upgraded for the new Agentic Commerce V2 protocol.
                        Please check back shortly.
                    </p>
                </div>
                <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                    Return Home
                </Link>
            </div>
        </div>
    );
}
