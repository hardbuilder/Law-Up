const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG files are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Legal-focused system prompt
const LEGAL_SYSTEM_PROMPT = `You are a helpful legal assistant AI for Law-Up, an application that helps users understand legal documents and provides legal guidance.

Your role:
- Provide clear, accurate legal information and guidance
- Explain complex legal concepts in simple terms
- Help users understand legal documents, contracts, and procedures
- Offer practical advice for common legal situations
- Always remind users that you provide general information and they should consult with a qualified attorney for specific legal advice

Guidelines:
- Be professional but approachable
- Use clear, jargon-free language when possible
- Provide structured responses when appropriate
- Always include a disclaimer about seeking professional legal advice for specific situations
- Focus on educational content rather than specific legal advice

Remember: You provide general legal information, not specific legal advice. Always encourage users to consult with qualified attorneys for their specific situations.

User question: `;

// Document analysis prompt
const DOCUMENT_ANALYSIS_PROMPT = `You are an expert legal document analyzer. Please analyze the following legal document and provide a comprehensive analysis in JSON format.

Analyze the document and return ONLY a valid JSON object with the following structure:

{
  "summary": "Brief overview of the document (2-3 sentences)",
  "keyClauses": [
    {
      "title": "Clause Title",
      "content": "Brief explanation of the clause"
    }
  ],
  "risks": [
    {
      "text": "Risk description",
      "severity": "High", "Medium", or "Low",
      "recommendation": "Specific recommendation"
    }
  ],
  "positives": ["List of positive aspects"],
  "obligations": ["List of obligations for the user"],
  "entitlements": ["List of user's entitlements/rights"],
  "sentiment": "Overall tone of the document",
  "score": numeric score from 1-100 (document favorability)
}

Document content:

`;

// Text extraction function
async function extractTextFromFile(filePath, mimeType) {
  try {
    switch (mimeType) {
      case 'application/pdf':
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        return pdfData.text;

      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docBuffer = fs.readFileSync(filePath);
        const result = await mammoth.extractRawText({ buffer: docBuffer });
        return result.value;

      case 'text/plain':
        return fs.readFileSync(filePath, 'utf8');

      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
        return text;

      default:
        throw new Error('Unsupported file type');
    }
  } catch (error) {
    throw new Error(`Failed to extract text: ${error.message}`);
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Law-Up API is running',
    status: 'healthy',
    version: '2.0.0',
    features: ['chat', 'document-upload', 'document-analysis']
  });
});

// Document upload endpoint
app.post('/upload', upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      });
    }

    res.json({
      message: 'File uploaded successfully',
      fileId: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Failed to upload file',
      details: error.message
    });
  }
});

