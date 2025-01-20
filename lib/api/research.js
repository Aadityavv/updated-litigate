export const fetchBookmarkedResearch = async () => {
    const response = await fetch('/api/research/bookmarked');
    if (!response.ok) {
      throw new Error('Failed to fetch bookmarked research');
    }
    return response.json();
  };
  