'use client';

import React, { useState } from 'react';
import { FolderGit2, GitBranch, GitCommit, CheckCircle2, RefreshCw, ExternalLink, ShieldCheck } from 'lucide-react';

export default function GitHubSyncPage() {
  const [syncedRepos, setSyncedRepos] = useState([
    {
      name: 'alex-dev/skillora-microservices-core',
      stars: 14,
      commitsAnalyzed: 48,
      lastSync: '10 mins ago',
      verifiedSkillsExtracted: ['NestJS', 'TypeScript', 'Docker', 'Jest'],
      status: 'SYNCED',
    },
    {
      name: 'alex-dev/rag-hybrid-search-service',
      stars: 8,
      commitsAnalyzed: 22,
      lastSync: '2 hours ago',
      verifiedSkillsExtracted: ['Vector Search', 'Qdrant', 'RAG Pipelines'],
      status: 'SYNCED',
    },
  ]);
  const [syncing, setSyncing] = useState(false);

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              GitHub Repository Sync & Evidence Pipeline
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              CI / CD Link
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Connect public repositories to extract verified skill evidence directly from commit histories and pull requests.
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={syncing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          <span>Sync Repositories Now</span>
        </button>
      </div>

      <div className="space-y-4">
        {syncedRepos.map((repo) => (
          <div
            key={repo.name}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/30 transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111728] border border-[#1e2a40] text-white flex items-center justify-center font-bold">
                  <FolderGit2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{repo.name}</span>
                    <a
                      href={`https://github.com/${repo.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-3">
                    <span>{repo.commitsAnalyzed} commits analyzed</span>
                    <span>•</span>
                    <span>Last sync: {repo.lastSync}</span>
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{repo.status}</span>
              </span>
            </div>

            <div className="pt-2 border-t border-[#151e30] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-semibold uppercase text-[10px]">Extracted Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {repo.verifiedSkillsExtracted.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-zinc-500 font-mono text-[11px]">Auto-verified on push</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
