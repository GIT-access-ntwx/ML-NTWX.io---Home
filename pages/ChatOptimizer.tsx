import React, { useState } from 'react';
import { generateChatPageTips } from '../services/geminiService';
import { Bot, AlertTriangle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatOptimizer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    try {
        const result = await generateChatPageTips(url);
        setAnalysis(result);
    } catch(e) {
        setAnalysis("Error analyzing URL.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <Bot className="w-16 h-16 text-purple-500 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-white mb-4">AI Reference Optimizer</h1>
      <p className="text-slate-400 mb-8">
        Enter your product URL to receive technical recommendations for LLM citation optimization.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input 
          type="text" 
          placeholder="https://yourstore.com/product/..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button 
          onClick={handleAnalyze}
          disabled={loading || !url}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center min-w-[150px]"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
        </button>
      </div>

       {analysis && (
          <div className="glass-card p-8 rounded-xl text-left">
             <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{analysis}</ReactMarkdown>
             </div>
          </div>
      )}

      {!analysis && (
        <div className="p-8 border border-dashed border-slate-800 rounded-xl bg-slate-900/50">
           <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
           <p className="text-slate-500">Analysis results will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ChatOptimizer;