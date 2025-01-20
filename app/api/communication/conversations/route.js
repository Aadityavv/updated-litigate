import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await connectToDatabase();
  const conversations = await db.collection("conversations").find().toArray();

  return NextResponse.json(conversations);
}

export async function POST(req) {
  const { name, participants } = await req.json();

  const { db } = await connectToDatabase();
  const result = await db.collection("conversations").insertOne({ name, participants });

  return NextResponse.json({ message: "Conversation created successfully", id: result.insertedId });
}
