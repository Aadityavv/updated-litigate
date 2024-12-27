import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const { db } = await connectToDatabase();
    const notes = await db.collection("notes").find({ caseId: id }).toArray();
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching case notes:", error);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = params;
  try {
    const { db } = await connectToDatabase();
    const note = await req.json();
    const result = await db.collection("notes").insertOne({ ...note, caseId: id });
    return NextResponse.json({ message: "Note added successfully", result });
  } catch (error) {
    console.error("Error adding note:", error);
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}
