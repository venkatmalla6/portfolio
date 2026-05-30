import { Network, Monitor, Smartphone, Router, Shield, Server, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import './NetworkTopologySection.css';

const nodes = [
  { id: 'c1', label: 'Client 01', Icon: Monitor, x: 10, y: 25, type: 'client' },
  { id: 'c2', label: 'Client 02', Icon: Smartphone, x: 10, y: 75, type: 'client' },
  { id: 'sw1', label: 'Access Switch', Icon: Network, x: 30, y: 50, type: 'network' },
  { id: 'r1', label: 'Core Router', Icon: Router, x: 50, y: 50, type: 'network' },
  { id: 'fw', label: 'Firewall', Icon: Shield, x: 65, y: 50, type: 'security' },
  { id: 'sw2', label: 'Data Center Switch', Icon: Network, x: 80, y: 50, type: 'network' },
  { id: 's1', label: 'Web Server', Icon: Server, x: 95, y: 25, type: 'server' },
  { id: 's2', label: 'DB Server', Icon: Database, x: 95, y: 75, type: 'server' },
];

const connections = [
  { from: 'c1', to: 'sw1' },
  { from: 'c2', to: 'sw1' },
  { from: 'sw1', to: 'r1' },
  { from: 'r1', to: 'fw' },
  { from: 'fw', to: 'sw2' },
  { from: 'sw2', to: 's1' },
  { from: 'sw2', to: 's2' },
];

// Reusing same connections for return packets for simplicity
const returnConnections = connections.map(c => ({ from: c.to, to: c.from }));

const NetworkTopologySection = () => {
  return (
    <section className="topology-section">
      <div className="section-header">
        <Network size={32} color="var(--color-secondary)" />
        <h2>NETWORK OPERATIONS CENTER</h2>
      </div>

      <div className="topology-container glass-panel">
        <svg className="topology-svg" width="100%" height="100%">
          {/* Base physical lines */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            return (
              <line
                key={`line-${idx}`}
                x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="2"
              />
            );
          })}

          {/* Animated Forward Packets */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            return (
              <motion.circle
                key={`fwd-pkt-${idx}`}
                r="4"
                fill="var(--color-secondary)"
                style={{ filter: 'blur(2px)' }}
                animate={{
                  cx: [`${fromNode.x}%`, `${toNode.x}%`],
                  cy: [`${fromNode.y}%`, `${toNode.y}%`],
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            );
          })}

          {/* Animated Return Packets */}
          {returnConnections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            return (
              <motion.circle
                key={`ret-pkt-${idx}`}
                r="4"
                fill="var(--color-accent)"
                style={{ filter: 'blur(2px)' }}
                animate={{
                  cx: [`${fromNode.x}%`, `${toNode.x}%`],
                  cy: [`${fromNode.y}%`, `${toNode.y}%`],
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 1 // Staggered
                }}
              />
            );
          })}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className={`topo-node node-${node.type}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <node.Icon size={24} />
            <span className="node-label">{node.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NetworkTopologySection;
