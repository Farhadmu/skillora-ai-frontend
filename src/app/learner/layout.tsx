'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceShell role="LEARNER">{children}</WorkspaceShell>;
}
