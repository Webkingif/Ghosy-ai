import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in';
const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up';

const isPublicRoute = createRouteMatcher([
  signInUrl + '(.*)',
  signUpUrl + '(.*)',
]);

const runClerkMiddleware = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
});

export default async function middleware(req: NextRequest, event: any) {
  const origin = req.headers.get('origin');
  const xForwardedHost = req.headers.get('x-forwarded-host');

  let modifiedReq = req;

  if (origin && xForwardedHost) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host !== xForwardedHost) {
        const headers = new Headers(req.headers);
        headers.set('x-forwarded-host', originUrl.host);
        
        const proto = originUrl.protocol.replace(':', '');
        headers.set('x-forwarded-proto', proto);

        modifiedReq = new NextRequest(req, {
          headers,
        });
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  }

  const response = await runClerkMiddleware(modifiedReq, event);
  
  if (response) {
    return response;
  }
  
  if (modifiedReq !== req) {
    return NextResponse.next({
      request: {
        headers: modifiedReq.headers,
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
