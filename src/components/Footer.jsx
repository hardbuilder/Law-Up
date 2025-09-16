
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="bg-blue-950 text-white py-12 ">
      <div class="container mx-auto px-4 ">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="mb-8 ">
            <h3 class="text-xl font-semibold mb-4 pr-9 ">Quick Links</h3>
            <ul class="space-y-2 inline-block text-left">
              <li><Link to="/" class="hover:text-gray-300 ">Home</Link></li>
              <li><Link to="/about" class="hover:text-gray-300">About</Link></li>
              <li><Link to="/analyze-document" class="hover:text-gray-300">Analyze Document</Link></li>
              <li><Link to="/draft-document" class="hover:text-gray-300">Draft Document</Link></li>
              <li><Link to="/legal-guide" class="hover:text-gray-300">Legal Guide</Link></li>
            </ul>
          </div>

          <div class="mb-8 md:mb-0">
            <h2 class="text-3xl font-bold mb-4">Law Up</h2>
            <p class="text-gray-400">
              Demystifying legal documents with the power of AI.
            </p>
          </div>

          <div class="mb-8 md:mb-0">
            <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
            <p class="text-gray-400 mb-4">
              <a href="mailto:support@lawup.com" className="hover:text-gray-300">support@lawup.com</a>
            </p>
            <div class="flex space-x-4 justify-center">
              <a href="#" class="text-2xl hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
              <a href="#" class="text-2xl hover:text-gray-300"><i className="fab fa-twitter"></i></a>
              <a href="#" class="text-2xl hover:text-gray-300"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" class="text-2xl hover:text-gray-300"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-400">&copy; {new Date().getFullYear()} Law Up. All Rights Reserved.</p>
          <p class="text-gray-500 mt-2">Made with love by team T-Error</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
