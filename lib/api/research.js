export const fetchBookmarkedResearch = async () => {
  const response = await fetch('https://dummy-backend-15jt.onrender.com/research/bookmarked');
  if (!response.ok) {
    throw new Error('Failed to fetch bookmarked research');
  }
  return response.json();
};