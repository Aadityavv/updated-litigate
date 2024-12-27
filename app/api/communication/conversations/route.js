import { connectToDatabase } from "../../../../lib/db";

export async function GET(req) {
    const { db } = await connectToDatabase();
    const conversations = await db.collection("conversations").find().toArray();
    return NextResponse.json(conversations);
}