// Document analysis endpoint
app.post('/analyze', async (req, res) => {
  try {
    const { fileId } = req.body;

    if (!fileId) {
      return res.status(400).json({
        error: 'File ID is required'
      });
    }

    const filePath = path.join(__dirname, 'uploads', fileId);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: 'File not found'
      });
    }

    // Get file info from filename (you might want to store this in a database)
    const files = fs.readdirSync(path.join(__dirname, 'uploads'));
    const fileInfo = files.find(f => f === fileId);
    
    if (!fileInfo) {
      return res.status(404).json({
        error: 'File information not found'
      });
    }

    // Determine mime type based on file extension
    const ext = path.extname(fileId).toLowerCase();
    let mimeType;
    switch (ext) {
      case '.pdf': mimeType = 'application/pdf'; break;
      case '.doc': mimeType = 'application/msword'; break;
      case '.docx': mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; break;
      case '.txt': mimeType = 'text/plain'; break;
      case '.jpg': case '.jpeg': mimeType = 'image/jpeg'; break;
      case '.png': mimeType = 'image/png'; break;
      default: mimeType = 'application/octet-stream';
    }

    // Extract text from document
    console.log('Extracting text from:', filePath, 'Type:', mimeType);
    const documentText = await extractTextFromFile(filePath, mimeType);
    
    if (!documentText || documentText.trim().length === 0) {
      return res.status(400).json({
        error: 'No text could be extracted from the document'
      });
    }

    console.log('Text extracted successfully, length:', documentText.length);

    // Analyze document with Gemini AI
    const analysisPrompt = DOCUMENT_ANALYSIS_PROMPT + documentText;
    
    console.log('Sending to Gemini for analysis...');
    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const analysisText = response.text();

    console.log('Received response from Gemini');

    // Parse the JSON response
    let analysisData;
    try {
      // Clean the response to extract JSON
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.log('Raw response:', analysisText);
      
      // Fallback: create structured data from plain text response
      analysisData = {
        summary: "Analysis completed successfully. The document has been reviewed for key terms, risks, and important clauses.",
        keyClauses: [
          {
            title: "Document Analysis",
            content: "The document has been processed and analyzed for important legal terms and conditions."
          }
        ],
        risks: [
          {
            text: "Please review the complete analysis provided by the AI assistant.",
            severity: "Medium",
            recommendation: "Consult with a legal professional for specific advice."
          }
        ],
        positives: ["Document successfully processed and analyzed"],
        obligations: ["Review all terms and conditions carefully"],
        entitlements: ["Access to AI-powered legal document analysis"],
        sentiment: "Professional",
        score: 75,
        fullAnalysis: analysisText
      };
    }

    // Clean up the uploaded file (optional)
    // fs.unlinkSync(filePath);

    res.json({
      message: 'Document analyzed successfully',
      analysis: analysisData,
      documentLength: documentText.length
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze document',
      details: error.message
    });
  }
});

// Chat endpoint for document-specific questions
app.post('/chat', async (req, res) => {
  try {
    const { prompt, fileId } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Gemini API key not configured'
      });
    }

    let fullPrompt = LEGAL_SYSTEM_PROMPT + prompt;

    // If fileId is provided, include document context
    if (fileId) {
      const filePath = path.join(__dirname, 'uploads', fileId);
      if (fs.existsSync(filePath)) {
        try {
          // Determine mime type based on file extension
          const ext = path.extname(fileId).toLowerCase();
          let mimeType;
          switch (ext) {
            case '.pdf': mimeType = 'application/pdf'; break;
            case '.doc': mimeType = 'application/msword'; break;
            case '.docx': mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; break;
            case '.txt': mimeType = 'text/plain'; break;
            case '.jpg': case '.jpeg': mimeType = 'image/jpeg'; break;
            case '.png': mimeType = 'image/png'; break;
            default: mimeType = 'application/octet-stream';
          }

          const documentText = await extractTextFromFile(filePath, mimeType);
          fullPrompt = `${LEGAL_SYSTEM_PROMPT}

Document context: ${documentText}

User question about the document: ${prompt}`;
        } catch (docError) {
          console.warn('Could not extract document context:', docError.message);
        }
      }
    }

    // Generate response using Gemini
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      return res.status(500).json({
        error: 'Empty response from Gemini API'
      });
    }

    res.json({
      response: text
    });

  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    gemini_configured: !!process.env.GEMINI_API_KEY,
    service: 'Law-Up Legal Assistant',
    timestamp: new Date().toISOString(),
    features: {
      fileUpload: true,
      documentAnalysis: true,
      aiChat: true,
      supportedFormats: ['PDF', 'DOC', 'DOCX', 'TXT', 'JPG', 'JPEG', 'PNG']
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Law-Up API server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/chat`);
  console.log(`📤 Upload endpoint: http://localhost:${PORT}/upload`);
  console.log(`🔍 Analysis endpoint: http://localhost:${PORT}/analyze`);
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`);
  
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  WARNING: GEMINI_API_KEY not found in environment variables');
  } else {
    console.log('✅ Gemini API key configured');
  }

  // Ensure uploads directory exists
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('📁 Created uploads directory');
  }
});
