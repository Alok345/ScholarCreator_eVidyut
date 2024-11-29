import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const EducationLoanHero = () => {
  return (
    <div className="relative bg-gradient-to-b from-orange-400 to-green-100 min-h-[600px]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">
              Education Loan for{" "}
              <span className="text-white">Abroad Studies</span>
            </h1>
            <p className="text-gray-700">
              Explore eligibility, process and get a free profile evaluation
            </p>
            <Link to="/check-loan-eligibility">
              <Button className="bg-white text-gray-800 hover:bg-gray-100">
                Check Eligibility
              </Button>
            </Link>
          </div>

          {/* Right Column */}
          <div className="space-y-6 text-right">
            <h2 className="text-3xl font-bold">
              Kickstart your Loan
              <div className="text-purple-600">Application Process</div>
            </h2>
            <p className="text-gray-700">
              Compare customized education loan options
            </p>
            <Link to="/check-loan-eligibility">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Apply now
              </Button>
            </Link>
          </div>

          {/* Center Illustration */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-64 h-64">
              <img
                src="/placeholder.svg?height=256&width=256"
                alt="Students Illustration"
                className="w-full h-full object-contain"
              />
              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 bg-purple-100 p-2 rounded-full">
                <span className="text-2xl">📚</span>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-100 p-2 rounded-full">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-100 p-2 rounded-full">
                <span className="text-2xl">✈️</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-100 p-2 rounded-full">
                <span className="text-2xl">💼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 mt-16 bg-white rounded-t-3xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            Education Loan for Abroad Studies
          </h2>
          <p className="text-gray-600 text-center mb-8">
            All you need to know about education loans for studying abroad
          </p>
          
          <div className="flex items-center gap-4 mb-8">
            <img
              src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
              alt="Author"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Anshu Singh</h3>
              <p className="text-sm text-gray-600">Study Abroad Expert</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <nav className="space-y-2">
                <a href="#what-are-education-loans" className="block p-2 hover:bg-gray-100 rounded">
                  What are education loans?
                </a>
                <a href="#types-of-education-loans" className="block p-2 hover:bg-gray-100 rounded">
                  Types of Education Loans
                </a>
                <a href="#eligibility-criteria" className="block p-2 hover:bg-gray-100 rounded">
                  Eligibility Criteria
                </a>
                <a href="#required-documents" className="block p-2 hover:bg-gray-100 rounded">
                  Required Documents
                </a>
                <a href="#best-lenders" className="block p-2 hover:bg-gray-100 rounded">
                  Best Lenders
                </a>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
              <section id="what-are-education-loans">
                <h4 className="text-xl font-semibold">What are education loans?</h4>
                <p className="text-gray-700">
                  An education loan is a financial aid that students apply for to fund their studies abroad. 
                  Different banks and financial institutions offer these loans at competitive interest rates, 
                  making quality education more affordable for students.
                </p>
                <p className="text-gray-700">
                  These loans typically cover tuition fees, living expenses, travel costs, and other education-related expenses. 
                  They often come with flexible repayment options, allowing students to focus on their studies and start repayment 
                  after completing their course or finding employment.
                </p>
              </section>

              <section id="types-of-education-loans">
                <h4 className="text-xl font-semibold">Types of Education Loans</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Secured Education Loans: Require collateral and often have lower interest rates.</li>
                  <li>Unsecured Education Loans: Don't require collateral but may have higher interest rates.</li>
                  <li>Government-sponsored Education Loans: Offered by government institutions with favorable terms.</li>
                  <li>Private Education Loans: Provided by private banks and financial institutions.</li>
                </ul>
              </section>

              <section id="eligibility-criteria">
                <h4 className="text-xl font-semibold">Eligibility Criteria</h4>
                <p className="text-gray-700">
                  Eligibility criteria for education loans may vary depending on the lender, but generally include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Admission to a recognized institution</li>
                  <li>Academic performance</li>
                  <li>Age requirements</li>
                  <li>Cosigner or guarantor (in some cases)</li>
                  <li>Nationality and residency status</li>
                </ul>
              </section>

              <section id="required-documents">
                <h4 className="text-xl font-semibold">Required Documents</h4>
                <p className="text-gray-700">
                  Common documents required for education loan applications include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Completed loan application form</li>
                  <li>Proof of admission to the educational institution</li>
                  <li>Academic records and certificates</li>
                  <li>Identification and address proof</li>
                  <li>Income proof of the applicant/co-applicant</li>
                  <li>Bank statements</li>
                  <li>Collateral documents (for secured loans)</li>
                </ul>
              </section>

              <section id="best-lenders">
                <h4 className="text-xl font-semibold">Best Lenders</h4>
                <p className="text-gray-700">
                  Some of the top lenders for education loans include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>State Bank of India (SBI)</li>
                  <li>HDFC Credila</li>
                  <li>Axis Bank</li>
                  <li>Bank of Baroda</li>
                  <li>Punjab National Bank</li>
                  <li>Prodigy Finance (for international students)</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  It's important to compare loan offers from multiple lenders to find the best terms and interest rates for your specific needs.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationLoanHero;