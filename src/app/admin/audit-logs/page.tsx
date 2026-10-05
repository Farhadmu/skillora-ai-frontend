'use client';

import React from 'react';
import { Database, ShieldCheck, Clock, FileText } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const logs = [
    { id: 'aud-1', action: 'AUTH_SESSION_REVOKED', actor: 'secops@skillora.ai', target: 'alex.j@example.com', ip: '192.168.1.1', time: '12 mins ago', severity: 'INFO' },
    { id: 'aud-2', action: 'JOB_REQUISITION_PUBLISHED', actor: 'sarah.j@techscale.ai', target: 'Job #0941', ip: '10.0.4.12', time: '1 hour ago', severity: 'INFO' },
    { id: 'aud-3', action: 'RBAC_ELEVATION_ATTEMPT_BLOCKED', actor: 'anonymous', target: 'admin/roles', ip: '45.132.18.9', time: '3 hours ago', severity: 'WARN' },
    { id: 'aud-4', action: 'PROCTOR_ASSESSMENT_COMPLETED', actor: 'alex.j@example.com', target: 'NestJS Exam #0821', ip: '192.168.1.1', time: '5 hours ago', severity: 'INFO' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Immutable System Audit Logs & Ledger
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              Audit Trail
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Tamper-proof event logs recording authentication, role modifications, proctoring events, and sensitive operations.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  log.severity === 'WARN'
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {log.action}
              </span>
              <span className="text-white font-semibold">{log.actor}</span>
              <span className="text-zinc-500">→</span>
              <span className="text-zinc-300">{log.target}</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
              <span>IP: {log.ip}</span>
              <span>{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
