import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RisksCard = ({ risks, riskFilter, setRiskFilter, variants }) => {
  const filteredRisks = risks.filter(risk => riskFilter === 'All' || risk.severity === riskFilter);
  
  const severityConfig = {
    High: { 
      icon: '⚠️', 
      bg: 'bg-red-500', 
      text: 'text-red-700', 
      bgLight: 'bg-red-50', 
      border: 'border-red-200',
      ring: 'ring-red-500'
    },
    Medium: { 
      icon: '⚡', 
      bg: 'bg-yellow-500', 
      text: 'text-yellow-700', 
      bgLight: 'bg-yellow-50', 
      border: 'border-yellow-200',
      ring: 'ring-yellow-500'
    },
    Low: { 
      icon: '📋', 
      bg: 'bg-blue-500', 
      text: 'text-blue-700', 
      bgLight: 'bg-blue-50', 
      border: 'border-blue-200',
      ring: 'ring-blue-500'
    }
  };

  const getHighestSeverityCount = () => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    risks.forEach(risk => counts[risk.severity]++);
    return counts;
  };

  const severityCounts = getHighestSeverityCount();

  return (
    <motion.div variants={variants} className="relative bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-3xl border border-red-200 shadow-xl overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-red-200 rounded-full opacity-15 transform -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-200 rounded-full opacity-20 transform translate-x-8 translate-y-8"></div>
      
      {/* Header */}
      <div className="relative flex flex-col sm:flex-row justify-between sm:items-start mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl shadow-lg mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.854-.833-2.624 0L3.732 13.5C2.962 15.333 3.924 17 5.464 17z" />
            </svg>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-900" style={{ fontFamily: '"Sansita", sans-serif' }}>Risk Assessment</h3>
            <p className="text-sm text-red-600 font-medium">Professional evaluation of potential concerns</p>
          </div>
        </div>
        
        {/* Risk metrics */}
        <div className="flex items-center space-x-3">
          {Object.entries(severityCounts).map(([severity, count]) => {
            if (count === 0) return null;
            const config = severityConfig[severity];
            return (
              <div key={severity} className={`flex items-center px-3 py-2 ${config.bgLight} ${config.border} border rounded-xl`}>
                <span className="text-sm mr-1">{config.icon}</span>
                <span className={`text-sm font-bold ${config.text}`}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="relative mb-8">
        <div className="flex items-center space-x-2 p-1 bg-white/60 backdrop-blur-sm rounded-2xl shadow-inner border border-white/50">
          {['All', 'High', 'Medium', 'Low'].map((filter) => {
            const isActive = riskFilter === filter;
            const config = filter !== 'All' ? severityConfig[filter] : { bg: 'bg-gray-600' };
            return (
              <button
                key={filter}
                onClick={() => setRiskFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? `${config.bg} text-white shadow-lg transform scale-105` 
                    : 'text-gray-600 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                {filter}
                {filter !== 'All' && severityCounts[filter] > 0 && (
                  <span className={`ml-1 text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                    ({severityCounts[filter]})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative space-y-6">
        <AnimatePresence>
          {filteredRisks.length > 0 ? filteredRisks.map((risk, index) => {
            const config = severityConfig[risk.severity];
            return (
              <motion.div 
                key={risk.text}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeInOut', delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`flex items-center justify-center w-12 h-12 ${config.bgLight} ${config.border} border rounded-xl`}>
                      <span className="text-xl">{config.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${config.bg} text-white shadow-sm`}>
                        {risk.severity.toUpperCase()} RISK
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">{risk.text}</p>
                    
                    {/* Recommendation section */}
                    <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                      <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="font-bold text-blue-900 text-sm">EXPERT RECOMMENDATION</span>
                      </div>
                      <p className="text-gray-700 font-medium">{risk.recommendation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }) : (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 text-center">
              {risks.length === 0 ? (
                <div className="animate-pulse">
                  <div className="w-8 h-8 bg-red-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500 font-medium">Analyzing document for potential risks...</p>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">No {riskFilter.toLowerCase()} risks identified for this filter.</p>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RisksCard;
