import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Fetch all bookmarked resources
    const bookmarkedResources = await db.collection("bookmarks").find().toArray();

    if (!bookmarkedResources || bookmarkedResources.length === 0) {
      console.warn("No bookmarks found in the database.");
      return NextResponse.json([]);
    }

    // Transform data if needed (e.g., converting `_id` to string)
    const transformedBookmarks = bookmarkedResources.map((bookmark) => ({
      id: bookmark._id.toString(), // Convert MongoDB ObjectId to string
      title: bookmark.title || "Untitled Resource",
      url: bookmark.url || "No URL specified",
      description: bookmark.description || "No description available",
    }));

    console.log("Fetched bookmarks:", transformedBookmarks);

    return NextResponse.json(transformedBookmarks);
  } catch (error) {
    console.error("Error fetching bookmarked resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarked resources" },
      { status: 500 }
    );
  }
}
