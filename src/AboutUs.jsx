import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "AboutUsFormData"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert("Your message has been submitted successfully!");
      setFormData({ name: '', email: '', mobileNo: '', message: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Our Company</h1>
          <p className="text-xl md:text-2xl mb-8">Innovating for a better tomorrow</p>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwamHoorh-RTODCMbKzLV6BZaBAg6u_4sjg&s" alt="Company Office" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, our company has been at the forefront of technological innovation. We believe in creating solutions that make a positive impact on people's lives and businesses.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of dedicated professionals works tirelessly to push the boundaries of what's possible, always with an eye on sustainability and ethical practices.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Jane Doe", role: "CEO", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "John Smith", role: "CTO", image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Emily Brown", role: "Lead Designer", image: "https://images.pexels.com/photos/1820934/pexels-photo-1820934.jpeg?auto=compress&cs=tinysrgb&w=600" },
            ].map((member, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 text-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest from Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "The Future of AI", excerpt: "Exploring the latest trends in artificial intelligence and machine learning.", image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { title: "Sustainable Tech Practices", excerpt: "How our company is leading the way in environmentally friendly technology.", image: "https://images.pexels.com/photos/939331/pexels-photo-939331.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { title: "Innovation in the Workplace", excerpt: "Creating a culture of creativity and forward-thinking in our offices.", image: "https://images.pexels.com/photos/6991094/pexels-photo-6991094.jpeg?auto=compress&cs=tinysrgb&w=600" },
            ].map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <MapPin className="mr-2 h-6 w-6" />
                <span>123 Tech Street, Silicon Valley, CA 94000</span>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="mr-2 h-6 w-6" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-6 w-6" />
                <span>info@ourcompany.com</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-1/2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full mb-4 p-2 rounded text-gray-800"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full mb-4 p-2 rounded text-gray-800"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="mobileNo"
                placeholder="Your Mobile Number"
                className="w-full mb-4 p-2 rounded text-gray-800"
                value={formData.mobileNo}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="w-full mb-4 p-2 rounded text-gray-800"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;