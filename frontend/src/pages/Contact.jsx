import { useState } from 'react'
import { Link } from 'react-router-dom'
import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'

const budgetOptions = ['Under ₹50K', '₹50K – ₹2L', '₹2L – ₹5L', '₹5L+', 'Let\'s discuss']

export default function Contact() {
  const [budget, setBudget] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, budget }),
      })
    } catch (_) {}
    setSubmitted(true)
  }

  return (
    <>
      <div className="contact-layout">

        {/* LEFT */}
        <FadeUp className="contact-left">
          <div>
            <div className="page-tag">Contact</div>
            <h1>Let's build<br />something <em>worth</em><br />watching.</h1>
            <p>Tell us about your project. We'll respond within 48 hours with a clear path forward — no fluff, no endless discovery calls.</p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-item-label">Email</span>
                <span className="contact-item-value"><a href="mailto:eskeewalkerstrategies@gmail.com">eskeewalkerstrategies@gmail.com</a></span>
              </div>
              <div className="contact-item">
                <span className="contact-item-label">Based in</span>
                <span className="contact-item-value">Jaipur, Rajasthan, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-item-label">Working hours</span>
                <span className="contact-item-value">Mon – Sat, 9am – 6pm IST</span>
              </div>
            </div>

            <div className="contact-services">
              <div className="services-label">Looking for something specific?</div>
              <div className="service-links">
                <Link to="/ai-creative-studio" className="service-link">
                  AI Creative Studio
                  <span>Drama · UGC · Ads →</span>
                </Link>
                <Link to="/sustainability" className="service-link">
                  Sustainability Communication
                  <span>w/ Climate Decode →</span>
                </Link>
                <Link to="/courses" className="service-link">
                  AI Courses
                  <span>w/ Pecok Animation →</span>
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* RIGHT */}
        <FadeUp className="contact-right">
          <div className="form-header">
            <h2>Start a project</h2>
            <p>Fill this in. We'll get back to you within 48 hours.</p>
          </div>

          {submitted ? (
            <div style={{ padding: '3rem 0' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--accent)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginBottom: '0.75rem' }}>Sent ✓</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Thanks! We'll be in touch within 48 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" className="form-input" placeholder="Jitaksh Jain" required value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" className="form-input" placeholder="you@company.com" required value={form.email} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="company">Company / Brand</label>
                <input id="company" name="company" type="text" className="form-input" placeholder="Your company name" value={form.company} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="service">What do you need?</label>
                <select id="service" name="service" className="form-select" value={form.service} onChange={handleChange}>
                  <option value="">Select a service</option>
                  <option>AI Drama Production</option>
                  <option>UGC &amp; Social Content</option>
                  <option>AI Advertisements</option>
                  <option>Sustainability Communication</option>
                  <option>AI Courses (Enrolment)</option>
                  <option>Something else</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Approximate budget</label>
                <div className="budget-chips">
                  {budgetOptions.map(b => (
                    <button
                      key={b}
                      type="button"
                      className={`budget-chip${budget === b ? ' selected' : ''}`}
                      onClick={() => setBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Tell us about your project</label>
                <textarea id="message" name="message" className="form-textarea" placeholder="What's the story? What do you need? What's the timeline? The more context you give us, the more useful our response will be." value={form.message} onChange={handleChange} />
              </div>

              <div>
                <button type="submit" className="submit-btn">Send it →</button>
                <p className="form-note">We respond within 48 hours. No spam, ever.</p>
              </div>
            </form>
          )}
        </FadeUp>
      </div>

      <FooterMinimal copy="© 2025 EskeeWalker Strategies · Jaipur, India" />
    </>
  )
}
