'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EducatorRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/educator/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06080d] flex items-center justify-center text-zinc-400">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono">Redirecting to Educator Console...</span>
      </div>
    </div>
  );
}
