import { connectToDatabase } from "@/lib/db";

export async function GET(req) {
    const { db } = await connectToDatabase();
    const feedbackList = await db.collection("feedback").find().toArray();
    return NextResponse.json(feedbackList);
}

export async function POST(req) {
    const { db } = await connectToDatabase();
    const feedback = await req.json();
    const result = await db.collection("feedback").insertOne(feedback);
    return NextResponse.json({ message: "Feedback submitted successfully", result });
}
