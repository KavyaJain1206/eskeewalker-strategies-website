import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FadeUp from '../components/FadeUp'
import { FooterFull } from '../components/Footer'
import DynamicSections from '../components/DynamicSections'
import CTASection from '../components/CTASection'
import heroVideo from '../assets/video/home-hero.mp4'
import dramaMicrodramaImg from '../assets/images/work-item-drama-microdrama.jpg'
import ugcSocialImg from '../assets/images/work-item-ugc-social.jpg'
import sustainabilityNetZeroImg from '../assets/images/work-item-sustainability-netzero.jpg'
import adsImg from '../assets/images/work-item-ads.jpg'
import dramaCharacterImg from '../assets/images/work-item-drama-character.jpg'

const marqueeItems = [
  'AI Animation', 'Drama Production', 'UGC Content', 'AI Ads',
  'Sustainability Communication', 'Generative AI Courses', 'Brand Storytelling',
]

export default function Home() {
  const [hero, setHero] = useState({
    title: "Stories built by AI.\nFelt by humans.",
    subtitle: "We produce AI drama, UGC, and ads for brands that want to be remembered — and turn sustainability data into stories people actually watch."
  })

  useEffect(() => {
    fetch('/api/pages/home')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        if (data.hero) {
          setHero(data.hero)
        }
      })
      .catch(err => console.log('CMS fetch failed, using fallback static data:', err))
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onEnded={e => { e.target.currentTime = 0; e.target.play() }}
        />
        <div className="hero-video-overlay"></div>
        <div className="hero-bg"></div>
        <div className="hero-noise"></div>
        <div className="hero-tag">AI Creative Studio · Jaipur, India</div>
        <h1>
          {hero.title.split(/\r?\n|\\n/).map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < hero.title.split(/\r?\n|\\n/).length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="hero-sub">{hero.subtitle}</p>
        <div className="hero-actions">
          <Link to="/work" className="btn-primary">See Our Work</Link>
          <Link to="/contact" className="btn-ghost">
            Start a project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            i % marqueeItems.length === marqueeItems.length - 1
              ? [<span key={`t-${i}`}>{item}</span>, <span key={`d-${i}`} className="dot">·</span>]
              : [<span key={`t-${i}`}>{item}</span>, <span key={`d-${i}`} className="dot">·</span>]
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="services">
        <FadeUp className="services-header">
          <div>
            <div className="section-label">What we do</div>
            <h2 className="section-title">Three ways we<br />make things move.</h2>
          </div>
          <p className="services-intro">We don't just produce content — we build visual worlds. Every frame is intentional, every story has a purpose.</p>
        </FadeUp>
        <FadeUp className="services-grid">
          <Link to="/ai-creative-studio" className="service-card">
            <div className="service-icon">🎬</div>
            <div className="service-num">01</div>
            <h3>AI Creative Studio</h3>
            <p>Drama productions, UGC, and ads made with generative AI. Cinematic quality at the speed of ideas.</p>
            <div className="service-tags">
              <span className="service-tag">Drama</span>
              <span className="service-tag">UGC</span>
              <span className="service-tag">AI Ads</span>
            </div>
            <div className="service-arrow">↗</div>
          </Link>

          <Link to="/sustainability" className="service-card">
            <div className="service-icon">🌿</div>
            <div className="service-num">02</div>
            <h3>Sustainability Communication</h3>
            <p>In collaboration with Climate Decode — we turn ESG reports, sustainability goals, and climate data into visual stories that actually land.</p>
            <div className="service-tags">
              <span className="service-tag">ESG Visuals</span>
              <span className="service-tag">Animation</span>
              <span className="service-tag">Campaigns</span>
            </div>
            <div className="service-arrow">↗</div>
          </Link>

          <Link to="/courses" className="service-card">
            <div className="service-icon">🎓</div>
            <div className="service-num">03</div>
            <h3>AI Courses</h3>
            <p>With Pecok Animation Academy — hands-on courses in animation, design, and generative AI for the next generation of creators.</p>
            <div className="service-tags">
              <span className="service-tag">Animation</span>
              <span className="service-tag">Design</span>
              <span className="service-tag">GenAI</span>
            </div>
            <div className="service-arrow">↗</div>
          </Link>
        </FadeUp>
      </section>

      {/* WORK TEASER */}
      <section className="work-section">
        <FadeUp className="work-header">
          <div>
            <div className="section-label">Selected Work</div>
            <h2 className="section-title">What we've made.</h2>
          </div>
          <Link to="/work" className="view-all-link">View all work →</Link>
        </FadeUp>
        <FadeUp className="work-grid">
          <div className="work-item">
            <div className="work-placeholder">
              <img src={dramaMicrodramaImg} alt="AI Drama Production" loading="lazy" decoding="async" />
            </div>
            <div className="work-label">AI Drama</div>
            <div className="work-overlay">
              <span>Drama Production</span>
              <h4>AI Microdrama — Brand Story</h4>
            </div>
          </div>
          <div className="work-item">
            <div className="work-placeholder">
              <img src={ugcSocialImg} alt="UGC Social Content" loading="lazy" decoding="async" />
            </div>
            <div className="work-label">Social Content</div>
            <div className="work-overlay">
              <span>UGC Campaign</span>
              <h4>Client Social Campaign</h4>
            </div>
          </div>
          <div className="work-item">
            <div className="work-placeholder">
              <img src={sustainabilityNetZeroImg} alt="Sustainability Communication" loading="lazy" decoding="async" />
            </div>
            <div className="work-label">Sustainability</div>
            <div className="work-overlay">
              <span>Sustainability Comms</span>
              <h4>ESG Report Visualised</h4>
            </div>
          </div>
          <div className="work-item">
            <div className="work-placeholder">
              <img src={adsImg} alt="AI Advertisement" loading="lazy" decoding="async" />
            </div>
            <div className="work-label">AI Ads</div>
            <div className="work-overlay">
              <span>AI Ad</span>
              <h4>Performance Ad — 30 sec</h4>
            </div>
          </div>
          <div className="work-item">
            <div className="work-placeholder">
              <img src={dramaCharacterImg} alt="AI Animation" loading="lazy" decoding="async" />
            </div>
            <div className="work-label">Animation</div>
            <div className="work-overlay">
              <span>AI Animation</span>
              <h4>Brand Character Design</h4>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* STATEMENT */}
      <div className="statement">
        <FadeUp>
          <blockquote>
            "AI doesn't replace the story.<br />It <em>accelerates</em> it."
          </blockquote>
        </FadeUp>
        <FadeUp>
          <p>We believe the best AI-produced content still starts with a human insight, a real emotion, and a clear reason to exist. That's what we bring to every project.</p>
        </FadeUp>
      </div>

      {/* PROCESS */}
      <section className="process">
        <FadeUp className="process-header">
          <div className="section-label">How we work</div>
          <h2 className="section-title">From brief to screen.</h2>
        </FadeUp>
        <FadeUp className="process-steps">
          <div className="process-step">
            <div className="step-num">01</div>
            <h4>Story First</h4>
            <p>Every project starts with the narrative. We find the emotional core before we touch a single tool.</p>
          </div>
          <div className="process-step">
            <div className="step-num">02</div>
            <h4>AI Production</h4>
            <p>We use the best generative AI tools — Runway, Sora, Kling, Midjourney — to produce at cinematic quality.</p>
          </div>
          <div className="process-step">
            <div className="step-num">03</div>
            <h4>Human Edit</h4>
            <p>Every frame is reviewed, refined, and shaped by human eyes. AI generates. We curate.</p>
          </div>
          <div className="process-step">
            <div className="step-num">04</div>
            <h4>Deliver & Distribute</h4>
            <p>Final assets delivered in every format you need — cut for platform, optimised for performance.</p>
          </div>
        </FadeUp>
      </section>

      {/* PARTNERS */}
      <div className="partners">
        <div className="partners-inner">
          <span className="partners-label">In collaboration with</span>
          <div className="partners-divider"></div>
          <div className="partners-logos">
            <a href="#" className="partner-logo">
              <div className="partner-logo-mark">CD</div>
              <span>Climate Decode</span>
            </a>
            <a href="#" className="partner-logo">
              <div className="partner-logo-mark">PA</div>
              <span>Pecok Animation</span>
            </a>
          </div>
        </div>
      </div>

      <CTASection heading="Ready to make<br />something real?" subtext="Tell us what you're building. We'll tell you what it could look like." />

      <DynamicSections pageName="home" excludeKeys={['hero', 'statement']} />

      <FooterFull />
    </>
  )
}
