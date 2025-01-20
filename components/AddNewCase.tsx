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
  const [caseID, setCaseID] = useState("");
  const [assignedJudge, setassignedJudge] = useState("");
  const [section, setsection] = useState("");
  const [courtAddress, setcourtAddress] = useState("");
  const [caseFileDate, setcaseFileDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [nextHearing, setNextHearing] = useState("");
  const [caseType, setCaseType] = useState("Civil");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const validateForm = () => {
    if (!caseName) {
      alert("Case Name is required.");
      return false;
    }
    if (!caseID) {
      alert("Case ID is required.");
      return false;
    }
    if (!clientName) {
      alert("Client Name is required.");
      return false;
    }
    if (!clientAddress) {
      alert("Client Name is required.");
      return false;
    }
    if (!contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      alert("A valid Contact Email is required.");
      return false;
    }
    if (!contactPhone || !/^\d{10}$/.test(contactPhone)) {
      alert("A valid 10-digit Contact Phone number is required.");
      return false;
    }
    if (!description) {
      alert("Description is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newCase = {
      caseName,
      caseID,
      status,
      nextHearing,
      caseType,
      clientName,
      clientAddress,
      contactEmail,
      contactPhone,
      description,
      notes,
    };

    try {
      const response = await fetch("/api/cases/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCase),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Case added successfully:", result);
      alert("Case added successfully!");

      onAddCase(result.case); // Notify the parent component with the new case
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding case:", error);
      alert("Failed to add case. Please try again.");
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
        style={{ marginTop: "5.5%", marginBottom: "5.5%" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Add New Case</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div>
              <h3 className="text-md font-bold text-gray-700 mb-2">Case Information</h3>
              <div className="space-y-2">
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
                    className="text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caseID"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Case ID
                  </label>
                  <Input
                    type="text"
                    id="caseID"
                    value={caseID}
                    onChange={(e) => setCaseID(e.target.value)}
                    required
                    className="text-sm"
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
                    className="w-full mt-1 p-1 border rounded-md text-sm"
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
                    className="w-full mt-1 p-1 border rounded-md text-sm"
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
                    htmlFor="assignedJudge"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assigned Judge
                  </label>
                  <Input
                    type="text"
                    id="assignedJudge"
                    value={assignedJudge}
                    onChange={(e) => setassignedJudge(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="section"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Section/Act
                  </label>
                  <Input
                    type="text"
                    id="section"
                    value={section}
                    onChange={(e) => setsection(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="courtAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Court Address
                  </label>
                  <Input
                    type="text"
                    id="courtAddress"
                    value={courtAddress}
                    onChange={(e) => setcourtAddress(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="caseFileDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Case File Date
                  </label>
                  <Input
                    type="date"
                    id="caseFileDate"
                    value={caseFileDate}
                    onChange={(e) => setcaseFileDate(e.target.value)}
                    required
                    className="text-sm"
                  />
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
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-bold text-gray-700 mb-2">Client Information</h3>
              <div className="space-y-2">
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
                    htmlFor="clientAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Client Address 
                  </label>
                  <Input
                    type="text"
                    id="clientAddress"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    required
                    className="text-sm"
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
                    className="text-sm"
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
                    className="text-sm"
                  />
                </div>
                <div>
            <h3 className="text-md font-bold text-gray-700 mb-2">Additional Information</h3>
            {/* <div className="grid grid-cols-1 gap-3 md:grid-cols-2"> */}
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
                  rows={2}
                  className="text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="documents"
                  className="block text-sm font-medium text-gray-700 my-2"
                >
                  Documents (Optional)
                </label>
                <Input type="file" id="documents" className="text-sm" />
              </div>
            {/* </div> */}
          </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-bold text-gray-700 mb-2">Optional Information</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                  className="text-sm"
                />
              </div>
              
            </div>
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
              Add Case
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
