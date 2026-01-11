import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ROICalculator from './pages/ROICalculator';
import ContentGenerator from './pages/ContentGenerator';
import Pricing from './pages/Pricing';
import ChatOptimizer from './pages/ChatOptimizer';
import GenericTool from './pages/GenericTool';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roi" element={<ROICalculator />} />
              <Route path="/aeo-generator" element={<ContentGenerator />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/chat-optimizer" element={<ChatOptimizer />} />
              
              {/* Placeholders for tools mentioned in prompt but not explicitly fully spec'd */}
              <Route path="/shopping-feed" element={<GenericTool title="AI Shopping Feed Builder" desc="Automated feed structuring and syndication agent." />} />
              <Route path="/landing-creator" element={<GenericTool title="Landing Page Creator" desc="Generative UI layouts optimized for conversion." />} />
              <Route path="/affiliate-builder" element={<GenericTool title="Affiliate Link Builder" desc="Smart attribution and tracking for agentic commerce." />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;