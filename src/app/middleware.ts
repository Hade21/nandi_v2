import { auth } from "@/app/auth";
import { NextResponse, type NextRequest } from "next/server";

const adminRoutes = ["/new", "/update", "/delete"];
const userRoute = ["/profile"];
const portalRoute = ["/auth"];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const isLoggedIn = !!session?.user.data.id;

  const { pathname } = req.nextUrl;

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isUserRoute = userRoute.some((route) => pathname.startsWith(route));
  const isPortalRoute = portalRoute.some((route) => pathname.startsWith(route));

  if (isPortalRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/maps", req.url));
  }
  if ((!isAdminRoute || !isUserRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (isUserRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/new",
    "/update",
    "/delete",
    "/profile",
    "/auth/login",
    "/auth/register",
  ],
};
