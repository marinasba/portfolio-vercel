import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang, type Lang } from '../LanguageContext'
import './Navbar.css'

const linksFr = [
  { label: 'Projets', to: '/projets' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Compétences', to: '/competences' },
  { label: 'Parcours', to: '/parcours' },
  { label: 'Témoignages', to: '/temoignages' },
  { label: 'Contact', to: '/contact' },
]

const linksEn = [
  { label: 'Projects', to: '/projets' },
  { label: 'About', to: '/a-propos' },
  { label: 'Skills', to: '/competences' },
  { label: 'Experience', to: '/parcours' },
  { label: 'Testimonials', to: '/temoignages' },
  { label: 'Contact', to: '/contact' },
]

const linksEs = [
  { label: 'Proyectos', to: '/projets' },
  { label: 'Sobre mí', to: '/a-propos' },
  { label: 'Habilidades', to: '/competences' },
  { label: 'Trayectoria', to: '/parcours' },
  { label: 'Testimonios', to: '/temoignages' },
  { label: 'Contacto', to: '/contact' },
]

const FLAGS: Record<Lang, string> = { fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸' }
const NAMES: Record<Lang, string> = { fr: 'Français', en: 'English', es: 'Español' }
const ALL_LANGS: Lang[] = ['fr', 'en', 'es']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { lang, setLang } = useLang()
  const links = lang === 'fr' ? linksFr : lang === 'es' ? linksEs : linksEn
  const langRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!langOpen) return
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [langOpen])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <NavLink to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
        MN
      </NavLink>

      <button
        className="navbar-burger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} className="cursor-target" onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
          </li>
        ))}
      </ul>

      <div className="lang-switcher" ref={langRef}>
        <button
          className="lang-toggle"
          onClick={() => setLangOpen((o) => !o)}
          aria-label="Switch language"
          aria-expanded={langOpen}
        >
          {FLAGS[lang]}
        </button>
        {langOpen && (
          <ul className="lang-menu">
            {ALL_LANGS.map((l) => (
              <li key={l}>
                <button
                  className={`lang-option${l === lang ? ' active' : ''}`}
                  onClick={() => {
                    setLang(l)
                    setLangOpen(false)
                  }}
                >
                  <span className="lang-option-flag">{FLAGS[l]}</span>
                  <span className="lang-option-name">{NAMES[l]}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
