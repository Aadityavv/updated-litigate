import { connectToDatabase } from "../../../../../lib/db";

export async function GET(req, { params }) {
    const { db } = await connectToDatabase();
    const { id } = params;
    const history = await db.collection("history").find({ caseId: id }).toArray();
    return NextResponse.json({ caseId: id, history });
}
