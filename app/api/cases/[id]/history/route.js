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

    // Fetch case history
    const history = await db
      .collection("history")
      .find({ caseId: new ObjectId(id) })
      .toArray();

    return NextResponse.json({ caseId: id, history });
  } catch (error) {
    console.error("Error fetching case history:", error);
    return NextResponse.json(
      { error: "Failed to fetch case history" },
      { status: 500 }
    );
  }
}
