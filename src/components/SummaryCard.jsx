import React from 'react';
import { motion } from 'framer-motion';

const SummaryCard = ({ summary, variants }) => {
  return (
    <motion.div variants={variants} className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Summary</h2>
      <p className="text-lg text-gray-700 text-left leading-relaxed">{summary || 'Generating summary...'}</p>
    </motion.div>
  );
};

export default SummaryCard;
