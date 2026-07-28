import { motion, AnimatePresence } from 'framer-motion'
import './ProjectModal.css'

interface Props {
  project: {
    title: string
    details: string
    detailsEn: string
    tags: string[]
  }
  onClose: () => void
  lang: 'fr' | 'en' | 'es'
}

export default function ProjectModal({ project, onClose, lang }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <button className="modal-close" onClick={onClose}>
            x
          </button>
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-details">
            {lang === 'fr' ? project.details : project.detailsEn}
          </p>
          <div className="modal-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="modal-tag">{tag}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
