import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EducationLoanPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "educationLoanEnquiries"), {
        fullName,
        email,
        nationality,
        purpose,
        loanAmount: parseFloat(loanAmount),
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      // Reset form fields
      setFullName("");
      setEmail("");
      setNationality("");
      setPurpose("");
      setLoanAmount("");
      alert("Education Loan Enquiry submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting enquiry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-400 text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:mr-8 md:w-1/2">
            <h1 className="text-4xl font-bold mb-2">Education Loan</h1>
            <p className="text-xl">
              Know about everything starting from the basics of an Education
              Loan, The process, and Types of Education Loans, etc.
            </p>
          </div>
          <Card className="w-full md:w-1/2 bg-white text-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Check your Education Loan Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="fullName"
                    placeholder="Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="nationality"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select your Nationality *
                  </label>
                  <Select value={nationality} onValueChange={setNationality}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nationality" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white">
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="purpose"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Purpose of Loan *
                  </label>
                  <Input
                    id="purpose"
                    placeholder="Purpose of Loan"
                    required
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="loanAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Loan Amount *
                  </label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="Loan Amount"
                    required
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-teal-600"
                >
                  Submit Enquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <a
                  href="#what-is-education-loan"
                  className="text-blue-600 hover:underline"
                >
                  What Is An Education Loan?
                </a>
              </li>
              <li>
                <a
                  href="#secured-vs-unsecured"
                  className="text-blue-600 hover:underline"
                >
                  Secured vs Unsecured Education Loans
                </a>
              </li>
              <li>
                <a
                  href="#comparing-loans"
                  className="text-blue-600 hover:underline"
                >
                  Comparing Education Loans from Different Banks & NBFC
                </a>
              </li>
              <li>
                <a href="#top-nbfcs" className="text-blue-600 hover:underline">
                  Top 4 Education Loan NBFCs in India
                </a>
              </li>
              <li>
                <a
                  href="#how-to-apply"
                  className="text-blue-600 hover:underline"
                >
                  How to Apply for an Education Loan Online?
                </a>
              </li>
              <li>
                <a
                  href="#documents-needed"
                  className="text-blue-600 hover:underline"
                >
                  Documents Needed to Apply for an Education Loan
                </a>
              </li>
              <li>
                <a
                  href="#calculate-emi"
                  className="text-blue-600 hover:underline"
                >
                  How to Calculate EMI for Education Loans?
                </a>
              </li>
              <li>
                <a
                  href="#loan-repayment"
                  className="text-blue-600 hover:underline"
                >
                  Education Loan Repayment
                </a>
              </li>
              <li>
                <a
                  href="#loan-eligibility"
                  className="text-blue-600 hover:underline"
                >
                  Education Loan Eligibility
                </a>
              </li>
              <li>
                <a
                  href="#cibil-score"
                  className="text-blue-600 hover:underline"
                >
                  CIBIL Score for An Education Loan
                </a>
              </li>
            </ol>
          </div>
          <div className="md:w-1/3">
            <Card className="bg-white text-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Top Banks for Education Loan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="#sbi" className="text-black hover:underline">
                      SBI Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#hdfc" className="text-black hover:underline">
                      HDFC Education Loan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#bank-of-baroda"
                      className="text-black hover:underline"
                    >
                      Bank of Baroda Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#canara" className="text-black hover:underline">
                      Canara Bank Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#avanse" className="text-black hover:underline">
                      Avanse Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#axis" className="text-black hover:underline">
                      Axis Bank Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#icici" className="text-black hover:underline">
                      ICICI Bank Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#pnb" className="text-black hover:underline">
                      Punjab National Bank Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#union" className="text-black hover:underline">
                      Union Bank of India Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#kotak" className="text-black hover:underline">
                      Kotak Mahindra Bank Education Loan
                    </a>
                  </li>
                  <li>
                    <a href="#idbi" className="text-black hover:underline">
                      IDBI Bank Education Loan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#hdfc-credila"
                      className="text-black hover:underline"
                    >
                      HDFC Credila Education Loan
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducationLoanPage;
