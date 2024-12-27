import { connectToDatabase } from "../../../../lib/db";
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { db } = await connectToDatabase();
    const notifications = await db.collection("notifications").find().toArray();
    return NextResponse.json(notifications);
}



// MOCK

// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Mock notifications (replace this with your actual data fetching logic)
//     const notifications = [
//       {
//         timeAgo: "2 hours ago",
//         title: "John Doe updated Case #1234",
//         description: "Sent new documents to the client.",
//       },
//       {
//         timeAgo: "5 hours ago",
//         title: "Jane Smith created a new case",
//         description: "New case for corporate litigation.",
//       },
//     ];

//     return NextResponse.json(notifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch notifications" },
//       { status: 500 }
//     );
//   }
// }
