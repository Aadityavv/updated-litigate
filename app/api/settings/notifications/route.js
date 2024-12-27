import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  const { db } = await connectToDatabase();
  try {
    const notifications = await db.collection("notifications").find().toArray();
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching notifications." }, { status: 500 });
  }
}

export async function POST(req) {
  const { db } = await connectToDatabase();
  try {
    const newNotification = await req.json();
    const result = await db.collection("notifications").insertOne(newNotification);
    return NextResponse.json(result.ops[0]);
  } catch (error) {
    return NextResponse.json({ error: "Error adding notification." }, { status: 500 });
  }
}
