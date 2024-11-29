import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchForm from "./SearchForm";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import EducationLoanPage from "./EducationLoanPage";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";

import { firebaseConfig } from "./lib/firebaseConfig";
import { Toaster } from "react-hot-toast";
import ScholarMain from "./ScholarMain";
import Profile from "./Profile";
import Services from "./Services";
import HeaderWrapper from "./HeaderWrapper";
import Dashboard from "./Dashboard";
import VerifyEmail from "./verifyEmail";
import Referral from "./referral";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("userEmail"));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in: ", error);
    });
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-100">
              <main className="container mx-auto px-4 py-8">
                <HeaderWrapper user={user} signIn={signIn} />
                <Routes>
                  <Route path="/" element={<SearchForm />} />
                  <Route
                    path="/education-loan"
                    element={<EducationLoanPage />}
                  />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/scholar-main" element={<ScholarMain />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/referral" element={<Referral/>} />
                  <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
                {/* <Testimonials /> */}
                <Partners />
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;