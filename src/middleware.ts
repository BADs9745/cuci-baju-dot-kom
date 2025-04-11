import { NextResponse, type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const isLogin = request.cookies.get("token");
	if (isLogin) {
		return NextResponse.next();
	}
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/:path*",
};
