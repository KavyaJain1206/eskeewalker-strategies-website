import { Link } from 'react-router-dom'
import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'

export default function SustainabilityComm() {
  return (
    <>
      {/* HERO */}
      <FadeUp className="page-hero">
        <img className="hero-bg-img" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80&fit=crop" alt="" />
        <div className="hero-glow hero-glow-green"></div>
        <div className="collab-badge collab-badge-green">
          <div className="collab-dot"></div>
          In collaboration with Climate Decode
        </div>
        <h1>Sustainability<br />that <em>moves</em> people.</h1>
        <p>Your ESG reports, climate commitments, and sustainability goals are important. But nobody's watching a 40-page PDF. We turn your data into visual stories that people actually feel.</p>
      </FadeUp>

      {/* PROBLEM */}
      <FadeUp tag="section" className="problem">
        <div className="problem-grid">
          <div className="problem-card">
            <div className="card-icon">📄</div>
            <h3>The problem with sustainability content today</h3>
            <p>Most sustainability communication is buried in annual reports, dense PDFs, and jargon-heavy press releases. The intent is real. The impact is near zero. Nobody is watching, sharing, or feeling it.</p>
          </div>
          <div className="problem-card">
            <div className="card-icon">📄</div>
            <h3>The second problem</h3>
            <p>Even brands doing genuinely important climate work are invisible. The story isn't reaching the right people — not customers, not investors, not the public. Good work goes unseen.</p>
          </div>
          <div className="problem-card highlight">
            <div className="card-icon">✦</div>
            <h3>What we do instead</h3>
            <p>We take your sustainability narrative and rebuild it as animated visual content, short-form video, and campaign-ready assets. Stories that carry your real data — but told in a way that lands emotionally, not just analytically.</p>
          </div>
          <div className="problem-card highlight">
            <div className="card-icon">🤝</div>
            <h3>The Climate Decode edge</h3>
            <p>This service is built in partnership with Climate Decode — who bring deep climate domain expertise. We bring the storytelling and AI production. Together, we make sustainability communication that's both credible and compelling.</p>
          </div>
        </div>
      </FadeUp>

      {/* WHAT WE DO */}
      <FadeUp tag="section" className="what-we-do">
        <div className="section-label">What we produce</div>
        <h2 className="section-title">From reports to reels.<br />From data to drama.</h2>
        <div className="offerings-grid">
          <div className="offering">
            <div className="offering-icon">🎬</div>
            <h4>ESG Report Animations</h4>
            <p>We take your annual sustainability or ESG report and produce a visual summary — animated infographics, data storytelling, short documentary-style videos that actually communicate what you achieved.</p>
            <span className="offering-tag">Most popular</span>
          </div>
          <div className="offering">
            <div className="offering-icon">📱</div>
            <h4>Social Campaign Content</h4>
            <p>Sustainability commitments broken into campaign-ready social content — Reels, LinkedIn videos, carousels. Made to be shared, not archived.</p>
            <span className="offering-tag">Series format</span>
          </div>
          <div className="offering">
            <div className="offering-icon">🌍</div>
            <h4>Climate Explainers</h4>
            <p>Complex climate topics, policies, and data explained through AI animation and visual storytelling. For brands, NGOs, and policymakers who need clarity without oversimplification.</p>
            <span className="offering-tag">w/ Climate Decode</span>
          </div>
          <div className="offering">
            <div className="offering-icon">🏆</div>
            <h4>Impact Campaigns</h4>
            <p>Full visual campaigns around a sustainability milestone — net-zero pledges, certifications, community initiatives. From concept through to delivery-ready assets.</p>
            <span className="offering-tag">Campaign package</span>
          </div>
          <div className="offering">
            <div className="offering-icon">📊</div>
            <h4>Data Visualisation</h4>
            <p>AI-animated data visualisations that turn your metrics, targets, and progress into something visually powerful. Numbers that feel like something.</p>
            <span className="offering-tag">Motion data</span>
          </div>
          <div className="offering">
            <div className="offering-icon">🔬</div>
            <h4>Founder &amp; Mission Stories</h4>
            <p>For impact-led founders — we tell your why. The story behind the mission, the people doing the work, the vision for what comes next. AI-produced, human-felt.</p>
            <span className="offering-tag">Founder-led</span>
          </div>
        </div>
      </FadeUp>

      {/* FLOW */}
      <FadeUp tag="section" className="flow-section">
        <div className="section-label">How it works</div>
        <h2 className="section-title">Five steps from<br />data to story.</h2>
        <div className="flow-steps">
          {[
            { num: 'Step 01', title: 'You share your sustainability material', desc: 'Reports, data, goals, achievements — whatever you have. We work with what exists.' },
            { num: 'Step 02', title: 'Climate Decode frames the narrative', desc: 'Our partners identify the story worth telling and ensure it\'s accurate, credible, and meaningful.' },
            { num: 'Step 03', title: 'We script and storyboard', desc: 'EskeeWalker builds the visual narrative — script, structure, tone, format, platform.' },
            { num: 'Step 04', title: 'AI production', desc: 'We produce the visual content using AI animation, motion graphics, and AI video tools.' },
            { num: 'Step 05', title: 'Delivery & distribution', desc: 'Final assets in every format — social, web, presentation, event screen, or press kit.' },
          ].map((step, i, arr) => (
            <div key={step.num} className="flow-step">
              <div className="flow-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
              {i < arr.length - 1 && <div className="flow-arrow">→</div>}
            </div>
          ))}
        </div>
      </FadeUp>

      {/* COLLAB FEATURE */}
      <FadeUp className="collab-feature">
        <div>
          <h3>Built with<br /><em>Climate Decode</em></h3>
          <p>Climate Decode is a specialist climate communication firm. They bring scientific rigour and climate expertise to every story we tell. We bring the AI production capability and the creative craft.</p>
          <p>Together, this is a service that other creative agencies can't offer — because they don't have the climate depth. And that most climate consultancies can't offer — because they don't have the production capability.</p>
          <Link to="/contact">Work with us →</Link>
        </div>
        <div className="collab-right">
          {[
            { title: 'Science-backed storytelling', desc: 'Every claim is accurate. Every story is grounded in real data, reviewed by climate specialists.' },
            { title: 'AI-produced visuals', desc: 'Animation and video production that would cost 10× more to produce traditionally.' },
            { title: 'Platform-ready delivery', desc: 'Formatted for social, web, events, press — wherever your audience actually is.' },
            { title: 'Anti-greenwashing by design', desc: 'We don\'t make sustainability look good if it isn\'t. Credibility is non-negotiable.' },
          ].map(point => (
            <div key={point.title} className="collab-point">
              <div className="collab-point-icon">✦</div>
              <div className="collab-point-text">
                <h5>{point.title}</h5>
                <p>{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* IDEAL CLIENTS */}
      <FadeUp tag="section" className="ideal-clients">
        <div className="section-label">Who this is for</div>
        <h2 className="section-title">If your sustainability<br />work deserves to be seen.</h2>
        <div className="clients-grid">
          {[
            { icon: '🌱', title: 'Renewable Energy Brands', desc: 'Solar, wind, EV, clean tech — brands doing real climate work that needs a visual voice.' },
            { icon: '🏢', title: 'ESG-Reporting Corporates', desc: 'Companies with sustainability commitments that need to communicate beyond the annual report.' },
            { icon: '🌍', title: 'Climate NGOs & Nonprofits', desc: 'Organisations doing important work that deserves audiences far beyond grant committees.' },
            { icon: '🚀', title: 'Impact Startups', desc: 'Founders building sustainable products who need to tell their story before they scale.' },
          ].map(c => (
            <div key={c.title} className="client-type">
              <div className="icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* CTA */}
      <section className="cta-section">
        <h2>Your data has<br />a story inside it.</h2>
        <p>Let's find it, build it, and get it in front of the people who need to see it.</p>
        <Link to="/contact" className="btn-dark">Start the conversation →</Link>
      </section>

      <FooterMinimal copy="© 2025 EskeeWalker Strategies × Climate Decode" />
    </>
  )
}
