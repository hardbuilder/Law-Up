import React from 'react';

const UploadBox = ({ onFileChange, onDrop, file }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onFileChange(selectedFile);
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
      <section>
        <div 
          className="relative bg-white rounded-2xl w-full sm:w-[500px] md:w-[600px] h-[350px] flex flex-col items-center justify-center shadow-lg overflow-hidden border-2 border-dashed border-gray-400"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onDrop(e.dataTransfer.files);
          }}
        >
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.doc,.docx,.txt"
          />

          {/* Top icons */}
          <div className="absolute top-6 left-6 flex space-x-4">
            <img src="/assests/analyze/Hard drive.png" alt="Hard Drive" className="w-8 h-8" />
            <img src="/assests/analyze/Cloud.svg" alt="Cloud" className="w-8 h-8" />
          </div>
          
          {file ? (
            <div>
              <p className="text-gray-800">File: {file.name}</p>
            </div>
          ) : (
            <>
              {/* Upload icon */}
              <img src="/assests/analyze/Upload.png" alt="Upload Icon" className="w-10 h-10 mb-4" />

              {/* Upload options */}
              <div className="flex flex-col items-center">
                <button onClick={handleBrowseClick} className="px-6 py-2 bg-[#2C2C2C] hover:bg-black text-white rounded-md mb-2">
                  Browse
                </button>
                <p className="text-gray-400">or</p>
                <p className="text-gray-400">Drag and drop your agreement</p>
              </div>
            </>
          )}
        </div>
      </section>
    );
  };
  
  export default UploadBox;
