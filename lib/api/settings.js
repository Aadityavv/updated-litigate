export const updateSettings = async (settingsData) => {
  const response = await fetch('https://dummy-backend-15jt.onrender.com/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settingsData),
  });
  if (!response.ok) {
    throw new Error('Failed to update settings');
  }
  return response.json();
};
