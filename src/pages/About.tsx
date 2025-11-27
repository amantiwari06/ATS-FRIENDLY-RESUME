// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// images
import AyushiImg from "../assets/ayushi.jpg";
import AnanyaImg from "../assets/ananya.jpg";
import AmanImg from "../assets/aman.jpg";
import ArpitImg from "../assets/arpit.jpg";

// fallback SVG
const SVG_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9aa0b4' font-family='Arial' font-size='20'>No image</text></svg>`
  );

const members = [
  {
    name: "Ayushi",
    fullName: "Ayushi Singh",
    title: "Frontend Development (React.js)",
    img: AyushiImg,
    responsibilities: [
      "Designs and implements the user interface using React.js.",
      "Collaborates with the team to ensure seamless integration of frontend and backend.",
      "Implements responsive design and ensures cross-browser compatibility.",
    ],
  },
  {
    name: "Ananya",
    fullName: "Ananya Chaturvedi",
    title: "Backend Development (Node.js)",
    img: AnanyaImg,
    responsibilities: [
      "Designs and implements server-side logic and database integration using Node.js.",
      "Ensures secure data storage and retrieval using MongoDB.",
      "Develops RESTful APIs for communication between frontend and backend.",
    ],
  },
  {
    name: "Arpit",
    fullName: "Arpit Solanki",
    title: "Database Management (MongoDB)",
    img: ArpitImg,
    responsibilities: [
      "Designs and implements the database schema for resume and portfolio data.",
      "Ensures data consistency and integrity.",
      "Collaborates with the backend developer to implement data models and queries.",
    ],
  },
  {
    name: "Aman",
    fullName: "Aman Tiwari",
    title: "AI Integration (OpenAI)",
    img: AmanImg,
    responsibilities: [
      "Integrates OpenAI's language models to generate ATS-friendly resume content.",
      "Develops algorithms for parsing and analyzing job descriptions.",
      "Ensures seamless integration of AI features with the application.",
    ],
  },
];

const About = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const responsibilitiesToParagraph = (arr) => arr.join(" ");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">

      {/* Keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp .45s cubic-bezier(.2,.9,.2,1) both; }
      `}</style>

      {/* HEADER WITH HOME BUTTON */}
      <header className="bg-white">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">

          {/* Centered Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center w-full">
            About Us
          </h1>

          {/* Right-side Home Button */}
          <Link to="/" className="absolute right-6 top-8">
            <button className="px-4 py-2 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:scale-105 transition duration-200">
              Home
            </button>
          </Link>
        </div>

        {/* Colored four-row section */}
        <div className="container mx-auto px-6 mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-5xl">
          <div className="rounded-2xl p-5 shadow-md bg-gradient-to-br from-pink-50 to-pink-100">
            <h4 className="font-semibold">About</h4>
            <p className="text-sm text-slate-700 mt-1">Section overview</p>
          </div>
          <div className="rounded-2xl p-5 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
            <h4 className="font-semibold">Team</h4>
            <p className="text-sm text-slate-700 mt-1">Meet the members</p>
          </div>
          <div className="rounded-2xl p-5 shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100">
            <h4 className="font-semibold">Careers</h4>
            <p className="text-sm text-slate-700 mt-1">Jobs & roles</p>
          </div>
          <div className="rounded-2xl p-5 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100">
            <h4 className="font-semibold">Contact</h4>
            <p className="text-sm text-slate-700 mt-1">Get in touch</p>
          </div>
        </div>
      </header>

      {/* TEAM GRID */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {members.map((m, i) => (
            <div
              key={m.name}
              className={`bg-white rounded-2xl p-8 shadow-md flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] ${
                mounted ? "fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-36 h-36 rounded-full overflow-hidden shadow-md mb-4">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = SVG_PLACEHOLDER)}
                />
              </div>

              <h3 className="text-lg font-semibold">{m.fullName || m.name}</h3>
              <p className="text-sm text-slate-700 font-medium mt-1 mb-3">{m.title}</p>

              <p className="text-sm text-slate-700 leading-relaxed max-w-xl">
                {responsibilitiesToParagraph(m.responsibilities)}
              </p>

              {/* Small tag row */}
              <div className="mt-5 flex gap-2 flex-wrap justify-center">
                <span className="text-xs px-2 py-1 bg-slate-100 border rounded-md">React</span>
                <span className="text-xs px-2 py-1 bg-slate-100 border rounded-md">Node.js</span>
                <span className="text-xs px-2 py-1 bg-slate-100 border rounded-md">MongoDB</span>
                <span className="text-xs px-2 py-1 bg-slate-100 border rounded-md">OpenAI</span>
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* BOTTOM BIG PARAGRAPH */}
      <section className="bg-slate-100">
        <div className="container mx-auto px-6 py-12">
          <p className="max-w-4xl mx-auto text-center text-lg md:text-xl font-serif text-slate-800 leading-relaxed">
            ATS Friendly Resume is designed to help job seekers create a professional and optimized resume that passes
            Applicant Tracking Systems (ATS) used by top companies. Our platform provides intuitive templates and easy-to-use
            forms so candidates can highlight their skills, education, and work experience effectively. Our team, consisting
            of Ayushi, Ananya, Arpit, and Aman, is dedicated to delivering high-quality resume solutions for everyone. We
            understand the importance of a strong first impression in the recruitment process and strive to simplify resume
            building while maintaining professionalism and appeal. Our templates are modern, clean, and designed to impress
            both humans and ATS software, giving users a competitive edge in their job applications.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <p>&copy; 2025 Team amancodesss. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default About;
