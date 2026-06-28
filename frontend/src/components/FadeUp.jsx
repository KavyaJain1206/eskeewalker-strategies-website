import useFadeUp from '../hooks/useFadeUp'

export default function FadeUp({ children, className = '', style }) {
  const ref = useFadeUp()
  return (
    <div ref={ref} className={`fade-up ${className}`} style={style}>
      {children}
    </div>
  )
}
