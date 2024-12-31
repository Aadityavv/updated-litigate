"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typewriter } from "react-simple-typewriter";

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

  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];

  const handleOAuthLogin = async () => {
    // Mock OAuth2 login
    alert("OAuth Login - Redirect to Google or other providers");
    onLogin(); // Log in after successful OAuth
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      alert("Sign-Up with Email and Password: " + email);
    } else {
      alert("Login with Email and Password: " + email);
    }
    onLogin(); // Log in after successful form submission
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center bg-blue-600 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold">LitigateIQ</h1>
          <p className="mt-6 text-lg">
            <Typewriter
              words={[randomTagline]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
            />
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleFormSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
        <div className="my-6 text-center text-sm text-gray-500">OR</div>
        <div className="w-full max-w-md">
          <Button
            onClick={handleOAuthLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Continue with Google
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
}
