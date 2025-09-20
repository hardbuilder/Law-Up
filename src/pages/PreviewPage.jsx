import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SummaryCard from '../components/preview/SummaryCard';
import KeyClausesCard from '../components/preview/KeyClausesCard';
import RisksCard from '../components/preview/RisksCard';
import InfoCards from '../components/preview/InfoCards';
import GraphicalSummary from '../components/preview/GraphicalSummary';
import ChatView from '../components/preview/ChatView';

const PreviewPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you with this document?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
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
  const score = 85;

  const location = useLocation();

  useEffect(() => {
    const file = location.state?.uploadedFile;
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      // Dummy data
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

      return () => URL.revokeObjectURL(url);
    }
  }, [location.state?.uploadedFile]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputValue('');

      setTimeout(() => {
        const botResponse = { text: 'This is a simulated response.', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
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

        <main className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {viewMode === 'summary' ? (
              <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto space-y-8">
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="space-y-8">
                  <SummaryCard summary={summary} variants={cardVariants} />
                  <KeyClausesCard keyClauses={keyClauses} variants={cardVariants} />
                  <GraphicalSummary score={score} positives={positives} risks={risks} sentiment={sentiment} variants={cardVariants} />
                  <RisksCard risks={risks} riskFilter={riskFilter} setRiskFilter={setRiskFilter} variants={cardVariants} />
                  <InfoCards positives={positives} obligations={obligations} entitlements={entitlements} variants={cardVariants} />
                </motion.div>
              </motion.div>
            ) : (
              <ChatView 
                messages={messages} 
                inputValue={inputValue} 
                setInputValue={setInputValue} 
                handleSendMessage={handleSendMessage} 
                chatContainerRef={chatContainerRef} 
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default PreviewPage;
