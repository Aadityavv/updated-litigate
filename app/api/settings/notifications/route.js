import { connectToDatabase } from "../../../../lib/db";

export async function PUT(req) {
    const { db } = await connectToDatabase();
    const settings = await req.json();
    const result = await db.collection("settings").updateOne(
        { type: "notifications" },
        { $set: settings },
        { upsert: true }
    );
    return NextResponse.json({ message: "Notification settings updated", result });
}
