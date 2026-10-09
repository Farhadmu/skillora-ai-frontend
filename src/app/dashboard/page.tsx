'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/api';

export default function DashboardRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.role === 'EDUCATOR') {
      router.replace('/educator/dashboard');
    } else if (user?.role === 'EMPLOYER') {
      router.replace('/employer/dashboard');
    } else if (user?.role === 'ADMIN') {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/learner/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06080d] flex items-center justify-center text-zinc-400">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono">Redirecting to workspace command center...</span>
      </div>
    </div>
  );
}
