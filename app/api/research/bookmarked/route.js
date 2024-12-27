import { connectToDatabase } from "../../../../lib/db";

export async function GET(req) {
    const { db } = await connectToDatabase();
    const bookmarkedResources = await db.collection("bookmarks").find().toArray();
    return NextResponse.json(bookmarkedResources);
}
