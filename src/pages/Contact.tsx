// src/pages/Contact.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react"; // icons

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">

      {/* Header */}
      <header className="bg-white">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center w-full">
            Contact Us
          </h1>

          {/* Home Button */}
          <Link to="/" className="absolute right-6 top-8">
            <button className="px-4 py-2 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:scale-105 transition duration-200">
              Home
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 shadow-lg">

          {/* About ATS Friendly Info */}
          <h2 className="text-2xl font-semibold text-center mb-4">
            About ATS Friendly Resume
          </h2>

          <p className="text-center text-slate-700 mb-10 leading-relaxed">
            ATS Friendly Resume is built to help job seekers create resumes that pass 
            Applicant Tracking Systems used by modern companies. Our platform ensures 
            your resume structure is professional, keyword-optimized, and recruiter-friendly, 
            improving your chances of landing interview calls faster and easier.
          </p>

          {/* Contact Information */}
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <Mail className="text-indigo-600 w-6 h-6" />
              <span>atsfriendlyresume@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-indigo-600 w-6 h-6" />
              <span>+91 12345 67890</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-indigo-600 w-6 h-6" />
              <span>India (Remote Team)</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="mt-6 text-center text-sm text-slate-500">
            We usually respond within 24 hours 😊
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Team amancodesss. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Contact;
