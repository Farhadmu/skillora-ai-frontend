'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, Lock, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminRolesPage() {
  const permissions = [
    { module: 'User Management & Status', learner: false, educator: false, employer: false, admin: true },
    { module: 'Course Authoring & Curriculum', learner: false, educator: true, employer: false, admin: true },
    { module: 'Proctored Assessment Creation', learner: false, educator: true, employer: false, admin: true },
    { module: 'Talent Sourcing & Job Requisitions', learner: false, educator: false, employer: true, admin: true },
    { module: 'AI Multi-Provider Cascade Config', learner: false, educator: false, employer: false, admin: true },
    { module: 'Knowledge Base Chunk & Embed', learner: false, educator: false, employer: false, admin: true },
    { module: 'Immutable Audit Ledger Inspection', learner: false, educator: false, employer: false, admin: true },
    { module: 'Public Profile & Portfolio Claim', learner: true, educator: true, employer: true, admin: true },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              RBAC Policies & Permission Matrix
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono">
              Access Governance
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            System-level role-based access control matrix enforced strictly across backend Guards and decorators.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-mono">
          <Lock className="w-4 h-4 text-rose-400" />
          <span>Privilege escalation permanently blocked</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1a2236] text-zinc-400 uppercase font-mono tracking-wider">
              <th className="pb-3 font-bold">Functional Module</th>
              <th className="pb-3 text-center font-bold">Learner</th>
              <th className="pb-3 text-center font-bold">Educator</th>
              <th className="pb-3 text-center font-bold">Employer</th>
              <th className="pb-3 text-center font-bold text-amber-400">Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#151e30]">
            {permissions.map((p) => (
              <tr key={p.module} className="hover:bg-[#0c1220] transition">
                <td className="py-3.5 font-semibold text-zinc-200">{p.module}</td>
                <td className="py-3.5 text-center">
                  {p.learner ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-700 mx-auto" />}
                </td>
                <td className="py-3.5 text-center">
                  {p.educator ? <CheckCircle2 className="w-4 h-4 text-cyan-400 mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-700 mx-auto" />}
                </td>
                <td className="py-3.5 text-center">
                  {p.employer ? <CheckCircle2 className="w-4 h-4 text-purple-400 mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-700 mx-auto" />}
                </td>
                <td className="py-3.5 text-center">
                  {p.admin ? <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-700 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
