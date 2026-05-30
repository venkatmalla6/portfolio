import { motion } from 'framer-motion';
import { Download, Eye, Cloud, Database, Code } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="system-status">SYSTEM ONLINE</p>
          <h1 className="hero-title">
            Malla Venkat
          </h1>
          <h2 className="hero-subtitle text-gradient">
            Cloud Engineer & Full Stack Developer
          </h2>
          
          <div className="hero-actions">
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={20} />
              DOWNLOAD RESUME
            </button>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={20} />
              VIEW PROJECTS
            </button>
          </div>
        </motion.div>
      </div>

      <div className="hero-visuals">
        <motion.div 
          className="earth-globe"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        
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
    </section>
  );
};

export default HeroSection;
