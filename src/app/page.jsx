"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Spinner } from "@heroui/react";
import { ArrowRight, Search } from "lucide-react";
import { Tag, Layers, Gem } from "@gravity-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
      <section className="relative bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] text-white py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your <span className="text-[#c8a97e]">Perfect Aesthetic</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of premium tiles designed to transform your spaces into works of art.
          </p>
          <Button
            as={Link}
            href="/all-tiles"
            size="lg"
            className="bg-[#c8a97e] text-[#1e3a5f] font-semibold hover:bg-[#dfc9a8]"
            endContent={<ArrowRight className="h-5 w-5" />}
          >
            Browse Now
          </Button>
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
            {featuredTiles.map((tile) => (
              <Card key={tile.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1e3a5f] text-lg mb-1">{tile.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tile.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#c8a97e] font-bold">${tile.price}</span>
                    <Button
                      as={Link}
                      href={`/tile/${tile.id}`}
                      size="sm"
                      className="bg-[#1e3a5f] text-white hover:bg-[#2d5a8e]"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gradient-to-r from-[#1e3a5f]/10 to-[#c8a97e]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#c8a97e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="h-7 w-7 text-[#1e3a5f]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Premium Quality</h3>
              <p className="text-gray-500 text-sm">Only the finest materials sourced from trusted manufacturers worldwide</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#c8a97e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="h-7 w-7 text-[#1e3a5f]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Custom Sizes</h3>
              <p className="text-gray-500 text-sm">Available in various dimensions to fit any space perfectly</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#c8a97e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="h-7 w-7 text-[#1e3a5f]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">Best Prices</h3>
              <p className="text-gray-500 text-sm">Competitive pricing without compromising on quality or design</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">Ready to Transform Your Space?</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">Browse our full collection and find the perfect tiles for your project</p>
        <Button
          as={Link}
          href="/all-tiles"
          size="lg"
          className="bg-[#1e3a5f] text-white font-semibold hover:bg-[#2d5a8e]"
          endContent={<Search className="h-5 w-5" />}
        >
          Explore All Tiles
        </Button>
      </section>
    </div>
  );
}