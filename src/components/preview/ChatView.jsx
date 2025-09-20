import React from 'react';
import { motion } from 'framer-motion';

const ChatView = ({ messages, inputValue, setInputValue, handleSendMessage, chatContainerRef, isBotTyping }) => {

  return (
    <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
        <div className="flex flex-col h-[70vh]">
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
                  <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
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
                <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                  AI
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
          <div className="mt-6 flex">
            <input
              type="text"
              className="flex-grow rounded-full py-3 px-6 border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500 transition-colors"
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
    </motion.div>
  )
}

export default ChatView;
