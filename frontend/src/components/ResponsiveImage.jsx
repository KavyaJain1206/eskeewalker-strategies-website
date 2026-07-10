export default function ResponsiveImage({ mobile, laptop, pc, alt = '', className, loading = 'lazy', ...rest }) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobile} />
      <source media="(max-width: 1439px)" srcSet={laptop} />
      <img src={pc} alt={alt} className={className} loading={loading} decoding="async" {...rest} />
    </picture>
  )
}
