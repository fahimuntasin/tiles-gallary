"use client";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="animate__animated animate__infinite animate__pulse animate__slow">
        <span className="loading loading-spinner loading-lg text-[#1e3a5f]"></span>
      </div>
      <p className="text-[#1e3a5f] mt-4 font-medium animate__animated animate__fadeIn animate__delay-1s">Loading...</p>
    </div>
  );
}