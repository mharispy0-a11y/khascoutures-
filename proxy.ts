import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const handler = auth(function (req: NextRequest & { auth: unknown }) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isAuthenticated = !!(req as { auth?: unknown }).auth;

  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", encodeURIComponent(req.url));
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
});

export const proxy = handler;
export default handler;

export const config = {
  matcher: ["/admin/:path*"],
};
