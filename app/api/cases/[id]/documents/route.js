import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const { db } = await connectToDatabase();
    const documents = await db.collection("documents").find({ caseId: id }).toArray();
    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching case documents:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { id } = params;
  try {
    const { db } = await connectToDatabase();
    const document = await req.json();
    const result = await db.collection("documents").insertOne({ ...document, caseId: id });
    return NextResponse.json({ message: "Document uploaded successfully", result });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
  }
}
