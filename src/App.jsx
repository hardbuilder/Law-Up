import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AnalyzeDocument from './pages/AnalyzeDocument';
import DraftDocument from './pages/DraftDocument';
import LegalGuide from './pages/LegalGuide';
import About from './pages/About';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PreviewPage from './pages/PreviewPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<AnalyzeDocument />} />
            <Route path="/draft" element={<DraftDocument />} />
            <Route path="/legal-guide" element={<LegalGuide />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
