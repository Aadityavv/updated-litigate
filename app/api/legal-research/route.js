import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Establishing database connection...");

    // Establish database connection
    const { db } = await connectToDatabase();
    console.log("Database connection established.");

    // Parse the request body
    const body = await req.json();
    const { query, categories, sort } = body;

    console.log("Request body:", body);

    // Build the query dynamically based on provided filters
    const dbQuery = {};
    if (query) {
      dbQuery.$text = { $search: query }; // Assuming a text index exists
    }

    if (categories && categories.length > 0) {
      dbQuery.category = { $in: categories }; // Match any of the selected categories
    }

    // Determine sorting order
    const sortOptions = {};
    if (sort === "recency") {
      sortOptions.date = -1; // Sort by date (newest first)
    } else {
      sortOptions.relevance = -1; // Default: sort by relevance
    }

    console.log("Database query:", dbQuery);
    console.log("Sort options:", sortOptions);

    // Fetch results from the 'legal_materials' collection
    console.log("Fetching legal materials from the database...");
    const results = await db
      .collection("legal_materials")
      .find(dbQuery)
      .sort(sortOptions)
      .toArray();

    console.log("Raw results fetched from database:", results);

    // Transform the results to a simplified structure
    const transformedResults = results.map((item) => ({
      id: item._id.toString(), // Convert ObjectId to string
      title: item.title || "No title provided", // Fallback for missing title
      snippet: item.description || "No description available", // Fallback for missing description
      type: item.category || "Unknown", // Fallback for missing category
      date: item.date
        ? new Date(item.date).toISOString()
        : "Invalid date", // Fallback for missing or invalid date
      link: item.link || "#", // Fallback for missing link
    }));

    console.log("Transformed results:", transformedResults);

    return NextResponse.json({ results: transformedResults });
  } catch (error) {
    console.error("Error fetching legal materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch legal materials" },
      { status: 500 }
    );
  }
}
