import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
// import bcrypt from "bcryptjs";

export async function PUT(req) {
  const { db } = await connectToDatabase();
  try {
    const { userId, currentPassword, newPassword } = await req.json();

    const user = await db.collection("users").findOne({ userId });

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return NextResponse.json({ error: "Invalid current password." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.collection("users").updateOne({ userId }, { $set: { password: hashedPassword } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error updating password." }, { status: 500 });
  }
}
