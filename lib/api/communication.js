export const fetchConversationById = async (id) => {
    const response = await fetch(`/api/communication/conversations/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch conversation with ID ${id}`);
    }
    return response.json();
  };
  