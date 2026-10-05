'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Sparkles, Cpu, CheckCircle2, AlertTriangle, ArrowRight, Target, ShieldCheck } from 'lucide-react';
import { api, getCurrentUser } from '@/lib/api';

export default function SkillGraphPage() {
  const [graphData, setGraphData] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [targetRole, setTargetRole] = useState('Senior Full-Stack AI Engineer');

  useEffect(() => {
    loadGraph();
  }, []);

  const loadGraph = async () => {
    try {
      const user = getCurrentUser();
      const res = await api.getSkillGraph(user?.id);
      setGraphData(res);
      if (res?.nodes?.length > 0) {
        setSelectedNode(res.nodes[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sampleNodes = [
    { name: 'TypeScript', current: 92, target: 90, status: 'VERIFIED', cluster: 'Language' },
    { name: 'NestJS', current: 88, target: 85, status: 'VERIFIED', cluster: 'Backend' },
    { name: 'RAG Pipelines', current: 82, target: 80, status: 'VERIFIED', cluster: 'AI' },
    { name: 'Vector Databases', current: 80, target: 85, status: 'VERIFIED', cluster: 'AI' },
    { name: 'Redis Cache', current: 65, target: 85, status: 'IN_PROGRESS', cluster: 'Data' },
    { name: 'Kubernetes', current: 45, target: 80, status: 'GAP', cluster: 'DevOps' },
    { name: 'Docker', current: 85, target: 80, status: 'VERIFIED', cluster: 'DevOps' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Neural Skill Graph Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Current vs Target Role
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Dynamic knowledge ontology tracking prerequisites, cross-domain dependencies, and verified proof nodes.
          </p>
        </div>

        <Link
          href="/learner/skills/evidence"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition"
        >
          <span>View Verified Evidence Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Target Role Selector & Legend */}
      <div className="p-4 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-zinc-400">Target Role Overlay:</span>
          <span className="text-xs font-bold text-white font-mono">{targetRole}</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">Verified Match (≥ Target)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-zinc-300">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="text-zinc-300">Gap Node</span>
          </div>
        </div>
      </div>

      {/* Interactive Visual Graph Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleNodes.map((node) => {
          const isVerified = node.status === 'VERIFIED';
          const isGap = node.status === 'GAP';

          return (
            <div
              key={node.name}
              className={`p-5 rounded-2xl bg-[#090d16] border transition hover:border-cyan-500/50 space-y-3 ${
                isVerified
                  ? 'border-emerald-500/25'
                  : isGap
                  ? 'border-rose-500/25'
                  : 'border-amber-500/25'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {node.cluster}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                    isVerified
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : isGap
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {node.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{node.name}</h3>

              {/* Progress Bar (Current vs Target) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Current: {node.current}%</span>
                  <span className="text-cyan-400 font-bold">Target: {node.target}%</span>
                </div>
                <div className="relative h-2 rounded-full bg-[#121929] overflow-hidden">
                  {/* Current Fill */}
                  <div
                    className={`h-full ${
                      isVerified
                        ? 'bg-emerald-400'
                        : isGap
                        ? 'bg-rose-400'
                        : 'bg-amber-400'
                    }`}
                    style={{ width: `${node.current}%` }}
                  />
                  {/* Target Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm"
                    style={{ left: `${node.target}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#151e30] flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono text-[11px]">Prerequisites met</span>
                <Link
                  href="/learner/skills/assessment"
                  className="text-cyan-400 hover:text-cyan-300 font-bold transition flex items-center gap-1"
                >
                  <span>Test Skill</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
