import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the incoming JSON request
    const { query, categories, sort } = body;

    // Mock database records (replace with actual database calls)
    const allResults = [
      {
        title: "Smith v. Jones (2022)",
        type: "Case Study",
        snippet: "Landmark decision on contract law...",
        link: "https://example.com/smith-v-jones",
        date: "2022-05-20",
      },
      {
        title: "Intellectual Property Act of 2021",
        type: "Law",
        snippet: "Recent legislation on patent protection...",
        link: "https://example.com/ip-act-2021",
        date: "2021-11-15",
      },
      {
        title: "The Future of AI in Legal Practice",
        type: "Article",
        snippet: "Exploring the impact of artificial intelligence...",
        link: "https://example.com/ai-legal-practice",
        date: "2022-08-10",
      },
      {
        title: "Brown v. Board of Education (1954)",
        type: "Case Study",
        snippet: "Historic civil rights case...",
        link: "https://example.com/brown-v-board",
        date: "1954-05-17",
      },
      {
        title: "Data Privacy Regulations: A Comparative Study",
        type: "Article",
        snippet: "Analysis of data protection laws across jurisdictions...",
        link: "https://example.com/data-privacy",
        date: "2022-01-30",
      },
    ];

    // Filter results based on the search query
    let filteredResults = allResults.filter((item) =>
      query
        ? item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase())
        : true
    );

    // Apply category filters if provided
    if (categories && categories.length > 0) {
      filteredResults = filteredResults.filter((item) =>
        categories.includes(item.type)
      );
    }

    // Sort results based on the selected option
    if (sort === "recency") {
      filteredResults.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return NextResponse.json({ results: filteredResults });
  } catch (error) {
    console.error("Error processing legal research request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export const GET = () =>
  NextResponse.json(
    { message: "This endpoint supports only POST requests." },
    { status: 405 }
  );
