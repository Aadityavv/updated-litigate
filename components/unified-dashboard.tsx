"use client";

import { useState, useEffect } from "react";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";
import CaseManagement from "@/components/CaseManagement";
import LegalResearchTool from "@/components/LegalResearchTool";
import CommunicationModule from "@/components/CommunicationModule";
import SettingsComponent from "@/components/Settings";
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

// Utility function to format section names
const formatHeading = (section: string) => {
  return section
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
};

// Sidebar Component for PC
const SidebarPC = ({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
  handleLogout,
}: any) => (
  <div
    className={`${
      isSidebarOpen ? "w-64" : "w-20"
    } flex flex-col bg-white border-r transition-all duration-300`}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b">
      {isSidebarOpen && <h1 className="text-2xl font-bold text-gray-800">LitigateIQ</h1>}
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
    {/* Navigation */}
    <nav className="flex-1 overflow-y-auto">
      <ul className="space-y-2 mt-2">
        {[
          { name: "Dashboard", icon: <Grid className="h-5 w-5 mr-2" />, section: "dashboard" },
          { name: "Case Management", icon: <FolderOpen className="h-5 w-5 mr-2" />, section: "case-management" },
          { name: "Legal Research", icon: <Search className="h-5 w-5 mr-2" />, section: "legal-research" },
          { name: "Communication", icon: <MessageSquare className="h-5 w-5 mr-2" />, section: "communication" },
          { name: "Settings", icon: <Settings className="h-5 w-5 mr-2" />, section: "settings" },
        ].map(({ name, icon, section }) => (
          <li key={section}>
            <Button
              onClick={() => setActiveSection(section)}
              className={`w-full flex items-center justify-start pl-4 pr-2 py-3 text-left rounded-lg ${
                activeSection === section
                  ? "bg-gray-100 text-black hover:bg-gray-100"
                  : "bg-white text-black hover:bg-gray-100"
              } ${!isSidebarOpen ? "justify-center" : ""}`}
            >
              {icon}
              {isSidebarOpen && name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
    {/* Logout */}
    <div className="p-4 border-t">
      <Button
        variant="outline"
        className="text-black border-black w-full"
        onClick={handleLogout}
      >
        <LogOut className="mr-3 h-5 w-5" />
        {isSidebarOpen && "Logout"}
      </Button>
    </div>
  </div>
);

// Sidebar Component for Mobile
const SidebarMobile = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeSection,
  setActiveSection,
  handleLogout,
}: any) => (
  <>
    <div
      className={`fixed inset-0 z-40 bg-black opacity-50 ${isSidebarOpen ? "block" : "hidden"}`}
      onClick={() => setIsSidebarOpen(false)}
    ></div>
    <div
      className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform bg-white w-64`}
    >
      {/* Header with LitigateIQ */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">LitigateIQ</h1>
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 mt-2">
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
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-start pl-4 pr-2 py-3 text-left rounded-lg ${
                  activeSection === section
                    ? "bg-gray-100 text-black hover:bg-gray-100"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {icon}
                {name}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="text-black border-black w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  </>
);

export default function UnifiedDashboardComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    // Set initial sidebar state based on screen width
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Mobile view: Sidebar starts closed
    } else {
      setIsSidebarOpen(true); // PC view: Sidebar starts open
    }
  };

  useEffect(() => {
    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "case-management":
        return <CaseManagement onCaseSelect={(caseId) => console.log(`Selected Case: ${caseId}`)} />;
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

  return (
    <div className="flex h-screen overflow-hidden">
      {isMobile ? (
        <SidebarMobile
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
        />
      ) : (
        <SidebarPC
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleLogout={handleLogout}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-4 py-3 bg-white shadow sm:px-8 relative">
          {isMobile && (
            <Button
              variant="ghost"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-800 absolute left-4"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <h2
            className={`text-xl font-bold ${isMobile ? "flex-1 text-center" : "text-left"}`}
          >
            {formatHeading(activeSection)}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}