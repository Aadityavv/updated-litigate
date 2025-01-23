export const fetchUser = async () => {
  try {
    const response = await fetch('https://dashboardservice-bg5v.onrender.com/api/user');
    
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const data = await response.json();
    console.log("User Data:", data);

    return data.name || "Guest";
  } catch (error) {
    console.error("Error fetching user details:", error);
    return "Guest";
  }
};

export const fetchDashboardStats = async (lawyerId) => {
  try {
    const response = await fetch(`https://dashboardservice-bg5v.onrender.com/api/getStats/?lawyerId=${lawyerId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    const data = await response.json();
    console.log("Dashboard Stats:", data);

    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {};
  }
};

export const fetchNotifications = async (lawyerId) => {
  try {
    const response = await fetch(`https://dashboardservice-bg5v.onrender.com/api/getNotifications/?lawyerId=${lawyerId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    console.log("Notifications Data:", data);

    return data.notifications || [];
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const fetchEvents = async (lawyerId, eventDate) => {
  try {
    const response = await fetch(`https://dashboardservice-bg5v.onrender.com/api/getEvents/?lawyerId=${lawyerId}&eventDate=${eventDate}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events for date: ${eventDate}`);
    }

    const data = await response.json();
    console.log(`Events Data for ${eventDate}:`, data);

    return data.events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const addEvent = async (eventData) => {
  try {
    const response = await fetch('https://dashboardservice-bg5v.onrender.com/api/postEvent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error('Failed to add event');
    }

    const newEvent = await response.json();
    console.log("New Event Added:", newEvent);

    return newEvent;
  } catch (error) {
    console.error("Error adding new event:", error);
    return null;
  }
};

export const updateEvent = async (updatedEvent) => {
  try {
    const response = await fetch(`https://dashboardservice-bg5v.onrender.com/api/updateEvent/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });

    if (!response.ok) {
      throw new Error(`Failed to update event with ID ${updatedEvent.id}`);
    }

    const updatedEventData = await response.json();
    console.log("Updated Event:", updatedEventData);

    return updatedEventData;
  } catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`https://dashboardservice-bg5v.onrender.com/api/deleteEvent/${eventId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete event with ID ${eventId}`);
    }

    console.log(`Event with ID ${eventId} deleted successfully`);

    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
};
