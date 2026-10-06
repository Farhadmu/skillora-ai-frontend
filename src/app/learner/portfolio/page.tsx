'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Globe,
  Lock,
  Code2,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { api, getCurrentUser } from '@/lib/api';

export default function LearnerPortfolioPage() {
  const [profile, setProfile] = useState<any>(null);
  const [readiness, setReadiness] = useState<any>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const [profData, readData] = await Promise.all([
        api.getMyProfile().catch(() => null),
        api.getReadinessScore().catch(() => null),
      ]);
      setProfile(profData);
      setReadiness(readData);
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/portfolio/${profile?.userId || 'usr-learner-1'}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout role="LEARNER">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header with Share & Visibility Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Employability Portfolio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Public Credentials & Portfolio Manager
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live proof of technical capability, authenticated assessment records, and verified readiness for top-tier hiring partners
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Visibility Toggle */}
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                isPublic
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-[#111726] border-[#1e293b] text-zinc-400'
              }`}
            >
              {isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isPublic ? 'Portfolio Public' : 'Portfolio Private'}</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 text-zinc-200 transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link!' : 'Share Portfolio Link'}</span>
            </button>

            {/* View Live Public Profile */}
            <Link
              href={`/portfolio/${profile?.userId || 'usr-learner-1'}`}
              target="_blank"
              className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <span>View Public View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Portfolio Preview Card */}
        <div className="p-8 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl relative overflow-hidden space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#161f33]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-xl shadow-emerald-500/20">
                <div className="w-full h-full bg-[#06080d] rounded-[14px] flex items-center justify-center font-extrabold text-2xl text-emerald-400">
                  {profile?.name?.charAt(0) || 'F'}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white">{profile?.name || 'Talent'}</h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Talent
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{profile?.headline || 'Verified Workforce Candidate'}</p>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                  Target: {profile?.targetRole || 'Not Set'} • Readiness: {profile?.readinessScore != null ? `${profile.readinessScore}/100` : 'Pending'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Public Link:</span>
              <code className="text-xs px-2.5 py-1 rounded-lg bg-[#111726] border border-[#1e293b] text-emerald-400 font-mono">
                /portfolio/{profile?.userId || 'usr-learner-1'}
              </code>
            </div>
          </div>

          {/* 7-D Readiness & Verified Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e293b]">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Overall Readiness</div>
              <div className="text-2xl font-extrabold text-white mt-1">
                {readiness?.overallScore != null
                  ? `${readiness.overallScore}/100`
                  : profile?.readinessScore != null
                  ? `${profile.readinessScore}/100`
                  : 'Pending'}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 font-semibold">{readiness?.employabilityStatus || 'In Progress'}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e293b]">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Verified Skills</div>
              <div className="text-2xl font-extrabold text-white mt-1">{profile?.skills?.length || 0} Badges</div>
              <div className="text-[11px] text-zinc-400 mt-1">Backed by assessment & repos</div>
            </div>

            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e293b]">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Code Reviews Completed</div>
              <div className="text-2xl font-extrabold text-white mt-1">{profile?.skills?.length ? `${profile.skills.length} Audits` : '0 Audits'}</div>
              <div className="text-[11px] text-cyan-400 mt-1">Clean Architecture certified</div>
            </div>

            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e293b]">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Mock Interview Score</div>
              <div className="text-2xl font-extrabold text-white mt-1">
                {readiness?.dimensions?.interview != null ? `${readiness.dimensions.interview}%` : 'Pending'}
              </div>
              <div className="text-[11px] text-purple-400 mt-1">System Design & Tech Rigor</div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Cryptographically Verified Skills & Evidence</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(profile?.skills || [
                { name: 'TypeScript', proficiency: 90, verified: true, evidence: ['Assessment Score 92%'] },
                { name: 'NestJS', proficiency: 86, verified: true, evidence: ['Repository review'] },
                { name: 'React / Next.js', proficiency: 88, verified: true, evidence: ['Production App Router'] },
                { name: 'RAG & Embeddings', proficiency: 84, verified: true, evidence: ['Vector Lab completed'] },
                { name: 'MongoDB', proficiency: 82, verified: true, evidence: ['Indexing assessment'] },
                { name: 'System Design', proficiency: 80, verified: true, evidence: ['Mock interview 82%'] },
              ]).map((skill: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#161f33] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                  <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{skill.evidence?.[0] || 'Verified via Skillora Engine'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Actions */}
          <div className="p-4 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between">
            <div className="text-xs text-zinc-300">
              Want to improve your public readiness score? Take a new assessment or complete a project milestone.
            </div>
            <Link
              href="/learner/assessments"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Explore Assessments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
