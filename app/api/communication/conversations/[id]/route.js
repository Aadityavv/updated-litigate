import { connectToDatabase } from "../../../../../lib/db";

export async function GET(req, { params }) {
    const { db } = await connectToDatabase();
    const { id } = params;
    const conversation = await db.collection("conversations").findOne({ _id: id });
    if (!conversation) {
        return NextResponse.json({ error: `Conversation with ID ${id} not found.` }, { status: 404 });
    }
    return NextResponse.json(conversation);
}
