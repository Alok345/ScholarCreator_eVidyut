// LoanComparison.jsx
import React from 'react';

const LenderCard = ({ lender }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <img 
          src={lender.logo} 
          alt={`${lender.name} logo`} 
          className="h-12 object-contain"
        />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Interest rate range</p>
          <p className="text-lg font-semibold">{lender.interestRange}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Maximum loan amount</p>
          <p className="text-lg font-semibold">₹{lender.maxAmount.toLocaleString()}</p>
        </div>
        <div className="flex flex-col space-y-2">
          {/* <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            Know More
          </button> */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

const LoanComparison = () => {
  const lenders = [
    {
      name: 'Union Bank of India',
      logo: 'https://companieslogo.com/img/orig/UNIONBANK.NS-5bba728d.png?t=1720244494',
      interestRange: '8.25% - 11.5%',
      maxAmount: 7500000,
    },
    {
      name: 'Axis Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/800px-Axis_Bank_logo.svg.png',
      interestRange: '10.75% - 12.75%',
      maxAmount: 7500000,
    },
    {
      name: 'ICICI Bank',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0ePc014VwT1bMIgBt9AKwEYwFv6Fw6lkGg&s',
      interestRange: '11.25% - 14.25%',
      maxAmount: 7500000,
    },
    {
      name: 'HDFC Bank',
      logo: 'https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-logo.jpg',
      interestRange: '10.75% - 11.75%',
      maxAmount: 7500000,
    },
    {
      name: 'HDFC Credila',
      logo: 'https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/09/full/1712673259-4687.jpg',
      interestRange: '9.55% - 12.75%',
      maxAmount: 7500000,
    },
    {
      name: 'Avanse',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Avansas-logo.svg',
      interestRange: '11.25% - 14.5%',
      maxAmount: 7500000,
    },
    {
      name: 'InCred',
      logo: 'https://static-asset.inc42.com/incred.png',
      interestRange: '11.25% - 14.25%',
      maxAmount: 7500000,
    },
    {
      name: 'Auxilo Finance',
      logo: 'https://www.lorien.finance/_next/image?url=%2Fassets%2Fimg%2Fauxilo-logo.png&w=640&q=75',
      interestRange: '12.5% - 14.5%',
      maxAmount: 7500000,
    },
    {
      name: 'Prodigy Finance',
      logo: 'https://a.storyblok.com/f/268942/635x175/7c7ecc1970/prodigy-finance-logo.svg',
      interestRange: '10.5% - 14.5%',
      maxAmount: 7500000,
    },
    {
      name: 'Mpower Finance',
      logo: 'https://mpowerfinancing.com/wp-content/themes/mpower/images/MPOWER_Logo_Horizontal_LIGHT_BG.png',
      interestRange: '12.99% - 15.99%',
      maxAmount: 7500000,
    },
    {
      name: 'State Bank of India',
      logo: 'https://i.pinimg.com/originals/2a/2c/1d/2a2c1d90075390b22e7e6060254dab0d.jpg',
      interestRange: '10.15% - 11.15%',
      maxAmount: 7500000,
    },
    {
      name: 'Bank of Baroda',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKrbsCMZx1BZXby8ae9ox1Wf3_E9x4EG_jg&s',
      interestRange: '10.99% - 13.99%',
      maxAmount: 7500000,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-2">
            Everything you need to know about{' '}
            <span className="text-indigo-600">Rate of Interest</span>
          </h1>
          <p className="text-gray-600">One stop for all Lenders' Rate of Interest</p>
        </div>

        {/* Comparison Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">
            Compare Interest Rates Offered by Multiple Lenders
          </h2>
          <p className="text-gray-600 mb-8">
            Interest rate is the percentage of the principal amount that you will have to pay along with your monthly amount over and above the principal amount. Student loan interest rates can vary depending on many factors, such as the type of loan, the borrower's creditworthiness, and the lender's policies. In this article, we will discuss the interest rates offered by various lenders in India for students looking to pursue higher education.
          </p>
          
          {/* Lender Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lenders.map((lender) => (
              <LenderCard key={lender.name} lender={lender} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanComparison;