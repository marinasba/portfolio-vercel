import { useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)

  const runTransition = useCallback(() => {
    const canvas = canvasRef.current
    const content = contentRef.current
    if (!canvas || !content) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    cancelAnimationFrame(animRef.current)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cx = canvas.width / 2
    const cy = canvas.height / 2

    // Petits points lumineux, pas des traits
    const dots: { angle: number; dist: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 40; i++) {
      dots.push({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 60 + 10,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      })
    }

    content.style.transition = 'none'
    const startTime = performance.now()
    const duration = 700

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fondu du contenu : doux, jamais en dessous de 0.3
      let contentOpacity: number
      if (progress < 0.35) {
        contentOpacity = 1 - (progress / 0.35) * 0.7
      } else if (progress < 0.5) {
        contentOpacity = 0.3
      } else {
        contentOpacity = 0.3 + ((progress - 0.5) / 0.5) * 0.7
      }
      content.style.opacity = String(contentOpacity)

      // Points qui dérivent doucement vers l'extérieur
      const drift = progress * progress * 300
      const dotFade = progress < 0.2
        ? progress / 0.2
        : progress > 0.7
          ? (1 - progress) / 0.3
          : 1

      for (const dot of dots) {
        const d = dot.dist + drift
        const x = cx + Math.cos(dot.angle) * d
        const y = cy + Math.sin(dot.angle) * d

        ctx.beginPath()
        ctx.arc(x, y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79, 209, 197, ${dot.opacity * dotFade})`
        ctx.fill()
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        content.style.opacity = '1'
        content.style.transition = ''
      }
    }

    animRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (location.pathname === prevPath.current) return
    prevPath.current = location.pathname
    runTransition()
  }, [location.pathname, runTransition])

  return (
    <>
      <canvas ref={canvasRef} className="warp-canvas" />
      <div ref={contentRef} className="page-content">
        {children}
      </div>
    </>
  )
}
