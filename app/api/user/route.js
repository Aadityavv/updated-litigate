import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();

    // Fetch the user from the database
    const user = await db.collection("users").findOne({}); // Modify query as needed (e.g., { userId: <some-id> })

    // Handle case where no user is found
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prepare and return the user data
    const userData = {
      name: user.name,
      email: user.email, // Include additional fields if necessary
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
