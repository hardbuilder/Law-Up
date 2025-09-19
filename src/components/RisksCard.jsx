import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RisksCard = ({ risks, riskFilter, setRiskFilter, variants }) => {

  const filteredRisks = risks.filter(risk => riskFilter === 'All' || risk.severity === riskFilter);

  return (
    <motion.div variants={variants} className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <h3 className="text-3xl font-bold text-red-800 text-left mb-4 sm:mb-0" style={{ fontFamily: '"Sansita", sans-serif' }}>Risks Identified</h3>
        <div className="flex items-center space-x-1 p-1 bg-red-100 rounded-full shadow-inner self-start sm:self-center">
          <button onClick={() => setRiskFilter('All')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'All' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:bg-red-200'}`}>All</button>
          <button onClick={() => setRiskFilter('High')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'High' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:bg-red-200'}`}>High</button>
          <button onClick={() => setRiskFilter('Medium')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'Medium' ? 'bg-yellow-500 text-white shadow-md' : 'text-yellow-700 hover:bg-yellow-200'}`}>Medium</button>
          <button onClick={() => setRiskFilter('Low')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'Low' ? 'bg-green-600 text-white shadow-md' : 'text-green-700 hover:bg-green-200'}`}>Low</button>
        </div>
      </div>
      <ul className="space-y-6 text-left">
        <AnimatePresence>
          {filteredRisks.length > 0 ? filteredRisks.map((risk, index) => (
            <motion.li key={risk.text} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className={index < filteredRisks.length - 1 ? 'border-b border-red-200 pb-6' : ''}>
              <p className="text-lg font-semibold text-gray-800">{risk.text}</p>
              <p className="text-base text-gray-600 mt-2"><b>Recommendation:</b> {risk.recommendation}</p>
            </motion.li>
          )) : (
            <li className="text-center text-gray-500 py-4">{risks.length === 0 ? 'Generating risks...' : 'No risks found for this severity level.'}</li>
          )}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default RisksCard;
