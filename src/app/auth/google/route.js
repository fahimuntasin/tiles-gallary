import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/auth/sign-in/social`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "google", callbackURL: "/" }),
    });

    const data = await res.json();

    if (data.url) {
      const response = NextResponse.redirect(data.url);
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) {
        response.headers.set("set-cookie", setCookie);
      }
      return response;
    }

    return NextResponse.redirect(new URL("/login", baseUrl));
  } catch {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }
}