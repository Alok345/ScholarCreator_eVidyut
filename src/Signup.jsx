import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { z } from "zod";
import { toast } from "react-hot-toast";
import bcrypt from "bcryptjs";
import { app } from "./lib/firebase";

const db = getFirestore(app);
const auth = getAuth(app);

// Zod schema for form validation
const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  nationality: z.string().min(1, "Please select a nationality"),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  referralCode: z.string().optional(),
});

// Dropdown options
const dropdownOptions = {
  nationality: ["USA", "UK", "Canada", "Australia", "India"],
};

const generateReferralCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validate form data with Zod
      signupSchema.parse({
        fullName,
        email,
        password,
        phoneNumber,
        address,
        nationality,
        agreeTerms,
        referralCode,
      });

      // Check if referral code exists and matches any user's referral code
      if (referralCode) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("referralCode", "==", referralCode));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          throw new Error("Invalid referral code.");
        }
      }

      // Generate new referral code for the user
      const newReferralCode = generateReferralCode();

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user data to Firestore
      await setDoc(doc(db, "users", email), {
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        nationality,
        isAdmin: false,
        createdAt: new Date(),
        emailVerified: false,
        referralCode: newReferralCode, // Save new referral code for this user
        referredBy: referralCode || null, // Save the referral code they used, if any
        // referredBy: fullName || null, // Save the referral code they used, if any
      });

      toast.success(
        "Signup successful! Please check your email to verify your account."
      );
      navigate("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(`Error during signup: ${error.message}`);
        console.error("Error during signup:", error);
      }
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="flex font-sans">
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-4xl font-bold mb-4">
          3 Million+ signed up to fund their dream education
        </h1>
        <p className="mb-6 text-gray-600">
          Funded & Supported by the IT Ministry, Govt. of India
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block mb-1 text-sm font-medium"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-1 text-sm font-medium"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1 text-sm font-medium">
              Address *
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="nationality"
              className="block mb-1 text-sm font-medium"
            >
              Select your Nationality *
            </label>
            <select
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">-- Select Nationality --</option>
              {dropdownOptions.nationality.map((nation) => (
                <option key={nation} value={nation}>
                  {nation}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="referralCode"
              className="block mb-1 text-sm font-medium"
            >
              Referral Code (Optional)
            </label>
            <input
              type="text"
              id="referralCode"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              className="mr-2"
            />
            <label htmlFor="agreeTerms" className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-600 hover:underline">
                Privacy policy
              </a>
            </label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-black rounded hover:bg-yellow-600"
          >
            ✓ Sign Up
          </button>
        </form>
        <Link to="/">
          <p className="mt-4 text-end text-sm">Already a user?</p>
        </Link>
      </div>
      <div className="flex-1 p-8 bg-yellow-300 text-gray-800">
        <h2 className="text-2xl font-bold mb-2">
          5,500+ Scholarships won globally
        </h2>
        <p className="mb-6">
          Get access to 50,000+ International Scholarships worth over $1 Billion
        </p>
      </div>
    </div>
  );
}

