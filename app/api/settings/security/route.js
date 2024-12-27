import { connectToDatabase } from "../../../../lib/db";

export async function GET(req) {
    const { db } = await connectToDatabase();
    const securitySettings = await db.collection("settings").findOne({ type: "security" });
    return NextResponse.json(securitySettings);
}
