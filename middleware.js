import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const currentPath = request.nextUrl.pathname;
  const token = await getToken({ req: request });
  

  if (currentPath === "/")
    return NextResponse.redirect(new URL("/user/home", request.url));
 /*
  if (currentPath.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin?"+'token.email', request.url));
    }
  }

 if (currentPath.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
    if (token.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (currentPath === "/admin") {
      return NextResponse.redirect(new URL("/admin/home", request.url));
    }
  }*/

  return NextResponse.next();
}
