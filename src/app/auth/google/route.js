import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://tiles-gallary.vercel.app";

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