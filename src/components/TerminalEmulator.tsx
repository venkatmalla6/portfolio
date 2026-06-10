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

    switch (trimmedCmd) {
      case 'help':
        output = 'Available commands: whoami, skills, clear, echo [text], exit';
        break;
      case 'whoami':
        output = 'Malla Venkat - Cloud Engineer & Full Stack Developer';
        break;
      case 'skills':
        output = 'AWS, React, Node.js, Python, Docker, CI/CD, DevOps';
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
          output = `Command not found: ${trimmedCmd}`;
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
