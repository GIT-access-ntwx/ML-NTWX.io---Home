import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Pricing: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Slight delay to ensure render is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/mo",
      desc: "For small stores optimizing critical paths.",
      features: [
        "AI Reference ROI Calculator Access",
        "AEO Content Gen (50/mo)",
        "Basic Shopping Feed Agent",
        "Email Support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$999",
      period: "/mo",
      desc: "Full agentic suite for growing brands.",
      features: [
        "Everything in Starter",
        "Unlimited AEO Content",
        "AI Chat Page Optimizer",
        "Affiliate Link Builder",
        "Priority Support",
        "Multi-User Access"
      ],
      cta: "Get Professional",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      period: "",
      desc: "Custom agent development and dedicated infra.",
      features: [
        "Custom Agent Training",
        "Dedicated Account Manager",
        "SLA & 99.9% Uptime",
        "On-Premise Deployment Options",
        "White Labeling"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Licensing & Pricing</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Flexible options for every stage of growth. Choose "Pay as you go" for specific tools or a monthly subscription for the full suite.
        </p>
      </div>

      <div id="subscriptions" className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative rounded-2xl p-8 flex flex-col ${
              plan.popular 
                ? 'bg-slate-900 border-2 border-cyan-500 shadow-2xl shadow-cyan-900/20 scale-105 z-10' 
                : 'glass-card border border-slate-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-500 ml-2">{plan.period}</span>
              </div>
              <p className="mt-4 text-slate-400 text-sm">{plan.desc}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-lg font-bold transition-all ${
              plan.popular
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Pay as you go section */}
      <div id="pay-as-you-go" className="mt-20 glass-card rounded-2xl p-8 md:p-12 text-center border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4">Pay As You Go</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Need a one-time optimization? Use our tools individually without a subscription.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
          <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-cyan-500/50 transition-colors">
            <div className="text-cyan-400 font-bold mb-1">AEO Audit</div>
            <div className="text-white">$49 / page</div>
          </div>
          <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-purple-500/50 transition-colors">
            <div className="text-purple-400 font-bold mb-1">Feed Gen</div>
            <div className="text-white">$99 / feed</div>
          </div>
          <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-pink-500/50 transition-colors">
            <div className="text-pink-400 font-bold mb-1">Chat Opt.</div>
            <div className="text-white">$9 / page</div>
          </div>
          <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-orange-500/50 transition-colors">
            <div className="text-orange-400 font-bold mb-1">Landing Page</div>
            <div className="text-white">$149 / unit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;