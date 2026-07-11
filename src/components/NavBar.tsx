import ThemeToggle from './ThemeToggle';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="top-navbar">
      <div className="nav-inner">
        <ul className="nav-links">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#recruiter" className="nav-link">Fast-Track</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#skills" className="nav-link">Skills</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
