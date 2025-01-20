export const fetchCases = async () => {
    const response = await fetch('/api/cases');
    if (!response.ok) {
      throw new Error('Failed to fetch cases');
    }
    return response.json();
  };
  
  export const fetchCaseById = async (id) => {
    const response = await fetch(`/api/cases/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch case with ID ${id}`);
    }
    return response.json();
  };
  