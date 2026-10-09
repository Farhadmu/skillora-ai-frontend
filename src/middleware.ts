import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get('skillora_role')?.value;

  // Root canonical redirects
  if (pathname === '/dashboard') {
    const target = roleCookie ? `/${roleCookie.toLowerCase()}/dashboard` : '/learner/dashboard';
    return NextResponse.redirect(new URL(target, request.url));
  }
  if (pathname === '/career') {
    return NextResponse.redirect(new URL('/learner/career', request.url));
  }
  if (pathname === '/jobs') {
    return NextResponse.redirect(new URL('/learner/jobs', request.url));
  }
  if (pathname === '/skills') {
    return NextResponse.redirect(new URL('/learner/skills', request.url));
  }
  if (pathname === '/interview') {
    return NextResponse.redirect(new URL('/learner/interview', request.url));
  }
  if (pathname === '/assessments') {
    return NextResponse.redirect(new URL('/learner/skills/assessment', request.url));
  }
  if (pathname === '/tutor') {
    return NextResponse.redirect(new URL('/learner/learning/ai-teacher', request.url));
  }
  if (pathname === '/roadmap') {
    return NextResponse.redirect(new URL('/learner/learning/roadmap', request.url));
  }
  if (pathname === '/projects') {
    return NextResponse.redirect(new URL('/learner/build/projects', request.url));
  }

  // Role guard protection
  const isProtectedRoleRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/educator') ||
    pathname.startsWith('/employer') ||
    pathname.startsWith('/learner');

  if (isProtectedRoleRoute) {
    if (!roleCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const userRole = roleCookie.toUpperCase();

    // /admin/* -> only ADMIN authorized
    if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${userRole.toLowerCase()}/dashboard`, request.url));
    }

    // /educator/* -> EDUCATOR or ADMIN authorized
    if (pathname.startsWith('/educator') && userRole !== 'EDUCATOR' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${userRole.toLowerCase()}/dashboard`, request.url));
    }

    // /employer/* -> EMPLOYER or ADMIN authorized
    if (pathname.startsWith('/employer') && userRole !== 'EMPLOYER' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${userRole.toLowerCase()}/dashboard`, request.url));
    }

    // /learner/* -> LEARNER or ADMIN authorized
    if (pathname.startsWith('/learner') && userRole !== 'LEARNER' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${userRole.toLowerCase()}/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/career',
    '/jobs',
    '/skills',
    '/interview',
    '/assessments',
    '/tutor',
    '/roadmap',
    '/projects',
    '/admin/:path*',
    '/educator/:path*',
    '/employer/:path*',
    '/learner/:path*',
  ],
};
