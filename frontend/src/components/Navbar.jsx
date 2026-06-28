import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav>
      <Link to="/" className="nav-logo">Eskee<span>Walker</span></Link>
      <ul className="nav-links">
        <li><Link to="/work" className={pathname === '/work' ? 'active' : ''}>Work</Link></li>
        <li><Link to="/ai-creative-studio" className={pathname === '/ai-creative-studio' ? 'active' : ''}>AI Studio</Link></li>
        <li><Link to="/sustainability" className={pathname === '/sustainability' ? 'active' : ''}>Sustainability</Link></li>
        <li><Link to="/courses" className={pathname === '/courses' ? 'active' : ''}>Courses</Link></li>
        <li><Link to="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
      </ul>
      <Link to="/contact" className="nav-cta">Start a Project</Link>
    </nav>
  )
}
