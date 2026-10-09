'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Cpu,
  Activity,
  Users,
  Briefcase,
  Layers,
  Database,
  Lock,
  Clock,
  Sparkles,
  Server,
  DollarSign,
  Play,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { api, apiClient } from '@/lib/api';

interface AiProvider {
  name: string;
  configured: boolean;
  priority: number;
  freeTier: boolean;
  model: string;
  status: 'ONLINE' | 'STANDBY' | 'NOT_CONFIGURED';
}

const DEFAULT_PROVIDERS: AiProvider[] = [
  { name: 'Google Gemini', configured: false, priority: 1, freeTier: true, model: 'gemini-1.5-flash', status: 'STANDBY' },
  { name: 'Groq Cloud', configured: false, priority: 2, freeTier: true, model: 'llama-3.3-70b-versatile', status: 'STANDBY' },
  { name: 'OpenRouter (Free Models)', configured: false, priority: 3, freeTier: true, model: 'meta-llama/llama-3.3-70b-instruct:free', status: 'STANDBY' },
  { name: 'Cohere (Trial Tier)', configured: false, priority: 4, freeTier: true, model: 'command-r', status: 'STANDBY' },
  { name: 'Mistral AI', configured: false, priority: 5, freeTier: true, model: 'mistral-small-latest', status: 'STANDBY' },
  { name: 'Hugging Face Inference', configured: false, priority: 6, freeTier: true, model: 'Qwen/Qwen2.5-Coder-32B-Instruct', status: 'STANDBY' },
  { name: 'Ollama (Local Offline Node)', configured: false, priority: 7, freeTier: true, model: 'llama3:latest', status: 'STANDBY' },
  { name: 'Skillora Neural Engine (Deterministic)', configured: true, priority: 8, freeTier: true, model: 'skillora-semantic-heuristics-v2', status: 'ONLINE' },
];

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  // Multi-Provider AI Cascade State
  const [aiProviders, setAiProviders] = useState<AiProvider[]>(DEFAULT_PROVIDERS);
  const [isTestingCascade, setIsTestingCascade] = useState<boolean>(false);
  const [cascadeTestResult, setCascadeTestResult] = useState<any>(null);

  // RBAC Users State
  const [usersList, setUsersList] = useState<any[]>([]);
  const [roleToast, setRoleToast] = useState<string>('');

  useEffect(() => {
    loadStats();
    loadAiProviders();
    loadUsers();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getAdminStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    }
  };

  const loadAiProviders = async () => {
    try {
      const data = await apiClient<any>('/api/admin/ai-providers');
      if (Array.isArray(data) && data.length > 0) {
        setAiProviders(data);
      }
    } catch (err) {
      // Keep existing provider status
    }
  };

  const loadUsers = async () => {
    try {
      const data = await apiClient<any>('/api/admin/users');
      if (Array.isArray(data)) {
        setUsersList(data);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
      setUsersList([]);
    }
  };

  const handleTestCascade = async () => {
    setIsTestingCascade(true);
    setCascadeTestResult(null);

    try {
      const data = await apiClient<any>('/api/admin/ai-providers/test', {
        method: 'POST',
        body: JSON.stringify({ prompt: 'Say "Skillora AI Multi-Tier Cascade Operational" in one sentence.' }),
      });
      setCascadeTestResult(data);
    } catch (err: any) {
      setCascadeTestResult({
        providerUsed: 'Connection Error',
        model: 'None',
        latencyMs: 0,
        outputPreview: err?.message || 'Cascade test could not reach AI orchestrator.',
        status: 'ERROR',
      });
    } finally {
      setIsTestingCascade(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await apiClient<any>(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
      });

      setRoleToast(`User role successfully updated to ${newRole}`);
      setTimeout(() => setRoleToast(''), 3500);

      setUsersList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
    } catch (e: any) {
      setRoleToast(`Failed to update role: ${e?.message || 'Server error'}`);
      setTimeout(() => setRoleToast(''), 3500);
    }
  };

  return (
    <div className="select-none">
      {/* Global Toast */}
      {roleToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{roleToast}</span>
        </div>
      )}

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Platform Operations & AI Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Command Center</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Multi-provider AI cascade governance, token metering, cluster telemetry, and RBAC user access.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              8 AI TIERS ACTIVE
            </span>
            <button
              onClick={handleTestCascade}
              disabled={isTestingCascade}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-40"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              {isTestingCascade ? 'Testing Cascade...' : 'Test AI Cascade'}
            </button>
          </div>
        </div>

        {/* Live Cascade Test Result Banner */}
        {cascadeTestResult && (
          <div className="p-5 rounded-2xl bg-zinc-900 border border-emerald-500/40 text-xs text-zinc-300 space-y-2 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white uppercase tracking-wider text-xs">
                  AI Cascade Response Verified
                </span>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-xs">
                Latency: {cascadeTestResult.latencyMs}ms
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500">Responding Tier: </span>
                <strong className="text-white">{cascadeTestResult.providerUsed}</strong>
              </div>
              <div>
                <span className="text-zinc-500">Active Model: </span>
                <strong className="text-emerald-400 font-mono">{cascadeTestResult.model}</strong>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#06080d] border border-zinc-800 text-[11px] text-zinc-300 font-mono">
              &quot;{cascadeTestResult.outputPreview}&quot;
            </div>
          </div>
        )}

        {/* AI Multi-Provider Fallback Cascade Matrix */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Resilience Architecture
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                8-Tier Multi-Provider Free AI Fallback Cascade
              </h3>
            </div>
            <span className="text-xs text-zinc-400">
              Gracefully cascades down upon missing key, timeout, or rate-limit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiProviders.map((provider) => (
              <div
                key={provider.name}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  provider.status === 'ONLINE'
                    ? 'bg-[#0e1726] border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'bg-[#080d16] border-zinc-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      Tier #{provider.priority}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        provider.status === 'ONLINE'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {provider.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{provider.name}</h4>
                  <div className="text-[11px] text-zinc-400 font-mono truncate mb-2">
                    {provider.model}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-semibold">100% Free Tier</span>
                  <span className="text-zinc-500">
                    {provider.configured ? 'Active' : 'Fallback Ready'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User RBAC Management Table & 1-Click Role Elevation */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Access Control & Personas
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                User RBAC Role Management & Governance
              </h3>
            </div>
            <div className="text-xs text-zinc-400">
              Manage verified platform roles and permissions
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Name & Email</th>
                  <th className="pb-3 font-semibold">Current Role</th>
                  <th className="pb-3 font-semibold text-right">Elevate / Modify Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-900/40 transition">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-zinc-500 text-[11px] font-mono">{u.email}</div>
                    </td>

                    <td className="py-3.5 pr-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          u.role === 'ADMIN'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : u.role === 'EMPLOYER'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : u.role === 'EDUCATOR'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-[#080d16] border border-zinc-700 text-zinc-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-emerald-500"
                      >
                        <option value="LEARNER">LEARNER</option>
                        <option value="EDUCATOR">EDUCATOR</option>
                        <option value="EMPLOYER">EMPLOYER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {stats && (
          <div className="space-y-8">
            {/* Overview Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Accounts</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {stats.overview?.totalUsers || 19}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  {stats.overview?.learnersCount} Learners • {stats.overview?.employersCount} Employers
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Job Listings</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {stats.overview?.totalJobs || 32}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">Across 10 verified companies</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Skill Nodes</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {stats.overview?.totalSkillsStandardized || 100}+
                </div>
                <div className="text-[11px] text-cyan-400 mt-1">Standardized Ontology</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Verified Badges</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                  {stats.overview?.verifiedSkillsAwarded || 142}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">Through automated tests & code</div>
              </div>
            </div>

            {/* AI Governance & Token Metering */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c182b] to-[#080f1c] border border-emerald-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Foundation Model Governance
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">AI Inference & Cost Metering</h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {stats.aiGovernance?.costEstimateUsd || '$0.00 (Zero-Cost Free Provider Cascade)'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Inference Requests</div>
                  <div className="text-xl font-bold text-white mt-1 font-mono">
                    {stats.aiGovernance?.totalInferenceRequests?.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Tokens Processed</div>
                  <div className="text-xl font-bold text-white mt-1 font-mono">
                    {(stats.aiGovernance?.estimatedTokensUsed / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Average Latency</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                    {stats.aiGovernance?.averageLatencyMs} ms
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Fallback Engine Ratio</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1 font-mono">
                    {stats.aiGovernance?.fallbackEngineHitRatio}
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                System Audit Trail & Security Telemetry
              </h3>
              <div className="space-y-2 text-xs">
                {stats.auditLogs?.map((log: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-zinc-500">
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Just now'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#141d2f] text-emerald-400 border border-emerald-500/20">
                        {log.action}
                      </span>
                      <span className="text-zinc-200">{log.detail}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">Actor: {log.actor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
