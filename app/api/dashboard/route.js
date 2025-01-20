import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();

    // Fetch data from the 'dashboard' collection
    const dashboardData = await db.collection("dashboard").findOne({});

    // Return JSON response
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
