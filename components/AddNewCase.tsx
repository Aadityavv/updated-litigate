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
  const [lawyerId, setLawyerId] = useState("12345");
  // const [lawyerName, setLawyerName] = useState("David Smith");
  const [caseTitle, setCaseTitle] = useState("");
  const [caseId, setCaseId] = useState("");
  const [judgeAssigned, setJudgeAssigned] = useState("");
  const [sectionOrAct, setSectionOrAct] = useState("");
  const [courtName, setCourtName] = useState("");
  const [dateOfFile, setDateOfFile] = useState("");
  const [status, setStatus] = useState("pending");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Hearing");
  const [partyName, setPartyName] = useState("");
  const [partyAddress, setPartyAddress] = useState("");
  const [partyEmail, setPartyEmail] = useState("");
  const [partyContact, setPartyContact] = useState("");
  const [caseDesc, setCaseDesc] = useState("");
  const [notes, setNotes] = useState("");
  const [partyRole, setPartyRole] = useState("Organization");

  const validateForm = () => {
    if (!caseTitle) {
      alert("Case Name is required.");
      return false;
    }
    if (!caseId) {
      alert("Case ID is required.");
      return false;
    }
    if (!partyName) {
      alert("Client Name is required.");
      return false;
    }
    if (!partyAddress) {
      alert("Client Name is required.");
      return false;
    }
    if (!partyEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partyEmail)) {
      alert("A valid Contact Email is required.");
      return false;
    }
    if (!partyContact || !/^\d{10}$/.test(partyContact)) {
      alert("A valid 10-digit Contact Phone number is required.");
      return false;
    }
    if (!caseDesc) {
      alert("Description is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newCase = {
      lawyerId,
      // lawyerName,
      caseId,
      caseTitle,
      caseDesc,
      dateOfFile,
      courtName,
      judgeAssigned,
      sectionOrAct,
      status,
      bookmark: false, // Default value as per API response
      partyName,
      partyType: "Organization", // Ensure this value is sent
      partyRole,
      contact: partyContact, // Ensure correct field names
      address: partyAddress,
      documentType: "Contracts", // Sample default, should be dynamic
      documentDesc: notes, // Mapping notes to documentDesc
    };

  console.log("Sending request with payload:", JSON.stringify(newCase, null, 2)); // Log before sending

    try {
      const response = await fetch(`https://cms-production-3675.up.railway.app/post/new/case`,{
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
        initial={{ scale: 0.5 }}
        animate={{ scale: 0.8 }}
        exit={{ scale: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Add New Case</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div>
              <h3 className="text-md font-bold text-gray-700 mb-2">Case Information</h3>
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="caseTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Case Name
                  </label>
                  <Input
                    type="text"
                    id="caseTitle"
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caseId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Case ID
                  </label>
                  <Input
                    type="text"
                    id="caseId"
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
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
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                {/* <div>
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
                </div> */}

                <div>
                  <label
                    htmlFor="judgeAssigned"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assigned Judge
                  </label>
                  <Input
                    type="text"
                    id="judgeAssigned"
                    value={judgeAssigned}
                    onChange={(e) => setJudgeAssigned(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sectionOrAct"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Section/Act
                  </label>
                  <Input
                    type="text"
                    id="sectionOrAct"
                    value={sectionOrAct}
                    onChange={(e) => setSectionOrAct(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="courtName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Court Address
                  </label>
                  <Input
                    type="text"
                    id="courtName"
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateOfFile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Case File Date
                  </label>
                  <Input
                    type="date"
                    id="dateOfFile"
                    value={dateOfFile}
                    onChange={(e) => setDateOfFile(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>


                {/* <div>
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
                </div> */}
              </div>
            </div>

            <div>
              <h3 className="text-md font-bold text-gray-700 mb-2">Client Information</h3>
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="partyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Client Name
                  </label>
                  <Input
                    type="text"
                    id="partyName"
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="partyAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Client Address 
                  </label>
                  <Input
                    type="text"
                    id="partyAddress"
                    value={partyAddress}
                    onChange={(e) => setPartyAddress(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="partyEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    id="partyEmail"
                    value={partyEmail}
                    onChange={(e) => setPartyEmail(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="partyContact"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Phone
                  </label>
                  <Input
                    type="tel"
                    id="partyContact"
                    value={partyContact}
                    onChange={(e) => setPartyContact(e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
                <div>
            <h3 className="text-md font-bold text-gray-700 mb-2">Additional Information</h3>
            {/* <div className="grid grid-cols-1 gap-3 md:grid-cols-2"> */}
              <div>
                <label
                  htmlFor="caseDesc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Textarea
                  id="caseDesc"
                  value={caseDesc}
                  onChange={(e) => setCaseDesc(e.target.value)}
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
