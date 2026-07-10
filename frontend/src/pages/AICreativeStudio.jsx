import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'
import CTASection from '../components/CTASection'
import ResponsiveImage from '../components/ResponsiveImage'
import heroPc from '../assets/pc/ai-creative.jpg'
import heroLaptop from '../assets/laptop/ai-creative.jpg'
import heroMobile from '../assets/mobile/ai-creative.jpg'
import dramaPc from '../assets/pc/drama-productions.jpg'
import dramaLaptop from '../assets/laptop/drama-productions.jpg'
import dramaMobile from '../assets/mobile/drama-productions.jpg'
import ugcPc from '../assets/pc/ugc-and-social-content.jpg'
import ugcLaptop from '../assets/laptop/ugc-and-social-content.jpg'
import ugcMobile from '../assets/mobile/ugc-and-social-content.jpg'
import adsPc from '../assets/pc/ai-ads.jpg'
import adsLaptop from '../assets/laptop/ai-ads.jpg'
import adsMobile from '../assets/mobile/ai-ads.jpg'

const tools = [
  'Runway Gen-3', 'Kling AI', 'Sora', 'Midjourney', 'ElevenLabs',
  'Stable Diffusion', 'Pika Labs', 'Adobe Firefly', 'CapCut Pro', 'DaVinci Resolve',
]

export default function AICreativeStudio() {
  return (
    <>
      {/* HERO */}
      <FadeUp className="page-hero">
        <div className="hero-glow hero-glow-lime"></div>
        <div className="page-hero-text">
          <div className="page-tag">Service · 01</div>
          <h1>AI <em>Creative</em><br />Studio.</h1>
          <p>We produce AI drama, UGC content, and ads — at the speed of ideas, with the craft of a production house. Every frame is intentional. Every story is earned.</p>
        </div>
        <div className="page-hero-media">
          <ResponsiveImage pc={heroPc} laptop={heroLaptop} mobile={heroMobile} alt="" loading="eager" />
        </div>
      </FadeUp>

      {/* INTRO STRIP */}
      <FadeUp className="intro-strip">
        <div>
          <h3>What is AI Creative production, really?</h3>
          <p>It's not about replacing filmmakers. It's about giving great storytellers a superpower. We use generative AI tools to produce cinematic-quality content — drama, character-driven narratives, short-form ads — at a fraction of the time and cost of traditional production. The story is still human. The production is augmented.</p>
        </div>
        <div>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>Our AI Creative Studio is built for brands that need to move fast without looking cheap — and for stories that need to feel real even when they're generated pixel by pixel.</p>
          <div className="intro-stats">
            <div className="stat">
              <strong>3×</strong>
              <span>Faster than traditional</span>
            </div>
            <div className="stat">
              <strong>AI-first</strong>
              <span>Not AI as an afterthought</span>
            </div>
            <div className="stat">
              <strong>Story-led</strong>
              <span>Always</span>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* SERVICES DEEP DIVE */}
      <section className="services-deep">
        <div className="section-label fade-up">What we produce</div>
        <h2 className="section-title fade-up">Three formats.<br />Infinite stories.</h2>

        {/* DRAMA */}
        <FadeUp className="service-row">
          <div className="service-detail">
            <div className="service-num-large">01</div>
            <h3><em>Drama</em><br />Productions</h3>
            <p>Short-form AI narrative films — microdramas, brand origin stories, character-driven content. We script, direct, and produce drama with AI tools that make it look like it cost 10× more than it did.</p>
            <p>This is for brands that want to make people feel something. Not just scroll past.</p>
            <ul className="service-list">
              <li>AI microdramas (60 sec – 5 min)</li>
              <li>Brand origin and founder stories</li>
              <li>Character-driven campaign films</li>
              <li>Series and episodic content</li>
              <li>OTT-ready short films</li>
            </ul>
          </div>
          <div className="service-visual">
            <ResponsiveImage pc={dramaPc} laptop={dramaLaptop} mobile={dramaMobile} alt="Drama Production" loading="lazy" />
            <div className="visual-icon">🎬</div>
            <div className="visual-badge">Drama Production</div>
            <div className="visual-dots">
              <div className="visual-dot active"></div>
              <div className="visual-dot"></div>
              <div className="visual-dot"></div>
            </div>
          </div>
        </FadeUp>

        {/* UGC */}
        <FadeUp className="service-row">
          <div className="service-visual alt">
            <ResponsiveImage pc={ugcPc} laptop={ugcLaptop} mobile={ugcMobile} alt="UGC Social Content" loading="lazy" />
            <div className="visual-icon">📱</div>
            <div className="visual-badge">UGC · Social Content</div>
            <div className="visual-dots">
              <div className="visual-dot"></div>
              <div className="visual-dot active"></div>
              <div className="visual-dot"></div>
            </div>
          </div>
          <div className="service-detail dark">
            <div className="service-num-large">02</div>
            <h3>UGC &amp;<br /><em>Social Content</em></h3>
            <p>AI-produced content that looks like it came from real creators — because the best-performing social content feels raw, native, and human. We produce at volume without losing the feel.</p>
            <p>Reels, TikToks, testimonials, product demos, talking-head series — cut for the platform, optimised for the feed.</p>
            <ul className="service-list">
              <li>AI-generated UGC-style videos</li>
              <li>Instagram Reels &amp; YouTube Shorts</li>
              <li>Founder &amp; team story content</li>
              <li>Product showcase videos</li>
              <li>Social-first testimonial content</li>
            </ul>
          </div>
        </FadeUp>

        {/* ADS */}
        <FadeUp className="service-row">
          <div className="service-detail">
            <div className="service-num-large">03</div>
            <h3>AI <em>Ads</em></h3>
            <p>Performance video ads made with AI — designed to stop the scroll and convert. We combine strong creative strategy with AI production to deliver ads that look premium and perform at scale.</p>
            <p>From 6-second hooks to 60-second brand stories — every cut designed for where it runs.</p>
            <ul className="service-list">
              <li>Meta &amp; YouTube video ads</li>
              <li>6 / 15 / 30 / 60 sec formats</li>
              <li>Hook-first creative strategy</li>
              <li>A/B creative variants at scale</li>
              <li>Product and launch campaigns</li>
            </ul>
          </div>
          <div className="service-visual">
            <ResponsiveImage pc={adsPc} laptop={adsLaptop} mobile={adsMobile} alt="AI Advertising" loading="lazy" />
            <div className="visual-icon">⚡</div>
            <div className="visual-badge">AI Advertising</div>
            <div className="visual-dots">
              <div className="visual-dot"></div>
              <div className="visual-dot"></div>
              <div className="visual-dot active"></div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* TOOLS */}
      <FadeUp className="tools-section">
        <div className="tools-header">
          <div className="section-label">Our toolkit</div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>The AI tools we work with.</h2>
        </div>
        <div className="tools-grid">
          {tools.map(t => (
            <div key={t} className="tool-chip"><span>▶</span> {t}</div>
          ))}
        </div>
      </FadeUp>

      <CTASection
        heading="What's your story?"
        subtext="Tell us the narrative. We'll build the world around it — with AI, with craft, with purpose."
        btnText="Start a project →"
      />

      <FooterMinimal />
    </>
  )
}
