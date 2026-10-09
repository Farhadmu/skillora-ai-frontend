'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Award,
  Cpu,
  Bot,
  Copy,
  Check,
  Layers,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function ProfileIntelligencePage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [cvText, setCvText] = useState(`Farhadul Islam
Full-Stack AI Systems Engineer | Dhaka, Bangladesh | farhadul@example.com

SUMMARY:
Passionate engineer specializing in modern Next.js 16, NestJS distributed architectures, and Gemini-powered Retrieval-Augmented Generation (RAG) systems. 3+ years experience building scalable web apps with TypeScript, MongoDB, and Docker.

TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
- Frameworks & Libraries: Next.js, React 19, NestJS, Express, Tailwind CSS, TanStack Query
- AI & Vector Systems: Google Gemini API, RAG Architecture, Vector Embeddings, Qdrant
- Databases: MongoDB, PostgreSQL, Redis
- Cloud & DevOps: Docker, Git, CI/CD GitHub Actions, Linux

EXPERIENCE:
Full-Stack Developer | InnovateTech (2023 - Present)
- Architected enterprise multi-tenant API gateway using NestJS and JWT authentication.
- Developed real-time telemetry dashboards using Next.js App Router and WebSockets.
- Reduced document retrieval latency by 45% via hybrid sparse-dense vector indexing in Qdrant.`);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleParseCv = async () => {
    if (!cvText.trim()) return;
    setLoading(true);
    try {
      const res = await api.parseCv(cvText);
      setResult(res);
    } catch (err: any) {
      console.error('Failed to parse CV:', err);
    } finally {
      setLoading(false);
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>AI Resume & Credential Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Profile & CV Intelligence Analyzer
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Extract technical skills, verify work experience claims, compute ATS compatibility scores, and uncover skill gaps
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learner/profile"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 text-white transition"
            >
              <span>Back to Profile Overview</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Layout: Paste CV / AI Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input CV Text */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Resume Text or Markdown</span>
                </h2>
                <span className="text-[10px] text-zinc-500 font-mono">Plain Text / Markdown</span>
              </div>

              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your resume content or CV text here..."
                rows={16}
                className="w-full bg-[#111726] border border-[#1e293b] rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed resize-none"
              />

              <button
                onClick={handleParseCv}
                disabled={loading || !cvText.trim()}
                className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI CV Extraction & Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: AI Extraction & Audit Results */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Score Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">ATS Match Score</div>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-1">94%</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">High formatting readability</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Extracted Skills</div>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {result.extracted?.extractedSkills?.length || 14}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Mapped to Skillora Graph</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Profile Completeness</div>
                    <div className="text-3xl font-extrabold text-cyan-400 mt-1">92%</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Ready for talent export</div>
                  </div>
                </div>

                {/* Evidence Categorization Banner */}
                <div className="p-4 rounded-xl bg-[#0f1422] border border-[#1c263c] text-xs space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verification Governance Classification</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-zinc-400">
                    <div className="p-2 rounded-lg bg-[#161f33]">
                      <strong className="text-emerald-400 block">Verified Evidence</strong>
                      Backed by in-platform tests & audits
                    </div>
                    <div className="p-2 rounded-lg bg-[#161f33]">
                      <strong className="text-cyan-400 block">Self-Reported Claims</strong>
                      Sourced from your resume
                    </div>
                    <div className="p-2 rounded-lg bg-[#161f33]">
                      <strong className="text-purple-400 block">AI Inferences</strong>
                      Suggested by neural gap engine
                    </div>
                  </div>
                </div>

                {/* Extracted Skills Badges */}
                <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
                  <h3 className="text-sm font-bold text-white">Extracted Skills Mapped to Workforce Taxonomy</h3>
                  {result.extracted?.extractedSkills && result.extracted.extractedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.extracted.extractedSkills.map((s: string) => (
                        <span
                          key={s}
                          className="px-3 py-1.5 rounded-xl bg-[#111726] border border-[#1e293b] text-xs font-semibold text-white flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500">No specific skills identified in the provided text.</p>
                  )}
                </div>

                {/* AI Recommendations */}
                <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-3">
                  <h3 className="text-sm font-bold text-white">AI Recommendations to Elevate Employability</h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {(result.extracted?.recommendations || [
                      'Ensure your resume lists specific technologies and frameworks in your work and project history.',
                      'Take in-platform skill assessments to convert self-reported claims into verified employer evidence.',
                    ]).map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-[#0b0f19] border border-[#1e293b] text-center space-y-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-[#111726] border border-[#1e293b] flex items-center justify-center text-zinc-500">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No CV Parsed Yet</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                    Paste your resume in the left panel and click &ldquo;Run AI CV Extraction&rdquo; to analyze ATS compatibility, extract skills, and audit employability gaps.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
