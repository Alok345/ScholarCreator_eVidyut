'use client'

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaRedditAlien,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/lib/firebase"; // Make sure this path is correct

const auth = getAuth(app);
const db = getFirestore(app);

const socialIcons = [
  { Icon: FaFacebookF, color: "bg-blue-600" },
  { Icon: FaRedditAlien, color: "bg-red-500" },
  { Icon: FaTwitter, color: "bg-blue-400" },
  { Icon: FaInstagram, color: "bg-pink-600" },
  { Icon: FaLinkedinIn, color: "bg-blue-700" },
  { Icon: FaYoutube, color: "bg-red-600" },
];

const footerLinks = [
  {
    title: "By subject",
    links: [
      "Arts Scholarships",
      "Architecture Scholarships",
      "Sports Scholarships",
      "Engineering Scholarships",
      "Law Scholarships",
      "MBA scholarships",
      "Undergraduate Scholarships",
      "Masters Scholarships",
      "PhD Scholarships",
      "Post-Doc Fellowships",
      "Scholarships for women",
      "Postgraduate scholarships",
    ],
  },
  {
    title: "By nationality",
    links: [
      "International Scholarships",
      "Scholarships for India",
      "Scholarships for Pakistani",
      "Scholarships for China",
      "Scholarships for UK",
      "Scholarships for Malaysia",
      "Scholarships for Canada",
      "Scholarships for School",
      "Scholarships for African",
      "Fulbright Scholarships",
      "Commonwealth Scholarship",
      "Inspire fellowship",
    ],
  },
  {
    title: "By country of interest",
    links: [
      "US Scholarships",
      "UK Scholarships",
      "Canada Scholarships",
      "India Scholarships",
      "China Scholarships",
      "Germany Scholarship",
      "Japan Scholarships",
      "Australia Scholarships",
      "New Zealand Scholarships",
      "Europe Scholarships",
      "Singapore Scholarship",
      "Malaysia Scholarships",
    ],
  },
  {
    title: "Education Loans",
    links: [
      "Education Loan",
      "SBI Education Loan",
      "Bank of Baroda Education Loan",
      "Avanse Education Loan",
      "Canara Education Loan",
      "Incred Education Loan",
      "Punjab National Bank Education Loan",
      "Auxilo Bank Education Loan",
      "ICICI Bank Education Loan",
      "VidyaLoans",
    ],
  },
];

const companyLinks = [
  { title: "We're hiring!", href: "/careers" },
  { title: "About us", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "FAQs", href: "/faqs" },
  { title: "Contact us", href: "/contact" },
];

const legalLinks = [
  { title: "Terms & Conditions", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Media coverage", href: "/media" },
  { title: "Sitemap", href: "/sitemap" },
];

const partnerLinks = [
  { title: "Partner Login", href: "/partner-login" },
  { title: "International Campus Delegate Program", href: "/campus-delegate" },
  { title: "Consultancy Preferred Partners", href: "/preferred-partners" },
  { title: "Report a error", href: "/report-error" },
];

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
      // Use Firebase Authentication to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = { ...userDoc.data(), uid: user.uid };
        localStorage.setItem("isAdmin", userData.isAdmin ? "true" : "false");
        localStorage.setItem("userEmail", email);
        toast.success("Login successful!");
        setUser(userData);
        onLogin(userData);
        onClose();

        // Navigate based on isAdmin status
        if (userData.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/scholar-main");
        }
      } else {
        throw new Error("User data not found");
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
            <img src="../src/assets/logo.png" alt="WE MAKE SCHOLARS Logo" className="h-16 p-1" />
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

const PageNotFound = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl text-center">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-xl mb-6">The page you're looking for doesn't exist or is not available.</p>
      <Button onClick={onClose} className="bg-yellow-500 hover:bg-yellow-600 text-black">
        Go Back
      </Button>
    </div>
  </div>
);

export default function Footer() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPageNotFoundOpen, setIsPageNotFoundOpen] = useState(false);
  const [lastClickedLink, setLastClickedLink] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getDoc(doc(db, "users", currentUser.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = { ...docSnap.data(), uid: currentUser.uid };
              setUser(userData);
              localStorage.setItem("isAdmin", userData.isAdmin ? "true" : "false");
              localStorage.setItem("userEmail", currentUser.email);
            } else {
              console.log("No user data found in Firestore");
              setUser({ email: currentUser.email, uid: currentUser.uid });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } 
      else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setLastClickedLink(href);

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setIsLoginModalOpen(true);
    } else {
      // Check if the href is a valid route
      const validRoutes = ['/admin-dashboard', '/scholar-main', '/careers', '/about', '/blog', '/testimonials', '/faqs', '/contact', '/terms', '/privacy', '/media', '/sitemap', '/partner-login', '/campus-delegate', '/preferred-partners', '/report-error'];
      
      if (validRoutes.includes(href)) {
        navigate(href);
      } else {
        setIsPageNotFoundOpen(true);
      }
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closePageNotFound = () => {
    setIsPageNotFoundOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
    if (lastClickedLink) {
      handleLinkClick({ preventDefault: () => {} }, lastClickedLink);
    }
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <span className="mr-4">Connect with us</span>
          <div className="flex space-x-2">
            {socialIcons.map(({ Icon, color }, index) => (
              <a key={index} href="#" className={`${color} p-2 rounded-full`} onClick={(e) => handleLinkClick(e, '#')}>
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-white transition-colors" onClick={(e) => handleLinkClick(e, '#')}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {partnerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Scholar Creator</h3>
            <p className="text-sm">
              ScholarCreator is a Not-just-for-Profit organization and India's
              Largest Education Finance Platform assisting students with
              scholarships and education loans to study abroad and study in
              India.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 text-sm">
          <p>
            All Content,
Logo, Company names and any other subject of
            intellectual property are registered trademarks of their respective
            owners. Display of such intellectual property on ScholarCreator.com
            does not imply any partnership, affiliation with or endorsement by
            them.
          </p>
        </div>
      </div>
      <Login 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
        onLogin={handleLogin}
        setUser={setUser}
      />
      {isPageNotFoundOpen && <PageNotFound onClose={closePageNotFound} />}
    </footer>
  );
}

