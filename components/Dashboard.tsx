"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { UserCircleIcon } from "@heroicons/react/24/solid";

// UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";

export default function Dashboard() {
  // State Variables
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [lawyerName, setLawyerName] = useState(""); // Dynamic lawyer name
  const [events, setEvents] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]); // State for upcoming deadlines
  const [stats, setStats] = useState({
    totalCases: 0,
    pendingCases: 0,
    resolvedCases: 0,
    upcomingDeadlines: 0,
  });
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Fetch data from APIs
  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLawyerName(data.name || "Guest");
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLawyerName("Guest");
      }
    };

    // Fetch stats and deadlines
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);

        // Set deadlines from the response
        if (data.upcomingDeadlineDetails) {
          setDeadlines(data.upcomingDeadlineDetails);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    // Fetch events
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/dashboard/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/dashboard/notifications");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]); // Set notifications to an empty array in case of an error
      }
    };

    fetchUser();
    fetchStats();
    fetchEvents();
    fetchNotifications();
  }, []);

  // Get card title based on the selected card
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

  // Render sample data based on the selected card
  const getSampleData = (card: string) => {
    switch (card) {
      case "total-cases":
        return <p>Sample data for Total Cases.</p>;
      case "pending-cases":
        return <p>Sample data for Pending Cases.</p>;
      case "resolved-cases":
        return <p>Sample data for Resolved Cases.</p>;
      case "upcoming-deadlines":
        return (
          <ul>
            {deadlines.length > 0 ? (
              deadlines.map((deadline, index) => (
                <li key={index}>
                  <p className="font-semibold">{deadline.title}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(deadline.deadline), "PPP p")}
                  </p>
                </li>
              ))
            ) : (
              <p>No upcoming deadlines.</p>
            )}
          </ul>
        );
      default:
        return <p>No data available.</p>;
    }
  };

  return (
    <div className="space-y-8 p-6 bg-white min-h-screen">
      {/* Welcome Section */}
      <div className="flex items-center space-x-4">
        <UserCircleIcon className="w-16 h-16 text-blue-600" />
        <h1 className="text-3xl font-extrabold text-gray-800">
          Welcome, {lawyerName}!
        </h1>
      </div>

      {/* Calendar Section */}
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">
            Appointments and Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md"
              />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md md:col-span-2">
              <h3 className="font-semibold text-xl text-gray-700 mb-4">
                Events on{" "}
                {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
              </h3>
              <ul className="space-y-3">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <li
                      key={index}
                      className="text-gray-600 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>{event}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No events for this date.</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          onClick={() =>
            setSelectedCard(
              selectedCard === "total-cases" ? null : "total-cases"
            )
          }
          className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
            selectedCard === "total-cases" ? "border-blue-600 border-2" : ""
          }`}
        >
          <CardHeader>
            <CardTitle>Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-blue-600">
              {stats.totalCases}
            </div>
          </CardContent>
        </Card>

        {/* Pending Cases */}
        <Card
          onClick={() =>
            setSelectedCard(
              selectedCard === "pending-cases" ? null : "pending-cases"
            )
          }
          className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
            selectedCard === "pending-cases" ? "border-yellow-600 border-2" : ""
          }`}
        >
          <CardHeader>
            <CardTitle>Pending Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-yellow-600">
              {stats.pendingCases}
            </div>
          </CardContent>
        </Card>

        {/* Resolved Cases */}
        <Card
          onClick={() =>
            setSelectedCard(
              selectedCard === "resolved-cases" ? null : "resolved-cases"
            )
          }
          className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
            selectedCard === "resolved-cases" ? "border-green-600 border-2" : ""
          }`}
        >
          <CardHeader>
            <CardTitle>Resolved Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-green-600">
              {stats.resolvedCases}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card
          onClick={() =>
            setSelectedCard(
              selectedCard === "upcoming-deadlines"
                ? null
                : "upcoming-deadlines"
            )
          }
          className={`shadow-md transition-transform hover:scale-105 bg-white cursor-pointer ${
            selectedCard === "upcoming-deadlines"
              ? "border-red-600 border-2"
              : ""
          }`}
        >
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-red-600">
              {stats.upcomingDeadlines}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sample Data Display */}
{selectedCard && (
  <div className="mt-6">
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{getCardTitle(selectedCard)}</CardTitle>
      </CardHeader>
      <CardContent>
        {(() => {
          switch (selectedCard) {
            case "total-cases":
              return (
                <ul>
                  {stats.totalCasesDetails && stats.totalCasesDetails.length > 0 ? (
                    stats.totalCasesDetails.map((caseItem, index) => (
                      <li key={index}>
                        <strong>Case #{caseItem.caseId}</strong>: {caseItem.title}
                      </li>
                    ))
                  ) : (
                    <p>No total cases found.</p>
                  )}
                </ul>
              );
            case "pending-cases":
              return (
                <ul>
                  {stats.pendingCasesDetails && stats.pendingCasesDetails.length > 0 ? (
                    stats.pendingCasesDetails.map((caseItem, index) => (
                      <li key={index}>
                        <strong>Case #{caseItem.caseId}</strong>: {caseItem.title}
                      </li>
                    ))
                  ) : (
                    <p>No pending cases found.</p>
                  )}
                </ul>
              );
            case "resolved-cases":
              return (
                <ul>
                  {stats.resolvedCasesDetails && stats.resolvedCasesDetails.length > 0 ? (
                    stats.resolvedCasesDetails.map((caseItem, index) => (
                      <li key={index}>
                        <strong>Case #{caseItem.caseId}</strong>: {caseItem.title}
                      </li>
                    ))
                  ) : (
                    <p>No resolved cases found.</p>
                  )}
                </ul>
              );
            case "upcoming-deadlines":
              return (
                <ul>
                  {deadlines.length > 0 ? (
                    deadlines.map((deadline, index) => (
                      <li key={index}>
                        <strong>{deadline.title}</strong>: Due by{" "}
                        {format(new Date(deadline.deadline), "PPP")}
                      </li>
                    ))
                  ) : (
                    <p>No upcoming deadlines found.</p>
                  )}
                </ul>
              );
            default:
              return <p>No data available.</p>;
          }
        })()}
      </CardContent>
    </Card>
  </div>
)}

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {notifications.map((notification, index) => (
              <div key={index} className="space-y-4">
                <p className="text-lg font-semibold">{notification.title}</p>
                <p className="text-sm">{notification.description}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
