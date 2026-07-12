import { School, Verified, Cpu, CheckCircle } from 'lucide-react';
import './AboutMeSection.css';

const education = [
  {
    year: '2024 - 2027',
    title: 'B.Tech in Computer Science (Lateral)',
    institution: 'Godavari Institute of Engineering and Technology, Rajahmundry',
    highlight: 'Pursuing',
  },
  {
    year: '2020 - 2024',
    title: 'Diploma in Chemical Engineering',
    institution: 'Government Institute of Chemical Engineering, Visakhapatnam',
    highlight: 'Completed',
  },
];

const certs = [
  'Red Hat College Brand Ambassador',
  'SkillUp Club Organizer (100+ students mentored)',
  '500+ Downloads for PocketAI App',
  'Published multiple apps on Google Play Store',
];

const skills = [
  'Python', 'Dart', 'AWS', 'Docker', 'Terraform', 'CI/CD', 'GitHub Actions', 'GenAI', 'LangGraph', 'Flutter', 'Firebase'
];

const AboutMeSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container glass-panel">
        <div className="about-grid">
          
          {/* Profile & Objective */}
          <div className="about-column">
            <div className="profile-hologram-wrapper">
              <div className="profile-hologram">
                <img src={`${import.meta.env.BASE_URL}profile-professional.png`} alt="Profile" />
              </div>
            </div>
            
            <div className="profile-text-center">
              <span className="alias-label">Portfolio</span>
              <h2 className="alias-name">VENKAT</h2>
              
              <h4 className="mission-label">Professional Summary</h4>
              <p className="mission-text">
                Computer Science Engineering student with hands-on experience in AWS Cloud, DevOps, AI-powered applications, Developer Experience (DevEx), and workflow automation. Passionate about building cloud-native apps and multi-agent AI systems.
              </p>
            </div>
          </div>

          {/* Education & Certs */}
          <div className="about-column">
            <div className="section-sub-header">
              <School size={24} color="var(--color-accent)" />
              <h3>Education</h3>
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
                    {edu.highlight && <div className="edu-highlight">{edu.highlight}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="section-sub-header" style={{ marginTop: '2rem' }}>
              <Verified size={24} color="var(--color-secondary)" />
              <h3>Achievements & Leadership</h3>
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
              <h3>Core Skills</h3>
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
