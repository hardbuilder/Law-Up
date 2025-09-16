import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

  const filteredRisks = risks.filter(risk => riskFilter === 'All' || risk.severity === riskFilter);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-sans">
      <div className={`pt-24 pb-12 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
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
        </header>

        <main className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="space-y-8">
                <motion.div variants={cardVariants} className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                  <h2 className="text-3xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Summary</h2>
                  <p className="text-lg text-gray-700 text-left leading-relaxed">{summary || 'Generating summary...'}</p>
                </motion.div>

                <motion.div variants={cardVariants} className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-8 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                    <h3 className="text-3xl font-bold text-red-800 text-left mb-4 sm:mb-0" style={{ fontFamily: '"Sansita", sans-serif' }}>Risks Identified</h3>
                    <div className="flex items-center space-x-1 p-1 bg-red-100 rounded-full shadow-inner self-start sm:self-center">
                      <button onClick={() => setRiskFilter('All')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'All' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:bg-red-200'}`}>All</button>
                      <button onClick={() => setRiskFilter('High')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'High' ? 'bg-red-600 text-white shadow-md' : 'text-red-700 hover:bg-red-200'}`}>High</button>
                      <button onClick={() => setRiskFilter('Medium')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'Medium' ? 'bg-yellow-600 text-white shadow-md' : 'text-yellow-700 hover:bg-yellow-200'}`}>Medium</button>
                      <button onClick={() => setRiskFilter('Low')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${riskFilter === 'Low' ? 'bg-green-600 text-white shadow-md' : 'text-green-700 hover:bg-green-200'}`}>Low</button>
                    </div>
                  </div>
                  <ul className="space-y-6 text-left">
                    <AnimatePresence>
                      {filteredRisks.length > 0 ? filteredRisks.map((risk, index) => (
                        <motion.li key={risk.text} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className={index < filteredRisks.length - 1 ? 'border-b border-red-200 pb-6' : ''}>
                          <p className="text-lg font-semibold text-red-900">{risk.text}</p>
                          <p className="text-base text-gray-700 mt-2"><b>Recommendation:</b> {risk.recommendation}</p>
                        </motion.li>
                      )) : (
                        <li className="text-center text-gray-500 py-4">{risks.length === 0 ? 'Generating risks...' : 'No risks found for this severity level.'}</li>
                      )}
                    </AnimatePresence>
                  </ul>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <motion.div variants={cardVariants} className="bg-green-50 border border-green-200 rounded-2xl shadow-lg p-6 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                    <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Positive Points</h3>
                    <ul className="divide-y divide-green-200">
                      {positives.length > 0 ? positives.map((positive, index) => <li key={index} className="py-3 text-lg text-gray-800">{positive}</li>) : <li className="py-3 text-lg text-gray-500">Generating positives...</li>}
                    </ul>
                  </motion.div>
                  <motion.div variants={cardVariants} className="bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-6 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Your Obligations</h3>
                    <ul className="divide-y divide-blue-200">
                      {obligations.length > 0 ? obligations.map((item, index) => <li key={index} className="py-3 text-lg text-gray-800">{item}</li>) : <li className="py-3 text-lg text-gray-500">Generating obligations...</li>}
                    </ul>
                  </motion.div>
                  <motion.div variants={cardVariants} className="bg-green-50 border border-green-200 rounded-2xl shadow-lg p-6 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                    <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Your Entitlements</h3>
                    <ul className="divide-y divide-green-200">
                      {entitlements.length > 0 ? entitlements.map((item, index) => <li key={index} className="py-3 text-lg text-gray-800">{item}</li>) : <li className="py-3 text-lg text-gray-500">Generating entitlements...</li>}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column (Sticky Sidebar) */}
            <div className="lg:col-span-1 lg:sticky top-24 space-y-8">
              <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Safety Score</h2>
                <div className="flex justify-center items-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 120 120">
                      <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                      <motion.circle
                        className="text-green-500"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        transform="rotate(-90 60 60)"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-green-500">{score}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 text-left" style={{ fontFamily: '"Sansita", sans-serif' }}>Overall Sentiment</h2>
                <div className="flex flex-col justify-center items-center h-full py-4">
                  <div className="text-6xl mb-2">😐</div>
                  <p className="text-2xl font-bold text-gray-700">{sentiment || 'Analyzing...'}</p>
                </div>
              </motion.div>
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex flex-col h-[500px]">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: '"Sansita", sans-serif' }}>Chat with Document</h2>
                  <div ref={chatContainerRef} className="flex-grow overflow-y-auto pr-4 space-y-6">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.sender === 'bot' && (
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                            AI
                          </div>
                        )}
                        <div className={`rounded-xl p-4 max-w-lg ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                          <p>{message.text}</p>
                        </div>
                        {message.sender === 'user' && (
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-600 font-bold">
                            You
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex">
                    <input
                      type="text"
                      className="flex-grow rounded-full py-3 px-6 border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Type your query here..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                      className="bg-blue-600 text-white rounded-full p-3 ml-4 transition-transform duration-300 hover:scale-110 disabled:bg-gray-400 disabled:scale-100"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreviewPage;
