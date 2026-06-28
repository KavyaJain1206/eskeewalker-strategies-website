import { Link } from 'react-router-dom'
import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'
import DynamicSections from '../components/DynamicSections'

export default function About() {
  return (
    <>
      {/* HERO */}
      <FadeUp className="page-hero">
        <div className="hero-glow hero-glow-center"></div>
        <div className="page-tag">About</div>
        <h1>Built on the belief that<br /><em>AI amplifies</em> great stories.</h1>
      </FadeUp>

      {/* FOUNDER */}
      <FadeUp className="founder-section">
        <div className="founder-visual">
          <div className="founder-photo-frame">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop&crop=face" alt="Jitaksh Jain — Founder" />
          </div>
          <div className="founder-name">Jitaksh Jain</div>
          <div className="founder-role">Founder, EskeeWalker Strategies</div>
        </div>
        <div className="founder-text">
          <div className="section-label">The founder</div>
          <h2>A storyteller who<br />found <em>AI</em> as a craft.</h2>
          <div className="founder-bio">
            <p>EskeeWalker Strategies started as a sustainable marketing agency — helping impact-driven brands find their voice, sharpen their narrative, and build marketing systems that meant something. The philosophy was always the same: <strong>clarity creates better growth</strong>.</p>
            <p>Then AI video happened. And what we discovered was that generative AI didn't replace the need for great storytelling — it gave storytellers a new kind of studio in their hands. The brief still matters. The emotion still matters. The purpose still matters. AI just removed the ceiling on what one person or small team could produce.</p>
            <p>Today, EskeeWalker Strategies is an AI creative studio. We produce drama, UGC, and ads for brands. We partner with Climate Decode to bring sustainability communication to life. And with Pecok Animation Academy, we teach the next generation of creators to do the same.</p>
            <p>Based in Jaipur. Working globally.</p>
          </div>
        </div>
      </FadeUp>

      {/* VALUES */}
      <FadeUp tag="section" className="values-section">
        <div className="section-label">How we think</div>
        <h2 className="section-title">What we believe.</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-num">01</div>
            <h4>Story before tool</h4>
            <p>Every project starts with the narrative. What's the emotion? What's the purpose? What needs to change in the viewer? We answer those questions before we open a single AI tool. The brief makes the video — not the model.</p>
          </div>
          <div className="value-card">
            <div className="value-num">02</div>
            <h4>AI amplifies. Humans curate.</h4>
            <p>We use AI to generate. We use judgment to select, shape, and finish. The human eye is still the most important tool in the studio. We never let outputs go without a human decision being made about every frame.</p>
          </div>
          <div className="value-card">
            <div className="value-num">03</div>
            <h4>Credibility over hype</h4>
            <p>AI video is full of novelty. Brands are chasing the shiny. We're not interested in impressive-for-a-second — we're interested in effective. Content that holds up. Storytelling that earns trust over time.</p>
          </div>
          <div className="value-card">
            <div className="value-num">04</div>
            <h4>Impact has a place in every frame</h4>
            <p>We come from sustainable marketing. That doesn't go away. We think about what we make, who we make it for, and whether it's adding something real to the world. The best content serves both the brand and its audience.</p>
          </div>
        </div>
      </FadeUp>

      {/* ECOSYSTEM */}
      <FadeUp tag="section" className="ecosystem">
        <div className="section-label">Our ecosystem</div>
        <h2 className="section-title">Who we work with.</h2>
        <div className="eco-grid">
          <div className="eco-card">
            <div className="eco-mark">EW</div>
            <h4>EskeeWalker Strategies</h4>
            <p>The core studio — AI creative production, brand storytelling, sustainability communication. The engine behind everything.</p>
            <span className="eco-tag">Core Studio</span>
          </div>
          <div className="eco-card">
            <div className="eco-mark">CD</div>
            <h4>Climate Decode</h4>
            <p>Our partner for all sustainability and climate communication work. They bring the science, the credibility, and the climate expertise. We bring the story and the production.</p>
            <span className="eco-tag">Partner — Sustainability</span>
          </div>
          <div className="eco-card">
            <div className="eco-mark">PA</div>
            <h4>Pecok Animation Academy</h4>
            <p>Jaipur's established animation and design education institution. Our partner for AI courses — their studio space, faculty network, and student community, combined with our AI production expertise.</p>
            <span className="eco-tag">Partner — Education</span>
          </div>
        </div>
      </FadeUp>

      {/* CTA */}
      <section className="cta-section">
        <h2>Let's make something<br />worth watching.</h2>
        <p>We're selective about the work we take on. If your project has a real story inside it, we want to hear it.</p>
        <Link to="/contact" className="btn-dark">Get in touch →</Link>
      </section>

      <DynamicSections pageName="about" excludeKeys={['hero', 'founder']} />

      <FooterMinimal />
    </>
  )
}
