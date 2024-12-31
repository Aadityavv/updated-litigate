import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(req) {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();

    // Get the date query parameter from the request URL
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date query parameter is required" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(dateParam);

    // Calculate the start and end of the selected day in UTC
    const startOfDayUTC = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 0, 0, 0, 0));
    const endOfDayUTC = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 23, 59, 59, 999));

    console.log("Start of Day (UTC):", startOfDayUTC);
    console.log("End of Day (UTC):", endOfDayUTC);

    // Fetch events for the selected day
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
