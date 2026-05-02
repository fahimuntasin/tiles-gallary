"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import { Person, Envelope, Lock, Check } from "@gravity-ui/icons";
import { UserPlus, Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import googleIcon from "@/assets/light/web_light_rd_na@1x.png";

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
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-[#1e3a5f] rounded-full flex items-center justify-center">
              <UserPlus className="h-7 w-7 text-[#c8a97e]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Create Account</h1>
          <p className="text-gray-500 mt-2">Join TilesGallery today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
            <div className="input input-bordered flex items-center gap-2 w-full">
              <Person className="h-4 w-4 opacity-50" />
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                required
                className="grow bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="input input-bordered flex items-center gap-2 w-full">
              <Envelope className="h-4 w-4 opacity-50" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="grow bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Photo URL</label>
            <div className="input input-bordered flex items-center gap-2 w-full">
              <LinkIcon className="h-4 w-4 opacity-50" />
              <input
                type="url"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                className="grow bg-transparent outline-none"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Optional profile image link</p>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="input input-bordered flex items-center gap-2 w-full">
              <Lock className="h-4 w-4 opacity-50" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                required
                minLength={6}
                className="grow bg-transparent outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters with 1 uppercase and 1 number</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1e3a5f] text-white font-semibold hover:bg-[#2d5a8e]"
            size="lg"
            isLoading={loading}
            startContent={<Check className="h-4 w-4" />}
          >
            Register
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <img src={googleIcon.src} alt="Google" width={20} height={20} />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1e3a5f] font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </Card>
    </div>
  );
}