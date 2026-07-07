import React, { Suspense } from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'

// Lazy load heavy components
const AboutMeSection = React.lazy(() => import('./components/AboutMeSection'))
const FuturisticTimelineSection = React.lazy(() => import('./components/FuturisticTimelineSection'))
const SkillsDashboard = React.lazy(() => import('./components/SkillsDashboard'))
const RecruiterDashboardSection = React.lazy(() => import('./components/RecruiterDashboardSection'))
const DevopsPipelineSection = React.lazy(() => import('./components/DevopsPipelineSection'))
const AwsArchitectureSection = React.lazy(() => import('./components/AwsArchitectureSection'))
const NetworkTopologySection = React.lazy(() => import('./components/NetworkTopologySection'))
const ProjectsShowcase = React.lazy(() => import('./components/ProjectsShowcase'))
const GitHubProjectsSection = React.lazy(() => import('./components/GitHubProjectsSection'))
const CommunicationCenter = React.lazy(() => import('./components/CommunicationCenter'))

// Simple loading fallback
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div className="system-status">LOADING SYSTEM...</div>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(16, 185, 129, 0.2)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  </div>
);

function App() {
  return (
    <div className="layout-container">
      <NavBar />
      
      <Suspense fallback={<PageLoader />}>
        <section id="home">
          <HeroSection />
        </section>

        <section id="recruiter">
          <RecruiterDashboardSection />
        </section>

        <section id="projects" className="page-container">
          <ProjectsShowcase />
          <div style={{ height: '80px' }} />
          <GitHubProjectsSection />
        </section>

        <section id="skills" className="page-container">
          <SkillsDashboard />
          <div style={{ height: '80px' }} />
          <DevopsPipelineSection />
          <div style={{ height: '80px' }} />
          <AwsArchitectureSection />
          <div style={{ height: '80px' }} />
          <NetworkTopologySection />
        </section>

        <section id="about" className="page-container">
          <AboutMeSection />
          <div style={{ height: '80px' }} />
          <FuturisticTimelineSection />
        </section>

        <section id="contact">
          <CommunicationCenter />
        </section>
      </Suspense>
      
      <div style={{ height: '80px' }} />
    </div>
  )
}

export default App
