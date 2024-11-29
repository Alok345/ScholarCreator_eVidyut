import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence, signOut } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';

// Import components
import Dashboard from './Dashboard';
import SearchForm from './SearchForm';
import Testimonials from './Testimonials';
import EducationLoanPage from './EducationLoanPage';
import Signup from './Signup';
import Profile from './Profile';
import VerifyEmail from './verifyEmail';
import Services from './Services';
import ScholarMain from './ScholarMain';
import Login from './Login';
import Referral from './referral';
import ScholarshipInfo from './ScholarshipInfo';
import CompanyScholarship from './CompanyScholarship';
import StudyAbroad from './StuduyAbroad';
import EducationLoanHero from './EducationAbroadInfo';
import AboutUs from './AboutUs';
import LoanEligibilityForm from './LoanEligibilityForm';
import HeaderWrapper from './HeaderWrapper';
import Partners from './Partners';
import Footer from './Footer';
import LoanComparison from './LoanComparison';
import Component from './UpskillLoanPage';
import OurLandingParteners from './OurLandingParteners';
import EMICalculator from './EMICalculator';

// Import Firebase configuration
import { firebaseConfig } from "../src/lib/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

const MainLayout = ({ children, user, signIn, logout }) => (
  <div className="min-h-screen bg-gray-100">
    <Toaster position="top-center" reverseOrder={false} />
    <main className="container mx-auto px-4 py-8">
      <HeaderWrapper user={user} signIn={signIn} logout={logout} />
      {children}
      <Partners />
    </main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    <Toaster position="top-center" reverseOrder={false} />
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error) => {
        console.error('Error signing in: ', error);
      });
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem('user');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin-dashboard" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        <Route path="/*" element={
          <MainLayout user={user} signIn={signIn} logout={logout}>
            <Routes>
              <Route path="/" element={<SearchForm />} />
              <Route path="/education-loan" element={<EducationLoanPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={ <Profile />} />
              {/* <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} /> */}
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/scholar-main" element={<ScholarMain />} />
              <Route path="/login" element={<Login />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/refer-friends" element={<Referral />} />
              <Route path="/loan-interest-rates" element={<LoanComparison />} />
              <Route path="/upskilling-loan" element={<Component />} />
              <Route path="/scholarship-info" element={<ScholarshipInfo />} />
              <Route path="/scholarship-form" element={<CompanyScholarship />} />
              <Route path="/lending-partners" element={<OurLandingParteners />} />
              <Route path="/study-abroad" element={<StudyAbroad />} />
              <Route path="/abroad-education-loan" element={<EducationLoanHero />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/emi-calculator" element={<EMICalculator />} />
              <Route path="/apply-for-loan" element={<LoanEligibilityForm />} />
              <Route path="/scholarships" element={<ScholarMain />} />
              <Route path="/check-loan-eligibility" element={<LoanEligibilityForm />} />
              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;

