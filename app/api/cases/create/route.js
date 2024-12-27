import { connectToDatabase } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { db } = await connectToDatabase();
    const caseDetails = await req.json();

    // Validate case details
    if (!caseDetails.title || !caseDetails.status || !caseDetails.deadline) {
      return NextResponse.json(
        { error: "Missing required fields: title, status, or deadline" },
        { status: 400 }
      );
    }

    // Insert case into the database
    const result = await db.collection("cases").insertOne({
      ...caseDetails,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Case created successfully",
      result: { id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
}
