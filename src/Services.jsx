import { useState } from 'react';
import { ChevronDown, Facebook, Youtube, Twitter, Instagram, Linkedin } from 'lucide-react';
import medium from "./assets/medium.png";

const Services = () => {
  const [eduLoansOpen, setEduLoansOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const services = [
    {
      title: 'University Xpress',
      description: 'Send your university applications or transcripts to any institute globally with 40% discount on DHL',
      icon: 'https://assets.dpdhl-brands.com/guides/dhl/guides/design-basics/logo-and-claim/logo/versions-01.png',
      iconAlt: 'DHL logo'
    },
    {
      title: 'Articles',
      description: 'Insightful articles on international education process and diverse study abroad experiences shared by students who have studied abroad.',
      icon: 'https://cdn-icons-png.flaticon.com/512/5425/5425964.png',
      iconAlt: 'Article icon'
    },
    {
      title: 'Events',
      description: 'Register for the upcoming/ check out past webinars by eminent speakers in the industry, helping you to better plan your study abroad journey.',
      icon: 'https://cdn-icons-png.flaticon.com/512/780/780575.png',
      iconAlt: 'Calendar icon'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex">
              <img src={service.icon} alt={service.iconAlt} className="w-16 h-16 mr-4" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-teal-500 mb-2">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded text-sm">
                  More details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <p>Connect with us</p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded"><Facebook size={20} /></a>
              <a href="#" className="bg-red-600 p-2 rounded"><Youtube size={20} /></a>
              <a href="#" className="bg-blue-400 p-2 rounded"><Twitter size={20} /></a>
              <a href="#" className="bg-pink-600 p-2 rounded"><Instagram size={20} /></a>
              <a href="#" className="bg-blue-800 p-2 rounded"><Linkedin size={20} /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">By subject</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Arts Scholarships</a></li>
                <li><a href="#" className="hover:underline">Architecture Scholarships</a></li>
                <li><a href="#" className="hover:underline">Sports Scholarships</a></li>
                <li><a href="#" className="hover:underline">Engineering Scholarships</a></li>
                <li><a href="#" className="hover:underline">Law Scholarships</a></li>
                <li><a href="#" className="hover:underline">MBA scholarships</a></li>
                <li><a href="#" className="hover:underline">Undergraduate Scholarships</a></li>
                <li><a href="#" className="hover:underline">Masters Scholarships</a></li>
                <li><a href="#" className="hover:underline">PhD Scholarships</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">By nationality</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">International Scholarships</a></li>
                <li><a href="#" className="hover:underline">Scholarships for India</a></li>
                <li><a href="#" className="hover:underline">Scholarships for Pakistani</a></li>
                <li><a href="#" className="hover:underline">Scholarships for China</a></li>
                <li><a href="#" className="hover:underline">Scholarships for UK</a></li>
                <li><a href="#" className="hover:underline">Scholarships for Malaysia</a></li>
                <li><a href="#" className="hover:underline">Scholarships for Canada</a></li>
                <li><a href="#" className="hover:underline">Scholarships for School</a></li>
                <li><a href="#" className="hover:underline">Scholarships for African</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">By country of interest</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">US Scholarships</a></li>
                <li><a href="#" className="hover:underline">UK Scholarships</a></li>
                <li><a href="#" className="hover:underline">Canada Scholarships</a></li>
                <li><a href="#" className="hover:underline">India Scholarships</a></li>
                <li><a href="#" className="hover:underline">China Scholarships</a></li>
                <li><a href="#" className="hover:underline">Germany Scholarships</a></li>
                <li><a href="#" className="hover:underline">Japan Scholarships</a></li>
                <li><a href="#" className="hover:underline">Australia Scholarships</a></li>
                <li><a href="#" className="hover:underline">New Zealand Scholarships</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Education Loans</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Education Loan</a></li>
                <li><a href="#" className="hover:underline">SBI Education Loan</a></li>
                <li><a href="#" className="hover:underline">Bank of Baroda Education Loan</a></li>
                <li><a href="#" className="hover:underline">Avanse Education Loan</a></li>
                <li><a href="#" className="hover:underline">Canara Education Loan</a></li>
                <li><a href="#" className="hover:underline">Incred Education Loan</a></li>
                <li><a href="#" className="hover:underline">Punjab National Bank Education Loan</a></li>
                <li><a href="#" className="hover:underline">Auxilo Bank Education Loan</a></li>
                <li><a href="#" className="hover:underline">ICICI Bank Education Loan</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;