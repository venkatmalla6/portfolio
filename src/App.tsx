import HeroSection from './components/HeroSection'
import AboutMeSection from './components/AboutMeSection'
import FuturisticTimelineSection from './components/FuturisticTimelineSection'
import SkillsDashboard from './components/SkillsDashboard'
import RecruiterDashboardSection from './components/RecruiterDashboardSection'
import DevopsPipelineSection from './components/DevopsPipelineSection'
import AwsArchitectureSection from './components/AwsArchitectureSection'
import NetworkTopologySection from './components/NetworkTopologySection'
import ProjectsShowcase from './components/ProjectsShowcase'
import CommunicationCenter from './components/CommunicationCenter'

function App() {
  return (
    <div className="layout-container">
      <HeroSection />
      <div style={{ height: '80px' }} />
      <AboutMeSection />
      <div style={{ height: '80px' }} />
      <FuturisticTimelineSection />
      <div style={{ height: '80px' }} />
      <SkillsDashboard />
      <div style={{ height: '80px' }} />
      <RecruiterDashboardSection />
      <div style={{ height: '80px' }} />
      <DevopsPipelineSection />
      <div style={{ height: '80px' }} />
      <AwsArchitectureSection />
      <div style={{ height: '80px' }} />
      <NetworkTopologySection />
      <div style={{ height: '80px' }} />
      <ProjectsShowcase />
      <div style={{ height: '80px' }} />
      <CommunicationCenter />
      <div style={{ height: '80px' }} />
    </div>
  )
}

export default App
