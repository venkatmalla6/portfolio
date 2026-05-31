import { History, GraduationCap, Users, Award, Briefcase, Trophy } from 'lucide-react';
import './FuturisticTimelineSection.css';

const timelineData = [
  {
    title: 'AWS + DevOps Intern',
    subtitle: 'Techwing (Jan 2026 - Present)',
    description: 'Deployed and managed AWS cloud infrastructure. Automated deployment workflows using GitHub Actions and implemented IaC using Terraform.',
    Icon: Briefcase,
  },
  {
    title: 'Organizer & Mentor',
    subtitle: 'SkillUp Club (Jan 2025 - Present)',
    description: 'Organized workshops on Flutter, AI, Cloud Computing, and mentored 100+ students on modern software development.',
    Icon: Users,
  },
  {
    title: 'App Creator & Ambassador',
    subtitle: 'Google Play & Red Hat',
    description: 'Published multiple mobile apps including PocketAI (500+ downloads) and served as a Red Hat College Brand Ambassador.',
    Icon: Trophy,
  },
  {
    title: 'B.Tech CS (Lateral)',
    subtitle: 'Godavari Institute of Engineering & Technology',
    description: 'Pursuing Computer Science Engineering with a CGPA of 8.6. Focus on building AI systems and scalable architectures.',
    Icon: GraduationCap,
  },
];

const FuturisticTimelineSection = () => {
  return (
    <section className="timeline-section">
      <div className="section-header">
        <History size={32} color="var(--color-accent)" />
        <h2>CHRONOLOGICAL LOGS (TIMELINE)</h2>
      </div>

      <div className="timeline-container glass-panel">
        {timelineData.map((event, index) => {
          const isLast = index === timelineData.length - 1;
          return (
            <div key={event.title} className="timeline-node-wrapper">
              {!isLast && <div className="timeline-line"></div>}
              <div className="timeline-row">
                <div className="timeline-icon-container">
                  <event.Icon size={14} className="timeline-icon" />
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{event.title}</h3>
                  <h4 className="timeline-subtitle">{event.subtitle}</h4>
                  <p className="timeline-desc">{event.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FuturisticTimelineSection;
