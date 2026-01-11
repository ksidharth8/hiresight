import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token");

	const isProtected =
		req.nextUrl.pathname.startsWith("/dashboard") ||
		req.nextUrl.pathname.startsWith("/resume") ||
		req.nextUrl.pathname.startsWith("/jobs") ||
		req.nextUrl.pathname.startsWith("/interview");

	if (isProtected && !token) {
		const loginUrl = new URL("/login", req.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/resume/:path*",
		"/jobs/:path*",
		"/interview/:path*",
	],
};
