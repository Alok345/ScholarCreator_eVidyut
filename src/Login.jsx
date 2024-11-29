'use client'

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "./lib/firebase";
import bcryptjs from "bcryptjs";

const db = getFirestore(app);

const Login = ({ isOpen, onLogin, setUser, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("LoginComponent mounted");
    return () => console.log("LoginComponent unmounted");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login attempt with email:", email);

    try {
      const userDoc = await getDoc(doc(db, "users", email));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const isPasswordMatch = await bcryptjs.compare(password, userData.password);
        const isVerified = userData.emailVerified;

        if (isPasswordMatch && isVerified) {
          const isAdmin = userData.isAdmin;
          localStorage.setItem("isAdmin", isAdmin.toString());
          localStorage.setItem("userEmail", email);
          toast.success("Login successful!");
          setUser(userData);
          onLogin(userData);
          onClose();

          // Navigate based on isAdmin status
          if (isAdmin) {
            navigate("/admin-dashboard");
          } else {
            navigate("/scholar-main");
          }
        } else if (!isVerified) {
          toast.error("Email not verified");
        } else {
          setError("Incorrect password");
          toast.error("Incorrect password");
        }
      } else {
        toast.error("User not found. Please sign up first!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  if (!isOpen) {
    console.log("Login modal is closed");
    return null;
  }

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="p-6">
          <div className="flex justify-center mb-4 bg-gray-500 rounded-2xl">
            <img src="/placeholder.svg?height=64&width=64" alt="WE MAKE SCHOLARS Logo" className="h-16 p-1" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">
            The most trusted Education Finance Platform supported by the Government
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-yellow-500 border border-yellow-600 hover:bg-yellow-600 text-black"
            >
              Login
            </Button>
          </form>
          <div className="flex justify-between mt-4">
            <Link to="/signup" className="text-black">
              <button className="hover:text-yellow-600">Sign Up</button>
            </Link>
            <Link to="/forgot-password" className="text-black">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;