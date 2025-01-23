"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner"; // For better notifications

interface AddNewEventModalProps {
  onClose: () => void;
  onAddEvent: (newEvent: any) => void;
  onEditEvent?: (updatedEvent: any) => void;
  existingEvent?: any; // Optional for editing
}

export default function AddNewEventModal({ onClose, onAddEvent, onEditEvent, existingEvent }: AddNewEventModalProps) {
  // State variables
  const [caseId, setCaseId] = useState(existingEvent?.caseId || "");
  const [lawyerId, setLawyerId] = useState(existingEvent?.lawyerId || "12345"); // Static for now
  const [eventDate, setEventDate] = useState(existingEvent?.eventDate || "");
  const [eventType, setEventType] = useState(existingEvent?.eventType || "Hearing");
  const [eventOutcome, setEventOutcome] = useState(existingEvent?.eventOutcome || "");
  const [eventDesc, setEventDesc] = useState(existingEvent?.eventDesc || "");
  const [eventLocation, setEventLocation] = useState(existingEvent?.eventLocation || "");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  // Validate form fields
  const validateForm = () => {
    if (!caseId || !eventDate || !eventType || !eventDesc || !eventLocation) {
      toast.error("Please fill out all required fields.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare the event data
    const eventDetails = {
      caseId,
      lawyerId,
      eventDate: new Date(eventDate).toISOString(), // Convert to ISO format
      eventType,
      eventOutcome,
      eventDesc,
      eventLocation,
    };

    try {
      const response = await fetch("https://dashboardservice-bg5v.onrender.com/post/createEvent", {
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
      toast.success("Event added successfully!");

      onAddEvent(result.event); // Notify the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to save event. Please try again.");
    } finally {
      setIsSubmitting(false);
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
        className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 space-y-4 overflow-y-auto max-h-screen"
        initial={{ scale: 0.5 }}
        animate={{ scale: 0.9 }}
        exit={{ scale: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {existingEvent ? "Edit Event" : "Add New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Case ID */}
          <div>
            <label htmlFor="caseId" className="block text-sm font-medium text-gray-700">
              Case ID
            </label>
            <Input
              type="text"
              id="caseId"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
              Event Date and Time
            </label>
            <Input
              type="datetime-local"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {/* Event Type */}
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
              Event Type
            </label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hearing">Hearing</SelectItem>
                <SelectItem value="Trial">Trial</SelectItem>
                <SelectItem value="Mediation">Mediation</SelectItem>
                <SelectItem value="Settlement">Settlement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Outcome */}
          <div>
            <label htmlFor="eventOutcome" className="block text-sm font-medium text-gray-700">
              Event Outcome
            </label>
            <Input
              type="text"
              id="eventOutcome"
              value={eventOutcome}
              onChange={(e) => setEventOutcome(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Event Description */}
          <div>
            <label htmlFor="eventDesc" className="block text-sm font-medium text-gray-700">
              Event Description
            </label>
            <Textarea
              id="eventDesc"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
              rows={4}
              required
              className="mt-1"
            />
          </div>

          {/* Event Location */}
          <div>
            <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">
              Event Location
            </label>
            <Input
              type="text"
              id="eventLocation"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : existingEvent ? "Save Changes" : "Add Event"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}