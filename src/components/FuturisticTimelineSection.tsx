import { History, GraduationCap, Users, Award, Briefcase, Trophy } from 'lucide-react';
import './FuturisticTimelineSection.css';

const timelineData = [
  {
    title: 'BTech Journey',
    subtitle: 'XYZ University',
    description: 'Pursuing a degree in Computer Science with a focus on cloud computing and software engineering. Current CGPA: 9.2.',
    Icon: GraduationCap,
  },
  {
    title: 'CSOP Project',
    subtitle: 'Community Service Oriented Project',
    description: 'Developed an innovative digital solution to aid local NGOs in resource distribution and management.',
    Icon: Users,
  },
  {
    title: 'Certifications',
    subtitle: 'AWS & Google Cloud',
    description: 'Obtained AWS Certified Solutions Architect and Google Cloud Professional Developer certifications to validate cloud expertise.',
    Icon: Award,
  },
  {
    title: 'Internships',
    subtitle: 'Software Engineering Intern',
    description: 'Worked with a high-growth startup to optimize their backend services, reducing latency by 40%.',
    Icon: Briefcase,
  },
  {
    title: 'Achievements',
    subtitle: 'Hackathon Winner',
    description: 'Secured 1st place at the National Cloud Computing Hackathon by building a serverless disaster recovery architecture.',
    Icon: Trophy,
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
