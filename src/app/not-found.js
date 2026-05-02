import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#1e3a5f]/5 to-[#c8a97e]/10">
      <div className="text-center px-4">
        <h1 className="text-9xl font-black text-[#1e3a5f]">404</h1>
        <div className="w-24 h-1 bg-[#c8a97e] mx-auto my-6 rounded-full"></div>
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#2d5a8e] px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}