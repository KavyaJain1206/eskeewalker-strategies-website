import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'
import DynamicSections from '../components/DynamicSections'
import CTASection from '../components/CTASection'
import heroImg from '../assets/images/about-hero.webp'
import founderImg from '../assets/images/founder.webp'

const values = [
  { title: 'Story before tool', desc: 'Every project starts with the narrative. What\'s the emotion? What\'s the purpose? What needs to change in the viewer? We answer those questions before we open a single AI tool. The brief makes the video — not the model.' },
  { title: 'AI amplifies. Humans curate.', desc: 'We use AI to generate. We use judgment to select, shape, and finish. The human eye is still the most important tool in the studio. We never let outputs go without a human decision being made about every frame.' },
  { title: 'Credibility over hype', desc: 'AI video is full of novelty. Brands are chasing the shiny. We\'re not interested in impressive-for-a-second — we\'re interested in effective. Content that holds up. Storytelling that earns trust over time.' },
  { title: 'Impact has a place in every frame', desc: 'We come from sustainable marketing. That doesn\'t go away. We think about what we make, who we make it for, and whether it\'s adding something real to the world. The best content serves both the brand and its audience.' },
]

const ecosystem = [
  { mark: 'EW', title: 'EskeeWalker Strategies', desc: 'The core studio — AI creative production, brand storytelling, sustainability communication. The engine behind everything.', tag: 'Core Studio' },
  { mark: 'CD', title: 'Climate Decode', desc: 'Our partner for all sustainability and climate communication work. They bring the science, the credibility, and the climate expertise. We bring the story and the production.', tag: 'Partner — Sustainability' },
  { mark: 'PA', title: 'Pecok Animation Academy', desc: 'Jaipur\'s established animation and design education institution. Our partner for AI courses — their studio space, faculty network, and student community, combined with our AI production expertise.', tag: 'Partner — Education' },
]

export default function About() {
  return (
    <>
      {/* HERO */}
      <FadeUp className="page-hero">
        <div className="hero-glow hero-glow-center"></div>
        <div className="page-hero-text">
          <div className="page-tag">About</div>
          <h1 className="compact">Built on the belief that<br /><em>AI amplifies</em> great stories.</h1>
        </div>
        <div className="page-hero-media">
          <img className="media-fade" src={heroImg} alt="" loading="eager" decoding="async" onLoad={e => e.target.classList.add('loaded')} />
        </div>
      </FadeUp>

      {/* FOUNDER */}
      <FadeUp className="founder-section">
        <div className="founder-visual">
          <div className="founder-photo-frame">
            <img className="media-fade" src={founderImg} alt="Jitaksh Jain — Founder" decoding="async" onLoad={e => e.target.classList.add('loaded')} />
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
          {values.map((v, i) => (
            <div key={v.title} className="value-card">
              <div className="value-num">{String(i + 1).padStart(2, '0')}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* ECOSYSTEM */}
      <FadeUp tag="section" className="ecosystem">
        <div className="section-label">Our ecosystem</div>
        <h2 className="section-title">Who we work with.</h2>
        <div className="eco-grid">
          {ecosystem.map(e => (
            <div key={e.title} className="eco-card">
              <div className="eco-mark">{e.mark}</div>
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
              <span className="eco-tag">{e.tag}</span>
            </div>
          ))}
        </div>
      </FadeUp>

      <CTASection
        heading="Let's make something<br />worth watching."
        subtext="We're selective about the work we take on. If your project has a real story inside it, we want to hear it."
        btnText="Get in touch →"
      />

      <DynamicSections pageName="about" excludeKeys={['hero', 'founder']} />

      <FooterMinimal />
    </>
  )
}
