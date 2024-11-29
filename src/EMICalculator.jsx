import React, { useState } from 'react';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2000000); // Default loan amount
  const [courseDuration, setCourseDuration] = useState(12); // Default course duration (months)
  const [interestRate, setInterestRate] = useState(10); // Default interest rate (%)
  const [loanTenure, setLoanTenure] = useState(5); // Default loan tenure (years)
  const [gracePeriod, setGracePeriod] = useState(0); // Default grace period (months)
  const [repaymentWhileStudying, setRepaymentWhileStudying] = useState(true); // Repayment choice
  const [disbursalOption, setDisbursalOption] = useState("Default"); // Disbursal option

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;

    // Calculate EMI using the formula: [P × r × (1 + r)^n] / [(1 + r)^n − 1]
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalInterest = emi * totalMonths - principal;
    const totalPayment = principal + totalInterest;

    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 px-4">
          {/* Form */}
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-xl font-bold mb-4">Calculate your Education Loan EMIs</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                <input
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  placeholder="Enter Loan Amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Duration (in Months)</label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(Number(e.target.value))}
                  className="mt-1 block w-full"
                />
                <p>{courseDuration} months</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rate of Interest (%)</label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-1 block w-full"
                />
                <p>{interestRate}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Tenure (in Years)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="mt-1 block w-full"
                />
                <p>{loanTenure} years</p>
              </div>
              <div className="flex items-center space-x-4">
                <span>Does Your Repayment Start While Studying?</span>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="repayment"
                    value="Yes"
                    checked={repaymentWhileStudying}
                    onChange={() => setRepaymentWhileStudying(true)}
                    className="form-radio"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="repayment"
                    value="No"
                    checked={!repaymentWhileStudying}
                    onChange={() => setRepaymentWhileStudying(false)}
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grace Period (in Months)</label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(Number(e.target.value))}
                  className="mt-1 block w-full"
                />
                <p>{gracePeriod} months</p>
              </div>
              <div className="flex items-center space-x-4">
                <span>Disbursal Option</span>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="disbursal"
                    value="Custom"
                    checked={disbursalOption === "Custom"}
                    onChange={() => setDisbursalOption("Custom")}
                    className="form-radio"
                  />
                  <span className="ml-2">Custom</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="disbursal"
                    value="Default"
                    checked={disbursalOption === "Default"}
                    onChange={() => setDisbursalOption("Default")}
                    className="form-radio"
                  />
                  <span className="ml-2">Default</span>
                </label>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-2xl font-bold mb-6 text-center">Loan Overview</h2>
            <div className="text-center">
              <p className="text-xl">Your EMI per month will be</p>
              <p className="text-5xl font-bold text-purple-600">{emi}</p>
              <p className="text-xl mt-4">Total interest you have to pay</p>
              <p className="text-3xl font-bold">{totalInterest}</p>
              <p className="text-xl mt-4">Total payment (Principal + Interest)</p>
              <p className="text-3xl font-bold">{totalPayment}</p>
              {/* <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md text-lg">View Details</button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EMICalculator;
