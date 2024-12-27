import { connectToDatabase } from "../../../../lib/db";

export async function GET(req) {
    const { db } = await connectToDatabase();
    const dashboardData = await db.collection("dashboard").findOne({});
    return NextResponse.json(dashboardData);
}
