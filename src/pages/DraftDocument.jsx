import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { documentTemplates } from '../data/documentTemplates';
import ProgressIndicator from '../components/draft/ProgressIndicator';
import QuestionForm from '../components/draft/QuestionForm';
import DocumentPreview from '../components/draft/DocumentPreview';
import API_URL from '../config/api';

const DraftDocument = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Get current template data
  const template = selectedTemplate ? documentTemplates[selectedTemplate] : null;
  const questionGroups = template ? template.questions : [];
  const currentGroup = questionGroups[currentStep - 1];
  const totalSteps = questionGroups.length + 1; // +1 for template selection
  const stepTitles = ['Choose Template', ...questionGroups.map(group => group.title)];

  // Handle template selection
  const handleTemplateSelect = (templateKey) => {
    setSelectedTemplate(templateKey);
    setCurrentStep(1);
    setAnswers({});
    setErrors({});
    setGeneratedDocument('');
    setShowPreview(false);
  };

  // Handle answer changes
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  // Validate current step
  const validateCurrentStep = () => {
    if (currentStep === 0) return true; // Template selection step
    
    const newErrors = {};
    const currentQuestions = currentGroup.questions;
    
    currentQuestions.forEach(question => {
      // Check conditional questions
      if (question.condition) {
        const conditionField = question.condition.field;
        const conditionValue = question.condition.value;
        if (answers[conditionField] !== conditionValue) {
          return; // Skip validation for conditional questions that don't meet condition
        }
      }
      
      if (question.required && (!answers[question.id] || 
          (Array.isArray(answers[question.id]) && answers[question.id].length === 0))) {
        newErrors[question.id] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        generateDocument();
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      setCurrentStep(0);
      setSelectedTemplate('');
    }
  };

  // Generate document
  const generateDocument = async () => {
    setIsGenerating(true);
    setShowPreview(true);
    
    try {
      const response = await fetch(`${API_URL}/generate-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType: selectedTemplate,
          answers: answers
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate document');
      }
      
      const data = await response.json();
      setGeneratedDocument(data.document);
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Failed to generate document. Please try again.');
      setShowPreview(false);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle edit - go back to questions
  const handleEdit = () => {
    setShowPreview(false);
    setCurrentStep(1);
  };

  // Template selection screen
  const renderTemplateSelection = () => (
    <motion.div
      key="template-selection"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold text-blue-900 mb-4" 
          style={{ fontFamily: '"Sansita", sans-serif' }}>
        Choose Document Type
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Select the type of legal document you want to create. We'll guide you through the process step by step.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {Object.entries(documentTemplates).map(([key, template]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-blue-300 transition-all"
            onClick={() => handleTemplateSelect(key)}
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{template.title}</h3>
            <p className="text-gray-600 text-sm">{template.description}</p>
            <div className="mt-4 flex items-center text-blue-600">
              <span className="text-sm font-medium">Get Started</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Question form screen
  const renderQuestionForm = () => (
    <motion.div
      key="question-form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">{currentGroup.title}</h2>
        
        <div className="space-y-6">
          {currentGroup.questions.map((question) => {
            // Check if this question should be shown based on conditions
            if (question.condition) {
              const conditionField = question.condition.field;
              const conditionValue = question.condition.value;
              if (answers[conditionField] !== conditionValue) {
                return null;
              }
            }
            
            return (
              <QuestionForm
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={handleAnswerChange}
                error={errors[question.id]}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentStep === totalSteps - 1 ? 'Generate Document' : 'Next'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className={`container mx-auto px-4 ${
        showPreview ? 'pt-48' : 'pt-48 pb-20'
      }`}>
        {/* Progress Indicator - only show when template is selected */}
        {selectedTemplate && !showPreview && (
          <ProgressIndicator 
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitles={stepTitles}
          />
        )}
        
        <AnimatePresence mode="wait">
          {showPreview ? (
            <DocumentPreview
              document={generatedDocument}
              documentType={selectedTemplate}
              onEdit={handleEdit}
              isGenerating={isGenerating}
            />
          ) : currentStep === 0 ? (
            renderTemplateSelection()
          ) : (
            renderQuestionForm()
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DraftDocument;
