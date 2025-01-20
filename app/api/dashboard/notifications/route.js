import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Establishing database connection...");

    // Establish database connection
    const { db } = await connectToDatabase();
    console.log("Database connection established.");

    // Get the current date in UTC and set the start and end of the day in UTC
    const now = new Date();
    const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const endOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

    console.log("Start of Day (UTC):", startOfDayUTC);
    console.log("End of Day (UTC):", endOfDayUTC);

    // Fetch notifications from today's date from the 'notifications' collection
    console.log("Fetching notifications from the database...");
    const notifications = await db
      .collection("notifications")
      .find({
        date: {
          $gte: startOfDayUTC, // Notifications on or after the start of the day in UTC
          $lte: endOfDayUTC, // Notifications on or before the end of the day in UTC
        },
      })
      .toArray();

    console.log("Raw notifications fetched from database:", notifications);

    // Transform notifications to a simplified structure
    const notificationDetails = notifications.map(notification => {
      try {
        return {
          id: notification._id.toString(), // Convert ObjectId to string
          date: notification.date
            ? new Date(notification.date).toISOString() // Safely convert the date to ISO string
            : "Invalid date", // Fallback for missing or invalid date
          title: notification.title || "No title provided", // Fallback for missing title
          description: notification.description || "No description provided", // Fallback for missing description
        };
      } catch (error) {
        console.error("Error processing notification:", notification, error);
        return null; // Skip invalid notifications
      }
    });

    // Filter out invalid notifications (e.g., those that returned null)
    const validNotifications = notificationDetails.filter(n => n !== null);

    console.log("Transformed and filtered notifications:", validNotifications);

    return NextResponse.json(validNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
