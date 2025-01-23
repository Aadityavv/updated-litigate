"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaGoogle, FaSun, FaMoon } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp, signIn } from "@/lib/api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const taglines = [
    "Empowering legal professionals with cutting-edge technology.",
    "Streamline your legal workflows efficiently.",
    "Transforming the legal industry one step at a time.",
    "Your legal partner in technology innovation.",
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = isSignUp
        ? await signUp({ name: formData.name, email: formData.email, password: formData.password })
        : await signIn({ email: formData.email, password: formData.password });

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(`${isSignUp ? "Sign-up" : "Login"} successful!`);
        onLogin();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const calculatePasswordStrength = (password: string) => {
    const strength = password.length > 8 ? (password.length > 12 ? "strong" : "medium") : "weak";
    return strength;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gradient-to-r from-blue-900 to-indigo-900" : "bg-gradient-to-r from-gray-100 to-gray-300"} flex items-center justify-center overflow-hidden relative`}>
      {/* Animated Background */}
      <div className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-r from-blue-900 to-indigo-900" : "bg-gradient-to-r from-gray-100 to-gray-300"} animate-gradient-x`}></div>

      {/* Floating Lawyer Icons (Gavel and Scales of Justice) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 ${isDarkMode ? "text-white/10" : "text-gray-400/20"}`}
            initial={{ y: 0, x: Math.random() * 1000 - 500, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ y: [0, 100, 0], rotate: [0, 360] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
          >
            {i % 2 === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 0v16h10V4H7zm5 3a1 1 0 011 1v8a1 1 0 01-2 0V8a1 1 0 011-1z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M12 2a1 1 0 011 1v18a1 1 0 01-2 0V3a1 1 0 011-1zm-7 5a1 1 0 011 1v8a1 1 0 01-2 0V8a1 1 0 011-1zm14 0a1 1 0 011 1v8a1 1 0 01-2 0V8a1 1 0 011-1z" />
              </svg>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-4 p-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Section */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-white p-6 md:p-12 space-y-6 text-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className={`text-5xl md:text-6xl font-extrabold drop-shadow-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            LitigateIQ
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Typewriter
              words={taglines}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
            />
          </motion.p>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className={`flex-1 ${isDarkMode ? "bg-white/10 backdrop-blur-md border border-white/10" : "bg-gray-900/10 backdrop-blur-md border border-gray-900/10"} rounded-xl shadow-2xl p-6 md:p-8 space-y-6 max-w-md w-full`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? "bg-white/10 text-white" : "bg-gray-900/10 text-gray-900"} hover:scale-110 transition-all duration-300`}
          >
            {isDarkMode ? <FaMoon /> : <FaSun />}
          </button>

          <motion.h2
            className={`text-3xl font-bold text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isSignUp ? "Create an Account" : "Welcome Back!"}
          </motion.h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full ${isDarkMode ? "bg-white/10 border border-white/20 text-white placeholder-white" : "bg-gray-900/10 border border-gray-900/20 text-gray-900 placeholder-gray-900"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full ${isDarkMode ? "bg-white/10 border border-white/20 text-white placeholder-white" : "bg-gray-900/10 border border-gray-900/20 text-gray-900 placeholder-gray-900"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full ${isDarkMode ? "bg-white/10 border border-white/20 text-white placeholder-white" : "bg-gray-900/10 border border-gray-900/20 text-gray-900 placeholder-gray-900"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-white/10" : "bg-gray-900/10"}`}>
                    <div
                      className={`h-2 rounded-full ${
                        calculatePasswordStrength(formData.password) === "weak"
                          ? "bg-red-500"
                          : calculatePasswordStrength(formData.password) === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${(formData.password.length / 12) * 100}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                    Password Strength: {calculatePasswordStrength(formData.password)}
                  </p>
                </div>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full ${isDarkMode ? "bg-white/10 border border-white/20 text-white placeholder-white" : "bg-gray-900/10 border border-gray-900/20 text-gray-900 placeholder-gray-900"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  isSignUp ? "Sign Up" : "Login"
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="relative flex items-center justify-center py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className={`absolute inset-0 border-t ${isDarkMode ? "border-white/20" : "border-gray-900/20"}`}></div>
            <span className={`bg-transparent px-3 ${isDarkMode ? "text-white" : "text-gray-900"} text-sm`}>OR</span>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Button
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105"
            >
              <FaGoogle className="mr-2" /> Continue with Google
            </Button>
          </motion.div>

          <motion.p
            className={`text-sm text-center ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`${isDarkMode ? "text-indigo-400" : "text-indigo-600"} font-semibold hover:underline`}
            >
              {isSignUp ? "Login here" : "Sign up here"}
            </button>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
}