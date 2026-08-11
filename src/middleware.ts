import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Modo Manutenção reativado (lê MAINTENANCE_MODE do .env, padrão true)
  const maintenanceMode = process.env.MAINTENANCE_MODE !== 'false';

  const userAgent = request.headers.get('user-agent') || '';
  const isGooglebot = /googlebot|google-site-verification|apis-google|mediapartners-google|storebot-google/i.test(userAgent);

  // Permitir arquivos estáticos, crawlers do Google, rotas de API públicas, mídias enviadas e a própria página de manutenção
  if (
    !maintenanceMode ||
    isGooglebot ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/LOGO') ||
    pathname.startsWith('/imagens') ||
    pathname === '/favicon.ico' ||
    pathname === '/manutencao'
  ) {
    return NextResponse.next();
  }

  // Verificar presença de cookie de sessão NextAuth ou Cookie VIP
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('star_ink_vip_session')?.value;

  if (!sessionToken) {
    const maintenanceUrl = new URL('/manutencao', request.url);
    return NextResponse.redirect(maintenanceUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
