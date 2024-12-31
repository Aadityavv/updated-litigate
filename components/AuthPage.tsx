// components/AuthPage.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const taglines = [
    "Empowering legal professionals with cutting-edge technology.",
    "Streamline your legal workflows efficiently.",
    "Transforming the legal industry one step at a time.",
    "Your legal partner in technology innovation.",
  ];

  const handleOAuthLogin = async () => {
    alert("OAuth Login - Redirect to Google or other providers");
    onLogin();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      alert("Sign-Up with Email and Password: " + email);
    } else {
      alert("Login with Email and Password: " + email);
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col md:flex-row items-center justify-center overflow-hidden">
      {/* Left Side */}
      <motion.div
        className="flex-1 h-full flex flex-col items-center justify-center text-white p-8 md:p-16 space-y-6"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg">LitigateIQ</h1>
        <p className="text-lg text-gray-200">
          <Typewriter
            words={taglines}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
          />
        </p>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="flex-1 bg-white h-full flex flex-col justify-center p-8 md:p-16 rounded-lg shadow-xl space-y-6 md:max-w-lg md:mr-[10%]"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isSignUp ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="relative flex items-center justify-center py-4">
          <div className="absolute inset-0 border-t border-gray-300"></div>
          <span className="bg-white px-4 text-gray-500">OR</span>
        </div>

        <Button
          onClick={handleOAuthLogin}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2"
        >
          <FaGoogle className="mr-2" /> Continue with Google
        </Button>

        <p className="text-sm text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 font-medium hover:underline"
          >
            {isSignUp ? "Login here" : "Sign up here"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
