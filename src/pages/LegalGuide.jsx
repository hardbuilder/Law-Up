import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMessageSquare, FiSend } from 'react-icons/fi';

const LegalGuide = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! Ask me any legal question.', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      let updatedHistory;
      let currentChatId;

      if (activeChat) {
        currentChatId = activeChat.id;
        updatedHistory = chatHistory.map(chat =>
          chat.id === activeChat.id ? { ...chat, messages: newMessages } : chat
        );
        setChatHistory(updatedHistory);
      } else {
        currentChatId = Date.now();
        const newChat = { id: currentChatId, title: inputValue.slice(0, 25), messages: newMessages };
        updatedHistory = [newChat, ...chatHistory];
        setChatHistory(updatedHistory);
        setActiveChat(newChat);
      }
      setInputValue('');

      setTimeout(() => {
        const botResponse = { text: 'This is a simulated response to your legal query.', sender: 'bot' };
        const finalMessages = [...newMessages, botResponse];
        setMessages(finalMessages);

        const finalUpdatedHistory = updatedHistory.map(chat =>
            chat.id === currentChatId ? { ...chat, messages: finalMessages } : chat
          );
        setChatHistory(finalUpdatedHistory);

      }, 1500);
    }
  };

  const handleHistoryClick = (chat) => {
    setActiveChat(chat);
    setMessages(chat.messages);
  };

  const startNewChat = () => {
    setActiveChat(null);
    setMessages([{ text: 'Hello! Ask me any legal question.', sender: 'bot' }]);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex h-[85vh]">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-50 border-r border-gray-200 text-gray-800 flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-blue-900" style={{ fontFamily: '"Poppins", sans-serif' }}>Legal Guide</h1>
                </div>
                <button
                    onClick={startNewChat}
                    className="flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-6 hover:bg-blue-700 transition-colors"
                    >
                    <FiPlus className="mr-2" /> New Chat
                </button>
                <div className="flex-grow overflow-y-auto pr-2">
                    <h2 className="text-sm font-semibold text-gray-500 mb-2">Recent</h2>
                    <ul>
                        <AnimatePresence>
                        {chatHistory.map((chat) => (
                            <motion.li
                            key={chat.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={() => handleHistoryClick(chat)}
                            className={`flex items-center p-2 cursor-pointer rounded-lg mb-2 ${
                                activeChat?.id === chat.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200/50'
                            }`}
                            >
                            <FiMessageSquare className="mr-3 flex-shrink-0" />
                            <span className="truncate">{chat.title}</span>
                            </motion.li>
                        ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="w-2/3 flex-1 flex flex-col bg-white">
                <div className="flex-1 p-6 overflow-y-auto" ref={chatContainerRef}>
                    <AnimatePresence>
                        {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`flex items-start gap-4 my-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
                        >
                            {message.sender === 'bot' && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
                                G
                            </div>
                            )}
                            <div
                            className={`rounded-2xl p-4 max-w-2xl shadow-sm ${
                                message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                            }`}
                            >
                            <p style={{whiteSpace: 'pre-wrap'}}>{message.text}</p>
                            </div>
                            {message.sender === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-600 font-bold">
                                Y
                            </div>
                            )}
                        </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input area */}
                <div className="p-6 bg-white border-t border-gray-200">
                    <div className="bg-gray-100 rounded-full shadow-inner flex items-center p-2">
                        <input
                        type="text"
                        className="flex-grow bg-transparent text-lg px-4 focus:outline-none"
                        placeholder="Ask me anything about law..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="bg-blue-600 text-white rounded-full p-3 transition-transform duration-300 hover:scale-110 disabled:bg-gray-400 disabled:scale-100"
                        >
                        <FiSend className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LegalGuide;