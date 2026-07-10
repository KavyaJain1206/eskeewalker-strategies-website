import { useState } from 'react'

export default function ResponsiveImage({ mobile, laptop, pc, alt = '', className = '', loading = 'lazy', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobile} />
      <source media="(max-width: 1439px)" srcSet={laptop} />
      <img
        src={pc}
        alt={alt}
        className={`media-fade${loaded ? ' loaded' : ''}${className ? ' ' + className : ''}`}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </picture>
  )
}
