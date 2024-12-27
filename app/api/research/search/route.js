import { connectToDatabase } from "../../../../lib/db";

export async function GET(req) {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const results = await db
        .collection("cases")
        .find({ $text: { $search: query } })
        .toArray();
    return NextResponse.json({ query, results });
}
