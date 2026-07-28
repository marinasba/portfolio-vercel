// @ts-nocheck
import { useEffect, useRef } from 'react'
import './ChromaGrid.css'

interface ChromaGridItem {
  image: string
  title: string
  subtitle: string
  url?: string
  borderColor?: string
  gradient?: string
}

interface ChromaGridProps {
  items: ChromaGridItem[]
  onItemClick?: (index: number) => void
}

function ChromaGrid({ items, onItemClick }: ChromaGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.chroma-card')

    function handleMouseMove(e: MouseEvent) {
      cards.forEach((card: Element) => {
        const rect = (card as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}px`)
        ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}px`)
      })
    }

    grid.addEventListener('mousemove', handleMouseMove)
    return () => grid.removeEventListener('mousemove', handleMouseMove)
  }, [items])

  return (
    <div className="chroma-grid" ref={gridRef}>
      {items.map((item, index) => (
        <div
          className="chroma-card"
          key={index}
          style={{
            '--border-color': item.borderColor || '#5eead4',
            '--gradient': item.gradient || 'linear-gradient(135deg, rgba(94,234,212,0.15), rgba(167,139,250,0.15))',
          } as React.CSSProperties}
          onClick={() => onItemClick ? onItemClick(index) : item.url && window.open(item.url, '_blank')}
        >
          <div className="chroma-card-border" />
          <div className="chroma-card-content">
            <div className="chroma-card-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="chroma-card-info">
              <h3 className="chroma-card-title">{item.title}</h3>
              <p className="chroma-card-subtitle">{item.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChromaGrid
