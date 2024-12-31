import { NextResponse } from "next/server";

// Mock Database (Replace this with your actual database logic)
const casesDatabase = []; // This is a mock database. Use your real database logic here.

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      caseName,
      status,
      nextHearing,
      caseType,
      clientName,
      contactEmail,
      contactPhone,
      description,
      notes,
    } = body;

    // Validate required fields
    if (
      !caseName ||
      !status ||
      !caseType ||
      !clientName ||
      !contactEmail ||
      !contactPhone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Mock case creation (Replace with actual DB insertion logic)
    const newCase = {
      id: casesDatabase.length + 1, // Generate mock ID (Replace with DB auto-increment logic)
      caseName,
      status,
      nextHearing: nextHearing || null,
      caseType,
      clientName,
      contactEmail,
      contactPhone,
      description,
      notes: notes || null,
      createdAt: new Date().toISOString(),
    };

    // Push new case to the mock database
    casesDatabase.push(newCase);

    return NextResponse.json(
      { message: "Case created successfully", case: newCase },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
