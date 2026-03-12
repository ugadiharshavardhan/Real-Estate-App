import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const authObj = await auth();

    // If user is not logged in, protect() handles redirection to sign-in
    if (!authObj.userId) {
      return authObj.redirectToSignIn();
    }

    // Attempt to get role from session claims first (fastest)
    let role = authObj.sessionClaims?.metadata?.role || authObj.sessionClaims?.publicMetadata?.role;

    // If not found in session claims, fetch directly from Clerk API (most reliable)
    if (!role) {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(authObj.userId);
        role = user.publicMetadata?.role;
      } catch (error) {
        console.error("Error fetching user metadata from Clerk:", error);
      }
    }

    if (role !== "admin") {
      const url = new URL("/access-denied", req.url);
      return Response.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
