"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { Person, Envelope, Lock, Check } from "@gravity-ui/icons";
import { UserPlus, Eye, EyeOff, Link as LinkIcon } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/");
    }
  }, [session, isPending, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photoUrl = formData.get("photoUrl");

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoUrl || undefined,
      });

      if (result.error) {
        setError(result.error.message || "Registration failed. Please try again.");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#1e3a5f]/5 to-[#c8a97e]/10 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center shadow-md">
              <UserPlus className="h-8 w-8 text-[#c8a97e]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Create Account</h1>
          <p className="text-gray-500 mt-2">Join TilesGallery today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-bold text-[#1e3a5f] mb-2">Name</label>
            <div className="flex items-center gap-3 w-full h-12 px-4 bg-[#f8f6f3] border-2 border-[#1e3a5f]/20 rounded-xl focus-within:border-[#c8a97e] focus-within:bg-white focus-within:shadow-sm transition-all">
              <Person className="h-5 w-5 text-[#1e3a5f]" />
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                required
                className="grow bg-transparent outline-none text-base text-[#1e3a5f] placeholder:text-[#1e3a5f]/40"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-bold text-[#1e3a5f] mb-2">Email</label>
            <div className="flex items-center gap-3 w-full h-12 px-4 bg-[#f8f6f3] border-2 border-[#1e3a5f]/20 rounded-xl focus-within:border-[#c8a97e] focus-within:bg-white focus-within:shadow-sm transition-all">
              <Envelope className="h-5 w-5 text-[#1e3a5f]" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="grow bg-transparent outline-none text-base text-[#1e3a5f] placeholder:text-[#1e3a5f]/40"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-bold text-[#1e3a5f] mb-2">Photo URL</label>
            <div className="flex items-center gap-3 w-full h-12 px-4 bg-[#f8f6f3] border-2 border-[#1e3a5f]/20 rounded-xl focus-within:border-[#c8a97e] focus-within:bg-white focus-within:shadow-sm transition-all">
              <LinkIcon className="h-5 w-5 text-[#1e3a5f]" />
              <input
                type="url"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                className="grow bg-transparent outline-none text-base text-[#1e3a5f] placeholder:text-[#1e3a5f]/40"
              />
            </div>
            <p className="text-xs text-[#1e3a5f]/50 mt-1.5">Optional profile image link</p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-bold text-[#1e3a5f] mb-2">Password</label>
            <div className="flex items-center gap-3 w-full h-12 px-4 bg-[#f8f6f3] border-2 border-[#1e3a5f]/20 rounded-xl focus-within:border-[#c8a97e] focus-within:bg-white focus-within:shadow-sm transition-all">
              <Lock className="h-5 w-5 text-[#1e3a5f]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                required
                minLength={6}
                className="grow bg-transparent outline-none text-base text-[#1e3a5f] placeholder:text-[#1e3a5f]/40"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#1e3a5f]/50 hover:text-[#1e3a5f]">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-[#1e3a5f]/50 mt-1.5">Must be at least 6 characters with 1 uppercase and 1 number</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#1e3a5f] text-white font-bold rounded-xl hover:bg-[#2d5a8e] transition-colors flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Check className="h-5 w-5" />
            )}
            Register
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400 font-medium">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

<a
          href="#"
          onClick={async (e) => {
            e.preventDefault();
            setGoogleLoading(true);
            try {
              const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              });
              if (result.data?.url) {
                window.location.href = result.data.url;
              } else {
                setError("Google sign-up failed");
                setGoogleLoading(false);
              }
            } catch {
              setError("Google sign-up failed");
              setGoogleLoading(false);
            }
          }}
          className="w-full h-12 flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          {googleLoading ? (
            <span className="loading loading-spinner loading-sm text-gray-500"></span>
          ) : (
            <img src="/images/google-btn.png" alt="Google" className="h-6" />
          )}
          <span className="text-gray-600 font-medium">{googleLoading ? "Redirecting to Google..." : "Continue with Google"}</span>
        </a>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#c8a97e] font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}