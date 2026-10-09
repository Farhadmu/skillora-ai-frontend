'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Users,
  MessageSquare,
  Trophy,
  Calendar,
  ArrowRight,
  Flame,
  CheckCircle2,
  Share2,
  Clock,
  Heart,
  Bot,
  ExternalLink,
} from 'lucide-react';


export default function LearnerCommunityPage() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'pods' | 'hackathons' | 'mentors'>('discussions');

  const discussions = [
    {
      id: 'd-1',
      title: 'How are you handling hybrid vector search latency with Qdrant and NestJS?',
      author: 'Farhadul Islam',
      role: 'Learner',
      replies: 14,
      likes: 28,
      tags: ['RAG', 'NestJS', 'Qdrant'],
      time: '2 hours ago',
      solved: true,
    },
    {
      id: 'd-2',
      title: 'Tips for scoring above 85% in the Full-Stack System Design Mock Interview?',
      author: 'Sarah Chen',
      role: 'Learner',
      replies: 23,
      likes: 41,
      tags: ['Interview', 'System Design'],
      time: '5 hours ago',
      solved: false,
    },
    {
      id: 'd-3',
      title: 'Deep dive into NestJS Dynamic Modules & Custom Decorators',
      author: 'Dr. Alan Mitchell',
      role: 'Educator',
      replies: 39,
      likes: 95,
      tags: ['NestJS', 'Architecture', 'TypeScript'],
      time: '1 day ago',
      solved: true,
    },
  ];

  const studyPods = [
    {
      id: 'pod-1',
      title: 'Full-Stack AI Systems Engineering Cohort 2026',
      members: 42,
      maxMembers: 50,
      focus: 'Next.js 16 + NestJS + Gemini RAG',
      nextSession: 'Today at 6:00 PM UTC',
      status: 'Open',
    },
    {
      id: 'pod-2',
      title: 'Distributed Systems & Microservices Deep Dive',
      members: 28,
      maxMembers: 30,
      focus: 'Kafka, Redis Redlock, ACID transactions',
      nextSession: 'Tomorrow at 4:00 PM UTC',
      status: 'Almost Full',
    },
    {
      id: 'pod-3',
      title: 'Cloud Native & Kubernetes Deployment Lab',
      members: 19,
      maxMembers: 25,
      focus: 'Docker, Helm, CI/CD GitHub Actions',
      nextSession: 'Thursday at 7:00 PM UTC',
      status: 'Open',
    },
  ];

  const hackathons = [
    {
      id: 'hack-1',
      title: 'Global AI Workforce Intelligence Hackathon 2026',
      sponsor: 'TechScale AI & QuantumData Labs',
      prize: '$25,000 USD + Direct Fast-Track Hiring',
      deadline: '7 days left',
      participants: 640,
      tags: ['AI Agents', 'RAG', 'Workforce Tech'],
    },
    {
      id: 'hack-2',
      title: 'Zero-Trust Security & Cloud Resilience Sprint',
      sponsor: 'CyberShield Corp',
      prize: '$15,000 USD + Cloud Engineering Roles',
      deadline: '14 days left',
      participants: 410,
      tags: ['AppSec', 'Zero-Trust', 'Containers'],
    },
  ];

  return (
    <div className="select-none">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Skillora Collaborative Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Learner Community & Study Pods
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Connect with fellow builders, join AI study pods, solve challenges, and participate in global hackathons
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tutor"
              className="px-4 py-2 rounded-xl font-bold text-xs bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 text-white transition flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Find Study Buddy with AI</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0b0f19] border border-[#1a2236] max-w-fit">
          {[
            { id: 'discussions', label: 'Technical Discussions', icon: MessageSquare },
            { id: 'pods', label: 'AI Study Pods', icon: Users },
            { id: 'hackathons', label: 'Hackathons & Challenges', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  isSel
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'discussions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">Showing recent active threads</span>
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition">
                + Start Discussion
              </button>
            </div>

            <div className="space-y-3">
              {discussions.map((d) => (
                <div
                  key={d.id}
                  className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b] hover:border-emerald-500/30 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white hover:text-emerald-400 cursor-pointer transition">
                        {d.title}
                      </h3>
                      {d.solved && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Solved
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span>Posted by <strong className="text-zinc-300">{d.author}</strong> ({d.role})</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-zinc-500">
                        <Clock className="w-3 h-3" />
                        {d.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      {d.tags.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#111726] border border-[#1e293b] text-zinc-400">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-zinc-500" />
                      {d.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                      {d.replies}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pods' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyPods.map((pod) => (
              <div
                key={pod.id}
                className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                      {pod.status}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {pod.members}/{pod.maxMembers} Members
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{pod.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1">Focus: {pod.focus}</p>
                </div>

                <div className="pt-4 border-t border-[#161f33] space-y-3">
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Next: {pod.nextSession}</span>
                  </div>

                  <button className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center justify-center gap-1.5">
                    <span>Join Study Pod</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'hackathons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons.map((h) => (
              <div
                key={h.id}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0c182b] to-[#070d17] border border-emerald-500/30 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {h.deadline}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{h.participants} Registered</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{h.title}</h3>
                  <p className="text-xs text-zinc-300 mt-1">Sponsor: {h.sponsor}</p>
                  <p className="text-xs font-semibold text-emerald-400 mt-2">Prize Pool: {h.prize}</p>
                </div>

                <div className="pt-4 border-t border-[#161f33] flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {h.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#111726] border border-[#1e293b] text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5">
                    <span>Register Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
