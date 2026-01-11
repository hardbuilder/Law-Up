import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const DocumentPreview = ({ document, documentType, onEdit, onDownload, isGenerating }) => {
  const previewRef = useRef(null);

  const handlePrint = () => {
    // Clean the document text for printing
    const cleanText = document
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove ** markdown
      .replace(/#{1,6}\s?/g, '')        // Remove # markdown headers
      .replace(/\*\s/g, '')            // Remove * bullet points
      .replace(/\n\s*\n/g, '\n\n')     // Normalize line breaks
      .trim();

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${documentType.replace('-', ' ')} - Law-Up</title>
          <style>
            body { 
              font-family: 'Times New Roman', serif; 
              line-height: 1.8; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 40px 20px; 
              color: #333;
            }
            h1 { 
              text-align: center;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 30px;
              text-transform: uppercase;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            h2 { 
              font-size: 16px;
              font-weight: bold;
              margin: 25px 0 10px 0;
              text-transform: uppercase;
            }
            h3 { 
              font-size: 14px;
              font-weight: bold;
              margin: 20px 0 8px 0;
            }
            p { 
              margin: 12px 0;
              text-align: justify;
            }
            .signature-section {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #333;
            }
            .signature-line { 
              border-bottom: 1px solid #000; 
              display: inline-block; 
              width: 200px; 
              margin: 0 20px 5px 0; 
            }
            .signature-label {
              font-size: 12px;
              margin-top: 5px;
            }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div>${cleanText.split('\n\n').map(para => {
            const trimmed = para.trim();
            if (trimmed.match(/^[A-Z\s]{10,}$/)) {
              return `<h1>${trimmed}</h1>`;
            } else if (trimmed.match(/^[A-Z\s]{5,}:?$/) || trimmed.match(/^\d+\.\s*[A-Z\s]{5,}$/)) {
              return `<h2>${trimmed}</h2>`;
            } else if (trimmed.match(/^\d+\.\s/)) {
              return `<h3>${trimmed}</h3>`;
            } else if (trimmed.includes('_______') || trimmed.match(/Signature|Date:/)) {
              return `<div class="signature-section">
                        <div style="display: flex; justify-content: space-between;">
                          <div><div class="signature-line"></div><br><span class="signature-label">Signature</span></div>
                          <div><div class="signature-line"></div><br><span class="signature-label">Date</span></div>
                        </div>
                      </div>`;
            } else {
              return `<p>${trimmed}</p>`;
            }
          }).join('')}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleCopy = () => {
    // Clean the document text before copying
    const cleanText = document
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove ** markdown
      .replace(/#{1,6}\s?/g, '')        // Remove # markdown headers
      .replace(/\*\s/g, '')            // Remove * bullet points
      .replace(/\n\s*\n/g, '\n\n')     // Normalize line breaks
      .trim();
      
    navigator.clipboard.writeText(cleanText);
    // You might want to add a toast notification here
  };

  const formatDocument = (text) => {
    // Clean up markdown formatting and improve document structure
    let cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove ** markdown
      .replace(/#{1,6}\s?/g, '')       // Remove # markdown headers
      .replace(/\*\s/g, '')           // Remove * bullet points
      .trim();

    // Split into paragraphs
    const paragraphs = cleanText.split(/\n\s*\n/).filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      const trimmedPara = paragraph.trim();
      
      // Document title (usually first all-caps line)
      if (index === 0 && trimmedPara.match(/^[A-Z\s]{10,}$/)) {
        return (
          <h1 key={index} className="text-2xl font-bold text-center text-blue-900 mb-8 uppercase tracking-wide border-b-2 border-blue-200 pb-4">
            {trimmedPara}
          </h1>
        );
      }
      
      // Main section headers (ALL CAPS followed by colon or numbered)
      if (trimmedPara.match(/^[A-Z\s]{5,}:?$/) || trimmedPara.match(/^\d+\.\s*[A-Z\s]{5,}$/)) {
        return (
          <h2 key={index} className="text-lg font-bold text-blue-900 mt-8 mb-4 uppercase tracking-wide border-l-4 border-blue-500 pl-4">
            {trimmedPara}
          </h2>
        );
      }
      
      // Numbered main sections
      if (trimmedPara.match(/^\d+\.\s/)) {
        return (
          <h3 key={index} className="text-md font-semibold text-gray-900 mt-6 mb-3 border-l-2 border-gray-300 pl-3">
            {trimmedPara}
          </h3>
        );
      }
      
      // Sub-sections with letters
      if (trimmedPara.match(/^[a-z]\.|^\([a-z]\)/)) {
        return (
          <p key={index} className="ml-6 mb-2 text-gray-800 font-medium">
            {trimmedPara}
          </p>
        );
      }
      
      // Signature lines
      if (trimmedPara.includes('_______') || trimmedPara.match(/Signature|Date:/)) {
        return (
          <div key={index} className="mt-8 mb-4 flex justify-between border-t pt-6">
            <div className="text-center">
              <div className="border-b border-gray-800 w-48 mb-2"></div>
              <p className="text-sm text-gray-600">Signature</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-800 w-32 mb-2"></div>
              <p className="text-sm text-gray-600">Date</p>
            </div>
          </div>
        );
      }
      
      // Handle multi-line paragraphs
      if (trimmedPara.includes('\n')) {
        const lines = trimmedPara.split('\n').filter(line => line.trim());
        return (
          <div key={index} className="mb-4">
            {lines.map((line, lineIndex) => (
              <p key={lineIndex} className="mb-2 text-gray-800 leading-relaxed">
                {line.trim()}
              </p>
            ))}
          </div>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-4 text-gray-800 leading-relaxed text-justify">
          {trimmedPara}
        </p>
      );
    });
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-600">Generating your document...</p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto w-full"
      >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold">
          {documentType.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
        </h2>
        <p className="text-blue-100 mt-1">Review your generated document</p>
      </div>

      {/* Action Buttons */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Details
          </button>
          
          <button
            onClick={handleCopy}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Text
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print/Save PDF
          </button>

          {onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          )}
        </div>
      </div>

      {/* Document Content */}
      <div 
        ref={previewRef}
        className="p-8 bg-white max-h-[60vh] overflow-y-auto"
        style={{ 
          fontFamily: 'Times New Roman, serif',
          lineHeight: '1.6'
        }}
      >
        {formatDocument(document)}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Generated by Law-Up</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <strong>Disclaimer:</strong> This document is generated by AI and should be reviewed by a qualified attorney before use.
        </p>
      </div>
      </motion.div>
    </div>
  );
};

export default DocumentPreview;
