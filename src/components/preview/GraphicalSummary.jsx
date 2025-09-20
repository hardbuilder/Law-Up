import React from 'react';
import { motion } from 'framer-motion';

const GraphicalSummary = ({ score, positives, risks, sentiment, variants }) => {

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const positivesCount = positives.length;
  const risksCount = risks.length;
  const ratio = risksCount > 0 ? (positivesCount / risksCount).toFixed(1) : positivesCount;

  return (
    <motion.div variants={variants} className="grid md:grid-cols-3 gap-8 text-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Safety Score</h3>
        <div className="flex justify-center items-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
              <motion.circle
                className="text-green-500"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="60"
                cy="60"
                transform="rotate(-90 60 60)"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-green-500">{score}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Positives to Risks</h3>
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-500">{ratio} : 1</div>
            <p className="text-lg text-gray-600">Positives vs. Risks</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Overall Sentiment</h3>
        <div className="flex flex-col justify-center items-center h-full py-4">
          <div className="text-6xl mb-2">😐</div>
          <p className="text-2xl font-bold text-gray-700">{sentiment || 'Analyzing...'}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GraphicalSummary;
