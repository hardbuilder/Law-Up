import React from 'react';
import { motion } from 'framer-motion';

const ChatView = ({ messages, inputValue, setInputValue, handleSendMessage, chatContainerRef, isBotTyping }) => {
  // Clean text function to remove markdown formatting
  const cleanText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove ** markdown
      .replace(/#{1,6}\s?/g, '')        // Remove # markdown headers
      .replace(/\*\s/g, '')            // Remove * bullet points
      .replace(/\n\s*\n/g, '\n\n')     // Normalize line breaks
      .trim();
  };

  return (
    <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-[70vh]">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: '"Sansita", sans-serif' }}>Chat with Document</h2>
                <p className="text-blue-100 text-sm">Ask questions about your legal document</p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'bot' && (
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                        src="/assests/home/logo.jpg" 
                        alt="Law-Up AI" 
                        className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`rounded-xl p-4 max-w-2xl ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{message.sender === 'bot' ? cleanText(message.text) : message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-600 font-bold">
                    You
                  </div>
                )}
              </div>
            ))}
            {isBotTyping && (
              <div className="flex items-start gap-4 justify-start">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img 
                      src="/assests/home/logo.jpg" 
                      alt="Law-Up AI" 
                      className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl p-4 max-w-lg bg-gray-100 text-gray-800">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "What are the main risks?",
                "Summarize key benefits",
                "Explain termination clauses",
                "What are my obligations?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(suggestion);
                    setTimeout(handleSendMessage, 100);
                  }}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                className="flex-grow rounded-full py-3 px-6 border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Type your question here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="bg-blue-600 text-white rounded-full p-3 transition-transform duration-300 hover:scale-110 disabled:bg-gray-400 disabled:scale-100"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ChatView;
