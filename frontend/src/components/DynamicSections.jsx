import { useState, useEffect } from 'react'
import FadeUp from './FadeUp'

export default function DynamicSections({ pageName, excludeKeys = [] }) {
  const [sections, setSections] = useState([])

  useEffect(() => {
    fetch(`/api/pages/${pageName}`)
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => {
        if (data._sections) {
          const custom = data._sections.filter(s => !excludeKeys.includes(s.section_key))
          setSections(custom)
        }
      })
      .catch(() => {})
  }, [pageName])

  return (
    <>
      {sections.map(sec => {
        const c = sec.content
        
        // 1. TEXT TYPE
        if (c.type === 'text') {
          return (
            <FadeUp key={sec.id} className="coming-soon-strip" style={{ margin: '6rem 3rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '4rem 3rem', textAlign: 'left', display: 'block' }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>{c.title}</h2>
              {c.subtitle && (
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
                  {c.subtitle.split(/\r?\n|\\n/).map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx < c.subtitle.split(/\r?\n|\\n/).length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </FadeUp>
          )
        }
        
        // 2. IMAGE TYPE (supports alignments: media-left, media-right, media-top)
        if (c.type === 'image') {
          const layout = c.layout || 'media-right'
          return (
            <FadeUp key={sec.id} className={`dyn-section-wrap ${layout}`}>
              <div className="dyn-text-col">
                <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>{c.title}</h2>
                {c.subtitle && (
                  <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {c.subtitle.split(/\r?\n|\\n/).map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < c.subtitle.split(/\r?\n|\\n/).length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              <div className="dyn-media-col">
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={c.url} alt={c.alt || 'Dynamic'} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            </FadeUp>
          )
        }
        
        // 3. VIDEO TYPE (supports alignments and direct video uploads)
        if (c.type === 'video') {
          const layout = c.layout || 'media-right'
          const isEmbed = c.video_url.includes('youtube') || c.video_url.includes('vimeo') || c.video_url.includes('embed')
          return (
            <FadeUp key={sec.id} className={`dyn-section-wrap ${layout}`}>
              <div className="dyn-text-col">
                <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>{c.title}</h2>
                {c.description && (
                  <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {c.description.split(/\r?\n|\\n/).map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < c.description.split(/\r?\n|\\n/).length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              <div className="dyn-media-col">
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  {isEmbed ? (
                    <iframe 
                      src={c.video_url} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video 
                      src={c.video_url} 
                      controls 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
              </div>
            </FadeUp>
          )
        }

        // 4. GRID TYPE (e.g. Team Grid / Members)
        if (c.type === 'grid') {
          return (
            <FadeUp key={sec.id} className="coming-soon-strip" style={{ margin: '6rem 3rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '4rem 3rem', display: 'block', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>{c.title}</h2>
              {c.description && <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2rem' }}>{c.description}</p>}
              
              <div className="dyn-grid-container">
                {(c.items || []).map((item, itemIdx) => (
                  <div key={item.id || itemIdx} className="dyn-grid-card">
                    {item.url && <img src={item.url} alt={item.title} className="dyn-grid-img" loading="lazy" decoding="async" />}
                    <div className="dyn-grid-title">{item.title}</div>
                    {item.subtitle && <div className="dyn-grid-subtitle">{item.subtitle}</div>}
                    {item.description && <div className="dyn-grid-desc">{item.description}</div>}
                  </div>
                ))}
              </div>
            </FadeUp>
          )
        }
        
        return null
      })}
    </>
  )
}
