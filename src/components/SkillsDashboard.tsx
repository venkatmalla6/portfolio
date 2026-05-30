import { Radar, Cloud, Box, Code, Globe, Server, Shield, Network, GitBranch, Terminal } from 'lucide-react';
import './SkillsDashboard.css';

const cloudSkills = [
  { name: 'AWS', level: 90, Icon: Cloud },
  { name: 'EC2', level: 85, Icon: Server },
  { name: 'S3', level: 90, Icon: Box },
  { name: 'IAM', level: 80, Icon: Shield },
  { name: 'VPC', level: 75, Icon: Network },
];

const devOpsSkills = [
  { name: 'Docker', level: 90, Icon: Box },
  { name: 'Jenkins', level: 80, Icon: Terminal },
  { name: 'GitHub Actions', level: 85, Icon: GitBranch },
];

const programmingSkills = [
  { name: 'Python', level: 95, Icon: Code },
  { name: 'React', level: 90, Icon: Globe },
  { name: 'Node.js', level: 85, Icon: Server },
];

const networkingSkills = [
  { name: 'TCP/IP', level: 80, Icon: Globe },
  { name: 'Routing', level: 75, Icon: Network },
  { name: 'Switching', level: 70, Icon: Network },
  { name: 'DNS', level: 85, Icon: Globe },
];

const SkillCategory = ({ title, skills }: { title: string, skills: any[] }) => {
  return (
    <div className="skill-category glass-panel">
      <h3 className="category-title">{title}</h3>
      <div className="skills-grid">
        {skills.map(skill => (
          <div key={skill.name} className="skill-item">
            <div className="skill-circle-wrapper">
              <svg className="skill-circle" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="45" />
                <circle 
                  className="circle-progress" 
                  cx="50" cy="50" r="45" 
                  strokeDasharray={`${skill.level * 2.82} 282`} 
                />
              </svg>
              <div className="skill-icon-center">
                <skill.Icon size={24} />
              </div>
            </div>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsDashboard = () => {
  return (
    <section className="skills-section">
      <div className="section-header">
        <Radar size={32} color="var(--color-accent)" />
        <h2>SYSTEM CAPABILITIES (SKILLS)</h2>
      </div>

      <div className="categories-container">
        <SkillCategory title="CLOUD INFRASTRUCTURE" skills={cloudSkills} />
        <SkillCategory title="DEVOPS PIPELINE" skills={devOpsSkills} />
        <SkillCategory title="CORE PROGRAMMING" skills={programmingSkills} />
        <SkillCategory title="NETWORKING" skills={networkingSkills} />
      </div>
    </section>
  );
};

export default SkillsDashboard;
