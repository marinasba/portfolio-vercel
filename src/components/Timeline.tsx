import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import './Timeline.css'

const itemsFr = [
  {
    date: '2024 - 2026',
    title: 'Master Sciences Cognitives — IDMC de Nancy',
    desc: 'Parcours Expériences du Numérique. Formation en UI/UX design, intelligence artificielle, neurosciences et programmation. Alternance chez Gariguettes.',
  },
  {
    date: '2021 - 2024',
    title: 'Licence de Psychologie — Université de Lille',
    desc: 'Mémoire de L3 portant sur l\'influence de la musique sur le traitement des émotions.',
  },
  {
    date: '2020',
    title: 'Auto-entrepreneure',
    desc: '',
  },
  {
    date: '2016 - 2020',
    title: 'Salariée',
    desc: '',
  },
  {
    date: '2016',
    title: 'Baccalauréat scientifique',
    desc: '',
  },
]

const itemsEn = [
  {
    date: '2024 - 2026',
    title: 'MSc Cognitive Sciences, IDMC Nancy',
    desc: 'Digital Experiences track. Coursework in UI/UX design, artificial intelligence, neuroscience, and programming. Work-study at Gariguettes.',
  },
  {
    date: '2021 - 2024',
    title: 'BSc Psychology, University of Lille',
    desc: 'Bachelor\'s thesis on the influence of music on emotional processing.',
  },
  {
    date: '2020',
    title: 'Self-employed entrepreneur',
    desc: '',
  },
  {
    date: '2016 - 2020',
    title: 'Employee',
    desc: '',
  },
  {
    date: '2016',
    title: 'Scientific Baccalaureate',
    desc: '',
  },
]

const itemsEs = [
  {
    date: '2024 - 2026',
    title: 'Máster en Ciencias Cognitivas, IDMC Nancy',
    desc: 'Itinerario Experiencias Digitales. Formación en diseño UI/UX, inteligencia artificial, neurociencias y programación. Alternancia en Gariguettes.',
  },
  {
    date: '2021 - 2024',
    title: 'Licenciatura en Psicología, Universidad de Lille',
    desc: 'Tesina de grado sobre la influencia de la música en el procesamiento de las emociones.',
  },
  {
    date: '2020',
    title: 'Autónoma',
    desc: '',
  },
  {
    date: '2016 - 2020',
    title: 'Trabajadora asalariada',
    desc: '',
  },
  {
    date: '2016',
    title: 'Bachillerato científico',
    desc: '',
  },
]

export default function Timeline() {
  const { lang } = useLang()
  const items = lang === 'fr' ? itemsFr : lang === 'es' ? itemsEs : itemsEn

  return (
    <section className="timeline-section" id="parcours">
      <div className="container">
        <motion.h2
          className="section-title"
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'fr' ? 'Parcours' : lang === 'es' ? 'Trayectoria' : 'Experience'}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          style={{ textAlign: 'center', margin: '0 auto 3rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === 'fr'
            ? 'Les étapes clés de mon parcours.'
            : lang === 'es'
            ? 'Las etapas clave de mi trayectoria.'
            : 'Key milestones in my journey.'}
        </motion.p>

        <div className="timeline">
          {items.map((item, i) => (
            <motion.div
              key={item.date}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-date">{item.date}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
