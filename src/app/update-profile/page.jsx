"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, updateUser } from "@/lib/auth-client";
import { ArrowLeft, UserCircle } from "lucide-react";
import { Check } from "@gravity-ui/icons";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const result = await updateUser({
        name: name || undefined,
        image: image || undefined,
      });

      if (result.error) {
        setError(result.error.message || "Failed to update profile.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/my-profile");
        }, 1500);
      }
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#1e3a5f]"></span>
      </div>
    );
  }

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-[#1e3a5f]/5 to-[#c8a97e]/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/my-profile"
          className="inline-flex items-center gap-2 text-[#1e3a5f] font-medium hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center shadow-md">
                <UserCircle className="h-8 w-8 text-[#c8a97e]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#1e3a5f]">Update Profile</h1>
            <p className="text-gray-500 mt-2">Change your display name and profile picture</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium">
              Profile updated successfully! Redirecting...
            </div>
          )}

          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#c8a97e]/30">
              {image ? (
                <Image
                  src={image}
                  alt="Preview"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-[#1e3a5f] flex items-center justify-center">
                  <UserCircle className="h-14 w-14 text-[#c8a97e]" />
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#1e3a5f] mb-2">Display Name</label>
              <div className="flex items-center gap-3 w-full h-12 px-4 bg-[#f8f6f3] border-2 border-[#1e3a5f]/20 rounded-xl focus-within:border-[#c8a97e] focus-within:bg-white focus-within:shadow-sm transition-all">
                <UserCircle className="h-5 w-5 text-[#1e3a5f]/50 flex-shrink-0" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="grow bg-transparent outline-none text-base text-[#1e3a5f] placeholder:text-[#1e3a5f]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1e3a5f] mb-2">Profile Image URL</label>
              <div className="flex items-center gap-3 w-full h-12 px-4 bg-[#f8f6f3] border-2 border-[#1e3a5f]/20 rounded-xl focus-within:border-[#c8a97e] focus-within:bg-white focus-within:shadow-sm transition-all">
                <svg className="h-5 w-5 text-[#1e3a5f]/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="url"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="grow bg-transparent outline-none text-base text-[#1e3a5f] placeholder:text-[#1e3a5f]/40"
                />
              </div>
              <p className="text-xs text-[#1e3a5f]/50 mt-1.5">Paste a direct link to your profile picture</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#1e3a5f] text-white font-bold rounded-xl hover:bg-[#2d5a8e] transition-colors flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Check className="h-5 w-5" />
              )}
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}