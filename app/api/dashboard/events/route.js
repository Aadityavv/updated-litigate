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
      id: event._id,
      title: event.title,
      date: event.date,
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
