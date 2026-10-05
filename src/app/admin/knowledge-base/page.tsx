'use client';

import React, { useState } from 'react';
import { Database, Plus, Search, FileText, CheckCircle2, RefreshCw, Cpu } from 'lucide-react';

export default function AdminKnowledgeBasePage() {
  const [sources, setSources] = useState([
    {
      id: 'kb-1',
      title: 'NestJS Enterprise Architecture Handbook',
      chunksCount: 384,
      vectorDim: '768 (Gemini text-embedding-004)',
      indexStatus: 'INDEXED',
      lastSynced: '2 hours ago',
    },
    {
      id: 'kb-2',
      title: 'Stanford CS244: Distributed Systems & Raft Consensus',
      chunksCount: 512,
      vectorDim: '768 (Gemini text-embedding-004)',
      indexStatus: 'INDEXED',
      lastSynced: '1 day ago',
    },
    {
      id: 'kb-3',
      title: 'High-Throughput Vector Databases & HNSW Indexing Protocols',
      chunksCount: 290,
      vectorDim: '768 (Gemini text-embedding-004)',
      indexStatus: 'INDEXED',
      lastSynced: '3 days ago',
    },
  ]);

  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              RAG Vector Knowledge Base & Document Chunks
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Vector Ingestion
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage semantic knowledge ingestion, recursive text splitting, embedding generation, and cosine vector indexing.
          </p>
        </div>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          <span>Re-index Vector Embeddings</span>
        </button>
      </div>

      <div className="space-y-4">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{src.title}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  {src.indexStatus}
                </span>
              </div>
              <div className="text-zinc-400 font-mono mt-1">
                {src.chunksCount} Semantic Chunks • Embeddings: {src.vectorDim}
              </div>
            </div>

            <span className="text-zinc-500 font-mono self-start sm:self-auto">
              Last synced: {src.lastSynced}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
