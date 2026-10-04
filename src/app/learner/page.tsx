'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LearnerIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/learner/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06080d] flex items-center justify-center text-zinc-400 text-xs">
      Navigating to Learner Command Center...
    </div>
  );
}
