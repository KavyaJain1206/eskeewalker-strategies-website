import { useState } from 'react'
import FadeUp from '../components/FadeUp'
import { FooterMinimal } from '../components/Footer'
import ResponsiveImage from '../components/ResponsiveImage'
import heroPc from '../assets/pc/things-we-ve-made-movie.webp'
import heroLaptop from '../assets/laptop/things-we-ve-made-movie.webp'
import heroMobile from '../assets/mobile/things-we-ve-made-movie.webp'
import dramaPc from '../assets/pc/drama-production-ai-microdrama-brand-story.webp'
import dramaLaptop from '../assets/laptop/drama-production-ai-microdrama-brand-story.webp'
import dramaMobile from '../assets/mobile/drama-production.webp'
import ugcPc from '../assets/pc/ugc-campaign-client-social-campaign.webp'
import ugcLaptop from '../assets/laptop/ugc-campaign-client-social-campaign.webp'
import ugcMobile from '../assets/mobile/ugc-campaign.webp'
import esgPc from '../assets/pc/esg-annual-report-animated-visual-story.webp'
import esgLaptop from '../assets/laptop/esg-annual-report-animated-visual-story.webp'
import esgMobile from '../assets/mobile/esg-annual-report-animated-visual-story.webp'
import adPc from '../assets/pc/performance-ad-30-sec-cut.webp'
import adLaptop from '../assets/laptop/performance-ad-30-sec-cut.webp'
import adMobile from '../assets/mobile/performance-ad-30-sec-cut.webp'
import founderPc from '../assets/pc/founder-story-talking-head-series.webp'
import founderLaptop from '../assets/laptop/founder-story-talking-head-series.webp'
import founderMobile from '../assets/mobile/founder-story-talking-head-series.webp'
import characterPc from '../assets/pc/ai-animation-brand-character-design.webp'
import characterLaptop from '../assets/laptop/ai-animation-brand-character-design.webp'
import characterMobile from '../assets/mobile/ai-animation.webp'
import netZeroPc from '../assets/pc/net-zero-pledge-visual-campaign.webp'
import netZeroLaptop from '../assets/laptop/net-zero-pledge-visual-campaign.webp'
import netZeroMobile from '../assets/mobile/net-zero-pledge-visual-campaign.webp'

const workItems = [
  {
    id: 1, cat: 'drama', size: 'large',
    img: { pc: dramaPc, laptop: dramaLaptop, mobile: dramaMobile },
    alt: 'AI Drama Production', label: 'Case Study', featured: true,
    workCat: 'Drama Production', title: 'AI Microdrama Series — Brand Origin Story',
    badges: ['3-part series', 'Social-first'],
  },
  {
    id: 2, cat: 'ugc', size: 'medium',
    img: { pc: ugcPc, laptop: ugcLaptop, mobile: ugcMobile },
    alt: 'UGC Campaign', label: 'UGC',
    workCat: 'UGC Campaign', title: 'Social Content — Product Launch',
    badges: ['Instagram Reels'],
  },
  {
    id: 3, cat: 'sustainability', size: 'half',
    img: { pc: esgPc, laptop: esgLaptop, mobile: esgMobile },
    alt: 'Sustainability Story', label: 'Sustainability',
    workCat: 'Sustainability Communication', title: 'ESG Annual Report — Animated Visual Story',
    badges: ['w/ Climate Decode', '2 min video'],
  },
  {
    id: 4, cat: 'ads', size: 'half',
    img: { pc: adPc, laptop: adLaptop, mobile: adMobile },
    alt: 'AI Advertisement', label: 'AI Ads',
    workCat: 'AI Advertisement', title: 'Performance Ad — 30 sec cut',
    badges: ['Meta / YouTube'],
  },
  {
    id: 5, cat: 'ugc', size: 'third',
    img: { pc: founderPc, laptop: founderLaptop, mobile: founderMobile },
    alt: 'Founder Story UGC', label: 'UGC',
    workCat: 'UGC', title: 'Founder Story — Talking Head Series',
    badges: ['LinkedIn'],
  },
  {
    id: 6, cat: 'drama', size: 'third',
    img: { pc: characterPc, laptop: characterLaptop, mobile: characterMobile },
    alt: 'AI Animation Character', label: 'Drama',
    workCat: 'AI Animation', title: 'Brand Character — AI Animation',
    badges: ['Character design'],
  },
  {
    id: 7, cat: 'sustainability', size: 'third',
    img: { pc: netZeroPc, laptop: netZeroLaptop, mobile: netZeroMobile },
    alt: 'Climate Campaign', label: 'Sustainability',
    workCat: 'Climate Campaign', title: 'Net Zero Pledge — Visual Campaign',
    badges: ['w/ Climate Decode'],
  },
]

const filters = ['all', 'drama', 'ugc', 'ads', 'sustainability']
const filterLabels = { all: 'All', drama: 'Drama', ugc: 'UGC', ads: 'AI Ads', sustainability: 'Sustainability' }

export default function Work() {
  const [active, setActive] = useState('all')

  const visible = workItems.filter(item => active === 'all' || item.cat === active)

  return (
    <>
      <FadeUp className="page-hero">
        <div className="page-hero-text">
          <div className="page-tag">Selected Work</div>
          <h1 className="compact">Things we've<br />made move.</h1>
          <p>Case studies, campaigns, social content, and sustainability stories — built with AI, shaped by humans.</p>
        </div>
        <div className="page-hero-media">
          <ResponsiveImage pc={heroPc} laptop={heroLaptop} mobile={heroMobile} alt="" loading="eager" />
        </div>
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
              <ResponsiveImage pc={item.img.pc} laptop={item.img.laptop} mobile={item.img.mobile} alt={item.alt} loading={idx < 2 ? 'eager' : 'lazy'} />
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
