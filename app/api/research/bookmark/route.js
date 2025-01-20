import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
    const { db } = await connectToDatabase();
    const bookmark = await req.json();
    const result = await db.collection("bookmarks").insertOne(bookmark);
    return NextResponse.json({ message: "Bookmark saved successfully", result });
}
