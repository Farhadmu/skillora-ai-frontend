'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bot,
  Cpu,
  Compass,
  Map,
  Code2,
  ShieldCheck,
  Briefcase,
  Layers,
  X,
  ArrowRight,
} from 'lucide-react';
import { api } from '@/lib/api';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.globalSearch(query);
        setResults(res.results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const defaultActions = [
    { title: 'Open AI Teacher', icon: Bot, path: '/tutor', desc: 'Socratic dialogue & concept mastery' },
    { title: 'Explore Skill Graph', icon: Cpu, path: '/skills', desc: 'Visual ontology & prerequisite maps' },
    { title: 'Career Navigator', icon: Compass, path: '/career', desc: 'Target role comparison & JD Intelligence' },
    { title: 'Reskilling Roadmap', icon: Map, path: '/roadmap', desc: 'Active milestone progression' },
    { title: 'Review Code', icon: Code2, path: '/projects', desc: 'Automated AI code review & refactoring' },
    { title: 'Mock Interview', icon: ShieldCheck, path: '/interview', desc: 'Simulated technical & system design' },
    { title: 'Talent Marketplace', icon: Briefcase, path: '/jobs', desc: 'AI-matched verified job opportunities' },
    { title: 'Learner Dashboard', icon: Layers, path: '/dashboard', desc: 'Readiness scores and next actions' },
  ];

  const handleSelect = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl overflow-hidden flex flex-col">
        {/* Input header */}
        <div className="flex items-center px-4 py-3 border-b border-[#1a2236] gap-3">
          <Search className="w-4 h-4 text-emerald-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a skill, role, job, project, or command..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-[#161f33] text-zinc-400 border border-zinc-700 font-mono">
            ESC
          </kbd>
        </div>

        {/* Content list */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {loading && (
            <div className="p-4 text-center text-xs text-zinc-500">
              <span className="inline-block w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mr-2" />
              Searching across Skillora Intelligence Platform...
            </div>
          )}

          {/* Search results */}
          {results && (
            <div className="space-y-3">
              {results.skills?.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Skills
                  </div>
                  {results.skills.map((s: any) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelect('/skills')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#161f33] transition"
                    >
                      <div>
                        <div className="font-semibold text-white">{s.title}</div>
                        <div className="text-[11px] text-zinc-400">{s.subtitle}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>
                  ))}
                </div>
              )}

              {results.jobs?.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Jobs
                  </div>
                  {results.jobs.map((j: any) => (
                    <button
                      key={j.id}
                      onClick={() => handleSelect('/jobs')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#161f33] transition"
                    >
                      <div>
                        <div className="font-semibold text-white">{j.title}</div>
                        <div className="text-[11px] text-zinc-400">{j.subtitle}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Actions (when no search query) */}
          {!query && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Navigation & Quick Tools
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {defaultActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.path}
                      onClick={() => handleSelect(act.path)}
                      className="text-left p-2.5 rounded-xl bg-[#0e1424] hover:bg-[#162035] border border-[#161f33] hover:border-emerald-500/40 transition flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#111726] border border-[#1e293b] flex items-center justify-center group-hover:border-emerald-500/50">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                          {act.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate max-w-[170px]">
                          {act.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
