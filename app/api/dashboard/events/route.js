import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();

    // Calculate the start and end of the current day in UTC
    const now = new Date();
    const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const endOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

    console.log("Start of Day (UTC):", startOfDayUTC);
    console.log("End of Day (UTC):", endOfDayUTC);

    // Fetch events for the current day
    const events = await db.collection("events").find({
      eventDate: {
        $gte: startOfDayUTC,
        $lte: endOfDayUTC,
      },
    }).toArray();

    console.log("Raw events fetched from database:", events);

    // Transform events to a simplified structure
    const eventDetails = events.map(event => ({
      id: event._id.toString(), // Convert ObjectId to string
      title: event.eventName || "Untitled Event",
      description: event.description || "No description provided",
      date: event.eventDate, // Already in ISO format
      location: event.location || "No location specified",
    }));

    console.log("Transformed and filtered events:", eventDetails);

    return NextResponse.json(eventDetails);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
