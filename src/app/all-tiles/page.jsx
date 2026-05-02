"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Spinner } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { Magnifier } from "@gravity-ui/icons";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [filteredTiles, setFilteredTiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tiles")
      .then((res) => res.json())
      .then((data) => {
        setTiles(data);
        setFilteredTiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredTiles(tiles);
    } else {
      const q = search.toLowerCase();
      setFilteredTiles(
        tiles.filter((t) => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
      );
    }
  }, [search, tiles]);

  return (
    <div className="min-h-[70vh]">
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tile Collection</h1>
          <p className="text-gray-200 mb-8 max-w-xl mx-auto">Browse our curated collection of premium tiles for every style and space</p>

          <div className="max-w-xl mx-auto relative">
            <div className="input input-bordered flex items-center gap-2 w-full bg-white text-gray-800 text-lg h-14">
              <Magnifier className="h-5 w-5 opacity-50 ml-1" />
              <input
                type="text"
                placeholder="Search tiles by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="grow bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 mr-2">
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : filteredTiles.length === 0 ? (
          <div className="text-center py-20">
            <Magnifier className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-500 mb-2">No tiles found</h2>
            <p className="text-gray-400 mb-6">Try a different search term</p>
            <Link
              href="/all-tiles"
              className="inline-flex items-center justify-center bg-[#1e3a5f] text-white hover:bg-[#2d5a8e] min-w-[160px] h-11 px-6 rounded-lg font-medium transition-colors"
            >
              Clear Search
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing {filteredTiles.length} tile{filteredTiles.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTiles.map((tile) => (
                <Card key={tile.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!tile.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-[#c8a97e] uppercase tracking-wider">{tile.category}</span>
                    <h3 className="font-semibold text-[#1e3a5f] text-lg mt-1 mb-1">{tile.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tile.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1e3a5f] font-bold text-lg">${tile.price}</span>
                      <Link
                        href={`/tile/${tile.id}`}
                        className="inline-flex items-center justify-center gap-1 bg-[#1e3a5f] text-white hover:bg-[#2d5a8e] min-w-[100px] h-10 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}