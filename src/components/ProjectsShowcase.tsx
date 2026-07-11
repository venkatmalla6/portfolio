import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Terminal, Database, Shield, Smartphone, ArrowUpRight } from 'lucide-react';
import './ProjectsShowcase.css';

const projects = [
  {
    title: 'AI-Powered Vehicle Insurance Underwriting',
    description: 'Multi-agent AI platform automating insurance processing with OCR, fraud detection, and explainable decision workflows.',
    tags: ['LangGraph', 'FastAPI', 'PostgreSQL', 'Docker'],
    icon: <Shield size={40} className="text-accent" />,
    metrics: ['Reduced manual processing time by 40%', 'Handled 5,000+ test claims']
  },
  {
    title: 'PocketAI - Offline AI Assistant',
    description: 'Offline AI chatbot with on-device inference using Ollama and Hugging Face models (500+ Play Store downloads).',
    tags: ['Flutter', 'Ollama', 'llama.cpp'],
    icon: <Smartphone size={40} className="text-accent" />,
    metrics: ['500+ Active Installs', 'Zero cloud infrastructure cost']
  },
  {
    title: 'AstarAI - Assessment Platform',
    description: 'AI app converting PDFs into MCQ assessments using Gemini AI, OCR, and Firebase.',
    tags: ['Flutter', 'Gemini AI', 'Firebase', 'OCR'],
    icon: <Database size={40} className="text-accent" />,
    metrics: ['Processed 10,000+ document pages', '99.9% uptime on Firebase']
  },
  {
    title: 'SmartMed - Medical Learning Assistant',
    description: 'AI platform for generating quizzes and study plans utilizing Groq Llama 3.1 and ML Kit OCR.',
    tags: ['Flutter', 'Groq API', 'Hive', 'Firebase'],
    icon: <Terminal size={40} className="text-accent" />,
    metrics: ['Generated 1,000+ custom study plans', '<100ms API response time']
  }
];

const ProjectCard = ({ project }: { project: { title: string; description: string; tags: string[]; icon: React.ReactNode; metrics: string[] } }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate normalized coordinates (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="project-card-wrapper"
    >
      <div className="project-card glass-panel glass-panel-hover">
        <div className="project-header" style={{ transform: "translateZ(50px)" }}>
          {project.icon}
          <h3 className="project-title">{project.title}</h3>
          <ArrowUpRight className="arrow-icon" />
        </div>
        
        <p className="project-desc" style={{ transform: "translateZ(30px)" }}>
          {project.description}
        </p>
        
        <div className="project-tags" style={{ transform: "translateZ(20px)" }}>
          {project.tags.map((tag: string) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        {project.metrics && (
          <div className="project-metrics" style={{ transform: "translateZ(25px)" }}>
            {project.metrics.map((metric: string, idx: number) => (
              <div key={idx} className="metric-item">
                <span className="metric-dot"></span>
                {metric}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsShowcase = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <Database size={32} color="var(--color-secondary)" />
        <h2>Featured Projects</h2>
      </div>
      
      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
