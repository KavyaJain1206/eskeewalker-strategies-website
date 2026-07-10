import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const close = () => setOpen(false)
  const peek = () => setHovering(true)
  const unpeek = () => setHovering(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrolled(false)
    function onScroll() {
      if (window.scrollY > 4) {
        setScrolled(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const visible = scrolled || hovering

  return (
    <>
      <div className="nav-hover-zone" onMouseEnter={peek} onMouseLeave={unpeek}></div>
      <nav className={visible ? 'visible' : ''} onMouseEnter={peek} onMouseLeave={unpeek}>
      <Link to="/" className="nav-logo" onClick={close}>Eskee<span>Walker</span></Link>
      <button
        type="button"
        className={`nav-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-links"
      >
        <span></span><span></span><span></span>
      </button>
      <ul id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
        <li><Link to="/work" className={pathname === '/work' ? 'active' : ''} onClick={close}>Work</Link></li>
        <li><Link to="/ai-creative-studio" className={pathname === '/ai-creative-studio' ? 'active' : ''} onClick={close}>AI Studio</Link></li>
        <li><Link to="/sustainability" className={pathname === '/sustainability' ? 'active' : ''} onClick={close}>Sustainability</Link></li>
        <li><Link to="/courses" className={pathname === '/courses' ? 'active' : ''} onClick={close}>Courses</Link></li>
        <li><Link to="/about" className={pathname === '/about' ? 'active' : ''} onClick={close}>About</Link></li>
        <li className="nav-cta-mobile"><Link to="/contact" className="nav-cta" onClick={close}>Start a Project</Link></li>
      </ul>
      <Link to="/contact" className="nav-cta nav-cta-desktop">Start a Project</Link>
      </nav>
    </>
  )
}
