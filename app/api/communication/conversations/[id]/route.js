import { connectToDatabase } from "@/lib/db"; // Your MongoDB connection
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid conversation ID" }, { status: 400 });
  }

  const { db } = await connectToDatabase();
  const conversation = await db.collection("conversations").findOne({ _id: new ObjectId(id) });

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  return NextResponse.json(conversation);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, participants } = await req.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid conversation ID" }, { status: 400 });
  }

  const { db } = await connectToDatabase();
  const result = await db
    .collection("conversations")
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, participants } });

  if (result.modifiedCount === 0) {
    return NextResponse.json({ error: "Conversation not updated" }, { status: 500 });
  }

  return NextResponse.json({ message: "Conversation updated successfully" });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid conversation ID" }, { status: 400 });
  }

  const { db } = await connectToDatabase();
  await db.collection("conversations").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ message: "Conversation deleted successfully" });
}
