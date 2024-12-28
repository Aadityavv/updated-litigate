import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();

    // Get the current date
    const currentDate = new Date();

    // Fetch overall statistics with detailed data
    const totalCases = await db.collection("cases").countDocuments();
    const totalCasesDetails = await db.collection("cases").find({}).project({
      caseId: 1,
      title: 1,
      status: 1,
    }).toArray();

    const pendingCases = await db.collection("cases").countDocuments({
      status: { $in: ["pending", "Pending", "Active", "active"] },
    });
    const pendingCasesDetails = await db.collection("cases").find({
      status: { $in: ["pending", "Pending", "Active", "active"] },
    }).project({
      caseId: 1,
      title: 1,
      status: 1,
    }).toArray();

    const resolvedCases = await db.collection("cases").countDocuments({
      status: { $in: ["resolved", "Resolved", "closed", "Closed"] },
    });
    const resolvedCasesDetails = await db.collection("cases").find({
      status: { $in: ["resolved", "Resolved", "closed", "Closed"] },
    }).project({
      caseId: 1,
      title: 1,
      status: 1,
    }).toArray();

    // Query for upcoming deadlines
    const upcomingDeadlinesQuery = { deadline: { $gte: currentDate } };
    const upcomingDeadlinesCount = await db
      .collection("cases")
      .countDocuments(upcomingDeadlinesQuery);

    const upcomingDeadlineDetails = await db
      .collection("cases")
      .find(upcomingDeadlinesQuery)
      .project({
        caseId: 1,
        title: 1,
        deadline: 1,
        clientName: 1,
        status: 1,
      })
      .toArray();

    // Prepare response
    const stats = {
      totalCases,
      pendingCases,
      resolvedCases,
      upcomingDeadlines: upcomingDeadlinesCount,
      totalCasesDetails,
      pendingCasesDetails,
      resolvedCasesDetails,
      upcomingDeadlineDetails,
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
