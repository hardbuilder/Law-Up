import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import { motion } from 'framer-motion';

const TncPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        <div className="text-gray-700 max-h-64 overflow-y-auto">
          <p>This is a placeholder for your terms and conditions. You should replace this with your actual T&Cs.</p>
          <p>1. By using this service, you agree to our terms of use.</p>
          <p>2. The documents you upload are your responsibility.</p>
          <p>3. We are not liable for any legal issues arising from the use of our service.</p>
          <p>4. We reserve the right to change these terms and conditions at any time.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};


const AnalyzeDocument = () => {
  const [file, setFile] = useState(null);
  const [tncAccepted, setTncAccepted] = useState(false);
  const [showTncPopup, setShowTncPopup] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    if (!tncAccepted) {
      alert('Please accept the terms and conditions before submitting.');
      return;
    }
    // Handle file upload logic here
    console.log('Uploading file:', file);
    navigate('/preview', { state: { uploadedFile: file } });
  };

  return (
    <section className="relative py-64">
      {showTncPopup && <TncPopup onClose={() => setShowTncPopup(false)} />}
      <img
        src="/assests/analyze/bg.png"
        alt="decor"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="relative w-full flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-10">
          <section className="flex-1 flex flex-col justify-center text-center lg:text-left">
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1
                className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ fontFamily: '"Sansita", sans-serif' }}
              >
                Upload Your Document Here
              </h1>
              <motion.p initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="py-4 text-white">
                Accepted formats : PDF, JPG, JPEG, DOC, Text
              </motion.p>
            </motion.div>
          </section>
          <section className="flex-1 flex flex-col justify-center mt-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <UploadBox onFileChange={handleFileChange} file={file} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex items-center self-start py-6">
              <input
                type="checkbox"
                id="tnc-checkbox"
                checked={tncAccepted}
                onChange={() => setTncAccepted(!tncAccepted)}
                className="mr-2"
              />
              <div className="text-white">
                By clicking submit you are accepting our{' '}
                <span
                  className="underline cursor-pointer"
                  onClick={() => setShowTncPopup(true)}
                >
                  terms & conditions
                </span>
              </div>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#2C2C2C] hover:bg-black text-white rounded-md mb-2 self-start"
            >
              Submit
            </motion.button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AnalyzeDocument;