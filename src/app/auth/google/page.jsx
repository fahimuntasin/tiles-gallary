"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function GoogleRedirectPage() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      authClient.signIn
        .social({
          provider: "google",
          callbackURL: "/",
        })
        .then((result) => {
          if (result.data?.url) {
            window.location.replace(result.data.url.replace(/%0A/g, ""));
          } else {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium mb-4">Google login failed.</p>
          <a href="/login" className="text-[#1e3a5f] font-bold hover:underline">
            ← Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-[#1e3a5f]"></span>
        <p className="text-[#1e3a5f] mt-4 font-medium">Redirecting to Google...</p>
      </div>
    </div>
  );
}