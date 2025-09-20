import React from 'react';

const TermsAndConditions = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        <div className="text-gray-700 max-h-64 overflow-y-auto">
          <p>
            Welcome to LawUp. These terms and conditions outline the rules and regulations for the use of LawUp's Website, located at lawup.com.
          </p>
          <p className="mt-4">
            By accessing this website we assume you accept these terms and conditions. Do not continue to use LawUp if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <p className="mt-4">
            <strong>License</strong>
          </p>
          <p>
            Unless otherwise stated, LawUp and/or its licensors own the intellectual property rights for all material on LawUp. All intellectual property rights are reserved. You may access this from LawUp for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p className="mt-4">
            You must not:
          </p>
          <ul className="list-disc list-inside">
            <li>Republish material from LawUp</li>
            <li>Sell, rent or sub-license material from LawUp</li>
            <li>Reproduce, duplicate or copy material from LawUp</li>
            <li>Redistribute content from LawUp</li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
