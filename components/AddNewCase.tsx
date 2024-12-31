// components/AddNewCaseModal.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddNewCaseModalProps {
  onClose: () => void;
  onAddCase: (newCase: any) => void;
}

export default function AddNewCaseModal({ onClose, onAddCase }: AddNewCaseModalProps) {
  const [caseName, setCaseName] = useState("");
  const [status, setStatus] = useState("Active");
  const [nextHearing, setNextHearing] = useState("");
  const [caseType, setCaseType] = useState("Civil");
  const [clientName, setClientName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCase = {
      caseName,
      status,
      nextHearing,
      caseType,
      clientName,
      contactEmail,
      contactPhone,
      description,
      notes,
    };

    console.log("New Case:", newCase);
    onAddCase(newCase);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 space-y-6"
        style={{ marginTop: "5%", marginBottom: "5%" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Case</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Case Information</h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="caseName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Case Name
                  </label>
                  <Input
                    type="text"
                    id="caseName"
                    value={caseName}
                    onChange={(e) => setCaseName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="caseType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Case Type
                  </label>
                  <select
                    id="caseType"
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                  >
                    <option value="Civil">Civil</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Family">Family</option>
                    <option value="Property">Property</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="nextHearing"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Next Hearing
                  </label>
                  <Input
                    type="datetime-local"
                    id="nextHearing"
                    value={nextHearing}
                    onChange={(e) => setNextHearing(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Client Information</h3>
              <div className="space-y-4">
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    id="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactPhone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Phone
                  </label>
                  <Input
                    type="tel"
                    id="contactPhone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Optional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <label
                  htmlFor="documents"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documents (Optional)
                </label>
                <Input type="file" id="documents" />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-gray-700"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Add Case
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
