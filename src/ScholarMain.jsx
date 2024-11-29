import React, { useState, useEffect } from "react";
import { Search } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import AppHeader, { LoginModal } from "./HeaderWrapper";
import Login from "./Login";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function ScholarMain() {
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    nationality: "",
    studyLevel: [],
    country: [],
    field: [],
    scholarshipType: "",
  });
  const [visibleScholarships, setVisibleScholarships] = useState(3);
  const [scholarships, setScholarships] = useState([]);
  const [companyScholarships, setCompanyScholarships] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchScholarships();
    fetchCompanyScholarships();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      nationality: params.get("nationality") || "",
      studyLevel: params.getAll("studyLevel"),
      country: params.getAll("country"),
      field: params.getAll("field"),
      scholarshipType: "",
    };
    setSelectedFilters(newFilters);
    filterScholarships(newFilters);
  }, [location.search, scholarships, companyScholarships]);

  const fetchUserDetails = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      try {
        const userDocRef = doc(db, "users", userEmail);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  const fetchScholarships = async () => {
    try {
      const scholarshipsCollection = collection(db, "addScholarship");
      const querySnapshot = await getDocs(scholarshipsCollection);
      const scholarshipsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        companyLogo: doc.data().companyLogo,
        companyUrl: doc.data().companyUrl,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        deadline: doc.data().deadline,
        eligibilityCriteria: doc.data().eligibilityCriteria,
        eligibleDegrees: doc.data().eligibleDegrees,
        eligibleNationalities: doc.data().eligibleNationalities,
        fundingType: doc.data().fundingType,
        numberOfScholarships: doc.data().numberOfScholarships,
        scholarshipLocation: doc.data().scholarshipLocation,
        scholarshipName: doc.data().scholarshipName,
        scholarshipType: doc.data().scholarshipType,
        isCompanyScholarship: false,
      }));
      setScholarships(scholarshipsData);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      toast.error("Failed to load scholarships. Please try again later.");
    }
  };

  const fetchCompanyScholarships = async () => {
    try {
      const companyScholarshipsCollection = collection(db, "companyScholarships");
      const querySnapshot = await getDocs(companyScholarshipsCollection);
      const companyScholarshipsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        companyName: doc.data().companyName,
        deadline: doc.data().deadline,
        eligibleDegrees: doc.data().eligibleDegrees,
        eligibleNationalities: doc.data().eligibleNationalities,
        fundingType: doc.data().fundingType,
        numberOfScholarships: doc.data().numberOfScholarships,
        scholarshipLocation: doc.data().scholarshipLocation,
        scholarshipType: doc.data().scholarshipType,
        createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date(),
        isCompanyScholarship: true,
      }));
      setCompanyScholarships(companyScholarshipsData);
    } catch (error) {
      console.error("Error fetching company scholarships:", error);
      toast.error("Failed to load company scholarships. Please try again later.");
    }
  };

  const filterScholarships = (filters = selectedFilters) => {
    let filtered = [...scholarships, ...companyScholarships].filter((scholarship) => {
      const matchesSearch =
        (scholarship.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.eligibilityCriteria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.companyName?.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesNationality =
        !filters.nationality ||
        scholarship.eligibleNationalities?.toLowerCase().includes(filters.nationality.toLowerCase());

      const matchesStudyLevel =
        filters.studyLevel.length === 0 ||
        filters.studyLevel.some((level) =>
          scholarship.eligibleDegrees?.toLowerCase().includes(level.toLowerCase())
        );

      const matchesCountry =
        filters.country.length === 0 ||
        filters.country.some((country) =>
          scholarship.scholarshipLocation?.toLowerCase().includes(country.toLowerCase())
        );

      const matchesScholarshipType =
        !filters.scholarshipType ||
        scholarship.scholarshipType === filters.scholarshipType;

      return (
        matchesSearch &&
        matchesNationality &&
        matchesStudyLevel &&
        matchesCountry &&
        matchesScholarshipType
      );
    });

    filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return b.createdAt - a.createdAt;
      } else {
        return a.createdAt - b.createdAt;
      }
    });

    setFilteredScholarships(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterScholarships({ ...selectedFilters, searchTerm: e.target.value });
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    filterScholarships(newFilters);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    filterScholarships();
  };

  const handleApply = async (scholarship) => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      localStorage.setItem('redirectAfterLogin', location.pathname);
      setIsLoginModalOpen(true);
      return;
    }

    if (!userDetails) {
      toast.error("User details not found. Please try logging in again.");
      return;
    }

    try {
      const enquiryDocRef = await addDoc(
        collection(db, "ScholarshipEnquiries"),
        {
          scholarshipTitle: scholarship.scholarshipName || scholarship.companyName,
          Email: userEmail,
          Name: userDetails.fullName,
          Phone: userDetails.phoneNumber,
          appliedAt: new Date(),
          status: "pending",
        }
      );
      toast.success("Application submitted successfully");

      if (scholarship.companyUrl) {
        window.location.href = scholarship.companyUrl;
      } else {
        toast.error("Company URL not found for this scholarship");
      }
    } catch (error) {
      console.error("Error in application process: ", error);
      toast.error("Error submitting application. Please try again.");
    }
  };

  const loadMore = () => {
    setVisibleScholarships((prevVisible) => prevVisible + 3);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !question) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "UserScholarshipPageQuestions"), {
        name,
        email,
        phone,
        question,
        submittedAt: new Date(),
      });
      toast.success("Your question has been submitted successfully");
      setName("");
      setEmail("");
      setPhone("");
      setQuestion("");
    } catch (error) {
      console.error("Error submitting question:", error);
      toast.error("Failed to submit your question. Please try again later.");
    }
  };

  const filters = [
    {
      name: "Nationality",
      type: "nationality",
      options: [
        "USA",
        "India",
        "UK",
        "Canada",
        "Australia",
        "EU",
        "Non-US",
        "Developing countries",
      ],
    },
    {
      name: "I'm looking for",
      type: "studyLevel",
      options: ["Bachelors", "Masters", "PhD", "Diploma", "MBA"],
    },
    {
      name: "Countries interested",
      type: "country",
      options: [
        "USA",
        "UK",
        "Canada",
        "Germany",
        "Australia",
        "European Union",
      ],
    },
    {
      name: "Scholarship type",
      type: "scholarshipType",
      options: [
        "Full Funding",
        "Partial Funding",
        "Tuition Waiver",
        "Living Expenses",
        "Internship",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          Study Abroad Scholarships For International Students
        </h1>

        <div className="flex space-x-8">
          <div className="w-1/4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {filters.map((filter, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filter.name}
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  onChange={(e) =>
                    handleFilterChange(filter.type, e.target.value)
                  }
                  value={selectedFilters[filter.type]}
                >
                  <option value="">Select {filter.name}</option>
                  {filter.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="w-1/2">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow mr-4">
                <input
                  type="text"
                  placeholder="Search specific keywords only. Ex: Microbiology, Commonwealth..."
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-4"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <select
                className="border border-gray-300 rounded-md shadow-sm py-2 px-3"
                onChange={handleSortChange}
                value={sortOrder}
              >
                <option value="newest">Date posted</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>

            {filteredScholarships
              .slice(0, visibleScholarships)
              .map((scholarship, index) => (
                <div
                  key={scholarship.id}
                  className="bg-white rounded-lg shadow-md p-6 mb-6"
                >
                  {scholarship.featured && (
                    <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mb-2">
                      Featured
                    </span>
                  )}
                  {scholarship.isCompanyScholarship && (
                    <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mb-2 ml-2">
                      COMPANY
                    </span>
                  )}
                  <div className="flex items-start">
                    <img
                      src={
                        scholarship.companyLogo ||
                        "https://c8.alamy.com/comp/J9HMNA/scholarship-badge-J9HMNA.jpg"
                      }
                      alt={`${scholarship.scholarshipName || scholarship.companyName} Logo`}
                      className="w-16 h-16 mr-4 object-contain"
                    />
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">
                        {scholarship.scholarshipName || scholarship.companyName}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {scholarship.eligibleDegrees && (
                          <div>
                            <p className="text-sm font-medium">Eligible Degrees:</p>
                            <p className="text-sm">{scholarship.eligibleDegrees}</p>
                          </div>
                        )}
                        {scholarship.fundingType && (
                          <div>
                            <p className="text-sm font-medium">Funding Type:</p>
                            <p className="text-sm">{scholarship.fundingType}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium">Number of Scholarships:</p>
                          <p className="text-sm">{scholarship.numberOfScholarships}</p>
                        </div>
                        {scholarship.eligibleNationalities && <div>
                            <p className="text-sm font-medium">Eligible Nationalities:</p>
                            <p className="text-sm">{scholarship.eligibleNationalities}</p>
                          </div>
                        }
                        {scholarship.scholarshipLocation && (
                          <div>
                            <p className="text-sm font-medium">Scholarship can be taken at:</p>
                            <p className="text-sm">{scholarship.scholarshipLocation}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium">Scholarship Type:</p>
                          <p className="text-sm">{scholarship.scholarshipType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      {scholarship.deadline && (
                        <div className="bg-red-600 text-white px-4 text-sm font-medium py-1 rounded-md mb-2">
                          Deadline
                          <br />
                          <span className="text-xs text-white">{scholarship.deadline}</span>
                        </div>
                      )}
                      <button
                        className="mt-5 relative px-4 py-1 border-red-800 text-lg font-semibold rounded-lg bg-gradient-to-r from-red-500 to-yellow-600 text-white shadow-lg hover:from-blue-500 hover:to-blue-700 hover:text-white hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#189E8C] overflow-hidden backdrop-blur-md"
                        onClick={() => handleApply(scholarship)}
                      >
                        <span className="absolute inset-0 border border-transparent rounded-lg animate-border bg-gradient-to-r from-red-500 via-yellow-500 to-yellow-600 backdrop-blur-md"></span>
                        <span className="relative">Apply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            {visibleScholarships < filteredScholarships.length && (
              <div className="text-center mt-4">
                <button
                  onClick={loadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  Load More
                </button>
              </div>
            )}
          </div>

          <div className="w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-6">
                We will help you get Scholarships
              </h2>
              <form onSubmit={handleQuestionSubmit}>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </label>
                <label className="block mt-4">
                  <span className="block text-sm font-medium text-slate-700">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </label>
                <label className="block mt-4">
                  <span className="block text-sm font-medium text-slate-700">Mobile</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </label>
                <label className="block mt-4">
                  <span className="block text-sm font-medium text-slate-700">Your Question</span>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    rows="4"
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-6"
                >
                  Ask your question
                </button>
              </form>
            </div>
          </div>
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      </main>
    </div>
  );
}

export default ScholarMain;