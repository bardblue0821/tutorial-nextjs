import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    console.log("Middleware is running");
    const token = await request.headers.get("Authorization")?.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
        return NextResponse.json({ error: "Unauthorized: no token" }, { status: 401 });   
    }
    try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        console.log("Decoded JWT:", decodedJwt);
        return NextResponse.next();
    } catch {
        return NextResponse.json({ error: "Unauthorized: verification fails" }, { status: 401 });
    }
}

export const config = {
    matcher: [
        "/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*",
    ],
};
