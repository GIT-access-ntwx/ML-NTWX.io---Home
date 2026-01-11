"use client";

import React, { useState } from 'react';
import { FileSearch, Sparkles, Copy, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateAEOContent } from '../../services/geminiService';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../../components/AuthModal';

export default function ContentGeneratorPage() {
    const { currentUser } = useAuth();
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [contentType, setContentType] = useState('faq');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;

        if (!currentUser) {
            setAuthModalOpen(true);
            return;
        }

        setIsGenerating(true);
        setGeneratedContent('');

        try {
            // Direct integration with Gemini Service
            const result = await generateAEOContent(topic, keywords, contentType);
            setGeneratedContent(result);
        } catch (error) {
            console.error("Generation failed", error);
            setGeneratedContent("Error generating content. Please try again or check your API configuration.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedContent);
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setAuthModalOpen(false)}
                defaultMode="signup"
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">AEO Content Generator</h1>
                <p className="text-slate-400">Generate answer-focused content designed to be cited in AI search overviews.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* Input Control */}
                <div className="glass-card p-6 rounded-xl h-fit">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-cyan-400" /> Configuration
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Topic or Question</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. 'How to choose the right ergonomic chair'"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Target Keywords (Optional)</label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="Comma separated"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Content Structure</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['faq', 'definition', 'table'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setContentType(type)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${contentType === type
                                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {type.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !topic}
                            className={`w-full py-4 rounded-xl font-bold mt-4 flex items-center justify-center transition-all ${isGenerating || !topic
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                                }`}
                        >
                            {isGenerating ? <RefreshCw className="animate-spin w-5 h-5 mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
                            {isGenerating ? 'Optimizing...' : 'Generate AEO Content'}
                        </button>

                        {!currentUser && (
                            <p className="text-xs text-center text-slate-500 mt-2">Login required to save generation history.</p>
                        )}
                    </div>
                </div>

                {/* Output Preview */}
                <div className="glass-card p-6 rounded-xl min-h-[500px] flex flex-col relative border border-slate-800/50">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50 rounded-t-xl"></div>

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <FileSearch className="w-5 h-5 mr-2 text-purple-400" /> Output Preview
                        </h2>
                        {generatedContent && (
                            <button
                                onClick={copyToClipboard}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                title="Copy to clipboard"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex-grow bg-slate-950/50 rounded-xl p-6 border border-slate-800/50 overflow-y-auto custom-scrollbar">
                        {isGenerating ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                <div className="w-12 h-12 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                                <p className="animate-pulse">Consulting the oracle...</p>
                            </div>
                        ) : generatedContent ? (
                            <div className="prose prose-invert prose-cyan max-w-none">
                                <ReactMarkdown>{generatedContent}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                                <FileSearch className="w-16 h-16 mb-4" />
                                <p>Content will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
