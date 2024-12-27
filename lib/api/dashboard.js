export const fetchDashboardNotifications = async () => {
    const response = await fetch('/api/dashboard/notifications');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard notifications');
    }
    return response.json();
  };
  