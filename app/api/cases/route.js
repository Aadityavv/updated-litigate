import { NextResponse } from "next/server"; // Import NextResponse only once


// // Sample data for cases (replace this with actual database query logic)
// const cases = [
//   { id: 1, title: "Smith v. Jones", status: "Active", deadline: "2023-07-15", isPinned: false },
//   { id: 2, title: "Johnson LLC Merger", status: "Pending", deadline: "2023-08-01", isPinned: false },
//   { id: 3, title: "Doe v. Acme Corp", status: "Closed", deadline: "2023-06-10", isPinned: false },
// ];

// // Handle GET requests to fetch all cases
// export async function GET() {
//   try {
//     return NextResponse.json(cases); // Return the sample cases as JSON
//   } catch (error) {
//     console.error("Error fetching cases:", error);
//     return NextResponse.json({ error: "Failed to fetch cases" }, { status: 500 });
//   }
// }



//MOCK DATA UPWARDS, DYNAMIC DATA DOWNWARDS



import { connectToDatabase } from "@/lib/db"; // Import database connection logic


export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase();

    // Fetch cases from the "cases" collection
    const cases = await db.collection("cases").find({}).toArray();

    // Format the cases
    const formattedCases = cases.map((caseItem) => ({
      id: caseItem._id.toString(), // Convert MongoDB ObjectId to string
      title: caseItem.title,
      status: caseItem.status,
      deadline: caseItem.deadline,
      isPinned: caseItem.isPinned || false, // Default to false if not set
    }));

    // Return the cases as JSON
    return NextResponse.json(formattedCases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
}
