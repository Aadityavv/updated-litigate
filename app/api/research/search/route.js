export const dynamic = 'force-dynamic';

import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url, "http://localhost");
    const query = searchParams.get("q");

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Search query cannot be empty." },
        { status: 400 }
      );
    }

    console.log("Performing search for query:", query);

    const results = await db
      .collection("cases")
      .find({ $text: { $search: query } })
      .toArray();

    if (!results.length) {
      console.warn("No search results found for query:", query);
      return NextResponse.json([]);
    }

    const transformedResults = results.map((result) => ({
      id: result._id.toString(),
      title: result.title || "Untitled Case",
      description: result.description || "No description available",
      content: result.content || "No content available",
    }));

    return NextResponse.json({ query, results: transformedResults });
  } catch (error) {
    console.error("Error performing search:", error);
    return NextResponse.json(
      { error: "Failed to perform search operation." },
      { status: 500 }
    );
  }
}
