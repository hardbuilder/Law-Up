import React from 'react';
import { motion } from 'framer-motion';

const ProgressIndicator = ({ currentStep, totalSteps, stepTitles }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <motion.div 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-500 text-white ring-4 ring-blue-200' 
                        : 'bg-gray-300 text-gray-600'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                <motion.span 
                  className={`text-xs mt-2 text-center max-w-20 transition-colors duration-300 ${
                    isCurrent ? 'text-blue-600 font-semibold' : 'text-gray-500'
                  }`}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: isCurrent ? 1 : 0.7 }}
                >
                  {title}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Info */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </p>
        <motion.p 
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-blue-900 mt-1"
        >
          {stepTitles[currentStep - 1]}
        </motion.p>
      </div>
    </div>
  );
};

export default ProgressIndicator;
