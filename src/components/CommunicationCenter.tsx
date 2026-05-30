import { Radio, Terminal as TerminalIcon, Mail, Phone, Users, Code2 } from 'lucide-react';
import './CommunicationCenter.css';

const CommunicationCenter = () => {
  return (
    <section className="comms-section">
      <div className="section-header">
        <Radio size={32} color="var(--color-secondary)" />
        <h2>SECURE COMMS CENTER</h2>
      </div>

      <div className="comms-grid">
        <div className="comms-form glass-panel">
          <div className="form-header">
            <TerminalIcon size={20} color="var(--color-accent)" />
            <span className="text-accent" style={{ fontWeight: 'bold' }}>TRANSMIT ENCRYPTED MESSAGE</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>CALLSIGN (NAME)</label>
              <input type="text" className="holo-input" />
            </div>
            <div className="form-group">
              <label>ROUTING ADDRESS (EMAIL)</label>
              <input type="email" className="holo-input" />
            </div>
            <div className="form-group">
              <label>PAYLOAD (MESSAGE)</label>
              <textarea rows={4} className="holo-input"></textarea>
            </div>
            
            <button className="btn-transmit">
              INITIALIZE TRANSMISSION
            </button>
          </form>
        </div>

        <div className="contact-cards">
          <div className="contact-row">
            <div className="contact-card glass-panel glass-panel-hover" style={{ '--hover-color': 'var(--color-accent)' } as any}>
              <Mail size={32} className="contact-icon" />
              <h4>EMAIL</h4>
              <p>venkat@example.com</p>
            </div>
            <div className="contact-card glass-panel glass-panel-hover" style={{ '--hover-color': 'var(--color-secondary)' } as any}>
              <Phone size={32} className="contact-icon" />
              <h4>PHONE</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="contact-row">
            <div className="contact-card glass-panel glass-panel-hover" style={{ '--hover-color': '#0077b5' } as any}>
              <Users size={32} className="contact-icon" />
              <h4>LINKEDIN</h4>
              <p>linkedin.com/in/venkat</p>
            </div>
            <div className="contact-card glass-panel glass-panel-hover" style={{ '--hover-color': '#ffffff' } as any}>
              <Code2 size={32} className="contact-icon" />
              <h4>GITHUB</h4>
              <p>github.com/venkat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunicationCenter;
