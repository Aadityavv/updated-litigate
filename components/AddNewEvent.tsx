"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddNewEventModalProps {
  onClose: () => void;
  onAddEvent: (newEvent: any) => void;
  onEditEvent?: (updatedEvent: any) => void;
  existingEvent?: any; // Optional for editing
  
}

export default function AddNewEventModal({ onClose, onAddEvent, onEditEvent, existingEvent }: AddNewEventModalProps) {
  const [title, setTitle] = useState(existingEvent?.title || "");
  const [clientName, setClientName] = useState(existingEvent?.clientName || "");
  const [description, setDescription] = useState(existingEvent?.description || "");
  const [location, setLocation] = useState(existingEvent?.location || "");
  const [date, setDate] = useState(existingEvent?.date || "");
  const [time, setTime] = useState(existingEvent?.time || "");

  const validateForm = () => {
    if (!title) {
      alert("Title is required.");
      return false;
    }
    if (!clientName) {
      alert("Client Name is required.");
      return false;
    }
    if (!description) {
      alert("Description is required.");
      return false;
    }
    if (!location) {
      alert("Location is required.");
      return false;
    }
    if (!date) {
      alert("Date is required.");
      return false;
    }
    if (!time) {
      alert("Time is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const eventDetails = {
      title,
      clientName,
      description,
      location,
      date,
      time,
    };

    try {
      if (existingEvent && onEditEvent) {
        // Handle editing an event
        const response = await fetch(`/api/events/${existingEvent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventDetails),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Event updated successfully:", result);
        alert("Event updated successfully!");

        onEditEvent(result.event); // Notify the parent component with the updated event
      } else {
        // Handle adding a new event
        const response = await fetch("/api/events/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventDetails),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Event added successfully:", result);
        alert("Event added successfully!");

        onAddEvent(result.event); // Notify the parent component with the new event
      }

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event. Please try again.");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-xl p-3 space-y-3 md:max-w-2xl sm:max-w-xs sm:p-2 overflow-y-auto max-h-screen"
        style={{ marginTop: 0, marginBottom: 0 }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          {existingEvent ? "Edit Event" : "Add New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="clientName"
                className="block text-sm font-medium text-gray-700"
              >
                Client Name
              </label>
              <Input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <Input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <Input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="text-sm"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-gray-700 text-sm"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white text-sm">
              {existingEvent ? "Save Changes" : "Add Event"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
