import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScholarshipInfo = () => {
  const navigate = useNavigate();

  const handleFillForm = () => {
    navigate('/scholarship-form');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Company Scholarship Information
        </h1>
        <p className="text-gray-600 mb-6 text-justify">
          Our company is proud to offer a scholarship program designed to support ambitious students in their educational journey. This scholarship aims to recognize and reward outstanding academic achievement, leadership potential, and community involvement.
        </p>

        {/* Eligibility Criteria */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Eligibility Criteria
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
          <li>Must be currently enrolled or accepted in an accredited college or university.</li>
          <li>Minimum GPA of 3.5 on a 4.0 scale.</li>
          <li>Demonstrated leadership experience and community involvement.</li>
          <li>Strong academic record and extracurricular achievements.</li>
          <li>Must be a permanent resident of the country offering the scholarship.</li>
          <li>Preference may be given to students from underserved communities.</li>
        </ul>

        {/* Scholarship Details */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Scholarship Details
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
          <li>Award amount: $5,000</li>
          <li>Application deadline: August 31, 2023</li>
          <li>Winners will be notified by: September 30, 2023</li>
          <li>Scholarship tenure: One academic year.</li>
          <li>Funds will be directly transferred to the institution’s account.</li>
        </ul>

        {/* Application Process */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Application Process
        </h2>
        <p className="text-gray-600 mb-6">
          To apply for this scholarship, please fill out the application form by clicking the button below. You will need to provide personal information, academic details, and upload supporting documents including your transcript, resume, and a personal essay.
        </p>
        <p className="text-gray-600 mb-6">
          Make sure all the information provided is accurate. Any discrepancies may lead to disqualification.
        </p>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={handleFillForm}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Fill Scholarship Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipInfo;
