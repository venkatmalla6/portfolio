import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Cloud, Database, Code, X, FileText, Terminal } from 'lucide-react';
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
          <p className="system-status">SYSTEM ONLINE</p>
          
          <div className="profile-image-container">
            <img src="/profile-edited.png" alt="Malla Venkat" className="profile-image" />
            <div className="profile-glow"></div>
          </div>

          <h1 className="hero-title">
            Malla Venkat
          </h1>
          <h2 className="hero-subtitle text-gradient">
            Cloud Engineer & Full Stack Developer
          </h2>
          
          <div className="hero-actions">
            <button 
              className="btn-primary" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => setIsResumeModalOpen(true)}
            >
              <FileText size={20} />
              VIEW RESUME
            </button>
            <Link to="/projects" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <Eye size={20} />
              VIEW PROJECTS
            </Link>
            <button 
              className="btn-secondary" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
              onClick={() => setIsTerminalOpen(true)}
              title="Ctrl+` to toggle terminal"
            >
              <Terminal size={20} />
              TERMINAL
            </button>
          </div>
        </motion.div>
      </div>

      <div className="hero-visuals">
        <motion.div 
          className="earth-globe-container"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <img 
            src="/realistic-globe.png" 
            alt="Realistic Network Globe" 
            className="earth-image" 
          />
        </motion.div>
        
        {/* Floating Cloud Nodes */}
        <motion.div 
          className="cloud-node glass-panel"
          style={{ top: '10%', right: '30%' }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="node-icon" />
          <span>AWS EC2</span>
        </motion.div>

        <motion.div 
          className="cloud-node glass-panel"
          style={{ bottom: '20%', right: '5%' }}
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Database className="node-icon" />
          <span>S3 Bucket</span>
        </motion.div>

        <motion.div 
          className="cloud-node glass-panel"
          style={{ bottom: '15%', right: '35%' }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Code className="node-icon" />
          <span>Lambda</span>
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
                src="/venkat_resume.pdf" 
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
