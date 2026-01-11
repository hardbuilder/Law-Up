import React from 'react';
import { motion } from 'framer-motion';

const SummaryCard = ({ summary, variants }) => {
  return (
    <motion.div variants={variants} className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl border border-blue-200 shadow-xl overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full opacity-30 transform -translate-x-8 translate-y-8"></div>
      
      {/* Header with icon */}
      <div className="relative flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl shadow-lg mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-900" style={{ fontFamily: '"Sansita", sans-serif' }}>Executive Summary</h2>
          <p className="text-sm text-blue-600 font-medium">Key insights at a glance</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4 mt-1"></div>
          <div className="flex-1">
            <p className="text-lg text-gray-800 leading-relaxed font-medium">{summary || 'Analyzing document for key insights...'}</p>
          </div>
        </div>
      </div>
      
      {/* Bottom insight badge */}
      <div className="relative mt-4 flex justify-end">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          AI-Powered Analysis
        </span>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
