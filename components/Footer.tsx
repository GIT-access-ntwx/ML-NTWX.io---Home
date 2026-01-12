import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white inline-block">
              ML-<span className="text-cyan-400">NTWX</span>
            </Link>
            <p className="mt-4 text-slate-400 max-w-sm">
              AI optimization that makes your products easier for ChatGPT, Perplexity, and Gemini to recommend.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/roi" className="hover:text-cyan-400 text-left">AI Reference ROI Calculator</Link></li>
              <li><Link href="/chat-optimizer" className="hover:text-cyan-400 text-left">AI Chat Optimizer</Link></li>
              <li><Link href="/aeo-generator" className="hover:text-cyan-400 text-left">AEO Generator</Link></li>
              <li><Link href="/shopping-feed" className="hover:text-cyan-400 text-left">Shopping Feeds</Link></li>
              <li><Link href="/landing-creator" className="hover:text-cyan-400 text-left">Campaign Creator</Link></li>
              <li><Link href="/affiliate-builder" className="hover:text-cyan-400 text-left">Affiliate Builder</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-left">Contact</h3>
            <ul className="space-y-2 text-slate-400 text-sm text-left">
              <li>support@ml-nightworx.com</li>
              <li>Licensing Inquiries</li>
              <li>Partner Program</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-slate-500 hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white"><Github size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ML-Nightworx. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;