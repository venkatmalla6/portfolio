import { Briefcase, Mail, Phone, MapPin, Download, FileText, Verified, Brain, GraduationCap } from 'lucide-react';
import './RecruiterDashboardSection.css';

const RecruiterDashboardSection = () => {
  return (
    <section className="recruiter-section">
      <div className="section-header">
        <Briefcase size={32} color="var(--color-accent)" />
        <h2>RECRUITER FAST-TRACK</h2>
      </div>

      <div className="recruiter-grid">
        
        {/* ATS Score & Contact */}
        <div className="glass-panel recruiter-panel">
          <h3 className="panel-title">ATS COMPATIBILITY SCORE</h3>
          <div className="ats-score-container">
            <svg className="ats-circle" viewBox="0 0 100 100">
              <circle className="ats-bg" cx="50" cy="50" r="45" />
              <circle className="ats-progress" cx="50" cy="50" r="45" strokeDasharray="277 282" />
            </svg>
            <div className="ats-score-text">
              <span className="score-number">98%</span>
              <span className="score-label">HIGH MATCH</span>
            </div>
          </div>

          <hr className="divider" />

          <div className="contact-list">
            <div className="contact-item">
              <Mail size={16} />
              <span>venkat@example.com</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>Hyderabad, India</span>
            </div>
          </div>

          <button className="download-btn">
            <Download size={18} />
            DOWNLOAD RESUME
          </button>
        </div>

        {/* Resume Preview & Certs */}
        <div className="glass-panel recruiter-panel">
          <div className="panel-sub-header">
            <FileText size={20} color="var(--color-primary)" />
            <h3>RESUME PREVIEW</h3>
          </div>
          
          <div className="resume-preview-box">
            <div className="mock-doc-lines">
              <div className="mock-line title"></div>
              <div className="mock-line full"></div>
              <div className="mock-line half"></div>
              <div className="mock-line subtitle"></div>
              <div className="mock-line full"></div>
              <div className="mock-line short"></div>
            </div>
            <div className="preview-overlay">
              <FileText size={48} />
            </div>
          </div>

          <div className="panel-sub-header" style={{ marginTop: '2rem' }}>
            <Verified size={20} color="var(--color-secondary)" />
            <h3 style={{ color: 'var(--color-secondary)' }}>ACTIVE CERTIFICATIONS</h3>
          </div>
          
          <div className="badge-list">
            <div className="cert-badge"><Verified size={14} /> AWS Solutions Architect</div>
            <div className="cert-badge"><Verified size={14} /> Google Cloud Dev</div>
            <div className="cert-badge"><Verified size={14} /> React Certified</div>
          </div>
        </div>

        {/* Skills & Edu */}
        <div className="glass-panel recruiter-panel">
          <div className="panel-sub-header">
            <Brain size={20} color="var(--color-accent)" />
            <h3 style={{ color: 'var(--color-accent)' }}>SKILLS SUMMARY</h3>
          </div>

          <div className="skill-bars">
            <SkillBar label="React & TS" value="95%" />
            <SkillBar label="AWS & Cloud" value="85%" />
            <SkillBar label="Python / Backend" value="90%" />
            <SkillBar label="DevOps & CI/CD" value="80%" />
          </div>

          <hr className="divider" style={{ margin: '2rem 0' }} />

          <div className="panel-sub-header">
            <GraduationCap size={20} color="var(--color-secondary)" />
            <h3 style={{ color: 'var(--color-secondary)' }}>EDUCATION</h3>
          </div>

          <div className="edu-summary">
            <h4>B.Tech Computer Science</h4>
            <p className="edu-school">XYZ University | 2022 - 2026</p>
            <p className="edu-cgpa">CGPA: 9.2/10.0</p>
          </div>
        </div>

      </div>
    </section>
  );
};

const SkillBar = ({ label, value }: { label: string, value: string }) => (
  <div className="skill-bar-container">
    <div className="skill-bar-header">
      <span className="skill-bar-label">{label}</span>
      <span className="skill-bar-value">{value}</span>
    </div>
    <div className="skill-bar-track">
      <div className="skill-bar-fill" style={{ width: value }}></div>
    </div>
  </div>
);

export default RecruiterDashboardSection;
