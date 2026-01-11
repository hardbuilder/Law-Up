import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/analyze", label: "Analyze" },
    { path: "/draft", label: "Draft" },
    { path: "/legal-guide", label: "Legal Guide" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[85%]">
      <nav
        className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300
        ${scrolled || isMobileMenuOpen
          ? "bg-white/70 backdrop-blur-md shadow-lg"
          : "bg-transparent"
        }`}
      >
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-900 tracking-wide"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          Law<span className="text-blue-600">Up</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-200 ${
                location.pathname === link.path
                  ? "text-blue-900 font-semibold border-b-2 border-blue-700"
                  : "text-blue-700 hover:text-blue-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-blue-800 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden mt-2 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-md transition-all duration-300
        ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-md transition ${
                location.pathname === link.path
                  ? "bg-blue-100 text-blue-900 font-medium"
                  : "text-blue-700 hover:bg-blue-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t pt-3 space-y-2">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center px-5 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center px-5 py-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
