export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();

    const { searchParams } = new URL(req.url, "http://localhost"); // Ensure a default base URL
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date query parameter is required" },
        { status: 400 }
      );
    }

    const selectedDate = new Date(dateParam);
    const startOfDayUTC = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 0, 0, 0, 0));
    const endOfDayUTC = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 23, 59, 59, 999));

    console.log("Fetching events between:", startOfDayUTC, "and", endOfDayUTC);

    const events = await db
      .collection("events")
      .find({
        eventDate: {
          $gte: startOfDayUTC,
          $lte: endOfDayUTC,
        },
      })
      .toArray();

    if (!events.length) {
      console.warn("No events found for the specified date range.");
      return NextResponse.json([]);
    }

    const eventDetails = events.map((event) => ({
      id: event._id.toString(),
      title: event.eventName || "Untitled Event",
      description: event.description || "No description provided",
      date: event.eventDate,
      location: event.location || "No location specified",
    }));

    console.log("Transformed events:", eventDetails);

    return NextResponse.json(eventDetails);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
