import { connectToDatabase } from "../../../../lib/db";

export async function PUT(req) {
    const { db } = await connectToDatabase();
    const preferences = await req.json();
    const result = await db.collection("settings").updateOne(
        { type: "preferences" },
        { $set: preferences },
        { upsert: true }
    );
    return NextResponse.json({ message: "Preferences updated successfully", result });
}
