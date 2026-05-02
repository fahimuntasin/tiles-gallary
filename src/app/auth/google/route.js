import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://tiles-gallary.vercel.app";

  try {
    const res = await fetch(`${baseUrl}/api/auth/sign-in/social`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        provider: "google", 
        callbackURL: "/" 
      }),
    });

    const data = await res.json();

    if (data.url) {
      const cleanUrl = data.url.replace(/%0A/g, "");
      return NextResponse.redirect(cleanUrl);
    }

    return NextResponse.redirect(new URL("/login", baseUrl));
  } catch {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }
}