import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'
import './Testimonials.css'

const testimonialsFr = [
  {
    text: 'Je travaille dans la vente aux enchères et je recevais des documents Word de plusieurs centaines de pages contenant le détail de chaque livre que nous allions vendre. Je devais MANUELLEMENT convertir tout ça en document Excel structuré avec des colonnes, mettre le nom de famille en majuscule, etc. Vu la longueur du document j\'y passais des jours entiers et mes collègues aussi. Marina m\'a créé un outil qui fait ça en quelques secondes, automatiquement et sans aucune erreur (sur un document aussi long, on a vite fait de sauter une ligne). C\'est un soulagement énorme, je ne pensais pas que c\'était possible, on a toujours fait ça à la main avant.',
    author: 'Séphora',
    role: 'Clerc de commissaire-priseur',
    projectSlug: 'nettoyeur-de-catalogue',
  },
]

const testimonialsEn = [
  {
    text: 'I work in auctions and used to receive Word documents of several hundred pages describing every book we were going to sell. I had to MANUALLY convert all that into a structured Excel file with columns, put the last name in uppercase, and so on. Given the length of the document, I spent whole days on it, and so did my colleagues. Marina built me a tool that does it in seconds, automatically and with zero errors (on such a long document, it\'s easy to skip a line). It\'s a huge relief. I didn\'t think it was possible, we had always done it by hand.',
    author: 'Séphora',
    role: 'Auctioneer\'s clerk',
    projectSlug: 'nettoyeur-de-catalogue',
  },
]

const testimonialsEs = [
  {
    text: 'Trabajo en subastas y recibía documentos Word de varios cientos de páginas con el detalle de cada libro que íbamos a vender. Tenía que convertirlo todo MANUALMENTE a Excel estructurado en columnas, poner el apellido en mayúsculas, etc. Con la longitud del documento, pasaba días enteros haciéndolo, y mis compañeros también. Marina me creó una herramienta que lo hace en segundos, automáticamente y sin ningún error (en un documento tan largo, es fácil saltarse una línea). Es un alivio enorme. No pensaba que fuera posible, siempre lo habíamos hecho a mano.',
    author: 'Séphora',
    role: 'Auxiliar de subastas',
    projectSlug: 'nettoyeur-de-catalogue',
  },
]

export default function Testimonials() {
  const { lang } = useLang()
  const testimonials = lang === 'fr' ? testimonialsFr : lang === 'es' ? testimonialsEs : testimonialsEn

  return (
    <section className="testimonials-section" id="temoignages">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'fr' ? 'Témoignages' : lang === 'es' ? 'Testimonios' : 'Testimonials'}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === 'fr'
            ? "Ce que disent les personnes avec qui j'ai travaillé."
            : lang === 'es'
            ? 'Lo que dicen las personas con las que he trabajado.'
            : "What people I've worked with have to say."}
        </motion.p>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">{t.author}</div>
              <div className="testimonial-role">{t.role}</div>
              {t.projectSlug && (
                <Link to={`/projets/${t.projectSlug}`} className="testimonial-cta">
                  {lang === 'fr' ? 'Voir le projet' : lang === 'es' ? 'Ver el proyecto' : 'View project'}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
