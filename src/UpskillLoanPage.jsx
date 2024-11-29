// UpskillLoanPage.jsx
import React, { useState } from 'react';

const LoanTypeCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <img src={icon} alt={title} className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ProcessStep = ({ icon, title, step }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <img src={icon} alt={title} className="w-16 h-16 mb-4" />
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
          {step}
        </span>
      </div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onClick}
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="pb-4">{content}</div>}
    </div>
  );
};

export default function UpskillLoanPage() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Interest-Free Education
              <br />
              Loans For Upskilling Courses
            </h1>
            <p className="text-gray-600 mb-8">
              Get guidance in all the hassles of managing the educational courses fees,
              <br />
              school fees, college fees or coaching fees!
            </p>
            {/* <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Send OTP
              </button>
            </div> */}
          </div>
        </div>

        {/* Types of Loans */}
        <div className="my-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Types of Loans</h2>
            <p className="text-gray-600">Because we make your loan journey easier</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <LoanTypeCard
              title="Vocational Course Fee Financing"
              description="Get financial assistance to increase your skill set with vocational courses"
              icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhGxI_GAHlOi2mBSb33dwDGgzEbabXnPtow&s"
            />
            <LoanTypeCard
              title="College Fee Financing"
              description="Fund your college education with our flexible financing options"
              icon="https://thumbs.dreamstime.com/b/university-academy-school-course-logo-design-template-college-education-book-symbol-graphic-emblem-vector-business-171466862.jpg"
            />
            <LoanTypeCard
              title="School Fee Financing"
              description="Easy financing solutions for your child's school education"
              icon="https://c8.alamy.com/comp/2F9869C/online-education-logo-design-template-online-course-logo-design-online-learning-logo-2F9869C.jpg"
            />
            <LoanTypeCard
              title="Coaching Fee Financing"
              description="Support for your coaching and test preparation needs"
              icon="https://img.freepik.com/premium-vector/coach-success-logo-coaching-dream-success-logo-design-template_144543-520.jpg"
            />
          </div>
        </div>

        {/* Statistics Card */}
        <div className="max-w-4xl mx-auto bg-purple-700 text-white rounded-2xl p-8 my-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-light mb-4">Scholar Creator - Your Trusted Financial Partner</h3>
              <p className="text-2xl font-bold">Our Aim is Seamless, Education for All</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold">500 +</p>
                <p className="text-sm">Institutions Partnered</p>
              </div>
              <div>
                <p className="text-3xl font-bold">10 +</p>
                <p className="text-sm">Lenders Onboard</p>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold">₹50 Cr.</p>
              <p className="text-sm">Loan Sanctions</p>
            </div>
          </div>
        </div>

        {/* Loan Process */}
        <div className="my-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-2">Loan Process</h2>
            <p className="text-gray-600">Roadmap to get your educational loan quickly without collateral</p>
          </div>
          <div className="flex justify-between max-w-4xl mx-auto">
            <ProcessStep
              step="1"
              title="Create a Loan Application"
              icon="https://d1i7580riw15wg.cloudfront.net/gd-assets/newui/notepad-check-a3af64727379d85b8f2bd610a85a8f0ba07533905cd2fd8f070301d7f3ebe972.webp"
            />
            <ProcessStep
              step="2"
              title="Provide Required Details"
              icon="https://d1i7580riw15wg.cloudfront.net/gd-assets/newui/details-ed6629310fa8bd0bd12bc1f3f42bff83af04069c29e790c68d2e81e750b8add7.webp"
            />
            <ProcessStep
              step="3"
              title="Get Loan Approval"
              icon="https://d1i7580riw15wg.cloudfront.net/gd-assets/newui/loan-approval-2c5dfa1bf39ff5a1a623a813b8366d272865e91519dd3687a5e4bdfdd5c3465f.webp"
            />
            <ProcessStep
              step="4"
              title="Get Fee Disbursed"
              icon="https://d1i7580riw15wg.cloudfront.net/gd-assets/newui/handshake-74f0b99f714a67d53dcb0c88aa251412bc2606e0c6e47d4a84f6d7a66653f2cc.webp"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto my-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <AccordionItem
              title="How do Scholar Creator short-term loans work?"
              content="Scholar Creator provides flexible short-term loans designed specifically for educational needs with simple application process and quick disbursement."
              isOpen={openItem === 0}
              onClick={() => toggleItem(0)}
            />
            <AccordionItem
              title="What is the interest rate applicable?"
              content="Our interest rates are competitive and vary based on the loan amount and tenure. Contact our team for detailed information."
              isOpen={openItem === 1}
              onClick={() => toggleItem(1)}
            />
            <AccordionItem
              title="Does my CIBIL score decide the interest rate?"
              content="Yes, your CIBIL score is one of the factors that influence the interest rate, along with other eligibility criteria."
              isOpen={openItem === 2}
              onClick={() => toggleItem(2)}
            />
            <AccordionItem
              title="How many members of a family can avail it?"
              content="Multiple members of the same family can apply for loans, each application is evaluated independently."
              isOpen={openItem === 3}
              onClick={() => toggleItem(3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}