'use client';

import React, { useState, useEffect } from 'react';
import {
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  GitBranch,
  Zap,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function ProjectsPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiff, setSelectedDiff] = useState('All');

  // AI Code Reviewer state
  const [codeSnippet, setCodeSnippet] = useState(
    `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class AuthService {\n  async validateToken(token: string) {\n    // Potential vulnerability: unsanitized token\n    console.log("Validating token: " + token);\n    return { valid: true };\n  }\n}`,
  );
  const [language, setLanguage] = useState('TypeScript');
  const [reviewResult, setReviewResult] = useState<any>(null);
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [selectedCategory, selectedDiff]);

  const loadProjects = async () => {
    try {
      const [list, recs] = await Promise.all([
        api.getProjects(selectedCategory, selectedDiff),
        api.getProjectRecommendations().catch(() => []),
      ]);
      setProjects(list);
      setRecommended(recs);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  const handleReviewCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeSnippet.trim()) return;
    setReviewing(true);

    try {
      const res = await api.reviewCode(codeSnippet, language);
      setReviewResult(res);
    } catch (err) {
      console.error('Code review failed:', err);
    } finally {
      setReviewing(false);
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
              <Code2 className="w-4 h-4" />
              <span>Applied Systems & Automated Code Review</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Projects & AI Code Reviewer</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Build production architectures to verify your capabilities and submit code for automated static & semantic review.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LIVE AI CODE REVIEWER TOOL */}
        {/* ======================================================== */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  AI Code Reviewer Engine
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Audit Correctness, Security, Scalability & Architecture
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Language:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="TypeScript">TypeScript</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Go">Go</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleReviewCode} className="space-y-4">
            <textarea
              rows={8}
              required
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="Paste your source code here for automated review..."
              className="w-full bg-[#080d16] border border-[#1b253b] rounded-xl p-4 text-xs font-mono text-emerald-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />

            <button
              type="submit"
              disabled={reviewing || !codeSnippet.trim()}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 disabled:opacity-50"
            >
              {reviewing ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Run AI Code Review</span>
                </>
              )}
            </button>
          </form>

          {/* Review Results */}
          {reviewResult && (
            <div className="p-6 rounded-2xl bg-[#0e1424] border border-[#1c273e] space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#161f33] pb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Audit Synthesis
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{reviewResult.summary}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Quality Score:</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                    {reviewResult.score}/100
                  </span>
                </div>
              </div>

              {/* 4 Pillars Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                  <div className="text-[10px] text-zinc-500">Correctness</div>
                  <div className="font-bold text-white mt-0.5">{reviewResult.correctness?.score}%</div>
                </div>
                <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                  <div className="text-[10px] text-zinc-500">Security</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{reviewResult.security?.score}%</div>
                </div>
                <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                  <div className="text-[10px] text-zinc-500">Performance</div>
                  <div className="font-bold text-cyan-400 mt-0.5">{reviewResult.performance?.score}%</div>
                </div>
                <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                  <div className="text-[10px] text-zinc-500">Maintainability</div>
                  <div className="font-bold text-white mt-0.5">{reviewResult.maintainability?.score}%</div>
                </div>
              </div>

              {/* Issues & Security Flags */}
              {reviewResult.security?.issues?.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Security & Clean Code Recommendations:
                  </div>
                  {reviewResult.security.issues.map((issue: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300"
                    >
                      • {issue}
                    </div>
                  ))}
                </div>
              )}

              {/* Refactored Snippet */}
              {reviewResult.refactoredSnippet && (
                <div>
                  <div className="text-xs font-bold text-emerald-400 mb-1.5">
                    Suggested Production-Grade Refactor:
                  </div>
                  <pre className="p-4 rounded-xl bg-[#070b12] border border-[#141d2e] text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed">
                    {reviewResult.refactoredSnippet}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* CURATED PROJECT CATALOG */}
        {/* ======================================================== */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Applied Engineering Projects ({projects.length})</h3>
              <p className="text-xs text-zinc-400">
                Complete these projects to generate verified evidence for your public profile.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Categories</option>
                <option value="AI/ML">AI/ML & RAG</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Backend">Backend Architecture</option>
                <option value="Security">Security & RBAC</option>
              </select>

              <select
                value={selectedDiff}
                onChange={(e) => setSelectedDiff(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] hover:border-emerald-500/40 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#111828] text-emerald-400 border border-emerald-500/20">
                      {proj.difficulty}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">~{proj.estimatedHours} hrs</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{proj.brief}</p>

                  <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a] text-[11px] text-zinc-400 mb-4 font-mono">
                    <span className="text-zinc-500 block mb-0.5">Architecture:</span>
                    {proj.architecture}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.targetSkills?.map((s: string, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#111726] text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#141b2a] flex items-center justify-between">
                  <a
                    href={proj.starterGithubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Starter Repo</span>
                  </a>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Submit Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
