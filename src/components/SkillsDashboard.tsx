import { Radar, Cloud, Box, Code, Globe, Server, Network, GitBranch, Terminal, Database } from 'lucide-react';
import './SkillsDashboard.css';

const cloudSkills = [
  { name: 'AWS EC2/S3', level: 90, Icon: Cloud },
  { name: 'Docker', level: 85, Icon: Box },
  { name: 'Terraform', level: 80, Icon: Server },
  { name: 'CI/CD (Actions)', level: 85, Icon: GitBranch },
  { name: 'Linux', level: 80, Icon: Terminal },
];

const aiSkills = [
  { name: 'LangGraph', level: 90, Icon: Network },
  { name: 'GenAI / LLMs', level: 85, Icon: Code },
  { name: 'Prompt Eng', level: 90, Icon: Terminal },
];

const programmingSkills = [
  { name: 'Python', level: 95, Icon: Code },
  { name: 'Dart / Flutter', level: 90, Icon: Globe },
  { name: 'JavaScript', level: 80, Icon: Code },
];

const backendSkills = [
  { name: 'REST APIs', level: 90, Icon: Server },
  { name: 'FastAPI', level: 85, Icon: Cloud },
  { name: 'Firebase', level: 90, Icon: Database },
];

const SkillCategory = ({ title, skills }: { title: string, skills: { name: string; level: number; Icon: React.ElementType }[] }) => {
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
    <section id="skills" className="skills-section">
      <div className="section-header">
        <Radar size={32} color="var(--color-accent)" />
        <h2>Skills & Technologies</h2>
      </div>

      <div className="categories-container">
        <SkillCategory title="Cloud & DevOps" skills={cloudSkills} />
        <SkillCategory title="AI Engineering" skills={aiSkills} />
        <SkillCategory title="Programming" skills={programmingSkills} />
        <SkillCategory title="Backend & Mobile" skills={backendSkills} />
      </div>
    </section>
  );
};

export default SkillsDashboard;
