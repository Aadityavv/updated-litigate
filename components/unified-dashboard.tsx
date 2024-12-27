// components/UnifiedDashboardComponent.tsx

"use client";

import { useState } from "react";
import {
  Grid,
  FolderOpen,
  Search,
  MessageSquare,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Dashboard from "@/components/Dashboard";
import CaseManagement from "@/components/CaseManagement";
import LegalResearchTool from "@/components/LegalResearchTool";
import CommunicationModule from "@/components/CommunicationModule";
import SettingsComponent from "@/components/Settings";
import CaseDetailView from "@/components/CaseDetailView";

export default function UnifiedDashboardComponent() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "case-management":
        return (
            <CaseManagement
                onCaseSelect={(id: number) => {
                  setSelectedCaseId(id);
                  setActiveSection("case-detail");
                }}
            />
        );
      case "case-detail":
        if (selectedCaseId !== null) {
          return <CaseDetailView caseId={selectedCaseId} />;
        }
        return <p>No case selected. Go back to Case Management.</p>;
      case "legal-research":
        return <LegalResearchTool />;
      case "communication":
        return <CommunicationModule />;
      case "settings":
        return <SettingsComponent />;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  const baseButtonStyle =
      "w-full flex items-center justify-start pl-4 pr-2 py-3 text-left rounded-lg";

  return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
            className={`${
                isSidebarOpen ? "w-64" : "w-20"
            } hidden sm:flex flex-col bg-white border-r transition-all duration-300`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            {isSidebarOpen && (
                <h1 className="text-2xl font-bold text-gray-800">LitigateIQ</h1>
            )}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-800"
                aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? (
                  <ChevronsLeft className="h-5 w-5" />
              ) : (
                  <ChevronsRight className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-2 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Button
                    onClick={() => setActiveSection("dashboard")}
                    className={`${baseButtonStyle} ${
                        activeSection === "dashboard"
                            ? "bg-gray-200 text-black"
                            : "bg-white text-black hover:bg-gray-100"
                    }`}
                >
                  <Grid className="h-5 w-5 mr-2" />
                  {isSidebarOpen && "Dashboard"}
                </Button>
              </li>
              <li>
                <Button
                    onClick={() => setActiveSection("case-management")}
                    className={`${baseButtonStyle} ${
                        activeSection === "case-management"
                            ? "bg-gray-200 text-black"
                            : "bg-white text-black hover:bg-gray-100"
                    }`}
                >
                  <FolderOpen className="h-5 w-5 mr-2" />
                  {isSidebarOpen && "Case Management"}
                </Button>
              </li>
              <li>
                <Button
                    onClick={() => setActiveSection("legal-research")}
                    className={`${baseButtonStyle} ${
                        activeSection === "legal-research"
                            ? "bg-gray-200 text-black"
                            : "bg-white text-black hover:bg-gray-100"
                    }`}
                >
                  <Search className="h-5 w-5 mr-2" />
                  {isSidebarOpen && "Legal Research"}
                </Button>
              </li>
              <li>
                <Button
                    onClick={() => setActiveSection("communication")}
                    className={`${baseButtonStyle} ${
                        activeSection === "communication"
                            ? "bg-gray-200 text-black"
                            : "bg-white text-black hover:bg-gray-100"
                    }`}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {isSidebarOpen && "Communication"}
                </Button>
              </li>
              <li>
                <Button
                    onClick={() => setActiveSection("settings")}
                    className={`${baseButtonStyle} ${
                        activeSection === "settings"
                            ? "bg-gray-200 text-black"
                            : "bg-white text-black hover:bg-gray-100"
                    }`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  {isSidebarOpen && "Settings"}
                </Button>
              </li>
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
                variant="outline"
                className="text-black border-black w-full"
                onClick={() => alert("Logout clicked!")}
            >
              <LogOut className="mr-3 h-5 w-5" />
              {isSidebarOpen && "Logout"}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-start items-start px-4 py-3 bg-white shadow sm:px-8">
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                className="sm:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle Menu"
            >
              {isSidebarOpen ? (
                  <ChevronsLeft className="h-6 w-6" />
              ) : (
                  <Menu className="h-6 w-6" />
              )}
            </Button>

            {/* Centered Page Title */}
            <h2 className="flex-1 text-center text-xl font-bold text-gray-800 sm:text-left">
              {activeSection
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
            </h2>

            {/* Logout Button */}
            <Button
                variant="ghost"
                className="hidden sm:flex items-center"
                onClick={() => alert("Logout clicked!")}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-100">
            {renderContent()}
          </main>
        </div>
      </div>
  );
}
