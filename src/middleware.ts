import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const publicPaths = ['/', '/login', '/register'];
  const { pathname } = request.nextUrl;

  // Permitir acesso às rotas públicas
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Verificar token no cookie
  const token = request.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
