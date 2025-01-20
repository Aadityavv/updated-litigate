import { connectToDatabase } from "@/lib/db";

export async function PUT(req, { params }) {
    const { db } = await connectToDatabase();
    const { id } = params;
    const result = await db.collection("feedback").updateOne(
        { _id: id },
        { $set: { resolved: true } }
    );
    return NextResponse.json({ message: `Feedback ${id} resolved successfully`, result });
}
