import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
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
      <NavBar />
      
      <Routes>
        <Route path="/" element={<HeroSection />} />
        
        <Route path="/about" element={
          <div className="page-container">
            <AboutMeSection />
            <div style={{ height: '80px' }} />
            <FuturisticTimelineSection />
          </div>
        } />
        
        <Route path="/skills" element={
          <div className="page-container">
            <SkillsDashboard />
            <div style={{ height: '80px' }} />
            <DevopsPipelineSection />
            <div style={{ height: '80px' }} />
            <AwsArchitectureSection />
            <div style={{ height: '80px' }} />
            <NetworkTopologySection />
          </div>
        } />

        <Route path="/recruiter" element={<RecruiterDashboardSection />} />
        <Route path="/projects" element={<ProjectsShowcase />} />
        <Route path="/contact" element={<CommunicationCenter />} />
      </Routes>
      
      <div style={{ height: '80px' }} />
    </div>
  )
}

export default App
