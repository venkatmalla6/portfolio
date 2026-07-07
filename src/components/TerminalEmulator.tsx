import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import './TerminalEmulator.css';

interface TerminalEmulatorProps {
  onClose: () => void;
}

const TerminalEmulator: React.FC<TerminalEmulatorProps> = ({ onClose }) => {
  const [history, setHistory] = useState<{ command: string; output: string | React.ReactNode }[]>([
    { command: '', output: 'Welcome to VenkatOS v1.0. Type "help" for available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string | React.ReactNode = '';

    // Handle project selection first
    if (trimmedCmd === 'project 1' || trimmedCmd === 'project 2') {
      onClose();
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if (trimmedCmd === 'project 3') {
      onClose();
      setTimeout(() => {
        document.getElementById('recruiter')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (trimmedCmd.startsWith('sudo')) {
      output = 'Permission denied: venkat is not in the sudoers file. This incident will be reported.';
      setHistory(prev => [...prev, { command: cmd, output }]);
      return;
    }

    switch (trimmedCmd) {
      case 'help':
        output = 'Available commands: whoami, skills, projects, contact, neofetch, clear, sudo, echo [text], exit';
        break;
      case 'whoami':
        output = 'Malla Venkat - Cloud Engineer & Full Stack Developer';
        break;
      case 'skills':
        output = 'AWS, React, Node.js, Python, Docker, CI/CD, DevOps, SonarQube, Nexus, Jenkins';
        break;
      case 'projects':
        output = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>Here are some featured projects:</span>
            <span>1. <strong>AWS Automated Infrastructure</strong> (Scalable cloud environment)</span>
            <span>2. <strong>DevOps Live Pipeline</strong> (CI/CD flow with SonarQube & Nexus)</span>
            <span>3. <strong>Fast-Track Recruiter Dashboard</strong> (Real-time evaluation system)</span>
            <span style={{ color: 'var(--color-accent)' }}>Type "project 1", "project 2", or "project 3" to navigate to them!</span>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>📧 Email: <a href="mailto:venkatmallacs@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>venkatmallacs@gmail.com</a></span>
            <span>📱 Phone: <a href="tel:+916303148893" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>+91 6303148893</a></span>
            <span>🔗 LinkedIn: <a href="https://linkedin.com/in/venkat-malla-5528b8381" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>linkedin.com/in/venkat-malla-5528b8381</a></span>
            <span>🐙 GitHub: <a href="https://github.com/venkatmalla6" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>github.com/venkatmalla6</a></span>
          </div>
        );
        break;
      case 'neofetch':
        output = (
          <div style={{ display: 'flex', gap: '20px', fontFamily: 'monospace', lineHeight: '1.2' }}>
            <pre style={{ color: 'var(--color-accent)', margin: 0 }}>{`   _  _
 ( \`   \` )
( \`  \`   \` )
 (___(_(____)`}</pre>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>venkat@portfolio</span>
              <span>----------------</span>
              <span><strong style={{ color: 'var(--color-primary)' }}>OS:</strong> VenkatOS v1.0</span>
              <span><strong style={{ color: 'var(--color-primary)' }}>Uptime:</strong> 365 Days of Code</span>
              <span><strong style={{ color: 'var(--color-primary)' }}>Shell:</strong> React-Vite Terminal</span>
              <span><strong style={{ color: 'var(--color-primary)' }}>Profile:</strong> Cloud & DevOps Engineer</span>
              <span><strong style={{ color: 'var(--color-primary)' }}>Specialties:</strong> CI/CD, AWS Architecture, React</span>
            </div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case '':
        output = '';
        break;
      default:
        if (trimmedCmd.startsWith('echo ')) {
          output = trimmedCmd.substring(5);
        } else {
          output = `Command not found: ${trimmedCmd}. Type "help" for a list of commands.`;
        }
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-header">
          <div className="terminal-title">
            <TerminalIcon size={16} /> venkat@system:~
          </div>
          <button className="terminal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} className="terminal-entry">
              {item.command && (
                <div className="terminal-command">
                  <span className="prompt">venkat@system:~$</span> {item.command}
                </div>
              )}
              <div className="terminal-output">{item.output}</div>
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="prompt">venkat@system:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalEmulator;
