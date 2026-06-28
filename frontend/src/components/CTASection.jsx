import { Link } from 'react-router-dom'

export default function CTASection({ heading, subtext, btnText = 'Start a conversation →', btnTo = '/contact' }) {
  return (
    <section className="cta-section">
      <h2 dangerouslySetInnerHTML={{ __html: heading }} />
      <p>{subtext}</p>
      <Link to={btnTo} className="btn-dark">{btnText}</Link>
    </section>
  )
}
