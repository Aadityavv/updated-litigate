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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // country: "",
    // phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Sign-Up Details: ${JSON.stringify(formData)}`);
    } else {
      alert(`Login with Email: ${formData.email}`);
    }
    onLogin();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col md:flex-row items-center justify-center overflow-hidden">
      {/* Left Side */}
      <motion.div
        className="flex-1 h-full flex flex-col items-center justify-center text-white p-6 md:p-12 space-y-4"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">LitigateIQ</h1>
        <p className="text-base md:text-lg text-gray-200">
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
        className={`flex-1 bg-white flex flex-col justify-center p-4 md:p-6 rounded-lg shadow-xl space-y-3 md:max-w-md md:mr-[8%] h-auto`}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800">
          {isSignUp ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-3">
          {isSignUp && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 text-sm"
                />
              </div>
              {/* <div>
                <label htmlFor="country" className="block text-xs font-medium text-gray-700">
                  Country
                </label>
                <Input
                  type="text"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="mt-1 text-sm"
                />
              </div> */}
              {/* <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 text-sm"
                />
              </div> */}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 text-sm"
            />
          </div>
          {isSignUp && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 text-sm"
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-sm"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="relative flex items-center justify-center py-3">
          <div className="absolute inset-0 border-t border-gray-300"></div>
          <span className="bg-white px-3 text-gray-500 text-xs">OR</span>
        </div>

        <Button
          onClick={handleOAuthLogin}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 text-sm"
        >
          <FaGoogle className="mr-2" /> Continue with Google
        </Button>

        <p className="text-xs text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
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
