import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="text-2xl" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="p-6 bg-gray-100 text-gray-700">{content}</div>}
    </div>
  );
};

const OurLandingPartners = () => {
  const banks = [
    { name: 'HDFC Bank', logo: 'https://i.pinimg.com/1200x/cc/15/74/cc1574e6b15ed8aa8a7759c2c9220429.jpg' },
    { name: 'ICICI Bank', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4In3s3ldapDAOPS2W1UWaNwaxFJezj86ew&s' },
    { name: 'SBI', logo: 'https://discovertemplate.com/wp-content/uploads/2024/04/SBI.jpg' },
    { name: 'Axis Bank', logo: 'https://www.axisbank.com/images/default-source/gallery/gallery_img1.jpg' },
    { name: 'Kotak Mahindra Bank', logo: 'https://img.theweek.in/content/dam/week/news/biz-tech/images/2020/2/19/kotak-mahindra.jpg' }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bank Logos Section */}
      <section className="py-16 bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8">Our Banking Partners</h2>
          <Slider {...sliderSettings}>
            {banks.map((bank, index) => (
              <div key={index} className="px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center h-64 transition-transform transform hover:scale-105">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Ours Education Loan</h1>
          <p className="text-xl mb-8">Get Your Education Loan Assistance from GyanDhan</p>
          <div className="flex justify-center gap-4">
            <Link to="/check-loan-eligibility">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-md text-lg font-semibold hover:bg-gray-200 transition-transform transform hover:scale-105">Check Eligibility</button>
            </Link>
            <button className="px-6 py-3 border border-white text-white rounded-md text-lg font-semibold hover:bg-white hover:text-purple-600 transition-transform transform hover:scale-105">Learn More</button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {["Check Eligibility", "Fill Details", "Submit Docs", "Receive Offer", "Get Loan"].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-700">{index + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-700">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Rest of your sections with similar enhancements */}
    </div>
  );
};

export default OurLandingPartners;
