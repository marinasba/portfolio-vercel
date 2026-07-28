import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import { projectsFr, projectsEn, projectsEs, categoriesFr, categoriesEn, categoriesEs } from '../data/projects'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { lang } = useLang()
  const items = lang === 'fr' ? projectsFr : lang === 'es' ? projectsEs : projectsEn
  const categories = lang === 'fr' ? categoriesFr : lang === 'es' ? categoriesEs : categoriesEn
  const project = items.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="project-detail-section">
        <div className="container">
          <p className="project-not-found">
            {lang === 'fr' ? 'Projet introuvable.' : lang === 'es' ? 'Proyecto no encontrado.' : 'Project not found.'}
          </p>
          <button className="back-btn" onClick={() => navigate('/projets')}>
            {lang === 'fr' ? '← Retour aux projets' : lang === 'es' ? '← Volver a los proyectos' : '← Back to projects'}
          </button>
        </div>
      </section>
    )
  }

  const linksBlock = project.links && project.links.length > 0 && (
    <div className="project-detail-links">
      {project.links.map((link) => {
        const isAppStore = link.url.includes('apps.apple.com')
        if (isAppStore) {
          return (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="app-store-badge"
            >
              <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="app-store-badge-text">
                <span className="app-store-badge-small">{lang === 'fr' ? 'Télécharger dans' : lang === 'es' ? 'Descargar en' : 'Download on the'}</span>
                <span className="app-store-badge-big">{lang === 'fr' ? 'l\'App Store' : 'App Store'}</span>
              </div>
            </a>
          )
        }
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="web-link-btn"
            style={{ borderColor: project.borderColor, color: project.borderColor }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>{lang === 'fr' ? 'Voir en ligne' : lang === 'es' ? 'Ver en línea' : 'View live'}</span>
          </a>
        )
      })}
    </div>
  )

  const tagsBlock = (
    <div className="project-detail-tags">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="project-detail-tag"
          style={{
            borderColor: `${project.borderColor}33`,
            color: project.borderColor,
            background: `${project.borderColor}0d`,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )

  const categoryBadge = (
    <span
      className="project-detail-category"
      style={{ borderColor: project.borderColor, color: project.borderColor }}
    >
      {categories[project.category]}
    </span>
  )

  return (
    <section className="project-detail-section">
      <div className="container">
        <motion.button
          className="back-btn"
          onClick={() => navigate('/projets')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {lang === 'fr' ? '← Retour aux projets' : lang === 'es' ? '← Volver a los proyectos' : '← Back to projects'}
        </motion.button>

        {project.sections && project.sections.length > 0 ? (
          <>
            <motion.div
              className="project-detail-hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {categoryBadge}
              <h1 className="project-detail-title">{project.title}</h1>
              {project.subtitle && (
                <p className="project-detail-subtitle">{project.subtitle}</p>
              )}
              {project.description && (
                <p className="project-detail-description">{project.description}</p>
              )}
              {tagsBlock}
              {linksBlock}
            </motion.div>

            <div className="project-sections">
              {project.sections.map((s, i) => (
                <motion.div
                  key={i}
                  className="project-section"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                >
                  {s.heading && <h3 className="project-section-heading">{s.heading}</h3>}
                  {s.text && <p className="project-section-text">{s.text}</p>}
                  {s.download && (
                    <a
                      href={s.download}
                      download
                      className="project-section-download"
                      style={{ borderColor: project.borderColor, color: project.borderColor }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>{lang === 'fr' ? 'Télécharger le PDF' : lang === 'es' ? 'Descargar el PDF' : 'Download the PDF'}</span>
                    </a>
                  )}
                  {(() => {
                    const imgs: string[] = []
                    if (s.image) imgs.push(s.image)
                    if (s.secondaryImage) imgs.push(s.secondaryImage)
                    if (s.extraImages) imgs.push(...s.extraImages)
                    if (imgs.length === 0) return null
                    if (imgs.length === 1) {
                      return (
                        <img
                          src={imgs[0]}
                          alt=""
                          className={`project-section-image${s.small ? ' project-section-image-small' : ''}${s.lightBg ? ' project-section-image-light' : ''}`}
                          loading="lazy"
                        />
                      )
                    }
                    return (
                      <div className={s.scrollable ? 'project-section-image-scroll' : 'project-section-image-row'}>
                        {imgs.map((src, idx) => (
                          <img
                            key={idx}
                            src={src}
                            alt=""
                            className={`project-section-image${s.lightBg ? ' project-section-image-light' : ''}`}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )
                  })()}
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="project-detail-content">
            <motion.div
              className={`project-detail-image${project.mockup ? ' project-detail-mockup' : ''}`}
              style={{
                '--border-color': project.borderColor,
                '--gradient': project.gradient,
              } as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={project.mockup ?? project.image} alt={project.title} />
            </motion.div>

            <motion.div
              className="project-detail-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {categoryBadge}
              <h1 className="project-detail-title">{project.title}</h1>
              <p className="project-detail-description">{project.description}</p>
              {tagsBlock}
              {linksBlock}
            </motion.div>
          </div>
        )}

        {project.video && (
          <motion.div
            className="project-video"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="project-screenshots-title">
              {lang === 'fr' ? 'Exemple de mini vidéo' : lang === 'es' ? 'Ejemplo de mini vídeo' : 'Mini video example'}
            </h2>
            <video
              src={project.video}
              controls
              loop
              muted
              playsInline
              preload="metadata"
            />
          </motion.div>
        )}

        {!project.sections && project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            className="project-screenshots"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="project-screenshots-title">
              {lang === 'fr' ? 'Captures d\'écran' : lang === 'es' ? 'Capturas de pantalla' : 'Screenshots'}
            </h2>
            <div className="project-screenshots-grid">
              {project.screenshots.map((src, i) => (
                <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
