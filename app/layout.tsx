// Added React import to resolve the 'Cannot find namespace React' error when referencing React.ReactNode
import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ML-NTWX | eCommerce Agentic Optimisation",
  description: "Improve AI Agent referencing for eCommerce in 2026. Convert product pages into high-intent sales traffic.",
};

export default function RootLayout({
  children,
}: {
  // Line 18 fix: The React namespace is now available via the explicit import at the top of the file
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
