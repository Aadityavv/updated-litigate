export const fetchCases = async () => {
  try {
    const response = await fetch('https://dummy-backend-15jt.onrender.com/?lawyerId=12345');
    console.log("Fetching cases response:", response);

    if (!response.ok) {
      console.error("Error fetching cases:", response.statusText);
      throw new Error('Failed to fetch cases');
    }

    const data = await response.json();
    console.log("Cases Data:", data);

    // Ensure response structure matches expected format
    if (data && Array.isArray(data.message)) {
      return data.message.map(case_ => ({
        id: case_.caseId,                // ✅ Renamed from `caseId`
        title: case_.caseTitle,          // ✅ Renamed from `caseTitle`
        status: case_.status,            // ✅ No change
        deadline: case_.hearingDate || "No deadline",  // ✅ Default value if null
        isPinned: false                   // ✅ Adding a default property
      }));
    } else {
      console.error("Unexpected API response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const fetchCaseById = async (caseId) => {
  try {
    const response = await fetch(`https://dummy-backend-15jt.onrender.com/caseDetails/?lawyerId=12345&caseId=${caseId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch case with ID ${caseId}`);
    }

    const data = await response.json();
    console.log(`Case Details Data for ${caseId}:`, data);

    return data;
  } catch (error) {
    console.error("Error fetching case by ID:", error);
    return null;
  }
};


