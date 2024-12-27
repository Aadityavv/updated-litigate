import { connectToDatabase } from "../../../../lib/db";

export async function POST(req) {
    const { db } = await connectToDatabase();
    const message = await req.json();
    const result = await db.collection("messages").insertOne(message);
    return NextResponse.json({ message: "Message sent successfully", result });
}
