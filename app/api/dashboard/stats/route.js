import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    // Establish database connection
    const { db } = await connectToDatabase();

    // Get the current date and last month's date
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);

    console.log("Last month date:", lastMonthDate);

    // Fetch overall statistics with detailed data
    const totalCases = await db.collection("cases").countDocuments();
    const totalCasesDetails = await db.collection("cases").find({}).project({
      caseId: 1,
      title: 1,
      status: 1,
      createdAt: 1, // Include createdAt for filtering by last month
    }).toArray();

    // Fetch all pending cases
    const pendingCases = await db.collection("cases").countDocuments({
      status: { $in: ["pending", "Pending", "Active", "active"] },
    });
    const pendingCasesDetails = await db.collection("cases").find({
      status: { $in: ["pending", "Pending", "Active", "active"] },
    }).project({
      caseId: 1,
      title: 1,
      status: 1,
      deadline: 1, // Include deadline for filtering overdue cases
    }).toArray();

    // Fetch overdue pending cases (deadline less than the current date)
    const overduePendingCasesCount = await db.collection("cases").countDocuments({
      status: { $in: ["pending", "Pending", "Active", "active"] },
      deadline: { $lt: currentDate }, // Deadline is past due
    });

    console.log("Overdue pending cases count:", overduePendingCasesCount);

    const overduePendingCasesDetails = await db.collection("cases").find({
      status: { $in: ["pending", "Pending", "Active", "active"] },
      deadline: { $lt: currentDate }, // Deadline is past due
    }).project({
      caseId: 1,
      title: 1,
      status: 1,
      deadline: 1,
    }).toArray();

    // Fetch resolved cases
    const resolvedCases = await db.collection("cases").countDocuments({
      status: { $in: ["resolved", "Resolved", "closed", "Closed"] },
    });
    const resolvedCasesDetails = await db.collection("cases").find({
      status: { $in: ["resolved", "Resolved", "closed", "Closed"] },
    }).project({
      caseId: 1,
      title: 1,
      status: 1,
      updatedAt: 1, // Include updatedAt for filtering by last month
    }).toArray();

    // Fetch stats for last month's changes
    const totalCasesLastMonth = await db.collection("cases").countDocuments({
      createdAt: { $gte: lastMonthDate, $lt: currentDate },
    });

    const pendingCasesLastMonth = await db.collection("cases").countDocuments({
      status: { $in: ["pending", "Pending", "Active", "active"] },
      updatedAt: { $gte: lastMonthDate, $lt: currentDate },
    });

    console.log("Pending cases last month:", pendingCasesLastMonth);

    const resolvedCasesLastMonth = await db.collection("cases").countDocuments({
      status: { $in: ["resolved", "Resolved", "closed", "Closed"] },
      updatedAt: { $gte: lastMonthDate, $lt: currentDate },
    });
    console.log("Resolved Cases Last Month: ", resolvedCasesLastMonth)
    // Query for upcoming deadlines within the next 7 days
    const upcomingDeadlinesQuery = {
      deadline: {
        $gte: currentDate,
        $lt: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    };
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
      totalCasesChange: totalCasesLastMonth,
      pendingCases,
      pendingCasesChange: pendingCases - pendingCasesLastMonth,
      overduePendingCasesCount,
      resolvedCases,
      resolvedCasesChange: resolvedCases - resolvedCasesLastMonth,
      upcomingDeadlines: upcomingDeadlinesCount,
      totalCasesDetails,
      pendingCasesDetails,
      overduePendingCasesDetails,
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
