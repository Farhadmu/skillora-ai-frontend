import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Cpu, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[#1a2236] bg-[#040609] text-zinc-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        {/* Brand statement */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#06080d] rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <span className="font-bold text-lg text-white tracking-wider">SKILLORA AI</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
            AI Workforce Intelligence Platform transforming learners into verified, job-ready professionals. Combining adaptive Socratic tutoring, graph intelligence, and global talent matching.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Gemini 1.5/2.5 Neural Engine
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              Responsible AI Standard
            </span>
          </div>
        </div>

        {/* Intelligence Loop */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Intelligence Loop</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/tutor" className="hover:text-emerald-400 transition">Socratic AI Tutor</Link></li>
            <li><Link href="/skills" className="hover:text-emerald-400 transition">Skill Graph Engine</Link></li>
            <li><Link href="/career" className="hover:text-emerald-400 transition">Career Navigator</Link></li>
            <li><Link href="/roadmap" className="hover:text-emerald-400 transition">SkillBridge Pathways</Link></li>
            <li><Link href="/interview" className="hover:text-emerald-400 transition">Workforce Readiness</Link></li>
          </ul>
        </div>

        {/* Roles & Ecosystem */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Ecosystem</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/dashboard" className="hover:text-emerald-400 transition">Learner Portal</Link></li>
            <li><Link href="/educator" className="hover:text-emerald-400 transition">Educator Cohorts</Link></li>
            <li><Link href="/employer" className="hover:text-emerald-400 transition">Employer ATS Pipeline</Link></li>
            <li><Link href="/jobs" className="hover:text-emerald-400 transition">Talent Marketplace</Link></li>
            <li><Link href="/admin" className="hover:text-emerald-400 transition">AI Governance & Telemetry</Link></li>
          </ul>
        </div>

        {/* Trust & Transparency */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Governance</h4>
          <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">
            Skillora AI strictly avoids demographic ranking bias and never presents predictive simulations as guaranteed employment outcomes.
          </p>
          <div className="text-[11px] text-zinc-400 font-mono">
            API Version: 1.0.0 (Production)
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#141b2b] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          © 2026 Skillora AI Inc. Tagline: &ldquo;Learn. Build. Prove. Grow.&rdquo; All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/tutor" className="hover:text-zinc-300 transition">RAG Docs</Link>
          <Link href="/skills" className="hover:text-zinc-300 transition">Skill Ontology</Link>
          <Link href="http://localhost:3001/api/docs" target="_blank" className="flex items-center gap-1 hover:text-emerald-400 transition">
            Swagger API <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
