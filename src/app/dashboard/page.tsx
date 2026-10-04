'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Compass,
  Map,
  Code2,
  Briefcase,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  Upload,
  Layers,
  Award,
  AlertCircle,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api, getCurrentUser } from '@/lib/api';

export default function DashboardPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [readiness, setReadiness] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvText, setCvText] = useState('');
  const [cvParsing, setCvParsing] = useState(false);
  const [cvSuccess, setCvSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Ensure authenticated or log in as default learner
      let user = getCurrentUser();
      if (!user) {
        const loginRes = await api.login({
          email: 'learner@skillora.ai',
          password: 'Password123!',
        });
        localStorage.setItem('skillora_access_token', loginRes.tokens.accessToken);
        localStorage.setItem('skillora_user', JSON.stringify(loginRes.user));
        user = loginRes.user;
      }

      const [profData, readData, roadData, jobsData] = await Promise.all([
        api.getMyProfile().catch(() => null),
        api.getReadinessScore().catch(() => null),
        api.getActiveRoadmap().catch(() => null),
        api.getJobs({ userId: user?.id }).catch(() => []),
      ]);

      setProfile(profData);
      setReadiness(readData);
      setRoadmap(roadData);
      setJobs(jobsData.slice(0, 3));
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  };

  const handleToggleMilestone = async (milestoneIndex: number) => {
    if (!roadmap) return;
    try {
      const updated = await api.toggleRoadmapMilestone(roadmap.id, milestoneIndex);
      setRoadmap(updated);
    } catch (err) {
      console.error('Failed to toggle milestone:', err);
    }
  };

  const handleCvParse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvText.trim()) return;
    setCvParsing(true);
    setCvSuccess(null);

    try {
      const res = await api.parseCv(cvText);
      setProfile(res.profile);
      setCvSuccess(`AI extracted ${res.extracted.extractedSkills.length} skills with evidence mapped!`);
      setTimeout(() => {
        setCvModalOpen(false);
        setCvSuccess(null);
        setCvText('');
      }, 1500);
    } catch (err: any) {
      console.error('CV Parse error:', err);
    } finally {
      setCvParsing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
      />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ======================================================== */}
        {/* HEADER & RECOMMENDED NEXT ACTION */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Learner Intelligence Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {profile?.name || 'Farhadul Islam'}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Target Role:{' '}
              <strong className="text-white">
                {profile?.targetRole || 'Full-Stack AI Systems Engineer'}
              </strong>{' '}
              • Verified Readiness: <strong className="text-emerald-400">{profile?.readinessScore || 84}/100</strong>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCvModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111726] border border-[#1e293b] text-zinc-200 hover:text-white hover:border-emerald-500/40 transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI CV Analysis</span>
            </button>

            <Link
              href={`/portfolio/${profile?.userId || 'usr-learner-1'}`}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111726] border border-[#1e293b] text-zinc-200 hover:text-white hover:border-cyan-500/40 transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Public Portfolio</span>
            </Link>
          </div>
        </div>

        {/* Intelligent "What To Do Next" Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0c182b] via-[#091322] to-[#070d17] border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                AI Next Best Career Action
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                Complete AI Mock Interview in System Design to reach 88% Readiness
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                Your practical code reviews and TypeScript assessments are verified. Solidifying your distributed cache invalidation discussion in the simulated interview will qualify you for direct referral at TechScale AI.
              </p>
            </div>
          </div>
          <Link
            href="/interview"
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5 shadow-md flex-shrink-0"
          >
            <span>Start Mock Interview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ======================================================== */}
        {/* GRID: 7-D READINESS & ACTIVE ROADMAP */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 7-Dimension Readiness Score Dial */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  7-D Readiness Score
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Verified
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold text-white tracking-tight">
                  {readiness?.overallScore || 84}
                </span>
                <span className="text-sm text-zinc-500 font-mono">/ 100</span>
                <span className="ml-auto text-xs font-semibold text-emerald-400">
                  {readiness?.employabilityStatus || 'Job Ready'}
                </span>
              </div>

              {/* 7 Dimensions Bar Breakdown */}
              <div className="space-y-2.5 text-xs">
                {[
                  { name: 'Technical Rigor', val: readiness?.dimensions?.technical || 88 },
                  { name: 'Problem Solving', val: readiness?.dimensions?.problemSolving || 85 },
                  { name: 'Applied Projects', val: readiness?.dimensions?.projects || 86 },
                  { name: 'Communication', val: readiness?.dimensions?.communication || 80 },
                  { name: 'Interview Mastery', val: readiness?.dimensions?.interview || 82 },
                  { name: 'Role Alignment', val: readiness?.dimensions?.roleAlignment || 84 },
                  { name: 'Production Practical', val: readiness?.dimensions?.practical || 81 },
                ].map((dim, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400">{dim.name}</span>
                      <span className="text-zinc-200 font-mono font-semibold">{dim.val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#141b2b] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                        style={{ width: `${dim.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#141b2b]">
              <Link
                href="/interview"
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center justify-between"
              >
                <span>Take Diagnostic Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Active SkillBridge Roadmap */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Active Roadmap ({roadmap?.durationDays || 30} Days)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Progress:</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {roadmap?.progressPercent || 68}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#141b2b] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${roadmap?.progressPercent || 68}%` }}
                />
              </div>

              {/* Milestones list */}
              <div className="space-y-3">
                {roadmap?.milestones?.map((m: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition ${
                      m.completed
                        ? 'bg-[#0a121c] border-emerald-500/30'
                        : 'bg-[#0e1424] border-[#161f33]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => handleToggleMilestone(idx)}
                          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center transition ${
                            m.completed
                              ? 'bg-emerald-500 text-black'
                              : 'border border-zinc-600 hover:border-emerald-400'
                          }`}
                        >
                          {m.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-zinc-500">
                              {m.dayRange}
                            </span>
                            <span className="text-xs font-bold text-white">{m.title}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-1">
                            Focus: <strong className="text-emerald-300">{m.focusSkill}</strong> • {m.tasks?.[0]}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          m.completed
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {m.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#141b2b] flex items-center justify-between text-xs">
              <span className="text-zinc-500">Milestones adapt dynamically as tasks are checked.</span>
              <Link href="/roadmap" className="font-bold text-emerald-400 hover:underline flex items-center gap-1">
                <span>View Full Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VERIFIED SKILLS & FAST LAUNCH TOOLS */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verified Skills Catalog */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Verified Skill Graph Nodes ({profile?.skills?.length || 0})
                </h3>
              </div>
              <Link href="/skills" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                <span>Open Graph Engine</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile?.skills?.map((s: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{s.name}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        s.verified
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {s.verified ? 'Verified Proof' : 'Pending Proof'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                    <span>Proficiency: <strong className="text-white">{s.proficiency}%</strong></span>
                    <span>Confidence: <strong className="text-emerald-400">{s.confidence}%</strong></span>
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">
                    Evidence: {s.evidence?.[0] || 'Direct project assessment'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Launch Tools */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Quick Intelligence Tools
                </h3>
              </div>

              <div className="space-y-2">
                <Link
                  href="/tutor"
                  className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-emerald-500/40 transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Socratic AI Tutor
                    </div>
                    <div className="text-[10px] text-zinc-400">Bloom&apos;s adaptive tutoring & hints</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400" />
                </Link>

                <Link
                  href="/career"
                  className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-cyan-500/40 transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                      JD Analyzer
                    </div>
                    <div className="text-[10px] text-zinc-400">Paste real job description & compare</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400" />
                </Link>

                <Link
                  href="/projects"
                  className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-purple-500/40 transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300">
                      AI Code Reviewer
                    </div>
                    <div className="text-[10px] text-zinc-400">Security, performance & refactor check</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400" />
                </Link>

                <Link
                  href="/jobs"
                  className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-emerald-500/40 transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Talent Marketplace
                    </div>
                    <div className="text-[10px] text-zinc-400">Browse roles with AI match score</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400" />
                </Link>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#141b2b] text-[11px] text-zinc-500 text-center">
              Skillora Intelligence Loop • Real-time Sync
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MATCHED JOBS PREVIEW */}
        {/* ======================================================== */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Top Matched Positions For Your Verified Graph
              </h3>
            </div>
            <Link href="/jobs" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
              <span>View All Verified Roles</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] hover:border-emerald-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {job.matchScore || 92}% Match
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{job.salaryRange}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{job.title}</h4>
                  <div className="text-xs text-zinc-400 mb-3">{job.companyName} • {job.location}</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.requiredSkills?.slice(0, 3).map((sk: string, i: number) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#111726] text-zinc-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/jobs"
                  className="w-full py-2 text-center rounded-lg bg-[#162035] hover:bg-emerald-500 hover:text-black font-semibold text-xs text-zinc-200 transition"
                >
                  Inspect & Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* AI CV PARSING MODAL */}
      {/* ======================================================== */}
      {cvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl bg-[#0b0f19] border border-[#1e293b] p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              AI CV Parsing & Skill Extraction
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Paste your resume or CV text. Skillora AI will extract skills, map project evidence, and update your verified profile.
            </p>

            {cvSuccess && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{cvSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCvParse} className="space-y-4">
              <textarea
                rows={8}
                required
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV / Resume text here (e.g. Experience with TypeScript, NestJS, React, MongoDB, Next.js, RAG pipelines, Docker, etc.)..."
                className="w-full bg-[#111726] border border-[#1e293b] rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCvModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={cvParsing || !cvText.trim()}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 disabled:opacity-50"
                >
                  {cvParsing ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Extract & Enrich Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
