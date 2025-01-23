export const fetchConversationById = async (id) => {
  const response = await fetch(`https://dummy-backend-15jt.onrender.com/communication/conversations/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch conversation with ID ${id}`);
  }
  return response.json();
};
