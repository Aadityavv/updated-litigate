"use client";

import { useState } from "react";
import AuthPage from "@/components/AuthPage"; // AuthPage component
import Dashboard from "@/components/Dashboard";
import CaseManagement from "@/components/CaseManagement";
import LegalResearchTool from "@/components/LegalResearchTool";
import CommunicationModule from "@/components/CommunicationModule";
import SettingsComponent from "@/components/Settings";
import CaseDetailView from "@/components/CaseDetailView";
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

export default function UnifiedDashboardComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default is logged in
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  const handleLogout = () => {
    setIsAuthenticated(false); // Log the user out
  };

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
          return <CaseDetailView caseId={selectedCaseId.toString()} />;
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

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const baseButtonStyle =
    "w-full flex items-center justify-start pl-4 pr-2 py-3 text-left rounded-lg";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } sm:w-auto sm:translate-x-0 absolute sm:relative z-50 flex flex-col bg-white border-r transition-all duration-300 sm:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
            {[
              { name: "Dashboard", icon: <Grid className="h-5 w-5 mr-2" />, section: "dashboard" },
              { name: "Case Management", icon: <FolderOpen className="h-5 w-5 mr-2" />, section: "case-management" },
              { name: "Legal Research", icon: <Search className="h-5 w-5 mr-2" />, section: "legal-research" },
              { name: "Communication", icon: <MessageSquare className="h-5 w-5 mr-2" />, section: "communication" },
              { name: "Settings", icon: <Settings className="h-5 w-5 mr-2" />, section: "settings" },
            ].map(({ name, icon, section }) => (
              <li key={section}>
                <Button
                  onClick={() => {
                    setActiveSection(section);
                    if (window.innerWidth < 640) setIsSidebarOpen(false);
                  }}
                  className={`${baseButtonStyle} ${
                    activeSection === section
                      ? "bg-gray-200 text-black"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {icon}
                  {isSidebarOpen && name}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="text-black border-black w-full"
            onClick={() => {
              handleLogout();
              if (window.innerWidth < 640) setIsSidebarOpen(false);
            }}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {isSidebarOpen && "Logout"}
          </Button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

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
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}