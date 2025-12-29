import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // En modo demo, permitimos acceso a todas las rutas autenticadas
    // Cuando se configure Supabase, descomentar el código de autenticación

    // Rutas públicas que no requieren autenticación
    const publicRoutes = ['/login', '/registro', '/recuperar', '/terminos', '/privacidad'];
    const isPublicRoute = publicRoutes.some((route) =>
        request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith('/api/auth')
    );

    // Para el modo demo, simplemente pasamos todas las solicitudes
    // En producción con Supabase configurado, aquí se verificaría la sesión

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
