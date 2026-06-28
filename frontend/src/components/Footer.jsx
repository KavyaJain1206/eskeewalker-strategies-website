import { Link } from 'react-router-dom'

export function FooterFull() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">Eskee<span>Walker</span></Link>
          <p className="footer-tagline">Stories built by AI. Felt by humans. Based in Jaipur. Working globally.</p>
        </div>
        <div className="footer-nav">
          <div className="footer-col">
            <h5>Work</h5>
            <ul>
              <li><Link to="/work">All Projects</Link></li>
              <li><Link to="/work">Drama</Link></li>
              <li><Link to="/work">UGC</Link></li>
              <li><Link to="/work">Ads</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link to="/ai-creative-studio">AI Creative Studio</Link></li>
              <li><Link to="/sustainability">Sustainability Comms</Link></li>
              <li><Link to="/courses">AI Courses</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 EskeeWalker Strategies. All rights reserved.</p>
        <a href="mailto:eskeewalkerstrategies@gmail.com" className="footer-email">eskeewalkerstrategies@gmail.com</a>
      </div>
    </footer>
  )
}

export function FooterMinimal({ copy = '© 2025 EskeeWalker Strategies' }) {
  return (
    <footer className="footer-minimal">
      <Link to="/" className="footer-minimal-logo">Eskee<span>Walker</span></Link>
      <p>{copy}</p>
      <a href="mailto:eskeewalkerstrategies@gmail.com" className="footer-email">eskeewalkerstrategies@gmail.com</a>
    </footer>
  )
}
