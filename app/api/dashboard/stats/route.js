import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();

    // Fetch statistics from the 'cases' and 'deadlines' collections
    const totalCases = await db.collection("cases").countDocuments();
    const pendingCases = await db.collection("cases").countDocuments({
      status: "pending",
    });
    const resolvedCases = await db.collection("cases").countDocuments({
      status: "resolved",
    });
    const upcomingDeadlines = await db.collection("deadlines").countDocuments({
      dueDate: { $gte: new Date() },
    });

    const stats = {
      totalCases,
      pendingCases,
      resolvedCases,
      upcomingDeadlines,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
