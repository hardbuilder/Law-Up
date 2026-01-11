import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SummaryCard from '../components/preview/SummaryCard';
import KeyClausesCard from '../components/preview/KeyClausesCard';
import RisksCard from '../components/preview/RisksCard';
import InfoCards from '../components/preview/InfoCards';
import GraphicalSummary from '../components/preview/GraphicalSummary';
import ChatView from '../components/preview/ChatView';
import API_URL from '../config/api';

const PreviewPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you with this document?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [fileId, setFileId] = useState(null);
  const chatContainerRef = useRef(null);
  const [summary, setSummary] = useState('');
  const [risks, setRisks] = useState([]);
  const [riskFilter, setRiskFilter] = useState('All');
  const [positives, setPositives] = useState([]);
  const [obligations, setObligations] = useState([]);
  const [entitlements, setEntitlements] = useState([]);
  const [sentiment, setSentiment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('summary'); // 'summary' or 'chat'
  const [keyClauses, setKeyClauses] = useState([]);
  const [score, setScore] = useState(85);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Clean text function to remove markdown formatting
  const cleanText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove ** markdown
      .replace(/#{1,6}\s?/g, '')        // Remove # markdown headers
      .replace(/\*\s/g, '')            // Remove * bullet points
      .replace(/\n\s*\n/g, '\n\n')     // Normalize line breaks
      .trim();
  };

  const location = useLocation();

  useEffect(() => {
    const file = location.state?.uploadedFile;
    const analysis = location.state?.analysis;
    const uploadedFileId = location.state?.fileId;
    
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileId(uploadedFileId);

      // Use real analysis data if available
      if (analysis) {
        setSummary(analysis.summary || "Document analysis completed successfully.");
        setRisks(analysis.risks || []);
        setPositives(analysis.positives || []);
        setObligations(analysis.obligations || []);
        setEntitlements(analysis.entitlements || []);
        setKeyClauses(analysis.keyClauses || []);
        setSentiment(analysis.sentiment || "Neutral");
        setScore(analysis.score || 75);
      } else {
        // Fallback to dummy data if no analysis provided
        setSummary("This employment agreement outlines the terms of John Doe's position as a Software Engineer at Acme Corp, including salary, responsibilities, and termination clauses. The agreement is standard but contains clauses that require careful review.");
        setRisks([
          { text: "The non-compete clause is broad and may restrict future employment opportunities.", severity: 'High', recommendation: 'Consult with a lawyer to review the non-compete clause.' },
          { text: "Termination for 'cause' is vaguely defined, giving the employer significant discretion.", severity: 'Medium', recommendation: 'Request a more precise definition of \'cause\' for termination.' },
          { text: "The intellectual property clause assigns all work-related inventions to the company, which is standard but noteworthy.", severity: 'Low', recommendation: 'Ensure you understand the scope of the IP clause.' },
        ]);
        setPositives(["The salary and bonus structure are competitive for the industry.", "The company offers a comprehensive benefits package, including health insurance and a 401(k) plan."]);
        setObligations(["The employee must work 40 hours per week.", "The employee must not disclose confidential company information."]);
        setEntitlements(["The employee is entitled to 20 days of paid time off per year.", "The employee is entitled to a yearly performance bonus."]);
        setKeyClauses([
          { title: "Non-Compete Clause", content: "The non-compete clause is broad and may restrict future employment opportunities." },
          { title: "Termination for Cause", content: "Termination for 'cause' is vaguely defined, giving the employer significant discretion." },
          { title: "Intellectual Property", content: "The intellectual property clause assigns all work-related inventions to the company, which is standard but noteworthy." },
        ]);
        setSentiment("Formal & Neutral");
        setScore(85);
      }

      return () => URL.revokeObjectURL(url);
    }
  }, [location.state?.uploadedFile, location.state?.analysis, location.state?.fileId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      const currentInput = inputValue;
      setInputValue('');
      setIsBotTyping(true);

      try {
        const response = await fetch(`${API_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: currentInput, 
            fileId: fileId // Include the fileId for document context
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from server');
        }

        const data = await response.json();
        const cleanedResponse = cleanText(data.response);
        const botResponse = { text: cleanedResponse, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Chat error:', error);
        const errorResponse = { 
          text: 'Sorry, I encountered an error while processing your question. Please try again.', 
          sender: 'bot' 
        };
        setMessages(prevMessages => [...prevMessages, errorResponse]);
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  const handlePreviewClick = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-sans">
      <div className={`pt-48 pb-12 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <header className="container mx-auto px-4 text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-900 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>
            Your Document, Analyzed.
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>Review the summary, risks, and positives we've identified, or start a conversation with your document.</p>
          <button
            onClick={handlePreviewClick}
            disabled={!fileUrl}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full my-8 disabled:bg-gray-400 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
          >
            Preview Document
          </button>
          <div className="flex justify-center items-center mt-8">
            <div className="relative flex w-64 items-center rounded-full bg-gray-100 p-1">
                <motion.div
                    className="absolute h-full w-1/2"
                    animate={{ x: viewMode === 'chat' ? '100%' : '0%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="h-full w-full rounded-full bg-white shadow-md" />
                </motion.div>
                <button
                    onClick={() => setViewMode('summary')}
                    className={`relative z-10 w-1/2 rounded-full py-2 text-center font-medium transition-colors ${
                        viewMode === 'summary' ? 'text-blue-600' : 'text-gray-500'
                    }`}
                >
                    Summary
                </button>
                <button
                    onClick={() => setViewMode('chat')}
                    className={`relative z-10 w-1/2 rounded-full py-2 text-center font-medium transition-colors ${
                        viewMode === 'chat' ? 'text-blue-600' : 'text-gray-500'
                    }`}
                >
                    Chat
                </button>
            </div>
        </div>
        </header>

        <main className="w-full px-4">
          <AnimatePresence mode="wait">
            {viewMode === 'summary' ? (
              <motion.div 
                key="summary" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="w-full"
              >
                {/* Two-column layout for better space utilization */}
                <div className="max-w-7xl mx-auto">
                  <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="grid grid-cols-1 xl:grid-cols-12 gap-8"
                  >
                    {/* Left Column - Primary Analysis */}
                    <div className="xl:col-span-9 space-y-8">
                      <SummaryCard summary={summary} variants={cardVariants} />
                      <KeyClausesCard keyClauses={keyClauses} variants={cardVariants} />
                      <RisksCard risks={risks} riskFilter={riskFilter} setRiskFilter={setRiskFilter} variants={cardVariants} />
                    </div>
                    
                    {/* Right Column - Dashboard & Insights */}
                    <div className="xl:col-span-3 space-y-8">
                      <GraphicalSummary score={score} positives={positives} risks={risks} sentiment={sentiment} variants={cardVariants} />
                      
                      {/* Quick insights panel */}
                      <motion.div variants={cardVariants} className="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-3xl border border-slate-200 shadow-xl sticky top-48 mt-6">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Quick Insights</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                            <span className="text-sm font-medium text-slate-700">Document Type</span>
                            <span className="text-sm font-bold text-slate-900">Legal Agreement</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                            <span className="text-sm font-medium text-slate-700">Complexity</span>
                            <span className="text-sm font-bold text-blue-600">Professional Level</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                            <span className="text-sm font-medium text-slate-700">Review Status</span>
                            <span className="text-sm font-bold text-green-600">✓ Analyzed</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                            <span className="text-sm font-medium text-slate-700">Recommendation</span>
                            <span className="text-sm font-bold text-orange-600">Legal Review</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Full-width bottom section */}
                  <motion.div variants={cardVariants} className="mt-8">
                    <InfoCards positives={positives} obligations={obligations} entitlements={entitlements} variants={cardVariants} />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="max-w-7xl mx-auto">
                  <ChatView 
                    messages={messages} 
                    inputValue={inputValue} 
                    setInputValue={setInputValue} 
                    handleSendMessage={handleSendMessage} 
                    chatContainerRef={chatContainerRef}
                    isBotTyping={isBotTyping}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default PreviewPage;
