import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. This defines WHICH routes should trigger the Clerk Login
// We are telling it to protect anything that starts with /studio
const isProtectedRoute = createRouteMatcher(['/studio(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // 2. If the user is trying to access the studio, force them to log in
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};