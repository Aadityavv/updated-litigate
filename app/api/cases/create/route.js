import { connectToDatabase } from "../../../../lib/db";

export async function POST(req) {
    const { db } = await connectToDatabase();
    const caseDetails = await req.json();
    const result = await db.collection("cases").insertOne(caseDetails);
    return NextResponse.json({ message: "Case created successfully", result });
}
