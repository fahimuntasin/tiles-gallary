"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, Spinner } from "@heroui/react";
import { ArrowLeft, Ruler, Gem, Layers, DollarSign } from "lucide-react";
import { ShieldCheck, CircleCheck } from "@gravity-ui/icons";

export default function TileDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tiles`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((t) => t.id === params.id);
        setTile(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tile) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-500 mb-4">Tile Not Found</h2>
          <p className="text-gray-400 mb-6">The tile you are looking for does not exist.</p>
          <Link
            href="/all-tiles"
            className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#2d5a8e] min-w-[180px] h-12 px-6 rounded-lg justify-center font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Tiles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh]">
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{tile.title}</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square rounded-xl overflow-hidden shadow-lg relative">
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-block bg-[#c8a97e]/20 text-[#1e3a5f] font-semibold text-sm px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider">
              {tile.category}
            </span>

            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">{tile.title}</h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">{tile.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="p-4 flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-[#c8a97e]" />
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-semibold text-[#1e3a5f]">${tile.price} {tile.currency}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center gap-3">
                <Ruler className="h-5 w-5 text-[#c8a97e]" />
                <div>
                  <p className="text-xs text-gray-500">Dimensions</p>
                  <p className="font-semibold text-[#1e3a5f]">{tile.dimensions}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center gap-3">
                <Layers className="h-5 w-5 text-[#c8a97e]" />
                <div>
                  <p className="text-xs text-gray-500">Material</p>
                  <p className="font-semibold text-[#1e3a5f]">{tile.material}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center gap-3">
                {tile.inStock ? (
                  <CircleCheck className="h-5 w-5 text-green-500" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-red-400" />
                )}
                <div>
                  <p className="text-xs text-gray-500">Availability</p>
                  <p className={`font-semibold ${tile.inStock ? "text-green-600" : "text-red-500"}`}>
                    {tile.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </Card>
            </div>

            {tile.tags && tile.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tile.tags.map((tag) => (
                    <span key={tag} className="bg-[#1e3a5f]/10 text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/all-tiles"
              className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white hover:bg-[#2d5a8e] min-w-[180px] h-12 px-6 rounded-lg justify-center font-semibold transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse More Tiles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}