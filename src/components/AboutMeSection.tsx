import { School, Verified, Cpu, CheckCircle } from 'lucide-react';
import './AboutMeSection.css';

const education = [
  {
    year: '2022 - 2026',
    title: 'B.Tech in Computer Science',
    institution: 'XYZ University',
    highlight: 'CGPA: 9.2 / 10.0',
  },
  {
    year: '2020 - 2022',
    title: 'Higher Secondary Education',
    institution: 'ABC Junior College',
    highlight: 'Grade: 95%',
  },
];

const certs = [
  'AWS Certified Solutions Architect',
  'Google Cloud Professional Developer',
  'Frontend Development Expert',
];

const skills = [
  'React', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Firebase', 'Node.js', 'Python', 'Terraform'
];

const AboutMeSection = () => {
  return (
    <section className="about-section">
      <div className="about-container glass-panel">
        <div className="about-grid">
          
          {/* Profile & Objective */}
          <div className="about-column">
            <div className="profile-hologram-wrapper">
              <div className="profile-hologram">
                <img src="https://ui-avatars.com/api/?name=Venkat&background=random&color=fff" alt="Profile" />
              </div>
            </div>
            
            <div className="profile-text-center">
              <span className="alias-label">IDENTIFICATION ALIAS</span>
              <h2 className="alias-name">VENKAT</h2>
              
              <h4 className="mission-label">MISSION OBJECTIVE</h4>
              <p className="mission-text">
                To architect scalable cloud infrastructure and develop high-performance, cross-platform applications that push the boundaries of modern UI/UX design.
              </p>
            </div>
          </div>

          {/* Education & Certs */}
          <div className="about-column">
            <div className="section-sub-header">
              <School size={24} color="var(--color-accent)" />
              <h3>ACADEMIC TIMELINE</h3>
            </div>
            <div className="education-list">
              {education.map(edu => (
                <div key={edu.title} className="edu-item">
                  <div className="edu-timeline-line">
                    <div className="edu-dot"></div>
                    <div className="edu-line"></div>
                  </div>
                  <div className="edu-content">
                    <span className="edu-year">{edu.year}</span>
                    <h4 className="edu-title">{edu.title}</h4>
                    <span className="edu-inst">{edu.institution}</span>
                    <div className="edu-highlight">{edu.highlight}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-sub-header" style={{ marginTop: '2rem' }}>
              <Verified size={24} color="var(--color-secondary)" />
              <h3>SECURITY CLEARANCES (CERTIFICATIONS)</h3>
            </div>
            <div className="certs-list">
              {certs.map(cert => (
                <div key={cert} className="cert-item">
                  <CheckCircle size={16} color="var(--color-accent)" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Chips */}
          <div className="about-column">
            <div className="section-sub-header">
              <Cpu size={24} color="var(--color-primary)" />
              <h3>COMBAT ABILITIES</h3>
            </div>
            <div className="skills-chip-container">
              {skills.map(skill => (
                <div key={skill} className="skill-chip">
                  {skill}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
