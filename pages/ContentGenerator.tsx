import React, { useState } from 'react';
import { generateAEOContent } from '../services/geminiService';
import { Wand2, Copy, Check, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ContentGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    
    setLoading(true);
    setError('');
    setGeneratedContent('');
    
    try {
      const content = await generateAEOContent(topic, keywords);
      setGeneratedContent(content);
    } catch (err) {
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">AI Product Referencing Generator</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Create content specifically structured for AI agents. 
          Help AI assistants understand your products and services correctly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="glass-card p-6 rounded-xl h-fit">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Topic or Product Name</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Best noise cancelling headphones 2024"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none placeholder-slate-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Keywords (Comma separated)</label>
              <textarea 
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="sony xm5, battery life, sound quality, travel"
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none placeholder-slate-600 resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className={`w-full py-4 rounded-lg font-bold text-white flex items-center justify-center transition-all ${
                loading || !topic 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-lg shadow-purple-900/30'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" /> Generate Agentic Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="glass-card p-6 rounded-xl min-h-[500px] flex flex-col relative">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Generated Content</h2>
            {generatedContent && (
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>
          
          <div className="flex-grow overflow-y-auto prose prose-invert prose-cyan max-w-none">
            {generatedContent ? (
              <ReactMarkdown>{generatedContent}</ReactMarkdown>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <FileSearch className="w-16 h-16 mb-4 opacity-20" />
                <p>Enter topic details to generate optimized content.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Icon component for the empty state
import { FileSearch } from 'lucide-react';

export default ContentGenerator;