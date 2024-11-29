import React, { useState } from "react";
import { ChevronDown, DollarSign,IndianRupee, Search, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import round from "./assets/round2.png";

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState("scholarships");
  const [formData, setFormData] = useState({
    nationality: "",
    studyLevel: [],
    country: [],
    field: [],
  });
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const navigate = useNavigate();

  const handleLoanRedirect = () => navigate("/education-loan");

  const handleInputChange = (name, value, isMultiple) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: isMultiple
        ? prevState[name].includes(value)
          ? prevState[name].filter((item) => item !== value)
          : [...prevState[name], value]
        : value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item));
      } else if (value) {
        searchParams.append(key, value);
      }
    });
    navigate(`/scholar-main?${searchParams.toString()}`);
  };

  const dropdownOptions = {
    nationality: ["USA", "UK", "Canada", "Australia", "India"],
    studyLevel: [
      "Undergraduate",
      "Postgraduate",
      "Doctorate",
      "Post-Doctorate",
    ],
    country: ["USA", "UK", "Canada", "Australia", "Germany", "France"],
    field: ["Computer Science", "Engineering", "Business", "Medicine", "Arts"],
  };

  const renderDropdown = (name, placeholder, isMultiple = true) => (
    <div
      className="relative flex-1"
      onMouseEnter={() => setHoveredDropdown(name)}
      onMouseLeave={() => setHoveredDropdown(null)}
    >
      <div className="w-full appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-none focus:outline-none focus:ring-2 focus:ring-teal-500">
        {formData[name].length > 0
          ? isMultiple
            ? `${formData[name].length} ${
                formData[name].length === 1 ? "item" : "items"
              } selected`
            : formData[name]
          : placeholder}
      </div>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {hoveredDropdown === name && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 max-h-60 overflow-y-auto">
          {dropdownOptions[name].map((option) => (
            <label
              key={option}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type={isMultiple ? "checkbox" : "radio"}
                name={name}
                value={option}
                checked={
                  isMultiple
                    ? formData[name].includes(option)
                    : formData[name] === option
                }
                onChange={() => handleInputChange(name, option, isMultiple)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-10">
      <div className="-mt-12 md:mb-0">
        <h2 className="text-4xl font-bold text-gray-800 mt-10 mb-4">
          Best way to fund your Study Abroad
        </h2>
        <p className="text-gray-600 mb-6">
          Discover and apply to thousands of international scholarships <br />
          and get the best education loan matching your profile
        </p>
        <div className="w-full flex flex-col bg-gray-100 -mt-[80px]">
          <main className="flex-grow container max-w-full mx-auto py-12 ">
            <div className="flex flex-col md:flex-row justify-between gap-x-52 items-start md:items-center mb-8 px-4 ">
              <div className="w-full max-w-4xl -mx-12 ">
                <div className="flex mb-0 h-20">
                  <button
                    className={`flex-1 flex-col py-4 px-6 flex items-center justify-center ${
                      activeTab === "scholarships"
                        ? "bg-yellow-500 text-black"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setActiveTab("scholarships")}
                  >
                    <Trophy className="w-6 h-6 mr-2" />
                    <span>Look for Scholarships Abroad</span>
                  </button>
                  <button
                    className={`flex-1 flex-col  py-4 px-6 flex items-center justify-center ${
                      activeTab === "loans"
                        ? "bg-yellow-500 text-black"
                        : "bg-white hover:bg-yellow-500 text-gray-700 hover:text-black"
                    }`}
                    onClick={handleLoanRedirect}
                  >
                    <IndianRupee className="w-6 h-6 mr-2" />
                    <span>Seek Financial Aid for Studies</span>
                  </button>
                </div>
                <div className="flex text-xs">
                  {renderDropdown("nationality", "Nationality", false)}
                  {renderDropdown("studyLevel", "Desired Level Of Study")}
                  {renderDropdown("country", "Countries Looking Into")}
                  {renderDropdown("field", "Fields Interested in")}
                  <button
                    className="bg-yellow-500 text-white px-4 focus:outline-none hover:bg-yellow-600"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="w-full md:w-[750px]  md:mt-0  ">
                <img
                  src={round}
                  alt="Study Abroad Illustration"
                  className="w-full h-auto rounded-full animate-spin-slow -mt-20"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
