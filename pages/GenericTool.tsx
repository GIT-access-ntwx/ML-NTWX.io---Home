import React from 'react';
import { Construction, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GenericToolProps {
  title: string;
  desc: string;
}

const GenericTool: React.FC<GenericToolProps> = ({ title, desc }) => {
  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center text-center">
      <div className="p-6 rounded-full bg-slate-900 mb-8 border border-slate-800 relative">
        <Construction className="w-16 h-16 text-cyan-400" />
        <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-slate-900 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> COMING SOON
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-xl text-slate-400 max-w-2xl mb-12">{desc}</p>
      
      <div className="max-w-md mx-auto p-4 border border-slate-800/50 rounded-lg bg-slate-900/30">
        <h6 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Development in Progress</h6>
        <p className="text-xs text-slate-500 leading-relaxed">
          We are currently fine-tuning the agentic models for this tool.
        </p>
        <div className="mt-3 pt-3 border-t border-slate-800/50">
            <Link to="/pricing" className="text-xs text-cyan-500 hover:text-cyan-400 underline">
                Check Pricing for Enterprise Early Access
            </Link>
        </div>
      </div>

      <Link to="/" className="mt-12 text-sm text-slate-500 hover:text-white transition-colors">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default GenericTool;