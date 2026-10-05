'use client';

import React, { useState, useEffect } from 'react';
import {
  Map,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  BookOpen,
  Calendar,
  Layers,
  RotateCw,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [targetRole, setTargetRole] = useState('Full-Stack AI Systems Engineer');
  const [durationDays, setDurationDays] = useState(30);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      const res = await api.getActiveRoadmap();
      setRoadmap(res);
      if (res?.targetRole) setTargetRole(res.targetRole);
      if (res?.durationDays) setDurationDays(res.durationDays);
    } catch (err) {
      console.error('Failed to load roadmap:', err);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const newRoadmap = await api.generateRoadmap(targetRole, durationDays);
      setRoadmap(newRoadmap);
    } catch (err) {
      console.error('Roadmap generation failed:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleToggle = async (index: number) => {
    if (!roadmap) return;
    try {
      const updated = await api.toggleRoadmapMilestone(roadmap.id, index);
      setRoadmap(updated);
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  return (
    <DashboardLayout role="LEARNER">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Map className="w-4 h-4" />
              <span>SkillBridge Reskilling Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Adaptive Learning Roadmap</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Personalized pathway engineered to bridge your exact skill gaps to verified commercial employability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Full-Stack AI Systems Engineer">Full-Stack AI Systems Engineer</option>
              <option value="Backend Node.js & Cloud Architect">Backend Node.js & Cloud Architect</option>
              <option value="Frontend & UI/UX Specialist">Frontend & UI/UX Specialist</option>
              <option value="AI/ML Systems Researcher">AI/ML Systems Researcher</option>
            </select>

            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value={7}>7-Day Intensive</option>
              <option value={30}>30-Day Accelerated</option>
              <option value={60}>60-Day Comprehensive</option>
              <option value={90}>90-Day Full Mastery</option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} />
              <span>{generating ? 'Synthesizing...' : 'Regenerate Pathway'}</span>
            </button>
          </div>
        </div>

        {/* Roadmap Progress Status */}
        {roadmap && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c182b] to-[#080f1c] border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Active Career Roadmap
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{roadmap.targetRole}</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{roadmap.summary}</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-zinc-400">Completion Status</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-0.5">
                  {roadmap.progressPercent}%
                </div>
              </div>
            </div>

            <div className="w-full h-2.5 bg-[#141b2b] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${roadmap.progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Interactive Milestones Timeline */}
        <div className="space-y-6">
          {roadmap?.milestones?.map((m: any, idx: number) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 relative ${
                m.completed
                  ? 'bg-[#0a121c] border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-[#0b0f19] border-[#1e293b] hover:border-zinc-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggle(idx)}
                    className={`mt-1 w-5 h-5 rounded-lg flex items-center justify-center transition ${
                      m.completed
                        ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                        : 'border border-zinc-600 hover:border-emerald-400'
                    }`}
                  >
                    {m.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-400">{m.dayRange}</span>
                      <span className="text-sm font-bold text-white">{m.title}</span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Focus Competency: <strong className="text-emerald-300">{m.focusSkill}</strong>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full self-start ${
                    m.completed
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#141b2a] text-zinc-400'
                  }`}
                >
                  {m.completed ? 'Milestone Verified' : 'In Progress'}
                </span>
              </div>

              {/* Learning Objectives & Tasks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Learning Objectives
                  </div>
                  <ul className="space-y-1 text-zinc-300">
                    {m.learningObjectives?.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-2">
                  <div className="text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Practical Tasks
                  </div>
                  <ul className="space-y-1 text-zinc-300">
                    {m.tasks?.map((task: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400">✓</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hands-on Project Prompt & Assessment Topic */}
              <div className="pt-3 border-t border-[#141b2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Project Prompt: <strong>{m.projectPrompt}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>
                    Target Assessment: <strong>{m.assessmentTopic}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}
