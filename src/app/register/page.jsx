"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Person, Envelope, Lock, Check } from "@gravity-ui/icons";
import { UserPlus, Eye, EyeOff, Link as LinkIcon } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleGoogleRegister = async () => {
    setError("");
    try {
      await authClient.signUp.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google sign-up failed. Please try again.");
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
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">Name</label>
            <div className="input input-bordered input-primary flex items-center gap-2 w-full h-12 text-base">
              <Person className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                required
                className="grow bg-transparent outline-none text-base"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">Email</label>
            <div className="input input-bordered input-primary flex items-center gap-2 w-full h-12 text-base">
              <Envelope className="h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="grow bg-transparent outline-none text-base"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">Photo URL</label>
            <div className="input input-bordered input-primary flex items-center gap-2 w-full h-12 text-base">
              <LinkIcon className="h-5 w-5 text-gray-400" />
              <input
                type="url"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                className="grow bg-transparent outline-none text-base"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Optional profile image link</p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-[#1e3a5f] mb-2">Password</label>
            <div className="input input-bordered input-primary flex items-center gap-2 w-full h-12 text-base">
              <Lock className="h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                required
                minLength={6}
                className="grow bg-transparent outline-none text-base"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Must be at least 6 characters with 1 uppercase and 1 number</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#1e3a5f] text-white font-semibold rounded-xl hover:bg-[#2d5a8e] transition-colors flex items-center justify-center gap-2 text-base"
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

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full h-12 flex items-center justify-center border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <img src="/images/google-btn.png" alt="Continue with Google" className="h-10" />
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1e3a5f] font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}