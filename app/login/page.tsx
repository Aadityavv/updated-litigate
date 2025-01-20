"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.success) {
            alert("Login successful!");
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginPage;
