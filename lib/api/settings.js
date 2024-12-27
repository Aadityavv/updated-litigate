export const updateSettings = async (settingsData) => {
    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settingsData),
    });
    if (!response.ok) {
      throw new Error('Failed to update settings');
    }
    return response.json();
  };
  