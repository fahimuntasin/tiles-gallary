import { NextResponse } from "next/server";
import tilesData from "@/../db.json";

export async function GET(request) {
  const tiles = tilesData.tiles;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  let results = [...tiles];

  if (search) {
    results = results.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    results = results.filter((t) => t.category === category);
  }

  if (limit) {
    results = results.slice(0, parseInt(limit));
  }

  return NextResponse.json(results);
}