import { connectToDatabase } from "@/lib/db";

export async function GET(req, { params }) {
    const { db } = await connectToDatabase();
    const { id } = params;
    const caseDetails = await db.collection("cases").findOne({ _id: id });
    if (!caseDetails) {
        return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }
    return NextResponse.json(caseDetails);
}
