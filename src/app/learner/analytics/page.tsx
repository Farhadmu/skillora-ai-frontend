'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  ArrowRight,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { api } from '@/lib/api';

const skillGrowthData = [
  { week: 'W1', TypeScript: 70, NestJS: 65, RAG: 50, SystemDesign: 60 },
  { week: 'W2', TypeScript: 75, NestJS: 70, RAG: 60, SystemDesign: 65 },
  { week: 'W3', TypeScript: 82, NestJS: 74, RAG: 68, SystemDesign: 70 },
  { week: 'W4', TypeScript: 85, NestJS: 80, RAG: 74, SystemDesign: 74 },
  { week: 'W5', TypeScript: 88, NestJS: 83, RAG: 80, SystemDesign: 78 },
  { week: 'W6', TypeScript: 90, NestJS: 86, RAG: 84, SystemDesign: 80 },
];

const weeklyHoursData = [
  { day: 'Mon', hours: 2.8, target: 2.5 },
  { day: 'Tue', hours: 3.5, target: 2.5 },
  { day: 'Wed', hours: 2.2, target: 2.5 },
  { day: 'Thu', hours: 4.1, target: 2.5 },
  { day: 'Fri', hours: 3.0, target: 2.5 },
  { day: 'Sat', hours: 5.2, target: 3.0 },
  { day: 'Sun', hours: 3.8, target: 3.0 },
];

const assessmentAccuracyData = [
  { topic: 'TypeScript', accuracy: 92, avgSeconds: 45 },
  { topic: 'NestJS DI', accuracy: 88, avgSeconds: 52 },
  { topic: 'RAG Retrieval', accuracy: 84, avgSeconds: 65 },
  { topic: 'MongoDB Index', accuracy: 80, avgSeconds: 40 },
  { topic: 'System Design', accuracy: 76, avgSeconds: 85 },
  { topic: 'Docker/K8s', accuracy: 68, avgSeconds: 70 },
];

export default function LearnerAnalyticsPage() {
  const [readiness, setReadiness] = useState<any>(null);

  useEffect(() => {
    api.getReadinessScore().then(setReadiness).catch(() => null);
  }, []);

  return (
    <div className="select-none">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Telemetry & Learning Metrics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Performance & Employability Analytics
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Comprehensive telemetry tracking your skill mastery, learning consistency, and exam accuracy
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-emerald-400 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              Active Streak: 18 Days 🔥
            </span>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Readiness Velocity</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">+12%</div>
            <div className="text-[11px] text-emerald-400 mt-1">Growth over last 30 days</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Weekly Learning Time</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">24.6 hrs</div>
            <div className="text-[11px] text-zinc-400 mt-1">Target: 20 hrs (123% fulfilled)</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Assessment Accuracy</span>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">84.2%</div>
            <div className="text-[11px] text-purple-400 mt-1">Across 18 attempts</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Verified Badges</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">8 Skills</div>
            <div className="text-[11px] text-emerald-400 mt-1">Ready for direct talent export</div>
          </div>
        </div>

        {/* Charts Row 1: Skill Growth & Weekly Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Growth Line Chart */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Skill Mastery Trajectory (6-Week View)</h3>
                <p className="text-xs text-zinc-400">Telemetry tracking core competencies proficiency</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> TS
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> NestJS
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="w-2 h-2 rounded-full bg-purple-400" /> RAG
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={skillGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
                  <XAxis dataKey="week" stroke="#52525b" fontSize={11} />
                  <YAxis domain={[40, 100]} stroke="#52525b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  />
                  <Line type="monotone" dataKey="TypeScript" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="NestJS" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="RAG" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="SystemDesign" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Learning Consistency Bar Chart */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Daily Learning Hours vs Target</h3>
                <p className="text-xs text-zinc-400">Tracking commitment consistency throughout the week</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">24.6 hrs Total</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2236" />
                  <XAxis dataKey="day" stroke="#52525b" fontSize={11} />
                  <YAxis stroke="#52525b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  />
                  <Bar dataKey="hours" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="target" fill="#1e293b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2: Accuracy by Topic & Strengths/Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assessment Accuracy Breakdown */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Assessment Accuracy by Domain</h3>
              <p className="text-xs text-zinc-400">
                Performance across technical diagnostics and adaptive questions
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {assessmentAccuracyData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-300">{item.topic}</span>
                    <span className="font-mono text-zinc-400">
                      {item.accuracy}% • Avg: {item.avgSeconds}s
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#141b2b] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.accuracy >= 85
                          ? 'bg-emerald-400'
                          : item.accuracy >= 75
                          ? 'bg-cyan-400'
                          : 'bg-yellow-400'
                      }`}
                      style={{ width: `${item.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strong vs Weak Topics & Recommendations */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">AI Focus Recommendations</h3>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Strongest Domain</span>
                  </div>
                  <p className="text-zinc-300">
                    <strong>TypeScript & NestJS Architecture</strong>: 90%+ accuracy and fast response time. Ready for enterprise interview challenges.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-yellow-400 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Focus Area (Gap Detected)</span>
                  </div>
                  <p className="text-zinc-300">
                    <strong>Docker & Kubernetes Orchestration</strong>: 68% accuracy. We recommend taking the containerization module to raise your readiness score.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/learner/ai-teacher?subject=Docker"
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <span>Practice Weak Topics with AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
