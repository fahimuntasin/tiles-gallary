"use client";

import { useEffect, useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Envelope, Calendar, Shield } from "@gravity-ui/icons";
import { Edit, UserIcon } from "lucide-react";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#1e3a5f]"></span>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-[#1e3a5f]/5 to-[#c8a97e]/10">
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#c8a97e] flex-shrink-0">
              {user.image ? (
                <Image src={user.image} alt={user.name || "User"} width={96} height={96} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#2d5a8e] flex items-center justify-center">
                  <UserIcon className="h-12 w-12 text-[#c8a97e]" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.name || "User"}</h1>
              <p className="text-gray-200 mt-1">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">Profile Information</h2>
            <Link
              href="/update-profile"
              className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#2d5a8e] px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              <Edit className="h-4 w-4" />
              Update Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <UserIcon className="h-5 w-5 text-[#1e3a5f]" />
                <span className="text-sm font-medium text-gray-500">Full Name</span>
              </div>
              <p className="text-lg font-semibold text-[#1e3a5f]">{user.name || "Not provided"}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Envelope className="h-5 w-5 text-[#1e3a5f]" />
                <span className="text-sm font-medium text-gray-500">Email Address</span>
              </div>
              <p className="text-lg font-semibold text-[#1e3a5f]">{user.email}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-[#1e3a5f]" />
                <span className="text-sm font-medium text-gray-500">Account Status</span>
              </div>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-[#1e3a5f]" />
                <span className="text-sm font-medium text-gray-500">Profile Image</span>
              </div>
              <p className="text-lg font-semibold text-[#1e3a5f]">{user.image ? "Uploaded" : "Not provided"}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">Profile Picture</h3>
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#c8a97e]/30 flex-shrink-0">
                {user.image ? (
                  <Image src={user.image} alt={user.name || "User"} width={112} height={112} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#1e3a5f] flex items-center justify-center">
                    <UserIcon className="h-14 w-14 text-[#c8a97e]" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-500 text-sm">Your profile picture is visible to other users.</p>
                <Link
                  href="/update-profile"
                  className="text-[#c8a97e] font-medium text-sm hover:underline mt-1 inline-block"
                >
                  Change profile picture →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}