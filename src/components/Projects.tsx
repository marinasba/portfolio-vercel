import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LanguageContext'
import { projectsFr, projectsEn, projectsEs, categoriesFr, categoriesEn, categoriesEs } from '../data/projects'
import type { Category } from '../data/projects'
import ChromaGrid from './ChromaGrid'
import './Projects.css'

export default function Projects() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const items = lang === 'fr' ? projectsFr : lang === 'es' ? projectsEs : projectsEn
  const categories = lang === 'fr' ? categoriesFr : lang === 'es' ? categoriesEs : categoriesEn

  const filtered = activeCategory === 'all'
    ? items
    : items.filter((p) => p.category === activeCategory)

  return (
    <section className="projects-section" id="projets">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'fr' ? 'Projets' : lang === 'es' ? 'Proyectos' : 'Projects'}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === 'fr'
            ? "Une sélection de projets sur lesquels j'ai travaillé."
            : lang === 'es'
            ? 'Una selección de proyectos en los que he trabajado.'
            : "A selection of projects I've worked on."}
        </motion.p>

        <motion.div
          className="projects-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {(Object.keys(categories) as Category[]).map((cat) => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categories[cat]}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ChromaGrid
                items={filtered}
                onItemClick={(index) => navigate(`/projets/${filtered[index].slug}`)}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
