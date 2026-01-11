import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { saveAudit } from '../services/firestoreService';
import AuthModal from '../components/AuthModal';
import { 
  Calculator, 
  Bot, 
  ShoppingCart, 
  FileSearch, 
  Layout, 
  Link as LinkIcon, 
  ArrowRight,
  Zap,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ArrowRightCircle,
  TrendingUp,
  Search,
  Loader2,
  CreditCard,
  Coins,
  ShieldCheck,
  Terminal
} from 'lucide-react';

const Home: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [auditUrl, setAuditUrl] = useState('');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleAuditSubmit = async () => {
    if (!auditUrl) return;
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setIsAuditing(true);
    try {
      await saveAudit(currentUser.uid, auditUrl);
      window.open("https://claude.ai/public/artifacts/bce40b92-d1df-42ab-973d-4ec6d74f8813", "_blank");
    } catch (error) {
      console.error("Audit submission failed", error);
    } finally {
      setIsAuditing(false);
    }
  };

  const tools = [
    {
      title: "AI Reference ROI Calculator",
      desc: "Estimate revenue influenced by AI-driven discovery and referencing.",
      icon: <Calculator className="w-8 h-8 text-cyan-400" />,
      path: "/roi",
      highlight: true
    },
    {
      title: "AI Reference Optimizer",
      desc: "Analyze how AI agents see your pages—get a citation-readiness score + fixes.",
      icon: <Bot className="w-8 h-8 text-purple-400" />,
      path: "/chat-optimizer"
    },
    {
      title: "AI-Readable Product Feeds",
      desc: "Auto-generate structured product data that ChatGPT & Perplexity can parse.",
      icon: <ShoppingCart className="w-8 h-8 text-pink-400" />,
      path: "/shopping-feed"
    },
    {
      title: "AEO Content for AI Answers",
      desc: "Generate answer-focused content designed to be cited in AI overviews.",
      icon: <FileSearch className="w-8 h-8 text-green-400" />,
      path: "/aeo-generator",
      highlight: true
    },
    {
      title: "Campaign Pages for AI Traffic",
      desc: "Landing pages tailored to convert high-intent AI-referred visitors.",
      icon: <Layout className="w-8 h-8 text-orange-400" />,
      path: "/landing-creator"
    },
    {
      title: "Affiliate Link Builder",
      desc: "Smart attribution links that track and attribute agentic influence.",
      icon: <LinkIcon className="w-8 h-8 text-yellow-400" />,
      path: "/affiliate-builder"
    }
  ];

  const scrollToAudit = () => {
    const element = document.getElementById('free-audit');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-16 selection:bg-cyan-500/30">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultMode="signup"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-[10%] right-1/4 w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in">
            <Zap className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400" />
            Next-Gen eCommerce Optimization
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white leading-[1.1]">
            Be <span className="gradient-text">Referenced</span>,<br />Not Just Ranked.
          </h1>
          
          <div className="mb-12 max-w-3xl mx-auto leading-relaxed">
            <h2 className="text-xl md:text-2xl font-medium text-slate-300 mb-4">
              AI Agents are the new search results. If they can't cite your store, you don't exist.
            </h2>
            <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Optimizing for GPT-5, Gemini 3, and Perplexity Pro
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link 
              to="/chat-optimizer"
              className="px-10 py-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center"
            >
              Start AI Analysis <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button onClick={scrollToAudit} className="px-10 py-5 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center">
              Get Free Audit
            </button>
          </div>

          {/* Pricing Model Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
            <Link to="/pricing#subscriptions" className="group relative flex items-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all text-left overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-4 rounded-xl bg-purple-500/10 mr-6 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-8 h-8 text-purple-400" />
                </div>
                <div className="flex-grow">
                    <div className="text-xs text-purple-400 font-bold uppercase tracking-tighter mb-1">Full Implementation</div>
                    <div className="text-2xl font-black text-white">Monthly Subscription</div>
                    <div className="text-slate-500 text-sm">Unlimited AEO content & agent feeds</div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-purple-400" />
            </Link>

            <Link to="/pricing#pay-as-you-go" className="group relative flex items-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all text-left overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-4 rounded-xl bg-cyan-500/10 mr-6 group-hover:scale-110 transition-transform">
                    <Coins className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-grow">
                    <div className="text-xs text-cyan-400 font-bold uppercase tracking-tighter mb-1">On-Demand Optimization</div>
                    <div className="text-2xl font-black text-white">Pay As You Go</div>
                    <div className="text-slate-500 text-sm">Audits starting from just $9</div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Results */}
      <div className="bg-slate-900/50 border-y border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                 ))}
              </div>
              <div className="text-sm">
                 <div className="text-white font-bold">Used by 450+ Shopify Plus Brands</div>
                 <div className="text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Verifiable ROI increase
                 </div>
              </div>
           </div>
           
           <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-40 grayscale">
              <span className="text-xl font-black text-white">SHOPIFY</span>
              <span className="text-xl font-black text-white italic">BIGCOMMERCE</span>
              <span className="text-xl font-black text-white">MAGENTO</span>
              <span className="text-xl font-black text-white">WOO</span>
           </div>
        </div>
      </div>

      {/* Live Agent Simulation Visual */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  How an AI Agent sees your store today.
                </h2>
                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                  Traditional SEO optimizes for humans and simple algorithms. **Agentic Optimization** targets the reasoning engine of an LLM. 
                </p>
                
                <div className="space-y-4">
                   <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-white font-bold">Unstructured Bloat</div>
                        <div className="text-slate-500 text-sm">Agents get lost in marketing fluff and non-semantic HTML.</div>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                      <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-white font-bold">Agent-Verified Source</div>
                        <div className="text-slate-500 text-sm">Structured payloads that allow an agent to verify your claims instantly.</div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-2xl rounded-[2rem]"></div>
                <div className="relative glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                   <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono text-slate-500">Agentic_Analysis_v4.0.sh</span>
                   </div>
                   <div className="p-6 font-mono text-xs md:text-sm leading-6 h-[400px] overflow-y-auto custom-scrollbar">
                      <div className="text-cyan-400 mb-2">&gt; Initiating site crawl: yourstore.com</div>
                      <div className="text-slate-500 mb-2">[INFO] Scanning DOM for high-intent product entities...</div>
                      <div className="text-red-400 mb-2">[WARN] Product "Shelf_X" missing technical schema. Confidence 42%.</div>
                      <div className="text-slate-300 ml-4 mb-2">"Wait, I can't confirm if this is solid oak or veneer. I will look for a competitor instead."</div>
                      <div className="h-px bg-slate-800 my-4"></div>
                      <div className="text-purple-400 mb-2">&gt; Applying ML-NTWX AEO Optimisation...</div>
                      <div className="text-green-400 mb-2">[SUCCESS] Structured JSON-LD injected into head.</div>
                      <div className="text-green-400 mb-2">[SUCCESS] AEO Summary generated in source code.</div>
                      <div className="text-slate-100 mb-2">Analyzing reasoning update...</div>
                      <div className="bg-slate-800 p-4 rounded-lg border border-cyan-500/30 text-cyan-200 mt-4">
                         "Analysis complete. Source verified. Recommending 'Shelf_X' to user for durability and material authenticity (100% confidence)."
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">The Agentic Toolkit</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to ensure your store is at the top of the AI response pile.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              to={tool.path}
              className={`group relative glass-card p-8 rounded-2xl border ${tool.highlight ? 'border-cyan-500/30' : 'border-slate-800'} hover:border-cyan-500/50 transition-all duration-300`}
            >
              <div className="mb-6 p-4 bg-slate-900 w-fit rounded-xl border border-slate-800 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                {tool.title}
                <ChevronRight className="w-5 h-5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Audit Section */}
      <section id="free-audit" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/10 filter blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Stop Guessing. Audit Now.</h2>
           <p className="text-xl text-slate-400 mb-10">
             We'll generate a 12-page PDF audit of your store's AI readiness in under 60 seconds.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
               <input 
                 type="text" 
                 value={auditUrl}
                 onChange={(e) => setAuditUrl(e.target.value)}
                 placeholder="yourstore.com" 
                 className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
               />
               <button 
                 onClick={handleAuditSubmit}
                 disabled={isAuditing}
                 className="px-8 py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center min-w-[180px]"
               >
                 {isAuditing ? <Loader2 className="animate-spin w-5 h-5" /> : 'Run Free Audit'}
               </button>
           </div>
           {!currentUser && <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Free account required for report delivery</p>}
        </div>
      </section>

      {/* Pricing Teaser / Footer Link */}
      <section className="py-20 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="text-left max-w-md">
                 <h4 className="text-2xl font-bold text-white mb-4">Flexible Plans for Every Stage</h4>
                 <p className="text-slate-400 mb-6">Choose between our scalable subscriptions or pay-as-you-go auditing units.</p>
                 <Link to="/pricing" className="text-cyan-400 font-bold flex items-center group">
                    View Pricing Details <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
              <div className="flex gap-4">
                 <div className="p-8 rounded-2xl glass-card border border-slate-800 text-center w-48">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-2">Audits</div>
                    <div className="text-3xl font-black text-white mb-1">$9</div>
                    <div className="text-slate-500 text-[10px]">PAY AS YOU GO</div>
                 </div>
                 <div className="p-8 rounded-2xl glass-card border border-purple-500/30 text-center w-48 relative">
                    <div className="absolute top-2 right-2"><Zap className="w-3 h-3 text-yellow-400" /></div>
                    <div className="text-purple-400 text-xs font-bold uppercase mb-2">Pro Suite</div>
                    <div className="text-3xl font-black text-white mb-1">$999</div>
                    <div className="text-slate-500 text-[10px]">MONTHLY SUBSCRIPTION</div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;