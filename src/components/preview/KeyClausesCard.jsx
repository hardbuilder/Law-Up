import React from 'react';
import { motion } from 'framer-motion';

const KeyClausesCard = ({ keyClauses, variants }) => {
  const priorityIcons = {
    0: { icon: '🔴', label: 'Critical' },
    1: { icon: '🟡', label: 'Important' }, 
    2: { icon: '🟢', label: 'Notable' }
  };

  return (
    <motion.div variants={variants} className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-200 shadow-xl overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 rounded-full opacity-15 transform translate-x-20 -translate-y-20"></div>
      
      {/* Header */}
      <div className="relative flex items-center mb-8">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl shadow-lg mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-purple-900" style={{ fontFamily: '"Sansita", sans-serif' }}>Critical Clauses</h2>
          <p className="text-sm text-purple-600 font-medium">Legal provisions requiring attention</p>
        </div>
        
        {/* Clause count badge */}
        <div className="ml-auto bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
          {keyClauses.length}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative space-y-6">
        {keyClauses.length > 0 ? keyClauses.map((clause, index) => {
          const priority = priorityIcons[index] || priorityIcons[2];
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <span className="text-lg">{priority.icon}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{clause.title}</h4>
                    <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {priority.label}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">{clause.content}</p>
                  
                  {/* Action indicator */}
                  <div className="mt-4 flex items-center text-sm text-purple-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Review recommended</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 text-center">
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-purple-200 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Extracting key clauses from document...</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KeyClausesCard;
