import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, X, FileText, Terminal } from 'lucide-react';
import TerminalEmulator from './TerminalEmulator';
import './HeroSection.css';

const HeroSection = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+` or Cmd+`
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Malla Venkat
          </h1>
          <h2 className="hero-subtitle text-gradient">
            Cloud Engineer & Full Stack Developer
          </h2>
          
          <p className="system-status">Available for Opportunities</p>
          
          <div className="hero-actions">
            <button 
              className="btn-primary" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => setIsResumeModalOpen(true)}
            >
              <FileText size={20} />
              View Resume
            </button>
            <a href="#projects" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <Eye size={20} />
              View Projects
            </a>
            <button 
              className="btn-secondary" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
              onClick={() => setIsTerminalOpen(true)}
              title="Ctrl+` to toggle terminal"
            >
              <Terminal size={20} />
              Terminal
            </button>
          </div>
        </motion.div>
      </div>

      <div className="hero-visuals">
        <motion.div 
          className="profile-image-container-large"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={`${import.meta.env.BASE_URL}profile-professional.png`} alt="Malla Venkat" className="profile-image-large" />
          <div className="profile-glow-large"></div>
        </motion.div>
      </div>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <div className="resume-modal-overlay" onClick={() => setIsResumeModalOpen(false)}>
          <div className="resume-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <h3>Resume Preview</h3>
              <button className="close-modal-btn" onClick={() => setIsResumeModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="resume-modal-body">
              <iframe 
                src={`${import.meta.env.BASE_URL}venkat_resume.pdf`}
                title="Resume"
                className="resume-iframe"
              />
            </div>
          </div>
        </div>
      )}

      {/* Terminal Emulator */}
      {isTerminalOpen && (
        <TerminalEmulator onClose={() => setIsTerminalOpen(false)} />
      )}
    </section>
  );
};

export default HeroSection;
