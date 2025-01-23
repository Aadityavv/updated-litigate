"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import AddNewEventModal from "@/components/AddNewEvent";
import ConfirmDialog from "@/components/ConfirmDialog";
import { motion, AnimatePresence } from "framer-motion";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [lawyerName, setLawyerName] = useState("John Doe");
  const [events, setEvents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCases: 0,
    totalCasesChange: 0,
    pendingCases: 0,
    pendingCasesChange: 0,
    overduePendingCasesCount: 0,
    resolvedCases: 0,
    resolvedCasesChange: 0,
    upcomingDeadlines: 0,
    totalCasesDetails: [],
    pendingCasesDetails: [],
    overduePendingCasesDetails: [],
    resolvedCasesDetails: [],
    upcomingDeadlineDetails: [],
  });
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(5);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [lawyerId, setLawyerId] = useState<string>("12345");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://dummy-backend-15jt.onrender.com/user`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLawyerName(data.name || lawyerName );
        setLawyerId(data.lawyerId || "12345");
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLawyerName("Aaditya Vijayvargiya");
        setLawyerId("12345");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://dashboardservice-bg5v.onrender.com/count/countCases?lawyerId=${lawyerId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setStats({
          totalCases: data.totalCases,
          totalCasesChange: 0,
          pendingCases: data.pendingCases,
          pendingCasesChange: 0,
          overduePendingCasesCount: data.overdueCases,
          resolvedCases: data.resolvedCases,
          resolvedCasesChange: 0,
          upcomingDeadlines: data.upcomingDeadlines,
          totalCasesDetails: [],
          pendingCasesDetails: [],
          overduePendingCasesDetails: [],
          resolvedCasesDetails: [],
          upcomingDeadlineDetails: [],
        });

        if (data.upcomingDeadlineDetails) {
          setDeadlines(data.upcomingDeadlineDetails);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://dummy-backend-15jt.onrender.com/dashboard/notifications`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
    fetchStats();
    fetchNotifications();
  }, [lawyerId]);

  // Fetch events dynamically based on the selected date
  const fetchEvents = async (date: Date) => {
    setIsLoading(true);
    try {
      const formattedDate = selectedDate;
      console.log(selectedDate);
      const response = await fetch(
        `https://dashboardservice-bg5v.onrender.com/api/getEvents/?lawyerId=${lawyerId}&eventDate=${formattedDate}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Events data fetched:", data);

      const casesWithEvents = data.message.casesWithEventsAndParties || [];
      const eventsArray = casesWithEvents.flatMap((caseData: any) =>
        caseData.events.map((event: any) => ({
          ...event,
          caseId: caseData.caseId,
          caseTitle: caseData.caseTitle,
          partyName: caseData.partyName,
        }))
      );

      setEvents(eventsArray);
      console.log("Updated Events State:", eventsArray);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchEvents(selectedDate);
    }
  }, [selectedDate, lawyerId]);

  // Add Event Handler
  const handleAddEvent = async (eventData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dashboardservice-bg5v.onrender.com/post/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...eventData, lawyerId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setIsAddEventModalOpen(false);
      toast.success("Event added successfully!");
    } catch (error) {
      console.error("Error adding new event:", error);
      toast.error("Failed to add event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Event Handler
  const handleDeleteEvent = async () => {
    if (!eventToDelete) {
      toast.error("Event ID is missing.");
      return;
    }

    setIsLoading(true);
    try {
      const caseId = events.find((event) => event.eventId === eventToDelete)?.caseId || "defaultCaseId";
      const response = await fetch(
        `https://dashboardservice-bg5v.onrender.com/delete/deleteEvent?lawyerId=${lawyerId}&caseId=${caseId}&eventId=${eventToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEvents((prevEvents) => prevEvents.filter((event) => event.eventId !== eventToDelete));
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    } finally {
      setEventToDelete(null);
      setIsLoading(false);
    }
  };

  // Edit Event Handler
  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
  };

  // Update Event Handler
  const handleUpdateEvent = async (updatedEvent: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dashboardservice-bg5v.onrender.com/put/updateEvent`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedEvent, lawyerId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedEventData = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEventData.id ? updatedEventData : event
        )
      );
      setEditingEvent(null);
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get Card Title
  const getCardTitle = (card: string) => {
    switch (card) {
      case "total-cases":
        return "Total Cases";
      case "pending-cases":
        return "Pending Cases";
      case "resolved-cases":
        return "Resolved Cases";
      case "upcoming-deadlines":
        return "Upcoming Deadlines";
      default:
        return "";
    }
  };

  // Get Sample Data for Cards
  const getSampleData = (card: string) => {
    const casesToShow = (cases: any[]) =>
      cases.slice(0, showCount).map((caseItem, index) => (
        <li key={index} className="mb-2">
          <span className="font-semibold text-blue-600">Case #{caseItem.caseId}</span>:{" "}
          <span className="text-gray-700">{caseItem.title}</span>
        </li>
      ));

    switch (card) {
      case "total-cases":
        return (
          <>
            <ul className="list-disc ml-5 space-y-2 text-gray-800">
              {stats.totalCasesDetails && stats.totalCasesDetails.length > 0 ? (
                casesToShow(stats.totalCasesDetails)
              ) : (
                <p className="text-gray-500">No total cases found.</p>
              )}
            </ul>
            {stats.totalCasesDetails && stats.totalCasesDetails.length > showCount && (
              <button
                className="text-blue-600 mt-2 underline hover:text-blue-700 transition-colors"
                onClick={() => setShowCount(showCount + 5)}
              >
                Show More
              </button>
            )}
          </>
        );
      case "pending-cases":
        return (
          <>
            <ul className="list-disc ml-5 space-y-2 text-gray-800">
              {stats.pendingCasesDetails && stats.pendingCasesDetails.length > 0 ? (
                casesToShow(stats.pendingCasesDetails)
              ) : (
                <p className="text-gray-500">No pending cases found.</p>
              )}
            </ul>
            <p className="text-sm text-red-500 mt-5">
              Overdue Pending Cases: {stats.overduePendingCasesCount}
            </p>
            {stats.pendingCasesDetails && stats.pendingCasesDetails.length > showCount && (
              <button
                className="text-blue-600 mt-2 underline hover:text-blue-700 transition-colors"
                onClick={() => setShowCount(showCount + 5)}
              >
                Show More
              </button>
            )}
          </>
        );
      case "resolved-cases":
        return (
          <>
            <ul className="list-disc ml-5 space-y-2 text-gray-800">
              {stats.resolvedCasesDetails && stats.resolvedCasesDetails.length > 0 ? (
                casesToShow(stats.resolvedCasesDetails)
              ) : (
                <p className="text-gray-500">No resolved cases found.</p>
              )}
            </ul>
            {stats.resolvedCasesDetails && stats.resolvedCasesDetails.length > showCount && (
              <button
                className="text-blue-600 mt-2 underline hover:text-blue-700 transition-colors"
                onClick={() => setShowCount(showCount + 5)}
              >
                Show More
              </button>
            )}
          </>
        );
      case "upcoming-deadlines":
        return (
          <>
            <ul className="list-disc ml-5 space-y-2 text-gray-800">
              {deadlines.length > 0 ? (
                casesToShow(deadlines)
              ) : (
                <p className="text-gray-500">No upcoming deadlines found.</p>
              )}
            </ul>
            {deadlines.length > showCount && (
              <button
                className="text-blue-600 mt-2 underline hover:text-blue-700 transition-colors"
                onClick={() => setShowCount(showCount + 5)}
              >
                Show More
              </button>
            )}
          </>
        );
      default:
        return <p className="text-gray-500">No data available.</p>;
    }
  };

  return (
    <div className="space-y-8 p-4 bg-white min-h-screen">
      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4"
      >
        <UserCircleIcon className="w-12 h-12 text-blue-600" />
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Welcome, <span className="text-blue-600">{lawyerName}</span>!
        </h1>
      </motion.div>

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
              Appointments and Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:grid md:grid-cols-4 gap-1">
            <div className="bg-white -mx-3 rounded-lg shadow-md -md:mx-4">

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md"
                />
              </div>
              <div className="bg-white rounded-lg py-2 px-2 mx-5 shadow-md md:col-span-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg md:text-xl text-gray-700">
                    Events on {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                  </h3>
                  <Button
                    onClick={() => setIsAddEventModalOpen(true)}
                    className="flex items-center ml-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                  >
                    <PlusCircle className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Add Event</span>
                  </Button>
                </div>
                <ScrollArea className="max-h-[500px] overflow-y-auto">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <motion.div
                        key={event.eventId}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 mb-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <p className="font-bold text-gray-800">Case ID: {event.caseId}</p>
                              <Button
                                onClick={() => handleEditEvent(event)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-full"
                              >
                                <Edit className="w-4 h-4" />
                                <span className="hidden md:inline ml-2">Edit</span>
                              </Button>
                              <Button
                                onClick={() => setEventToDelete(event.eventId)}
                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full"
                              >
                                <Trash className="w-4 h-4" />
                                <span className="hidden md:inline ml-2">Delete</span>
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <p className="text-sm text-gray-600"><strong>Case Title:</strong> {event.caseTitle}</p>
                                <p className="text-sm text-gray-600"><strong>Party Name:</strong> {event.partyName}</p>
                                <p className="text-sm text-gray-600"><strong>Event Type:</strong> {event.eventType}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600"><strong>Description:</strong> {event.eventDesc}</p>
                                <p className="text-sm text-gray-600"><strong>Location:</strong> {event.eventLocation}</p>
                                <p className="text-sm text-gray-600">
                                  <strong>Date & Time:</strong> {event.eventDate} at {event.eventTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No events for this date.</p>
                  )}
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { id: "total-cases", title: "Total Cases", value: stats.totalCases, color: "blue" },
          { id: "pending-cases", title: "Pending Cases", value: stats.pendingCases, color: "yellow" },
          { id: "resolved-cases", title: "Resolved Cases", value: stats.resolvedCases, color: "green" },
          { id: "upcoming-deadlines", title: "Upcoming Deadlines", value: stats.upcomingDeadlines, color: "red" },
        ].map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`shadow-md transition-transform bg-white cursor-pointer h-44 flex flex-col justify-between ${
                selectedCard === stat.id ? `ring-2 ring-${stat.color}-500` : ""
              }`}
              onClick={() => setSelectedCard(selectedCard === stat.id ? null : stat.id)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <div className={`text-4xl font-extrabold text-${stat.color}-600`}>
                    {stat.value}
                  </div>
                  {/* Overdue Cases (only for Pending Cases) */}
                  {stat.id === "pending-cases" && (
                    <div className="bg-red-50 rounded-full px-3 py-1">
                      <p className="text-sm text-red-600 font-medium">
                        Overdue: {stats.overduePendingCasesCount}
                      </p>
                    </div>
                  )}
                </div>
                {/* Progress Bar for All Cards */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-${stat.color}-600`}
                      style={{
                        width: `${
                          stat.id === "total-cases"
                            ? (stats.totalCases / 100) * 100
                            : stat.id === "pending-cases"
                            ? (stats.pendingCases / 100) * 100
                            : stat.id === "resolved-cases"
                            ? (stats.resolvedCases / 100) * 100
                            : (stats.upcomingDeadlines / 100) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  {/* Trend Indicator (if applicable) */}
                  {stat.id === "total-cases" && (
                    <p className="text-xs text-gray-500 mt-1">
                      +{stats.totalCasesChange} from last month
                    </p>
                  )}
                  {stat.id === "resolved-cases" && (
                    <p className="text-xs text-gray-500 mt-1">
                      +{stats.resolvedCasesChange} from last month
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Display Sample Data Below the Card on Mobile */}
            {selectedCard === stat.id && (
              <div className="md:hidden mt-4">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">
                      {getCardTitle(selectedCard)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{getSampleData(selectedCard)}</CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Sample Data Display for Desktop */}
      {selectedCard && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 hidden md:block"
        >
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                {getCardTitle(selectedCard)}
              </CardTitle>
            </CardHeader>
            <CardContent>{getSampleData(selectedCard)}</CardContent>
          </Card>
        </motion.div>
      )}

      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-gray-800">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {notifications.map((notification, index) => (
                <div key={index} className="space-y-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.description}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isAddEventModalOpen && (
          <AddNewEventModal
            onClose={() => setIsAddEventModalOpen(false)}
            onAddEvent={handleAddEvent}
          />
        )}
        {editingEvent && (
          <AddNewEventModal
            existingEvent={editingEvent}
            onClose={() => setEditingEvent(null)}
            onAddEvent={handleUpdateEvent}
          />
        )}
        {eventToDelete && (
          <ConfirmDialog
            message="Are you sure you want to delete this event?"
            onConfirm={handleDeleteEvent}
            onCancel={() => setEventToDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}