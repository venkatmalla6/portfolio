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
            Computer Science Engineering student with hands-on experience in AWS Cloud, DevOps, AI-powered applications, Developer Experience (DevEx), and workflow automation. Skilled in Python, Flutter, AWS, Docker, Terraform, CI/CD, GitHub Actions, Linux, REST APIs, and AI agent development. Experienced in building cloud-native applications, automating deployment pipelines, developing multi-agent AI systems, and delivering scalable software solutions. Passionate about cloud infrastructure, platform engineering, automation, and modern software delivery practices.
          </p>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">EDUCATION</h2>
          <hr className="resume-divider" />
          
          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>B.Tech in Computer Science Engineering (Lateral Entry)</strong></span>
              <span className="resume-item-date">2024 – 2027</span>
            </div>
            <div className="resume-item-subtitle">Godavari Institute of Engineering & Technology</div>
            <div className="resume-text">CGPA: 8.6</div>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>Diploma in Chemical Engineering (Sandwich Program)</strong></span>
              <span className="resume-item-date">2020 – 2024</span>
            </div>
            <div className="resume-item-subtitle">Government Institute of Chemical Engineering</div>
            <div className="resume-text">Score: 80%</div>
            <div className="resume-text">Included academic coursework and industrial training as part of the curriculum.</div>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">TECHNICAL SKILLS</h2>
          <hr className="resume-divider" />
          <ul className="resume-list no-margin">
            <li><strong>Programming:</strong> Python, Dart, JavaScript</li>
            <li><strong>Cloud & DevOps:</strong> AWS EC2, VPC, IAM, S3, Route53, CloudWatch, Auto Scaling, Load Balancer, Docker, Terraform, CloudFormation, Linux</li>
            <li><strong>CI/CD & Automation:</strong> GitHub Actions, CI/CD Pipelines, Workflow Automation, Infrastructure Automation</li>
            <li><strong>AI Engineering:</strong> Generative AI, LangGraph, LangChain, Multi-Agent Systems, AI Agents, Prompt Engineering, Gemini API, Groq API, Ollama, Hugging Face, OCR</li>
            <li><strong>Backend:</strong> REST APIs, FastAPI, Firebase Cloud Functions, JSON Processing</li>
            <li><strong>Mobile Development:</strong> Flutter, Firebase Authentication, Firestore, Firebase Storage</li>
            <li><strong>Networking:</strong> TCP/IP, DNS, DHCP, NAT, VLAN, VPN, Routing, Switching</li>
            <li><strong>Tools:</strong> Git, GitHub, Firebase, Hive, Cloudinary</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">EXPERIENCE</h2>
          <hr className="resume-divider" />
          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>AWS + DevOps Intern, Techwing</strong></span>
              <span className="resume-item-date">July 2026 – Present</span>
            </div>
            <ul className="resume-list">
              <li>Deployed and managed cloud infrastructure using AWS EC2, VPC, IAM, S3, Route53, and CloudWatch.</li>
              <li>Automated deployment workflows using GitHub Actions CI/CD pipelines, improving release consistency and reducing manual deployment effort.</li>
              <li>Configured VPC networking including public/private subnets, route tables, NAT Gateways, and security groups.</li>
              <li>Implemented Infrastructure as Code using Terraform and AWS CloudFormation.</li>
              <li>Worked with Docker containers and Linux environments supporting cloud-native deployments.</li>
              <li>Monitored system health, logs, and performance metrics using AWS CloudWatch.</li>
              <li>Collaborated with development teams to improve deployment reliability, engineering productivity, and operational efficiency.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">PROJECTS</h2>
          <hr className="resume-divider" />
          
          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>AI-Powered Vehicle Insurance Underwriting Assistant</strong></span>
            </div>
            <div className="resume-link">GitHub</div>
            <ul className="resume-list">
              <li>Developed a multi-agent AI underwriting platform automating vehicle insurance processing from document upload to premium recommendation.</li>
              <li>Built LangGraph agents including OCR, Validation, Risk Assessment, Fraud Detection, Premium Recommendation, and Decision Agents.</li>
              <li>Implemented OCR pipelines using Tesseract and EasyOCR.</li>
              <li>Integrated FastAPI, PostgreSQL, MongoDB, Docker, and REST APIs.</li>
              <li>Designed explainable AI workflows with transparent decision reasoning.</li>
              <li>Implemented human-in-the-loop approval processes for risk-based escalation.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>PocketAI – Offline AI Assistant (500+ Downloads)</strong></span>
            </div>
            <div className="resume-link">GitHub</div>
            <ul className="resume-list">
              <li>Developed an offline AI chatbot using Ollama, llama.cpp, and Hugging Face models.</li>
              <li>Implemented local on-device inference without internet connectivity.</li>
              <li>Optimized model loading and memory utilization for mobile devices.</li>
              <li>Published on Google Play Store and achieved 500+ downloads.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>AstarAI – AI Educational Assessment Platform</strong></span>
            </div>
            <div className="resume-link">GitHub</div>
            <ul className="resume-list">
              <li>Developed a Flutter-based application converting PDFs and images into AI-generated MCQ assessments.</li>
              <li>Integrated Gemini AI, OCR, Firebase, and structured JSON workflows.</li>
              <li>Built scalable quiz generation and content management pipelines.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <span className="resume-item-title"><strong>SmartMed – AI Powered Medical Learning Assistant</strong></span>
            </div>
            <ul className="resume-list">
              <li>Developed a Flutter-based AI learning platform for generating quizzes, flashcards, study plans, and translated educational content.</li>
              <li>Integrated Groq-hosted Llama 3.1 models, Google ML Kit OCR, and PDF extraction for AI-powered content generation.</li>
              <li>Implemented prompt engineering, structured JSON outputs, and offline storage using Hive.</li>
              <li>Utilized Firebase Authentication, Cloud Firestore, and REST APIs for scalable cloud-based learning services.</li>
            </ul>
          </div>
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
              <li>Organized workshops on Flutter, AI, Cloud Computing, and Open Source technologies.</li>
              <li>Mentored students on Git, GitHub, software development, and project implementation.</li>
              <li>Conducted technical sessions benefiting 100+ students.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="resume-section-title">ACHIEVEMENTS</h2>
          <hr className="resume-divider" />
          <ul className="resume-list no-margin">
            <li>Red Hat College Brand Ambassador.</li>
            <li>Published multiple applications on Google Play Store.</li>
            <li>Built AI-powered educational and productivity solutions used by real users.</li>
            <li>Achieved 500+ downloads for PocketAI.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default ResumeDocument;
