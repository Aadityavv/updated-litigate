import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  const { db } = await connectToDatabase();
  try {
    const preferences = await db.collection("preferences").find().toArray();
    return NextResponse.json(preferences);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching preferences." }, { status: 500 });
  }
}

export async function PUT(req) {
  const { db } = await connectToDatabase();
  try {
    const updates = await req.json();
    const { userId, ...preferences } = updates;
    const result = await db
      .collection("preferences")
      .updateOne({ userId }, { $set: preferences }, { upsert: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error updating preferences." }, { status: 500 });
  }
}
