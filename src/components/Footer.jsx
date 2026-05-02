import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle, Rss, Camera, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="TilesGallery" width={40} height={40} className="rounded" />
              <span className="font-bold text-xl text-[#c8a97e]">TilesGallery</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover your perfect aesthetic with our premium collection of tiles. Quality materials, stunning designs, and expert craftsmanship.
            </p>
          </div>

          <div>
            <h3 className="text-[#c8a97e] font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-[#c8a97e] transition-colors text-sm">Home</Link></li>
              <li><Link href="/all-tiles" className="text-gray-300 hover:text-[#c8a97e] transition-colors text-sm">All Tiles</Link></li>
              <li><Link href="/my-profile" className="text-gray-300 hover:text-[#cui97e] transition-colors text-sm">My Profile</Link></li>
              <li><Link href="/login" className="text-gray-300 hover:text-[#c8a97e] transition-colors text-sm">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#c8a97e] font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-[#c8a97e]" /> info@tilesgallery.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-[#c8a97e]" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-[#c8a97e]" /> 123 Tile St, Design City
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#c8a97e] font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-[#2d5a8e] hover:bg-[#c8a97e] hover:text-[#1e3a5f] flex items-center justify-center text-white transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2d5a8e] hover:bg-[#c8a97e] hover:text-[#1e3a5f] flex items-center justify-center text-white transition-colors">
                <Rss className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2d5a8e] hover:bg-[#c8a97e] hover:text-[#1e3a5f] flex items-center justify-center text-white transition-colors">
                <Camera className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#2d5a8e] hover:bg-[#c8a97e] hover:text-[#1e3a5f] flex items-center justify-center text-white transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} TilesGallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}