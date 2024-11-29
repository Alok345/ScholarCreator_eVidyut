import React, { useState } from 'react';

function StudyAbroad() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Study Abroad Opportunities
        </h1>
        <p className="text-gray-600 mb-6 text-justify">
          Explore our study abroad programs and take the first step toward achieving your academic and professional dreams. Fill out the form below to get started.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Program of Interest */}
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-700">
              Program of Interest
            </label>
            <select
              id="program"
              name="program"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a program</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Short Term Courses">Short-Term Courses</option>
              <option value="Exchange Program">Exchange Program</option>
            </select>
          </div>

          {/* Blog/Description */}
          <div>
            <label htmlFor="blog" className="block text-sm font-medium text-gray-700">
              Why Do You Want to Study Abroad?
            </label>
            <textarea
              id="blog"
              name="blog"
              rows="5"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a brief blog or description about your motivation"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
              Upload an Image (Optional)
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              className="mt-2"
              onChange={handleImageUpload}
            />
            {image && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Preview:</p>
                <img
                  src={image}
                  alt="Preview"
                  className="w-32 h-32 object-cover border rounded-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyAbroad;
