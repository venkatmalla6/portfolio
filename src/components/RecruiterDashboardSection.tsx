import { useState, useEffect } from 'react';
import { Briefcase, Mail, Phone, MapPin, Download, Verified, Brain, GraduationCap, Terminal } from 'lucide-react';
import './RecruiterDashboardSection.css';

const RecruiterDashboardSection = () => {
  const targetScore = 92;
  const [score, setScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 seconds animation
    const increment = targetScore / (duration / 16); 
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetScore) {
        setScore(targetScore);
        clearInterval(timer);
      } else {
        setScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <section id="recruiter" className="recruiter-section">
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
              <circle 
                className="ats-progress" 
                cx="50" 
                cy="50" 
                r="45" 
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <div className="ats-score-text">
              <span className="score-number">{score}%</span>
              <span className="score-label">{score >= 90 ? 'HIGH MATCH' : 'GOOD MATCH'}</span>
            </div>
          </div>

          <hr className="divider" />

          <div className="contact-list">
            <div className="contact-item">
              <Mail size={16} />
              <span>venkatmallacs@gmail.com</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 6303148893</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>Jaggampeta, Andhra Pradesh, India</span>
            </div>
          </div>

          <a href="/venkat_resume.pdf" download="Malla_Venkat_Resume.pdf" className="download-btn" style={{ textDecoration: 'none' }}>
            <Download size={18} />
            DOWNLOAD RESUME
          </a>
        </div>

        {/* Experience, Projects & Achievements */}
        <div className="glass-panel recruiter-panel">
          
          <div className="panel-sub-header">
            <Briefcase size={20} color="var(--color-primary)" />
            <h3 style={{ color: 'var(--color-primary)' }}>CURRENT ROLE</h3>
          </div>
          
          <div className="edu-summary" style={{ marginBottom: '1.5rem' }}>
            <h4>AWS + DevOps Intern</h4>
            <p className="edu-school">Techwing | Jan 2026 - Present</p>
          </div>

          <div className="panel-sub-header">
            <Terminal size={20} color="var(--color-accent)" />
            <h3 style={{ color: 'var(--color-accent)' }}>FEATURED PROJECTS</h3>
          </div>
          
          <div className="badge-list" style={{ marginBottom: '1.5rem' }}>
            <div className="cert-badge">AI Insurance Platform</div>
            <div className="cert-badge">PocketAI App</div>
            <div className="cert-badge">AstarAI</div>
          </div>

          <div className="panel-sub-header">
            <Verified size={20} color="var(--color-secondary)" />
            <h3 style={{ color: 'var(--color-secondary)' }}>ACHIEVEMENTS</h3>
          </div>
          
          <div className="badge-list">
            <div className="cert-badge"><Verified size={14} /> Red Hat Brand Ambassador</div>
            <div className="cert-badge"><Verified size={14} /> SkillUp Club Organizer</div>
            <div className="cert-badge"><Verified size={14} /> PocketAI App Creator</div>
          </div>
        </div>

        {/* Skills & Edu */}
        <div className="glass-panel recruiter-panel">
          <div className="panel-sub-header">
            <Brain size={20} color="var(--color-accent)" />
            <h3 style={{ color: 'var(--color-accent)' }}>SKILLS SUMMARY</h3>
          </div>

          <div className="skill-bars">
            <SkillBar label="Python & GenAI" value="95%" />
            <SkillBar label="AWS & Cloud" value="85%" />
            <SkillBar label="Dart & Flutter" value="90%" />
            <SkillBar label="DevOps & CI/CD" value="80%" />
          </div>

          <hr className="divider" style={{ margin: '2rem 0' }} />

          <div className="panel-sub-header">
            <GraduationCap size={20} color="var(--color-secondary)" />
            <h3 style={{ color: 'var(--color-secondary)' }}>EDUCATION</h3>
          </div>

          <div className="edu-summary">
            <h4>B.Tech in Computer Science (Lateral)</h4>
            <p className="edu-school">GIET, Rajahmundry | 2024 - 2027</p>
            <p className="edu-cgpa">Pursuing</p>
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
