import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();

    // Fetch events from the 'events' collection
    const events = await db.collection("events").find({}).toArray();

    // Transform events to a simplified structure
    const eventDetails = events.map(event => ({
      id: event._id.toString(), // Convert ObjectId to string
      title: event.title,
      description: event.description || "No description provided", // Include description if available
      date: new Date(event.date).toISOString(), // Ensure date is in ISO format
      location: event.location || "No location specified", // Add location if available
    }));

    return NextResponse.json(eventDetails);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
