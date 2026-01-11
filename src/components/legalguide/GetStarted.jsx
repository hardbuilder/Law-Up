import React from 'react';
import { motion } from 'framer-motion';
import { FiHelpCircle } from 'react-icons/fi';

const GetStarted = ({ onPromptClick }) => {
  const prompts = [
    "What are the key elements of a contract?",
    "Explain the concept of 'fair use' in copyright law.",
    "How do I register a trademark for my business?",
    "What is the difference between a will and a trust?",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl"
      >
        <FiHelpCircle className="text-6xl text-blue-500 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: '"Poppins", sans-serif' }}>
          Welcome to your personal legal guide
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Ask me anything about contract law, intellectual property, business formation, and more. Here are some examples to get you started:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prompts.map((prompt, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05,
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgb(239 246 255)',
                color: 'rgb(30 64 175)'
               }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPromptClick(prompt)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left text-gray-700 font-medium"
            >
              {prompt}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GetStarted;
