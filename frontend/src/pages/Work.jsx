import { useState, useEffect } from 'react'
import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'
import heroImg from '../assets/images/work-hero.jpg'
import dramaMicrodramaImg from '../assets/images/work-item-drama-microdrama.jpg'
import ugcSocialImg from '../assets/images/work-item-ugc-social.jpg'
import sustainabilityEsgImg from '../assets/images/work-item-sustainability-esg.jpg'
import adsImg from '../assets/images/work-item-ads.jpg'
import ugcFounderImg from '../assets/images/work-item-ugc-founder.jpg'
import dramaCharacterImg from '../assets/images/work-item-drama-character.jpg'
import sustainabilityNetZeroImg from '../assets/images/work-item-sustainability-netzero.jpg'

const workItems = [
  {
    id: 1, cat: 'drama', size: 'large',
    img: dramaMicrodramaImg,
    alt: 'AI Drama Production', label: 'Case Study', featured: true,
    workCat: 'Drama Production', title: 'AI Microdrama Series — Brand Origin Story',
    badges: ['3-part series', 'Social-first'],
  },
  {
    id: 2, cat: 'ugc', size: 'medium',
    img: ugcSocialImg,
    alt: 'UGC Campaign', label: 'UGC',
    workCat: 'UGC Campaign', title: 'Social Content — Product Launch',
    badges: ['Instagram Reels'],
  },
  {
    id: 3, cat: 'sustainability', size: 'half',
    img: sustainabilityEsgImg,
    alt: 'Sustainability Story', label: 'Sustainability',
    workCat: 'Sustainability Communication', title: 'ESG Annual Report — Animated Visual Story',
    badges: ['w/ Climate Decode', '2 min video'],
  },
  {
    id: 4, cat: 'ads', size: 'half',
    img: adsImg,
    alt: 'AI Advertisement', label: 'AI Ads',
    workCat: 'AI Advertisement', title: 'Performance Ad — 30 sec cut',
    badges: ['Meta / YouTube'],
  },
  {
    id: 5, cat: 'ugc', size: 'third',
    img: ugcFounderImg,
    alt: 'Founder Story UGC', label: 'UGC',
    workCat: 'UGC', title: 'Founder Story — Talking Head Series',
    badges: ['LinkedIn'],
  },
  {
    id: 6, cat: 'drama', size: 'third',
    img: dramaCharacterImg,
    alt: 'AI Animation Character', label: 'Drama',
    workCat: 'AI Animation', title: 'Brand Character — AI Animation',
    badges: ['Character design'],
  },
  {
    id: 7, cat: 'sustainability', size: 'third',
    img: sustainabilityNetZeroImg,
    alt: 'Climate Campaign', label: 'Sustainability',
    workCat: 'Climate Campaign', title: 'Net Zero Pledge — Visual Campaign',
    badges: ['w/ Climate Decode'],
  },
]

const filters = ['all', 'drama', 'ugc', 'ads', 'sustainability']
const filterLabels = { all: 'All', drama: 'Drama', ugc: 'UGC', ads: 'AI Ads', sustainability: 'Sustainability' }

export default function Work() {
  const [active, setActive] = useState('all')
  const [items, setItems] = useState(workItems)

  useEffect(() => {
    fetch('/api/work')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        if (data && data.length > 0) {
          setItems(data)
        }
      })
      .catch(err => console.log('CMS fetch failed, using fallback static data:', err))
  }, [])

  const visible = items.filter(item => active === 'all' || item.cat === active)

  return (
    <>
      <FadeUp className="page-hero">
        <img className="hero-bg-img" src={heroImg} alt="" loading="eager" decoding="async" />
        <div className="page-tag">Selected Work</div>
        <h1>Things we've<br />made move.</h1>
        <p>Case studies, campaigns, social content, and sustainability stories — built with AI, shaped by humans.</p>
      </FadeUp>

      <FadeUp className="filters">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn${active === f ? ' active' : ''}`}
            onClick={() => setActive(f)}
          >
            {filterLabels[f]}
          </button>
        ))}
      </FadeUp>

      <FadeUp className="work-grid-full">
        {visible.map((item, idx) => (
          <div key={item.id} className={`work-item-full ${item.size}`}>
            <div className="work-thumb">
              <img src={item.img} alt={item.alt} loading={idx === 0 ? 'eager' : 'lazy'} decoding="async" />
            </div>
            <div className="work-play">▶</div>
            <div className={`case-label${item.featured ? ' featured' : ''}`}>{item.label}</div>
            <div className="work-overlay-full">
              <div className="work-cat">{item.workCat}</div>
              <div className="work-title">{item.title}</div>
              <div className="work-meta">
                {item.badges.map((b, i) => <span key={i} className="work-badge">{b}</span>)}
              </div>
            </div>
          </div>
        ))}
      </FadeUp>

      <FadeUp className="coming-soon-strip">
        <p>More case studies landing soon. <span>Follow our journey on Instagram →</span></p>
      </FadeUp>

      <FooterMinimal />
    </>
  )
}
