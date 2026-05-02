"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, Spinner } from "@heroui/react";
import { ArrowRight, Search } from "lucide-react";
import { Tag, Layers, Gem } from "@gravity-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useSpring, animated } from "react-spring";
import "swiper/css";

function AnimatedCard({ tile, index }) {
  const [props] = useSpring(() => ({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: index * 200,
    config: { mass: 1, tension: 120, friction: 14 },
  }));

  return (
    <animated.div style={props} className="h-full">
      <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-square overflow-hidden relative">
          <Image src={tile.image} alt={tile.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-[#1e3a5f] text-lg mb-1">{tile.title}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tile.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[#c8a97e] font-bold">${tile.price}</span>
            <Link
              href={`/tile/${tile.id}`}
              className="inline-flex items-center justify-center bg-[#1e3a5f] text-white hover:bg-[#2d5a8e] min-w-[120px] h-10 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </Card>
    </animated.div>
  );
}

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tiles")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedTiles(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/banner.jpg" alt="Tiles Gallery Banner" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-[#1e3a5f]/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your <span className="text-[#c8a97e]">Perfect Aesthetic</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of premium tiles designed to transform your spaces into works of art.
          </p>
          <Link
            href="/all-tiles"
            className="inline-flex items-center gap-2 bg-[#c8a97e] text-[#1e3a5f] font-semibold hover:bg-[#dfc9a8] min-w-[180px] h-12 px-6 rounded-lg justify-center transition-colors text-lg"
          >
            Browse Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="bg-[#1e3a5f] py-3 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          <SwiperSlide>
            <p className="text-center text-white text-sm md:text-base py-1">
              🔥 New Arrivals: Ceramic Blue Tile | Weekly Feature: Modern Geometric Patterns | Join the Community!
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-center text-white text-sm md:text-base py-1">
              ✨ Premium Marble Collection Available Now | Free Shipping on Orders Over $100
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-center text-white text-sm md:text-base py-1">
              🎨 Terracotta Rustic Tiles - Handcrafted Excellence | Limited Stock Available
            </p>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Featured Tiles</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Handpicked selections from our premium collection to inspire your next project</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTiles.map((tile, index) => (
              <AnimatedCard key={tile.id} tile={tile} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#c8a97e] text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-4">What Makes Us Different</h2>
            <div className="w-20 h-1 bg-[#c8a97e] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white border border-gray-100 rounded-2xl p-8 text-center hover:border-[#c8a97e]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-8 w-8 text-[#c8a97e]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 mt-6">Premium Quality</h3>
              <p className="text-gray-500 leading-relaxed">Only the finest materials sourced from trusted manufacturers worldwide for lasting beauty</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-[#c8a97e] font-medium text-sm">Learn more →</span>
              </div>
            </div>
            <div className="group relative bg-white border border-gray-100 rounded-2xl p-8 text-center hover:border-[#c8a97e]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Gem className="h-8 w-8 text-[#c8a97e]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 mt-6">Custom Sizes</h3>
              <p className="text-gray-500 leading-relaxed">Available in various dimensions to fit any space perfectly, tailored to your vision</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-[#c8a97e] font-medium text-sm">Learn more →</span>
              </div>
            </div>
            <div className="group relative bg-white border border-gray-100 rounded-2xl p-8 text-center hover:border-[#c8a97e]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Tag className="h-8 w-8 text-[#c8a97e]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 mt-6">Best Prices</h3>
              <p className="text-gray-500 leading-relaxed">Competitive pricing without compromising on quality or design, value guaranteed</p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-[#c8a97e] font-medium text-sm">Learn more →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Ready to Transform Your Space?</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">Browse our full collection and find the perfect tiles for your project</p>
        <Link
          href="/all-tiles"
          className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white font-semibold hover:bg-[#2d5a8e] min-w-[200px] h-12 px-6 rounded-lg justify-center transition-colors text-lg"
        >
          Explore All Tiles
          <Search className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}