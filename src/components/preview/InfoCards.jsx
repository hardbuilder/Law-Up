import React from 'react';
import { motion } from 'framer-motion';

const InfoCards = ({ positives, obligations, entitlements, variants }) => {
  return (
    <div className="flex flex-wrap gap-8 text-left">
      <motion.div variants={variants} className="flex-1 bg-green-50 border border-green-200 rounded-2xl shadow-lg p-6 min-w-[300px]">
        <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Positive Points</h3>
        <ul className="divide-y divide-green-200">
          {positives.length > 0 ? positives.map((positive, index) => <li key={index} className="py-3 text-lg text-gray-700">{positive}</li>) : <li className="py-3 text-lg text-gray-500">Generating positives...</li>}
        </ul>
      </motion.div>
      <motion.div variants={variants} className="flex-1 bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-6 min-w-[300px]">
        <h3 className="text-2xl font-bold text-blue-800 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Your Obligations</h3>
        <ul className="divide-y divide-blue-200">
          {obligations.length > 0 ? obligations.map((item, index) => <li key={index} className="py-3 text-lg text-gray-700">{item}</li>) : <li className="py-3 text-lg text-gray-500">Generating obligations...</li>}
        </ul>
      </motion.div>
      <motion.div variants={variants} className="flex-1 bg-green-50 border border-green-200 rounded-2xl shadow-lg p-6 min-w-[300px]">
        <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Your Entitlements</h3>
        <ul className="divide-y divide-green-200">
          {entitlements.length > 0 ? entitlements.map((item, index) => <li key={index} className="py-3 text-lg text-gray-700">{item}</li>) : <li className="py-3 text-lg text-gray-500">Generating entitlements...</li>}
        </ul>
      </motion.div>
    </div>
  )
}

export default InfoCards;
