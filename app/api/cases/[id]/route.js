import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = params;

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid case ID" }, { status: 400 });
    }

    // Fetch case details with projection to return only necessary fields
    const caseDetails = await db.collection("cases").findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          _id: 1,
          title: 1,
          clientName: 1,
          contactInfo: 1,
          caseType: 1,
          description: 1,
          assignedLawyer: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      }
    );

    // If no case is found, return a 404 response
    if (!caseDetails) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json(caseDetails);
  } catch (error) {
    console.error("Error fetching case details:", error);
    return NextResponse.json(
      { error: "Failed to fetch case details" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = params;
    const updatedData = await req.json();

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid case ID" }, { status: 400 });
    }

    // Update the case in the database
    const result = await db.collection("cases").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData, $currentDate: { updatedAt: true } }
    );

    // If no case is updated, return a 404 response
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Case updated successfully" });
  } catch (error) {
    console.error("Error updating case details:", error);
    return NextResponse.json(
      { error: "Failed to update case details" },
      { status: 500 }
    );
  }
}
