import { NextResponse } from "next/server";
import tilesData from "@/../db.json";

export async function GET(request, { params }) {
  const { id } = params;
  const tile = tilesData.tiles.find((t) => t.id === id);

  if (!tile) {
    return NextResponse.json({ error: "Tile not found" }, { status: 404 });
  }

  return NextResponse.json(tile);
}