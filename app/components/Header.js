"use client"; 

import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">

        <a href="/" className="text-xl font-bold hover:text-gray-400 transition duration-300">Hem</a>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className={`flex space-x-4 ${isMobileMenuOpen ? "block" : "hidden"} md:flex`}>
          <a href="/projects" className="hover:text-gray-400 transition duration-300">Alla Projekt</a>
          <a href="/about" className="hover:text-gray-400 transition duration-300">Om mig</a>
          <a href="/contact" className="hover:text-gray-400 transition duration-300">Kontakt</a>
        </div>
      </div>
    </nav>
  );
}
