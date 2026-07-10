import { Link } from 'react-router-dom'
import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'
import CTASection from '../components/CTASection'
import ResponsiveImage from '../components/ResponsiveImage'
import heroPc from '../assets/pc/learn-to-make-ai-that-moves.webp'
import heroLaptop from '../assets/laptop/learn-to-make-ai-that-moves.webp'
import heroMobile from '../assets/mobile/learn-to-make-ai-that-moves.webp'

const whyPoints = [
  { icon: '⚡', title: 'AI is rewriting what creators can do', desc: 'One person with the right AI skills can now produce what used to take a full team. These courses teach you exactly those skills — practically, not theoretically.' },
  { icon: '🎬', title: 'Built by practitioners, not professors', desc: 'Every course is taught by people actively producing AI content for real clients. You learn from what we\'re doing right now — not what was relevant three years ago.' },
  { icon: '🏛️', title: 'Grounded in animation fundamentals', desc: 'Pecok Animation Academy brings decades of traditional animation education. We layer AI tools on top of solid creative foundations — not shortcuts, but superpowers.' },
]

const defaultCourses = [
  {
    id: 1,
    title: "Animation Fundamentals",
    description: "The foundations of animation — timing, spacing, movement, and storytelling. Learn to think like an animator before you touch an AI tool.",
    level: "beginner",
    modules: ["12 principles of animation", "Storyboarding and visual narrative", "Character and motion basics", "Introduction to digital animation tools"],
    duration: "6 weeks",
    price: "In-person",
    cta_link: "/contact"
  },
  {
    id: 2,
    title: "Design for AI Production",
    description: "Visual design, art direction, and aesthetic thinking — how to create consistent, beautiful visual worlds using AI generation tools.",
    level: "intermediate",
    modules: ["Visual design principles", "AI art direction and prompt engineering", "Brand consistency in AI visuals", "Midjourney & Firefly deep dive"],
    duration: "8 weeks",
    price: "Hybrid",
    cta_link: "/contact"
  },
  {
    id: 3,
    title: "Generative AI Mastery",
    description: "Advanced generative AI workflows — combining multiple tools to produce cinematic-quality output efficiently and at scale. For creators who already know the basics.",
    level: "advanced",
    modules: ["Multi-tool AI workflows", "Runway Gen-3, Kling, Sora", "AI character consistency", "Commercial production pipeline"],
    duration: "10 weeks",
    price: "Online + Live",
    cta_link: "/contact"
  },
  {
    id: 4,
    title: "Social Content Creation with AI",
    description: "For creators, founders, and marketers who want to produce high-quality social content using AI tools — Reels, Shorts, and Stories that actually convert.",
    level: "beginner",
    modules: ["Hook writing and content structure", "AI-assisted video editing", "Platform-native content strategy", "CapCut, Pika, ElevenLabs workflow"],
    duration: "4 weeks",
    price: "Online",
    cta_link: "/contact"
  }
]

function getCourseIcon(title) {
  const t = title.toLowerCase();
  if (t.includes('animation')) return '✏️';
  if (t.includes('design')) return '🎨';
  if (t.includes('mastery') || t.includes('generative')) return '🤖';
  if (t.includes('social') || t.includes('content')) return '📱';
  return '🎓';
}

export default function AICourses() {
  const courses = defaultCourses

  return (
    <>
      {/* HERO */}
      <FadeUp className="page-hero">
        <div className="hero-glow hero-glow-orange"></div>
        <div className="page-hero-text">
          <div className="collab-badge collab-badge-orange">With Pecok Animation Academy · Jaipur</div>
          <h1 className="compact">Learn to make<br /><em>AI</em> that moves.</h1>
          <p>Hands-on courses in animation, design, and generative AI — built for the next generation of creators who want to produce at the level of a studio, without being one.</p>
        </div>
        <div className="page-hero-media">
          <ResponsiveImage pc={heroPc} laptop={heroLaptop} mobile={heroMobile} alt="" loading="eager" />
        </div>
      </FadeUp>

      {/* WHY */}
      <FadeUp tag="section" className="why-section">
        <div className="why-grid">
          {whyPoints.map(w => (
            <div key={w.title} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* COURSES */}
      <FadeUp tag="section" className="courses-section">
        <div className="section-label">Courses</div>
        <h2 className="section-title">What you'll learn.</h2>
        <div className="courses-grid">

          {/* FEATURED */}
          <div className="featured-course">
            <div className="featured-left">
              <div className="featured-label">Flagship Programme</div>
              <h3>AI Video<br /><em>Production</em> Bootcamp</h3>
              <p>A comprehensive programme covering the full AI video production pipeline — from concept and scripting to AI generation, human editing, and delivery. This is the complete toolkit for producing professional AI video content.</p>
              <Link to="/contact" className="course-cta">Enquire about this course →</Link>
            </div>
            <div className="featured-right">
              {[
                { num: 'M1', title: 'Story & Script Foundations', desc: 'Writing for AI video — how to brief generative tools' },
                { num: 'M2', title: 'AI Image Generation', desc: 'Midjourney, Stable Diffusion, Adobe Firefly' },
                { num: 'M3', title: 'AI Video & Animation', desc: 'Runway, Kling, Pika — motion from still images' },
                { num: 'M4', title: 'Voice, Audio & Music', desc: 'ElevenLabs voiceover, AI music composition' },
                { num: 'M5', title: 'Edit, Finish & Deliver', desc: 'Post-production, colour, formats, platform delivery' },
              ].map(m => (
                <div key={m.num} className="module-row">
                  <div className="module-num">{m.num}</div>
                  <div className="module-info">
                    <h5>{m.title}</h5>
                    <span>{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC COURSES LIST */}
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <div className="course-icon">{getCourseIcon(course.title)}</div>
                <div className={`course-level ${course.level}`}>{course.level}</div>
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <ul className="course-modules">
                  {course.modules.map((m, idx) => <li key={idx}>{m}</li>)}
                </ul>
              </div>
              <div className="course-footer">
                <div className="course-meta">
                  <div className="meta-item"><span className="meta-label">Duration</span><span className="meta-value">{course.duration}</span></div>
                  <div className="meta-item"><span className="meta-label">Format</span><span className="meta-value">{course.price}</span></div>
                </div>
                <Link to={course.cta_link} className="course-cta">Enquire →</Link>
              </div>
            </div>
          ))}

        </div>
      </FadeUp>

      {/* ACADEMY COLLAB */}
      <FadeUp className="academy-collab">
        <div className="academy-logo-block">
          <div className="academy-mark">PA</div>
          <span>Pecok Animation<br />Academy</span>
        </div>
        <div className="academy-text">
          <h3>Built with Pecok Animation Academy</h3>
          <p>Pecok Animation Academy has been training animators and designers in Jaipur for years. We've partnered with them to bring AI-first curriculum into their established creative education ecosystem — combining their studio infrastructure, their faculty, and their community of creators with our expertise in AI video production. The result is courses that are grounded, practical, and directly connected to real production work.</p>
        </div>
      </FadeUp>

      <CTASection
        heading="Learn to make<br />things move."
        subtext="Whether you're starting from zero or levelling up — we have a course for where you are."
        btnText="Enquire about courses →"
      />

      <FooterMinimal copy="© 2025 EskeeWalker Strategies × Pecok Animation Academy" />
    </>
  )
}
