# ⚖️ Law-Up - AI-Powered Legal Assistant

> Making legal documents accessible and understandable for everyone.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)

**Law-Up** is an intelligent legal assistant web application that uses Google's Gemini AI to help users analyze legal documents, get legal guidance, and generate custom legal documents - all with a user-friendly interface.

---

## 🌟 Features

### 📄 Document Analysis
- **Upload & Analyze**: Support for PDF, DOC, DOCX, TXT, JPG, JPEG, and PNG files
- **Intelligent OCR**: Extract text from images using Tesseract.js
- **Comprehensive Analysis**:
  - Executive summary
  - Key clauses identification
  - Risk assessment with severity levels
  - Benefits and positives
  - Your obligations and entitlements
  - Document sentiment and overall score

### 💬 Legal Guide Chat
- **Interactive AI Chat**: Ask questions about legal concepts
- **Document-Specific Q&A**: Chat about uploaded documents with context
- **Structured Responses**: Clear, concise answers with actionable recommendations
- **Chat History**: Save and revisit previous conversations

### 📝 Document Drafting
- **Template-Based Generation**: Create legal documents from templates
- **Guided Questionnaire**: Step-by-step form to gather information
- **AI-Powered Drafting**: Generate professional, properly formatted documents
- **Instant Preview**: Review and download generated documents

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion
- **Clean Interface**: Built with Tailwind CSS 4
- **Dark Mode Ready**: Modern styling with Sansita font family

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13
- **Animations**: Framer Motion 12.23.12
- **Routing**: React Router DOM 7.9.1
- **Icons**: React Icons 5.5.0

### Backend
- **Runtime**: Node.js (≥20.19.0)
- **Framework**: Express 4.18.2
- **AI Model**: Google Gemini 2.5 Flash
- **Document Processing**:
  - pdf-parse (PDF extraction)
  - mammoth (Word document extraction)
  - Tesseract.js (OCR for images)
- **File Upload**: Multer 2.0.2

---

## 📦 Installation

### Prerequisites
- Node.js ≥20.19.0
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Step 1: Clone the Repository

```bash
git clone https://github.com/hardbuilder/law-up.git
cd law-up
```

### Step 2: Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
cd ..
```

### Step 3: Configure Environment Variables

Edit `server/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

### Step 4: Start Development Servers

#### Terminal 1 - Backend Server
```bash
cd server
npm start
```

The backend will run on http://localhost:5000

#### Terminal 2 - Frontend Development Server
```bash
npm run dev
```

The frontend will run on http://localhost:5173

### Step 5: Open in Browser

Navigate to http://localhost:5173 and start using Law-Up!

---

## 🚀 Deployment

Law-Up can be deployed for **FREE** using:
- **Backend**: Render, Railway, or Fly.io
- **Frontend**: Vercel, Netlify, or Cloudflare Pages

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Quick Deploy**:
1. Push code to GitHub
2. Deploy backend to Render (free tier)
3. Deploy frontend to Vercel (free tier)
4. Update CORS and environment variables

---

## 📖 Usage

### Analyze a Document

1. Navigate to **Analyze Document** page
2. Upload your legal document (PDF, DOC, DOCX, TXT, or image)
3. Accept terms and conditions
4. Click **Submit**
5. View comprehensive analysis with:
   - Summary
   - Key clauses
   - Risks and recommendations
   - Benefits
   - Your rights and obligations
6. Switch to **Chat** mode to ask specific questions about the document

### Get Legal Guidance

1. Navigate to **Legal Guide** page
2. Start a new chat
3. Ask questions about legal concepts or situations
4. Receive structured responses with:
   - Key points
   - Recommendations
   - Legal disclaimer
5. Access chat history from the sidebar

### Draft a Document

1. Navigate to **Draft Document** page
2. Choose a document template:
   - Rental Agreement
   - Employment Contract
   - Non-Disclosure Agreement
   - Service Agreement
3. Fill out the guided questionnaire
4. Review the AI-generated document
5. Download or edit as needed

---

## 🎯 API Endpoints

### Backend Server (Port 5000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status check |
| GET | `/health` | Health check with configuration info |
| POST | `/upload` | Upload document for analysis |
| POST | `/analyze` | Analyze uploaded document |
| POST | `/chat` | Chat with AI (with optional document context) |
| POST | `/generate-document` | Generate legal document from template |

---

## 📁 Project Structure

```
law-up/
├── public/              # Static assets
├── server/              # Backend Express server
│   ├── uploads/         # Uploaded documents (temporary)
│   ├── index.js         # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env            # Environment variables
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # React components
│   │   ├── analyze/     # Document analysis components
│   │   ├── draft/       # Document drafting components
│   │   ├── home/        # Home page components
│   │   ├── legalguide/  # Legal guide components
│   │   └── preview/     # Preview page components
│   ├── config/          # Configuration files
│   │   └── api.js       # API URL configuration
│   ├── data/            # Static data (document templates)
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── AnalyzeDocument.jsx
│   │   ├── DraftDocument.jsx
│   │   ├── LegalGuide.jsx
│   │   ├── PreviewPage.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .gitignore
├── package.json         # Frontend dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── DEPLOYMENT_GUIDE.md  # Deployment instructions
└── README.md           # This file
```

---

## ⚠️ Important Notes

### Legal Disclaimer

**Law-Up is an educational tool and does NOT provide legal advice.**
- All responses are AI-generated and may contain errors
- Always consult a qualified attorney for specific legal matters
- The application provides general information only
- Not a substitute for professional legal counsel

### Data Privacy

- Uploaded documents are processed but not permanently stored
- Files are temporarily stored in `server/uploads/` during analysis
- No user data is collected or shared
- Use at your own risk

### API Key Security

- **NEVER** commit your `.env` file to version control
- Keep your Gemini API key confidential
- Rotate keys if accidentally exposed
- Use environment variables in production

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

---

## 🐛 Known Issues

- Cold start on free hosting (Render) takes 30-60 seconds
- Large files (>10MB) are rejected by the server
- OCR accuracy depends on image quality
- Some document formats may not extract perfectly

---

## 🗺️ Roadmap

- [ ] User authentication and saved documents
- [ ] More document templates
- [ ] Multi-language support
- [ ] Document comparison feature
- [ ] Mobile app (React Native)
- [ ] Premium features with better AI models
- [ ] Integration with legal databases
- [ ] Document signing and e-signature

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Team T-Error**

Built with ❤️ by developers who believe legal information should be accessible to everyone.

---

## 🙏 Acknowledgments

- Google Gemini AI for powerful natural language processing
- Tesseract.js for OCR capabilities
- Tailwind CSS for beautiful, responsive design
- Framer Motion for smooth animations
- The open-source community

---

## 📞 Support

Having issues? 

1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) troubleshooting section
2. Review [closed issues](https://github.com/YOUR_USERNAME/law-up/issues?q=is%3Aissue+is%3Aclosed)
3. Open a [new issue](https://github.com/YOUR_USERNAME/law-up/issues/new)

---

## 🌐 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **API Documentation**: See [API Endpoints](#-api-endpoints) section

---

<div align="center">


*Empowering everyone with accessible legal information*

[Report Bug](https://github.com/YOUR_USERNAME/law-up/issues) · [Request Feature](https://github.com/YOUR_USERNAME/law-up/issues)

</div>
