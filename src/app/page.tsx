'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  Compass,
  Map,
  Code2,
  Briefcase,
  Layers,
  GraduationCap,
  Building2,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  Zap,
  Lock,
  Globe2,
  BarChart2,
  HelpCircle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';

export default function LandingPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'learners' | 'educators' | 'employers'>('learners');

  const intelligenceLoopSteps = [
    { title: '1. AI Profile Ingestion', desc: 'Parses CVs and GitHub repos, extracting skills mapped with cryptographic evidence.' },
    { title: '2. Skill Graph Mapping', desc: 'Visualizes proficiency, prerequisites, and distance from commercial benchmarks.' },
    { title: '3. SkillBridge Reskilling', desc: 'Synthesizes an adaptive 30/60/90-day roadmap with daily milestones.' },
    { title: '4. Socratic AI Tutor', desc: 'Engages in Bloom’s-aligned dialogue with RAG-grounded citations and code-switching.' },
    { title: '5. Hands-on Project & Code Review', desc: 'Automated evaluation of correctness, architecture, security, and refactoring.' },
    { title: '6. AI Mock Interview Simulator', desc: 'Rigorous technical, behavioral, and system design interviews with rubrics.' },
    { title: '7. 7-D Workforce Readiness', desc: 'Multi-vector scoring certifying verified employability to global hiring teams.' },
    { title: '8. Global Talent Marketplace', desc: 'Direct matching with top tech employers with transparent, unbiased match scores.' },
  ];

  const features = [
    {
      icon: Bot,
      title: 'Socratic AI Tutor',
      subtitle: 'Cognitive Learning Engine',
      desc: 'No generic chatbots. Skillora guides you through Socratic inquiry, detects misconceptions, and adjusts to Bloom’s Taxonomy levels in English and Bengali.',
      link: '/tutor',
    },
    {
      icon: Cpu,
      title: 'Skill Graph Engine',
      subtitle: 'Standardized Ontology',
      desc: '100+ industry-standard skills modeled with mathematical prerequisites, confidence scoring, and multi-factor verified evidence.',
      link: '/skills',
    },
    {
      icon: Compass,
      title: 'Career Navigator',
      subtitle: 'Market Intelligence',
      desc: 'Analyze target roles, transferable skills, salary architectures, and paste real job descriptions to identify exact skill gaps in seconds.',
      link: '/career',
    },
    {
      icon: Map,
      title: 'SkillBridge Pathways',
      subtitle: 'Personalized Roadmaps',
      desc: 'Dynamically adapts your reskilling schedule based on task performance, available weekly hours, and target role deadlines.',
      link: '/roadmap',
    },
    {
      icon: Code2,
      title: 'Projects & AI Code Review',
      subtitle: 'Production Verification',
      desc: 'Build real-world systems and receive instant multi-factor code reviews auditing correctness, security, performance, and maintainability.',
      link: '/projects',
    },
    {
      icon: ShieldCheck,
      title: 'Workforce Ready & Mock Interview',
      subtitle: '7-Dimension Employability',
      desc: 'Holistic evaluation of technical rigor, system design, communication, and real-time mock interviews with verified diagnostic scorecards.',
      link: '/interview',
    },
  ];

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
      />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-grid-pattern border-b border-[#1a2236]">
        {/* Radial Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101726] border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-inner animate-in fade-in zoom-in-95 duration-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Workforce Intelligence Platform</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-zinc-400 font-normal">Learn. Build. Prove. Grow.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
            From Learning to{' '}
            <span className="text-gradient-emerald">Verified Employability</span>.
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed mb-10">
            Skillora AI bridges the gap between fragmented online courses and validated commercial talent.
            Combining adaptive Socratic tutoring, graph intelligence, mock interviews, and automated candidate matching in one unified intelligence loop.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-black hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group"
            >
              <span>Start Your AI Career Journey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/skills"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-[#101728] border border-[#202b42] text-zinc-200 hover:text-white hover:border-emerald-500/50 hover:bg-[#162035] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Explore Skill Intelligence</span>
            </Link>
          </div>

          {/* Interactive Simulation Preview Card */}
          <div className="max-w-5xl mx-auto glass-panel rounded-2xl border border-[#1e293b] p-6 text-left shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1a2236]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-zinc-500">skillora-intelligence-node.telemetry</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ACTIVE INFERENCE • GEMINI 1.5 FLASH
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Telemetry Dial */}
              <div className="p-4 rounded-xl bg-[#090d17] border border-[#161f33] flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    7-D Workforce Readiness
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    84<span className="text-emerald-400 text-lg">/100</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Job-Ready Benchmark Verified
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#141d30] text-[11px] text-zinc-400">
                  Target: <strong>Full-Stack AI Systems Engineer</strong>
                </div>
              </div>

              {/* Verified Skill Chips */}
              <div className="p-4 rounded-xl bg-[#090d17] border border-[#161f33] md:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Verified Competency Nodes (Multi-Factor Proof)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'TypeScript', score: '92%', proof: 'Enterprise Test' },
                      { name: 'NestJS', score: '86%', proof: 'Code Review' },
                      { name: 'RAG & Vector Search', score: '84%', proof: 'Verified Lab' },
                      { name: 'React 19 / Next.js', score: '88%', proof: 'Production Repo' },
                      { name: 'System Design', score: '82%', proof: 'AI Mock Interview' },
                    ].map((s, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#111828] border border-emerald-500/30 text-xs flex items-center gap-1.5"
                      >
                        <span className="font-semibold text-white">{s.name}</span>
                        <span className="text-emerald-400 font-mono font-bold text-[11px]">{s.score}</span>
                        <span className="text-[9px] px-1 rounded bg-zinc-800 text-zinc-400">{s.proof}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#141d30] flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Matched with <strong>6 Open Tier-1 Positions</strong></span>
                  <Link href="/jobs" className="text-emerald-400 hover:underline flex items-center gap-1">
                    View Matches <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. THE AI WORKFORCE PROBLEM vs SKILLORA LOOP */}
      {/* ======================================================== */}
      <section className="py-20 border-b border-[#1a2236] bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">The Core Disconnect</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Why Traditional Learning Fails Employability
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Employers cannot trust unverified course certificates or self-reported LinkedIn buzzwords. Learners waste months studying obsolete tutorials without knowing their actual gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                The Fragmented Status Quo
              </div>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Passive video watching with zero algorithmic or architectural verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Generic chatbots giving direct answers that bypass the learner&apos;s cognitive struggle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Disconnect between course projects and actual production employer expectations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Black-box ATS resume filters screening out candidates without explainable matching.</span>
                </li>
              </ul>
            </div>

            {/* The Skillora Way */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-emerald-500/30 shadow-lg shadow-emerald-500/5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                The Skillora AI Unified Loop
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Continuous intelligence: CV parsing → Skill Graph → Gap Analysis → Adaptive Roadmap.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Adaptive Socratic AI Tutor providing targeted hints aligned with Bloom&apos;s Taxonomy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Automated AI code review & real-time mock interviews verifying job readiness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Direct talent matching for verified hiring pipelines with transparent scoring factors.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 8-Step Interactive Intelligence Loop */}
          <div className="mt-12">
            <h3 className="text-center text-xs font-bold uppercase tracking-wider text-zinc-400 mb-8">
              Continuous 8-Phase Intelligence Lifecycle
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {intelligenceLoopSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0b0f19] border border-[#1a2236] hover:border-emerald-500/40 transition group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition mb-1">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CORE DOMAINS SHOWCASE */}
      {/* ======================================================== */}
      <section className="py-20 border-b border-[#1a2236]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Integrated Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Five Core Intelligence Engines
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every engine is interconnected, sharing live telemetry to propel learners from foundational knowledge to verified commercial placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <Link
                  key={idx}
                  href={f.link}
                  className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1a2236] hover:border-emerald-500/40 hover:bg-[#0e1424] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#111828] border border-[#1e293b] flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 mb-4 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      {f.subtitle}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition">
                      {f.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. ECOSYSTEM PERSPECTIVES (LEARNERS / EDUCATORS / EMPLOYERS) */}
      {/* ======================================================== */}
      <section className="py-20 border-b border-[#1a2236] bg-[#080c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Tailored Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Engineered for Every Stakeholder
            </h2>
            <div className="inline-flex rounded-xl bg-[#0b0f19] border border-[#1e293b] p-1 mt-4">
              {(['learners', 'educators', 'employers'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === tab
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  For {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl">
            {activeTab === 'learners' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Learner Career Velocity</h3>
                    <p className="text-xs text-zinc-400">Personalized pathways from beginner to verified commercial architect.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Personalized Roadmaps</div>
                    <div className="text-zinc-400 text-[11px]">7, 30, 60, and 90-day adaptive milestones engineered to your schedule.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">AI Mock Interviews</div>
                    <div className="text-zinc-400 text-[11px]">Progressive technical & behavioral simulations with detailed rubrics.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Verified Portfolio</div>
                    <div className="text-zinc-400 text-[11px]">Shareable public link showcasing cryptographic proof of skills to hiring managers.</div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/dashboard" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
                    Enter Learner Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'educators' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Educator & Institutional Analytics</h3>
                    <p className="text-xs text-zinc-400">Identify student gaps before they fail with automated early intervention alerts.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Cohort Telemetry</div>
                    <div className="text-zinc-400 text-[11px]">Track completion velocity, assessment pass rates, and weekly active hours.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Intervention Engine</div>
                    <div className="text-zinc-400 text-[11px]">Automated AI alerts flagging struggling learners with suggested lab exercises.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Curriculum Management</div>
                    <div className="text-zinc-400 text-[11px]">Align syllabus directly with high-demand commercial hiring standards.</div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/educator" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
                    Enter Educator Console <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'employers' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Employer Verified ATS Pipeline</h3>
                    <p className="text-xs text-zinc-400">Zero resume noise. Hire candidates backed by proof of code and verified diagnostic scores.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Explainable AI Matching</div>
                    <div className="text-zinc-400 text-[11px]">Match scores calculated exclusively on technical competency and practical depth.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Candidate Pipeline</div>
                    <div className="text-zinc-400 text-[11px]">Streamlined ATS funnel tracking candidates from Applied through Hired.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="font-bold text-white mb-1">Audit Trail & Proof</div>
                    <div className="text-zinc-400 text-[11px]">Inspect candidate code review logs, mock interview scores, and verified projects.</div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/employer" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
                    Enter Employer Pipeline <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. PRICING ARCHITECTURE */}
      {/* ======================================================== */}
      <section className="py-20 border-b border-[#1a2236]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sustainable Business Model</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Transparent, Scalable Pricing
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Designed for individual learners, university cohorts, and enterprise talent acquisition teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1a2236] flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Free Explorer</div>
                <div className="text-2xl font-extrabold text-white mb-4">$0 <span className="text-xs font-normal text-zinc-500">/mo</span></div>
                <ul className="space-y-2.5 text-xs text-zinc-400 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Basic Profile & CV Analysis</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Access to 100+ Skill Ontology</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3 AI Socratic Tutor sessions/day</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Job Marketplace search</li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-[#162035] text-white hover:bg-[#1e2c49] transition">
                Start Free
              </Link>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl bg-[#0e1424] border border-emerald-500/50 shadow-xl shadow-emerald-500/5 relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Pro Career</div>
                <div className="text-2xl font-extrabold text-white mb-4">$29 <span className="text-xs font-normal text-zinc-500">/mo</span></div>
                <ul className="space-y-2.5 text-xs text-zinc-300 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Socratic AI Tutoring</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Adaptive 30/60/90-Day Roadmaps</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automated AI Code Reviewer</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Mock Technical Interviews</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Shareable Portfolio badge</li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition">
                Get Pro Access
              </Link>
            </div>

            {/* University */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1a2236] flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">University</div>
                <div className="text-2xl font-extrabold text-white mb-4">$199 <span className="text-xs font-normal text-zinc-500">/cohort/mo</span></div>
                <ul className="space-y-2.5 text-xs text-zinc-400 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Up to 200 Learner seats</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Cohort Telemetry Dashboard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Automated Early Intervention Alerts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Placement rate benchmarking</li>
                </ul>
              </div>
              <Link href="/educator" className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-[#162035] text-white hover:bg-[#1e2c49] transition">
                Explore Cohorts
              </Link>
            </div>

            {/* Enterprise Business */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1a2236] flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Business & ATS</div>
                <div className="text-2xl font-extrabold text-white mb-4">$499 <span className="text-xs font-normal text-zinc-500">/mo</span></div>
                <ul className="space-y-2.5 text-xs text-zinc-400 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Unlimited Job Postings</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Full Candidate Pipeline & ATS</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Direct Verified Talent Sourcing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Custom Rubric Integrations</li>
                </ul>
              </div>
              <Link href="/employer" className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-[#162035] text-white hover:bg-[#1e2c49] transition">
                Access Talent Pool
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. FAQ & FINAL CTA */}
      {/* ======================================================== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Questions Answered</span>
            <h2 className="text-3xl font-extrabold text-white mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 mb-20 text-xs">
            {[
              {
                q: 'How does Skillora AI differ from ChatGPT or general AI wrappers?',
                a: 'Skillora AI is an interconnected workforce intelligence system, not a chat wrapper. It connects CV extraction with a standardized graph ontology, adaptive Bloom’s Taxonomy questioning, automated code evaluation, and transparent job matching with grounded RAG citations.',
              },
              {
                q: 'How is the 7-Dimension Workforce Readiness Score calculated?',
                a: 'The readiness index balances technical assessments (25%), algorithmic problem solving (20%), project code depth (15%), engineering communication (10%), mock interview performance (15%), target-role alignment (10%), and practical deployment readiness (5%).',
              },
              {
                q: 'Does Skillora use demographic attributes for candidate ranking?',
                a: 'Never. Skillora AI strictly adheres to Responsible AI standards: ranking algorithms evaluate verified competency, project evidence, and assessment scores without inferring or utilizing protected demographic characteristics.',
              },
              {
                q: 'Can I try all user personas in this demo build?',
                a: 'Yes! Use the role selector in the top navbar to instantly test the platform as a Learner, Educator, Employer, or SuperAdmin with one click.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0b0f19] border border-[#1a2236]">
                <div className="font-bold text-white text-sm mb-2">{faq.q}</div>
                <div className="text-zinc-400 leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>

          {/* Final Call to Action */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1626] to-[#080d17] border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Prove Your Employability?
            </h2>
            <p className="max-w-xl mx-auto text-sm text-zinc-400 mb-8 leading-relaxed">
              Step into Skillora AI’s intelligence loop. Verify your true capabilities, bridge your skill gaps, and get placed at leading tech companies worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-black transition shadow-lg shadow-emerald-500/25"
              >
                Launch Intelligence Dashboard
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-[#162035] hover:bg-[#1e2c49] text-white border border-[#23314f] transition"
              >
                Switch Demo Persona
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
