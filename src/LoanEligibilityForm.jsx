import React, { useState } from "react";
import { db } from "./lib/firebase"; // Adjust this import path as needed
import { collection, addDoc } from "firebase/firestore/lite";

const LoanEligibilityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    whatsappNumber: "",
    courseStartYear: "",
    courseStartMonth: "",
    courseLevel: "",
    courseDegree: "",
    courseName: "",
    targetCountry: "",
    loanAmount: "",
    hasCollateral: false,
    monthlyIncome: "",
    pinCode: "",
    employmentStatus: "",
    workExperience: "",
    promoCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "loanApplications"), {
        ...formData,
        submittedAt: new Date(),
        status: "pending",
      });
      alert("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "",
        whatsappNumber: "",
        courseStartYear: "",
        courseStartMonth: "",
        courseLevel: "",
        courseDegree: "",
        courseName: "",
        targetCountry: "",
        loanAmount: "",
        hasCollateral: false,
        monthlyIncome: "",
        pinCode: "",
        employmentStatus: "",
        workExperience: "",
        promoCode: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Loan Application
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="mt-1  block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Course Start Year */}
              <div>
                <label htmlFor="courseStartYear" className="block text-sm font-medium text-gray-700">
                  Course Start Year
                </label>
                <input
                  type="number"
                  id="courseStartYear"
                  name="courseStartYear"
                  value={formData.courseStartYear}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Course Start Month */}
              <div>
                <label htmlFor="courseStartMonth" className="block text-sm font-medium text-gray-700">
                  Course Start Month
                </label>
                <select
                  id="courseStartMonth"
                  name="courseStartMonth"
                  value={formData.courseStartMonth}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                    (month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Course Level */}
              <div>
                <label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700">
                  Course Level
                </label>
                <select
                  id="courseLevel"
                  name="courseLevel"
                  value={formData.courseLevel}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Level</option>
                  {["Undergraduate", "Postgraduate", "Diploma", "PhD"].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course Degree */}
              <div>
                <label htmlFor="courseDegree" className="block text-sm font-medium text-gray-700">
                  Course Degree
                </label>
                <select
                  id="courseDegree"
                  name="courseDegree"
                  value={formData.courseDegree}
                  onChange={handleInputChange}
                  className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Degree</option>
                  {["BSc", "BA", "BCom", "MSc", "MA", "MBA", "Other"].map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course Name */}
              <div>
                <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <select
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  className="mt-1 block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Course</option>
                  {["Computer Science", "Business Administration", "Mechanical Engineering", "Civil Engineering", "Other"].map(
                    (course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Target Country */}
              <div>
                <label htmlFor="targetCountry" className="block text-sm font-medium text-gray-700">
                  Target Country
                </label>
                <select
                  id="targetCountry"
                  name="targetCountry"
                  value={formData.targetCountry}
                  onChange={handleInputChange}
                  className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Country</option>
                  {["USA", "Canada", "UK", "Australia", "Germany", "India"].map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Loan Amount */}
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
                  Loan Amount
                </label>
                <input
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

             

              {/* Monthly Income */}
              <div>
                <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
                  Monthly Income
                </label>
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Pin Code */}
              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Employment Status */}
              <div>
                <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">
                  Employment Status
                </label>
                <select
                  
id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Employment Status</option>
                  {["Employed", "Self-Employed", "Unemployed", "Student"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Work Experience */}
              <div>
                <label htmlFor="workExperience" className="block text-sm font-medium text-gray-700">
                  Work Experience (in years)
                </label>
                <input
                  type="number"
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              {/* Promo Code */}
              <div>
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">
                  Promo Code (Optional)
                </label>
                <input
                  type="text"
                  id="promoCode"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
               {/* Collateral */}
               <div>
                <label htmlFor="hasCollateral" className="block text-sm font-medium text-gray-700">
                  Do you have collateral?
                </label>
                <input
                  type="checkbox"
                  id="hasCollateral"
                  name="hasCollateral"
                  checked={formData.hasCollateral}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-5">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanEligibilityForm;

