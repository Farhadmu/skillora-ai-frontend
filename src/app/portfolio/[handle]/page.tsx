'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Mail,
  Briefcase,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { api } from '@/lib/api';

export default function PortfolioPage() {
  const params = useParams();
  const handle = params?.handle as string;

  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolio();
  }, [handle]);

  const loadPortfolio = async () => {
    try {
      const data = await api.getPublicPortfolio(handle || 'usr-learner-1');
      setPortfolio(data);
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080d] text-white flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          Loading verified portfolio...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Profile Hero Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c182b] to-[#080f1c] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#06080d] rounded-[14px] flex items-center justify-center font-extrabold text-2xl text-emerald-400">
                  {portfolio?.name?.charAt(0) || 'F'}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-white">{portfolio?.name}</h1>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mt-1 font-medium">{portfolio?.headline}</p>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {portfolio?.degree} • {portfolio?.institution}
                </div>
              </div>
            </div>

            {/* Readiness Score Badge */}
            <div className="p-4 rounded-2xl bg-[#080d16] border border-[#161f33] text-center min-w-[140px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Readiness Score
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-0.5">
                {portfolio?.readinessScore != null ? `${portfolio.readinessScore}/100` : 'Pending'}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                {portfolio?.readinessScore >= 80 ? 'Job Ready Certified' : 'Verified Skills In Progress'}
              </div>
            </div>
          </div>

          {/* Bio */}
          {portfolio?.bio && (
            <p className="text-xs text-zinc-300 leading-relaxed mt-6 max-w-3xl pt-4 border-t border-[#141b2a]">
              {portfolio.bio}
            </p>
          )}

          {/* Verified Badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {portfolio?.verifiedBadges?.map((b: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-semibold flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Skills Grid */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Verified Competencies & Evidence Proof
            </h3>
            <span className="text-xs text-zinc-500">Audited by Skillora Engine</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio?.skills?.map((s: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{s.name}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{s.proficiency}%</span>
                </div>
                <div className="text-xs text-zinc-400">Category: {s.category}</div>
                <div className="pt-2 border-t border-[#141b2a] text-[11px] text-zinc-400">
                  <strong>Evidence:</strong> {s.evidence?.[0] || 'Verified assessment score'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employer Direct Action CTA */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Interested in hiring {portfolio?.name}?</h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Candidate profile is pre-verified. Skip initial resume screening and schedule a direct technical interview.
            </p>
          </div>
          <Link
            href="/employer"
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5 shadow-md flex-shrink-0"
          >
            <span>Invite to Interview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
