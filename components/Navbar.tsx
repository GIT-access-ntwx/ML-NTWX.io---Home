'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Cpu, LogOut, User as UserIcon, ChevronDown,
  Calculator, Bot, ShoppingCart, FileSearch, Layout, Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();

  const productLinks = [
    { name: 'ROI Calculator', path: '/roi', icon: Calculator },
    { name: 'Chat Optimizer', path: '/chat-optimizer', icon: Bot },
    { name: 'Shopping Feeds', path: '/shopping-feed', icon: ShoppingCart },
    { name: 'AEO Generator', path: '/aeo-generator', icon: FileSearch },
    { name: 'Campaign Creator', path: '/landing-creator', icon: Layout },
    { name: 'Affiliate Builder', path: '/affiliate-builder', icon: LinkIcon },
  ];

  const mainLinks = [
    { name: 'Why This Matters', path: '/#why-matters' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 glass-card border-b border-slate-800 bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-purple-600 bg-opacity-20 rounded-lg group-hover:bg-opacity-40 transition-all">
                <Cpu className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">
                ML-<span className="text-cyan-400">NTWX</span>
              </span>
            </Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {/* Products Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname !== '/' && pathname !== '/pricing' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                      }`}
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                  >
                    Products <ChevronDown className="ml-1 w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 mt-0 w-64 rounded-xl border border-slate-700 bg-slate-900 shadow-xl shadow-purple-900/20 overflow-hidden transition-all duration-200 origin-top-left ${isProductsOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <div className="p-2 grid gap-1">
                      {productLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.path}
                          className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors group/item"
                        >
                          <link.icon className="w-5 h-5 mr-3 text-slate-400 group-hover/item:text-cyan-400" />
                          <span className="text-sm text-slate-200 group-hover/item:text-white font-medium">{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {mainLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.path.split('#')[0]
                        ? 'text-cyan-400' // active style
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {currentUser ? (
                  <div className="flex items-center ml-4 space-x-4">
                    <span className="text-xs text-slate-400 flex items-center">
                      <UserIcon className="w-3 h-3 mr-1" />
                      {currentUser.email?.split('@')[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-slate-400 hover:text-white"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="ml-4 flex items-center space-x-3">
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="text-sm font-medium text-slate-300 hover:text-white"
                    >
                      Login
                    </button>
                    <Link
                      href="/pricing"
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-sm font-bold hover:from-cyan-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-900/50"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden glass-card border-t border-slate-800 max-h-[80vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Products</div>
              {productLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <link.icon className="w-5 h-5 mr-3 text-cyan-500" />
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-slate-800 my-2"></div>

              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {link.name}
                </Link>
              ))}

              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Sign Out ({currentUser.email?.split('@')[0]})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Login
                </button>
              )}
              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-4 py-3 rounded-md bg-purple-600 text-white font-bold"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
