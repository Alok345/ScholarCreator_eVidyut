import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { ChevronDown, DollarSign, LogOut, Settings, Star, User, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "./lib/firebase";
import logo from "./assets/logo.png";
import photo from "./assets/medium.png";
import Signup from "./Signup";

const auth = getAuth(app);
const db = getFirestore(app);

const UpperHeader = ({ onLoginClick, setLoginModalOpen, setShowSignup }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideButtons = location.pathname === "/signup";
  const [loansOpen, setLoansOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (path === "/signup") {
      setShowSignup(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <header
      className="flex justify-between items-center p-4 bg-gray-800 shadow-lg shadow-gray-500 rounded-2xl"
      style={{ height: "80px" }}
    >
      <div className="flex items-center p-4">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-30 mr-2" />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="relative"
          onMouseEnter={() => setLoansOpen(true)}
          onMouseLeave={() => setLoansOpen(false)}
        >
          <button 
            className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
            onClick={(e) => handleNavClick(e, "/loans")}
          >
            Loans <ChevronDown className="inline-block ml-1" size={12} />
          </button>
          {loansOpen && (
            <div className="absolute top-full left-0 bg-slate-800 shadow-md rounded-md py-2 w-48 z-10">
              <button
                onClick={(e) => handleNavClick(e, "/check-loan-eligibility")}
                className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
              >
                Check Loan Eligibility
              </button>
              <button
                onClick={(e) => handleNavClick(e, "/abroad-education-loan")}
                className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
              >
                Abroad Education Loan Overview
              </button>
              <button
                onClick={(e) => handleNavClick(e, "/lending-partners")}
                className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
              >
                Our Lending Partners
              </button>
              <button
                onClick={(e) => handleNavClick(e, "/loan-interest-rates")}
                className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
              >
                Loan Interest Rates
              </button>
              <button
                onClick={(e) => handleNavClick(e, "/refer-friends")}
                className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
              >
                Refer Friends
              </button>
              <button
                onClick={(e) => handleNavClick(e, "/emi-calculator")}
                className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
              >
                Education Loan EMI Calculator
              </button>
              <button
                onClick={(e) => handleNavClick(e, "/upskilling-loan")}
                className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
              >
                Loan for Upskilling Courses
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={(e) => handleNavClick(e, "/scholarships")}
          className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
        >
          Scholarships
        </button>
        <button 
          onClick={(e) => handleNavClick(e, "/study-abroad")}
          className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
        >
          Study Abroad
        </button>
        <button 
          onClick={(e) => handleNavClick(e, "/about-us")}
          className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
        >
          About Us
        </button>
        <button 
          onClick={(e) => handleNavClick(e, "/apply-for-loan")}
          className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
        >
          Apply for Loan
        </button>
        <button
          onClick={(e) => handleNavClick(e, "/scholarship-info")}
          className={`relative mr-10 px-3 py-2 text-sm transition-colors rounded-2xl bg-red-600 hover:bg-red-700 focus:outline-none ${
            location.pathname === "/scholarship-info"
              ? "text-blue-600"
              : "text-white"
          }`}
        >
          <span className="absolute inset-0 border-2 border-transparent rounded-xl font-extrabold animate-border bg-gradient-to-r from-red-500 via-blue-600 to-red-600"></span>
          <span className="relative">Our Scholarship</span>
        </button>
        {!hideButtons && (
          <>
            <button
              onClick={onLoginClick}
              className={`px-3 py-2 mr-5 text-sm rounded transition-colors ${
                location.pathname === "/login"
                  ? "text-blue-600"
                  : "text-black bg-yellow-500 hover:bg-yellow-600 "
              }`}
            >
              Login
            </button>
            <button
              onClick={(e) => handleNavClick(e, "/signup")}
              className={`px-3 py-2 text-sm rounded transition-colors ${
                location.pathname === "/signup"
                  ? "bg-blue-600 text-white"
                  : "bg-yellow-500 text-black hover:bg-yellow-600"
              }`}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

const LowerHeader = ({ user, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loansOpen, setLoansOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [eduLoansOpen, setEduLoansOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <header className="w-full bg-gray-800 shadow-lg shadow-gray-500 rounded-2xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="WE MAKE SCHOLARS" className="h-12" />
        </Link>
        <nav className="flex items-center space-x-6">
          <div
            className="relative"
            onMouseEnter={() => setLoansOpen(true)}
            onMouseLeave={() => setLoansOpen(false)}
          >
            <button 
              className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
              onClick={(e) => handleNavClick(e, "/loans")}
            >
              Loans <ChevronDown className="inline-block ml-1" size={12} />
            </button>
            {loansOpen && (
              <div className="absolute top-full left-0 bg-slate-800 shadow-md rounded-md py-2 w-48 z-10">
                <button
                  onClick={(e) => handleNavClick(e, "/check-loan-eligibility")}
                  className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
                >
                  Check Loan Eligibility
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "/abroad-education-loan")}
                  className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
                >
                  Abroad Education Loan Overview
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "/lending-partners")}
                  className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
                >
                  Our Lending Partners
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "/loan-interest-rates")}
                  className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
                >
                  Loan Interest Rates
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "/refer-friends")}
                  className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
                >
                  Refer Friends
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "/emi-calculator")}
                  className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
                >
                  Education Loan EMI Calculator
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "/upskilling-loan")}
                  className="block px-4 py-2 text-sm text-orange-300 hover:bg-gray-100 w-full text-left"
                >
                  Loan for Upskilling Courses
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={(e) => handleNavClick(e, "/scholarships")}
            className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
          >
            Scholarships
          </button>
          <button 
            onClick={(e) => handleNavClick(e, "/study-abroad")}
            className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
          >
            Study Abroad
          </button>
          <button 
            onClick={(e) => handleNavClick(e, "/about-us")}
            className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
          >
            About Us
          </button>
          <button 
            onClick={(e) => handleNavClick(e, "/apply-for-loan")}
            className="px-3 py-2 text-sm text-orange-300 rounded transition-colors hover:bg-gray-700"
          >
            Apply for Loan
          </button>
          <button
            onClick={(e) => handleNavClick(e, "/scholarship-info")}
            className={`relative mr-10 px-3 py-2 text-sm transition-colors rounded-2xl bg-red-600 hover:bg-red-700 focus:outline-none ${
              location.pathname === "/scholarship-info"
                ? "text-blue-600"
                : "text-white"
            }`}
          >
            <span className="absolute inset-0 border-2 border-transparent rounded-xl font-extrabold animate-border bg-gradient-to-r from-red-500 via-blue-600 to-red-600"></span>
            <span className="relative">Our Scholarship</span>
          </button>
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-200 hover:text-teal-600"
              >
                <img
                  src={photo}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.fullName || user.email}</span>
                <ChevronDown size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="inline-block mr-2" size={16} />
                    Profile
                  </Link>
                  <Link
                    to="/loan"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <DollarSign className="inline-block mr-2" size={16} />
                    Loan
                  </Link>
                  <Link
                    to="/shortlisted"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Star className="inline-block mr-2" size={16} />
                    Shortlisted & Applied
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="inline-block mr-2" size={16} />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="inline-block mr-2" size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", email));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.emailVerified) {
          const isAdmin = userData.isAdmin;
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("userEmail", email);
          toast.success("Login successful!");

          if (isAdmin) {
            onLogin(userData);
            onClose();
            navigate("/admin-dashboard");
          } else {
            onLogin(userData);
            onClose();
            navigate("/scholar-main");
          }
        } else {
          setError("Please verify your email before logging in");
          toast.error("Please verify your email before logging in");
        }
      } else {
        setError("User not found");
        toast.error("User not found");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error during login:", error);
      toast.error(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
            <img src={logo} alt="WE MAKE SCHOLARS Logo" className="h-16 p-1" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">
            Login to WE MAKE SCHOLARS
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
            <Link to="/forgot-password" className="text-black hover:text-yellow-600">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderWrapper = () => {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userEmail");
        setUser(null);
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        toast.error("Error signing out");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("userEmail", currentUser.email);
      } 
      else {
        setUser(null);
        localStorage.removeItem("userEmail");
        localStorage.removeItem("isAdmin");
      }
    });

    // Check for existing session on component mount
    const sessionUser = localStorage.getItem("userEmail");
    if (sessionUser) {
      setUser({ email: sessionUser });
    }

    return () => unsubscribe();
  }, []);

  const onLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("userEmail", userData.email);
    if (userData.isAdmin) {
      localStorage.setItem("isAdmin", "true");
    }
  };

  // Function to handle signup
  const handleSignup = async (email, password, fullName) => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Show toast message
      toast.success("Please verify your email to create an account");

      // Open login modal
      setLoginModalOpen(true);
      setShowSignup(false);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {user ? (
        <LowerHeader user={user} handleLogout={handleLogout} />
      ) : (
        <UpperHeader
          onLoginClick={() => setLoginModalOpen(true)}
          setLoginModalOpen={setLoginModalOpen}
          setShowSignup={setShowSignup}
        />
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={onLogin}
      />
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSignup={handleSignup}
        />
      )}
    </>
  );
};

export default HeaderWrapper;