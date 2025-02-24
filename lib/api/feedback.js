export const submitFeedback = async (feedbackData) => {
  const response = await fetch('https://dummy-backend-15jt.onrender.com/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedbackData),
  });
  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }
  return response.json();
};