import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await connectToDatabase();
  const files = await db.collection("shared_files").find().toArray();

  return NextResponse.json(files);
}

export async function POST(req) {
  const { name, uploadedBy, conversationId } = await req.json();

  const { db } = await connectToDatabase();
  const result = await db
    .collection("shared_files")
    .insertOne({ name, uploadedBy, conversationId, timestamp: new Date() });

  return NextResponse.json({ message: "File metadata saved successfully", id: result.insertedId });
}
