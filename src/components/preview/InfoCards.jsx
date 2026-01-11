import React from 'react';
import { motion } from 'framer-motion';

const InfoCards = ({ positives, obligations, entitlements, variants }) => {
  const cardConfigs = [
    {
      title: 'Strategic Advantages',
      subtitle: 'Benefits identified in your favor',
      data: positives,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-600',
      textColor: 'text-emerald-900',
      subtitleColor: 'text-emerald-600',
      itemBg: 'bg-emerald-50',
      itemBorder: 'border-emerald-200',
      loadingText: 'Identifying strategic advantages...'
    },
    {
      title: 'Your Commitments',
      subtitle: 'Responsibilities and requirements',
      data: obligations,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      gradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-900',
      subtitleColor: 'text-blue-600',
      itemBg: 'bg-blue-50',
      itemBorder: 'border-blue-200',
      loadingText: 'Analyzing your obligations...'
    },
    {
      title: 'Protected Rights',
      subtitle: 'Benefits and protections secured',
      data: entitlements,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      gradient: 'from-violet-50 to-purple-50',
      border: 'border-violet-200',
      iconBg: 'bg-violet-600',
      textColor: 'text-violet-900',
      subtitleColor: 'text-violet-600',
      itemBg: 'bg-violet-50',
      itemBorder: 'border-violet-200',
      loadingText: 'Identifying your entitlements...'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {cardConfigs.map((config, cardIndex) => (
        <motion.div 
          key={cardIndex}
          variants={variants} 
          className={`relative bg-gradient-to-br ${config.gradient} p-6 rounded-3xl ${config.border} border shadow-xl overflow-hidden min-w-[300px]`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
          
          {/* Header */}
          <div className="relative flex items-center mb-6">
            <div className={`flex items-center justify-center w-10 h-10 ${config.iconBg} rounded-xl shadow-lg mr-4`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${config.textColor}`} style={{ fontFamily: '"Sansita", sans-serif' }}>
                {config.title}
              </h3>
              <p className={`text-sm ${config.subtitleColor} font-medium`}>{config.subtitle}</p>
            </div>
            {/* Count badge */}
            <div className={`${config.iconBg} text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shadow-lg`}>
              {config.data.length}
            </div>
          </div>
          
          {/* Content */}
          <div className="relative space-y-3">
            {config.data.length > 0 ? (
              config.data.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (cardIndex * 0.1) + (index * 0.05) }}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 ${config.itemBorder} border shadow-sm hover:shadow-md transition-all duration-300 group`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-2 h-2 ${config.iconBg} rounded-full mt-2.5 mr-3`}></div>
                    <p className="text-gray-800 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                      {item}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 text-center">
                <div className="animate-pulse">
                  <div className={`w-6 h-6 ${config.iconBg} rounded-full mx-auto mb-3 opacity-60`}></div>
                  <p className="text-gray-500 font-medium text-sm">{config.loadingText}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer insight */}
          {config.data.length > 0 && (
            <div className="relative mt-4 pt-4 border-t border-white/30">
              <div className="flex items-center justify-between text-xs">
                <span className={`${config.subtitleColor} font-medium`}>
                  {config.data.length} {config.data.length === 1 ? 'item' : 'items'} identified
                </span>
                <span className={`${config.textColor} font-bold`}>✓ Analyzed</span>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default InfoCards;
