import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Clarity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div ref={ref} className="flex flex-col justify-center items-center py-20 bg-gradient-to-r from-indigo-50 via-blue-50 to-white font-sans">
      <h1 className="text-5xl font-bold text-blue-900" style={{ fontFamily: '"Sansita", sans-serif' }}>Get Clarity in 3 Simple Steps</h1>
      <h2 className="text-2xl py-10 text-gray-600 max-w-3xl text-center">
        Our process is designed to be simple, fast, and secure, giving you the confidence to act.
      </h2>

      <div className="flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-10 px-10 mt-10">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center group"
        >
          <div className="w-24 h-24 bg-blue-300 p-4 rounded-full flex justify-center items-center cursor-pointer transition-all duration-500 shadow-lg">
            <h1 className="text-4xl font-bold text-white">1</h1>
          </div>
          <div className="w-80 h-72 bg-white p-6 rounded-2xl mt-8 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Upload Your Documents</h3>
            <p className="text-lg text-gray-700">
              Securely drag and drop your file. We handle the rest, extracting text and preparing it for analysis.
            </p>
          </div>
        </motion.div>

        <img src="/assests/home/Fast_forward.png" alt="arrow" className="hidden lg:block w-16 h-16" />

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center group"
        >
          <div className="w-24 h-24 bg-blue-300 p-4 rounded-full flex justify-center items-center cursor-pointer transition-all duration-500 shadow-lg">
            <h1 className="text-4xl font-bold text-white">2</h1>
          </div>
          <div className="w-80 h-72 bg-white p-6 rounded-2xl mt-8 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>AI-Powered Analysis</h3>
            <p className="text-lg text-gray-700">
              We scan your document for risks, obligations, and key terms in just a few seconds.
            </p>
          </div>
        </motion.div>

        <img src="/assests/home/Fast_forward.png" alt="arrow" className="hidden lg:block w-16 h-16" />

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center group"
        >
          <div className="w-24 h-24 bg-blue-300 p-4 rounded-full flex justify-center items-center cursor-pointer transition-all duration-500 shadow-lg">
            <h1 className="text-4xl font-bold text-white">3</h1>
          </div>
          <div className="w-80 h-72 bg-white p-6 rounded-2xl mt-8 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>See Your Insights</h3>
            <p className="text-lg text-gray-700">
              Explore your dashboard, view summaries, and chat with the document to get clear answers instantly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Clarity;