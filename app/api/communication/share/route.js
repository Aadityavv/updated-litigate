import { connectToDatabase } from "../../../../lib/db";

export async function POST(req) {
    const { db } = await connectToDatabase();
    const document = await req.json();
    const result = await db.collection("sharedDocuments").insertOne(document);
    return NextResponse.json({ message: "Document shared successfully", result });
}
