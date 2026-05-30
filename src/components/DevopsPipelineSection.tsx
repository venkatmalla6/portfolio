import { RefreshCw, Code, GitBranch, Settings, Box, Bug, Rocket, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import './DevopsPipelineSection.css';

const stages = [
  { name: 'Developer', Icon: Code },
  { name: 'GitHub', Icon: GitBranch },
  { name: 'Jenkins', Icon: Settings },
  { name: 'Docker', Icon: Box },
  { name: 'Testing', Icon: Bug },
  { name: 'Deployment', Icon: Rocket },
  { name: 'AWS EC2', Icon: Cpu },
];

const DevopsPipelineSection = () => {
  return (
    <section className="pipeline-section">
      <div className="section-header">
        <RefreshCw size={32} color="var(--color-primary)" />
        <h2>LIVE DEVOPS PIPELINE</h2>
      </div>

      <div className="pipeline-container glass-panel">
        <div className="pipeline-flex">
          {stages.map((stage, index) => {
            const isLast = index === stages.length - 1;
            
            return (
              <div key={stage.name} className="pipeline-stage-wrapper">
                {/* Node */}
                <div className="pipeline-node-container">
                  <motion.div 
                    className="status-light"
                    animate={{
                      backgroundColor: ['#4ade80', '#3b82f6', '#4ade80'],
                      boxShadow: [
                        '0 0 0px transparent',
                        '0 0 15px #3b82f6',
                        '0 0 0px transparent'
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  <motion.div 
                    className="pipeline-icon-box"
                    animate={{
                      borderColor: ['rgba(255,255,255,0.1)', 'var(--color-accent)', 'rgba(255,255,255,0.1)'],
                      boxShadow: ['0 0 0px transparent', '0 0 20px rgba(16,185,129,0.3)', '0 0 0px transparent']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <stage.Icon size={24} className="pipeline-icon" />
                  </motion.div>
                  <span className="pipeline-label">{stage.name}</span>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="pipeline-connector">
                    <motion.div 
                      className="connector-active"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DevopsPipelineSection;
