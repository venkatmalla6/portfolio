import './ResumeDocument.css';

const ResumeDocument = () => {
  return (
    <div className="resume-doc-container">
      <div className="resume-doc-content">
        <header className="resume-header">
          <h1 className="resume-name">MALLA VENKAT</h1>
          <p className="resume-contact">
            +91 6303148893 ⋄ Kakinada, Andhra Pradesh <br />
            venkatmallacs@gmail.com ⋄ LinkedIn ⋄ GitHub
          </p>
        </header>

        <section className="resume-section">
          <h2 className="resume-section-title">PROFESSIONAL SUMMARY</h2>
          <hr className="resume-divider" />
          <p className="resume-text">
            Computer Science Engineering student with a strong interest in Networking, Cloud Computing, and DevOps. Hands-on experience building AWS-based infrastructure, designing scalable network architectures, and automating deployments using Infrastructure as Code. Familiar with Linux administration, containerization, and cloud monitoring tools. Seeking Networking Engineer, Cloud Engineer, or DevOps Engineer opportunities to apply and expand technical expertise.
          </p>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">EDUCATION</h2>
          <hr className="resume-divider" />
          
          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>B.Tech – Computer Science Engineering</strong></span>
              <span className="resume-item-date">2024 – 2027</span>
            </div>
            <div className="resume-item-subtitle">Godavari Institute of Engineering & Technology</div>
            <div className="resume-text">CGPA: 8.6</div>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>Diploma – Chemical Engineering</strong></span>
              <span className="resume-item-date">2020 – 2024</span>
            </div>
            <div className="resume-item-subtitle">Government Institute of Chemical Engineering</div>
            <div className="resume-text">Percentage: 80%</div>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">TECHNICAL SKILLS</h2>
          <hr className="resume-divider" />
          <ul className="resume-list no-margin">
            <li><strong>Networking:</strong> TCP/IP, OSI Model, Subnetting, Routing, Switching, VLANs, DNS, DHCP, NAT, VPN</li>
            <li><strong>Cloud Platforms:</strong> AWS EC2, VPC, IAM, S3, Route 53, Load Balancer, Auto Scaling, CloudWatch</li>
            <li><strong>DevOps Tools:</strong> Git, Docker, Terraform, CloudFormation, CI/CD</li>
            <li><strong>Operating Systems:</strong> Linux (Ubuntu, RHEL Basics)</li>
            <li><strong>Programming:</strong> Python Basics, Shell Scripting Basics</li>
            <li><strong>Databases:</strong> Firebase Realtime Database</li>
            <li><strong>Virtualization & Containers:</strong> Docker, Kubernetes Fundamentals</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">PROJECTS</h2>
          <hr className="resume-divider" />
          
          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>AWS VPC Network Design and Automation</strong></span>
            </div>
            <ul className="resume-list">
              <li>Designed and deployed a multi-tier VPC architecture with public and private subnets.</li>
              <li>Provisioned infrastructure using Terraform for repeatable deployments.</li>
              <li>Configured Security Groups, Route Tables, and NAT Gateway.</li>
              <li>Improved deployment consistency and reduced manual configuration effort.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>Load Balanced Scalable Web Architecture</strong></span>
            </div>
            <ul className="resume-list">
              <li>Built highly available AWS infrastructure using Application Load Balancer and Auto Scaling.</li>
              <li>Automated resource provisioning through CloudFormation templates.</li>
              <li>Implemented monitoring using Amazon CloudWatch.</li>
              <li>Containerized workloads using Docker and explored Kubernetes deployment concepts.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">CERTIFICATIONS</h2>
          <hr className="resume-divider" />
          <ul className="resume-list no-margin">
            <li>Red Hat Student Brand Ambassador</li>
            <li>AWS Cloud Fundamentals (Add if completed)</li>
            <li>Cisco Networking Academy Certifications (Add if completed)</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">LEADERSHIP & VOLUNTEER EXPERIENCE</h2>
          <hr className="resume-divider" />
          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>SkillUp Club – Organizer</strong></span>
              <span className="resume-item-date">Jan 2025 – Present</span>
            </div>
            <ul className="resume-list">
              <li>Organized workshops and technical sessions on Flutter and Artificial Intelligence.</li>
              <li>Coordinated learning activities for over 100 students.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">ACHIEVEMENTS</h2>
          <hr className="resume-divider" />
          <ul className="resume-list no-margin">
            <li>Selected as Red Hat College Brand Ambassador.</li>
            <li>Led campus initiatives promoting open-source technologies.</li>
            <li>Completed Community Service Oriented Project (CSOP) focused on sustainable agriculture awareness.</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">LANGUAGES</h2>
          <hr className="resume-divider" />
          <ul className="resume-list no-margin" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>English – Professional Working Proficiency</li>
            <li>Telugu – Native Proficiency</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default ResumeDocument;
