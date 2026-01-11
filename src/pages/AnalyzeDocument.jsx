import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/analyze/UploadBox';
import { motion } from 'framer-motion';
import TermsAndConditions from '../components/analyze/TermsAndConditions';
import API_URL from '../config/api';

const AnalyzeDocument = () => {
  const [file, setFile] = useState(null);
  const [tncAccepted, setTncAccepted] = useState(false);
  const [showTncPopup, setShowTncPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    if (!tncAccepted) {
      alert('Please accept the terms and conditions before submitting.');
      return;
    }

    try {
      setIsUploading(true);
      console.log('Starting file upload...', file);
      
      // Step 1: Upload file
      const formData = new FormData();
      formData.append('document', file);
      
      console.log('Sending upload request to', `${API_URL}/upload`);
      const uploadResponse = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      console.log('Upload response status:', uploadResponse.status);
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('Upload failed:', errorText);
        throw new Error(`Failed to upload file: ${uploadResponse.status} ${errorText}`);
      }
      
      const uploadData = await uploadResponse.json();
      console.log('Upload successful:', uploadData);
      const fileId = uploadData.fileId;
      
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Step 2: Analyze document
      console.log('Starting document analysis with fileId:', fileId);
      const analysisResponse = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId }),
      });
      
      console.log('Analysis response status:', analysisResponse.status);
      
      if (!analysisResponse.ok) {
        const errorText = await analysisResponse.text();
        console.error('Analysis failed:', errorText);
        throw new Error(`Failed to analyze document: ${analysisResponse.status} ${errorText}`);
      }
      
      const analysisData = await analysisResponse.json();
      console.log('Analysis successful:', analysisData);
      
      setIsAnalyzing(false);
      
      // Navigate to preview with analysis results
      navigate('/preview', { 
        state: { 
          uploadedFile: file,
          fileId: fileId,
          analysis: analysisData.analysis
        }
      });
      
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="relative py-64">
      {showTncPopup && <TermsAndConditions onClose={() => setShowTncPopup(false)} />}
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
              disabled={isUploading || isAnalyzing}
              className="px-6 py-2 bg-[#2C2C2C] hover:bg-black text-white rounded-md mb-2 self-start disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Submit'}
            </motion.button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AnalyzeDocument;
