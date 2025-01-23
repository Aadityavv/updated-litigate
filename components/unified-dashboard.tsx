"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthPage from "@/components/AuthPage";
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
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Dashboard", icon: <Grid className="h-5 w-5" />, section: "dashboard" },
  { name: "Cases", icon: <FolderOpen className="h-5 w-5" />, section: "case-management" },
  { name: "Research", icon: <Search className="h-5 w-5" />, section: "legal-research" },
  { name: "Messages", icon: <MessageSquare className="h-5 w-5" />, section: "communication" },
  { name: "Settings", icon: <Settings className="h-5 w-5" />, section: "settings" },
];

export default function UnifiedDashboardComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => setIsAuthenticated(false);

  const pageTitles = {
    dashboard: "Dashboard Overview",
    "case-management": "Case Management",
    "case-detail": "Case Details",
    "legal-research": "Legal Research Hub",
    communication: "Client Communications",
    settings: "Account Settings",
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
        return selectedCaseId ? (
          <CaseDetailView caseId={selectedCaseId.toString()} />
        ) : (
          <p>No case selected. Go back to Case Management.</p>
        );
      case "legal-research":
        return <LegalResearchTool />;
      case "communication":
        return <CommunicationModule />;
      case "settings":
        return <SettingsComponent />;
      default:
        return <div>Welcome to LitigateIQ</div>;
    }
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const sidebarAnimation = {
    mobile: {
      open: { x: 0 },
      closed: { x: "-100%" },
    },
    desktop: {
      open: { width: 240 },
      closed: { width: 80 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Animated Sidebar */}
      <motion.div
        className={`flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl z-50 ${
          isMobile ? "fixed inset-y-0" : "relative"
        }`}
        animate={
          isMobile
            ? isSidebarOpen
              ? "open"
              : "closed"
            : isSidebarOpen
            ? "open"
            : "closed"
        }
        variants={isMobile ? sidebarAnimation.mobile : sidebarAnimation.desktop}
        transition={{ type: "tween", duration: 0.3 }}
        style={{ willChange: isMobile ? "transform" : "width" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700 h-16">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="text-xl font-semibold tracking-tight whitespace-nowrap overflow-hidden"
          >
            LitigateIQ
          </motion.h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:bg-slate-700/50 rounded-lg p-2 ml-2"
          >
            {isSidebarOpen ? (
              <ChevronsLeft className="h-5 w-5" />
            ) : (
              <ChevronsRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {sidebarItems.map((item) => (
            <motion.div
              key={item.section}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => {
                  setActiveSection(item.section);
                  isMobile && setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full h-12 justify-start space-x-3 rounded-lg font-medium transition-colors",
                  activeSection === item.section
                    ? "bg-blue-600/90 hover:bg-blue-600 text-white"
                    : "bg-transparent hover:bg-slate-700/30 text-slate-300"
                )}
              >
                {item.icon}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                  className="whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              </Button>
            </motion.div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Button
      variant="outline"
      className="w-full h-12 space-x-2 bg-transparent hover:bg-slate-700/30 border-slate-600 text-slate-200 rounded-lg"
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5" />
      {isSidebarOpen && ( // Only show the text when the sidebar is open
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isSidebarOpen ? 1 : 0 }}
          className="whitespace-nowrap"
        >
          Sign Out
        </motion.span>
      )}
    </Button>
  </motion.div>
</div>
      </motion.div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col overflow-hidden min-w-0 ${
          !isMobile && (isSidebarOpen ? "ml-[0px]" : "ml-[0px]")
        } transition-all duration-300`}
      >
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200">
          <div className="flex items-center space-x-4">
            {isMobile && !isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-slate-600"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeSection}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-2xl font-bold text-slate-800"
              >
                {pageTitles[activeSection as keyof typeof pageTitles]}
              </motion.h2>
            </AnimatePresence>
          </div>
          <div className="flex items-center space-x-4">
            {/* Add any header widgets here */}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
              transition={{ duration: 0.2 }}
              className="h-full w-full max-w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}