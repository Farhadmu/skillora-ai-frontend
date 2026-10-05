'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceShell role="EDUCATOR">{children}</WorkspaceShell>;
}
