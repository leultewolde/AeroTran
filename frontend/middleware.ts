import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    console.log(`Middleware is running for: ${req.nextUrl.pathname}`);

    // if (req.nextUrl.pathname === '/auth') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }
    //
    // return NextResponse.next();
}

// import {NextRequest, NextResponse} from 'next/server';
//
// export function middleware(req:NextRequest) {
//     const url = req.nextUrl.clone();
//     console.log('url', url.pathname);
//     // Example: Redirect if not authenticated
//     const isLoggedIn = localStorage.getItem('authToken');
//     if (!isLoggedIn && url.pathname.startsWith('/')) {
//         url.pathname = '/auth';
//         return NextResponse.redirect(url);
//     }
//
//     if(isLoggedIn && url.pathname.startsWith('/auth')) {
//         url.pathname = '/';
//         return NextResponse.redirect(url);
//     }
//
//     // Continue processing other requests
//     return NextResponse.next();
// }
