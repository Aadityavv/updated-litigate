import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await connectToDatabase();
  const messages = await db.collection("messages").find().toArray();

  return NextResponse.json(messages);
}

export async function POST(req) {
  const { conversationId, sender, content } = await req.json();

  const { db } = await connectToDatabase();
  const result = await db
    .collection("messages")
    .insertOne({ conversationId, sender, content, timestamp: new Date() });

  return NextResponse.json({ message: "Message sent successfully", id: result.insertedId });
}
