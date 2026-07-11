import { useState } from 'react';
import { Cloud, Router, HardDrive, Database, ServerCog, Cpu, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AwsArchitectureSection.css';

const nodes = [
  { id: 'user', label: 'End User', Icon: Globe, x: 10, y: 50, info: 'Client request from browser or mobile app.' },
  { id: 'r53', label: 'Route 53', Icon: Router, x: 25, y: 50, info: 'DNS routing & latency-based traffic management.' },
  { id: 'cf', label: 'CloudFront', Icon: Cloud, x: 40, y: 20, info: 'Global CDN caching static assets.' },
  { id: 's3', label: 'S3 Bucket', Icon: HardDrive, x: 60, y: 20, info: 'Highly durable object storage.' },
  { id: 'alb', label: 'Load Balancer', Icon: ServerCog, x: 40, y: 80, info: 'Distributes incoming traffic.' },
  { id: 'ec2_1', label: 'EC2 Instance A', Icon: Cpu, x: 60, y: 65, info: 'Compute node running logic.' },
  { id: 'ec2_2', label: 'EC2 Instance B', Icon: Cpu, x: 60, y: 95, info: 'Redundant compute node.' },
  { id: 'rds', label: 'Amazon RDS', Icon: Database, x: 80, y: 80, info: 'Managed relational database.' },
];

const connections = [
  { from: 'user', to: 'r53' },
  { from: 'r53', to: 'cf' },
  { from: 'cf', to: 's3' },
  { from: 'r53', to: 'alb' },
  { from: 'alb', to: 'ec2_1' },
  { from: 'alb', to: 'ec2_2' },
  { from: 'ec2_1', to: 'rds' },
  { from: 'ec2_2', to: 'rds' },
];

const AwsArchitectureSection = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="aws-section">
      <div className="section-header">
        <Cloud size={32} color="var(--color-accent)" />
        <h2>AWS Architecture</h2>
      </div>

      <div className="aws-container glass-panel">
        <svg className="aws-svg" width="100%" height="100%">
          {/* Base lines */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            return (
              <line
                key={`aws-line-${idx}`}
                x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                stroke="var(--color-border)"
                strokeOpacity="0.8"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Animated Packets */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            return (
              <motion.circle
                key={`aws-pkt-${idx}`}
                r="4"
                fill="var(--color-accent)"
                style={{ filter: 'blur(3px)' }}
                animate={{
                  cx: [`${fromNode.x}%`, `${toNode.x}%`],
                  cy: [`${fromNode.y}%`, `${toNode.y}%`],
                }}
                transition={{
                  duration: 2.5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: idx * 0.2, // Offset animations
                }}
              />
            );
          })}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className="aws-node"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div 
              className="aws-icon-wrapper"
              whileHover={{ scale: 1.15 }}
            >
              <node.Icon size={32} className="aws-icon" />
            </motion.div>
            <span className="aws-node-label">{node.label}</span>
            
            {/* Custom Tooltip */}
            <AnimatePresence>
              {hoveredNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="aws-tooltip"
                >
                  {node.info}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwsArchitectureSection;
