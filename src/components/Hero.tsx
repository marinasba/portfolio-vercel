import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import Antigravity from './Antigravity'
import StarBorder from './StarBorder'
import './Hero.css'

export default function Hero() {
  const { lang } = useLang()

  return (
    <section className="hero-section" id="accueil">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Antigravity
          count={200}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.3}
          waveAmplitude={0.8}
          particleSize={1.2}
          lerpSpeed={0.05}
          color={'#4fd1c5'}
          autoAnimate={true}
          particleVariance={0.8}
        />
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.span
          className="hero-label"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          PORTFOLIO
        </motion.span>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {lang === 'fr'
            ? "Bonjour, je m'appelle Marina Nowicki"
            : lang === 'es'
            ? 'Hola, soy Marina Nowicki'
            : "Hi, I'm Marina Nowicki"}
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {lang === 'fr'
            ? "Je conçois et développe des outils qui simplifient le quotidien personnel et professionnel : automatisation de tâches chronophages, fluidification des process... Ainsi, l'humain se concentre sur ce qui compte vraiment."
            : lang === 'es'
            ? 'Diseño y desarrollo herramientas que simplifican el día a día, personal y profesional: automatización de tareas que consumen tiempo, fluidificación de procesos... Así, el humano se concentra en lo que realmente importa.'
            : 'I design and build tools that simplify everyday life, both personal and professional: automating time-consuming tasks, streamlining processes... So humans can focus on what really matters.'}
        </motion.p>

        <motion.div
          className="hero-tags"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <StarBorder as="span" color="#5eead4" speed="6s" className="hero-tag teal">
            {lang === 'fr' ? 'Développement web et mobile' : lang === 'es' ? 'Desarrollo web y móvil' : 'Web & Mobile Development'}
          </StarBorder>
          <StarBorder as="span" color="#f472b6" speed="6s" className="hero-tag pink">
            {lang === 'fr' ? 'UX Design' : lang === 'es' ? 'Diseño UX' : 'UX Design'}
          </StarBorder>
          <StarBorder as="span" color="#a78bfa" speed="6s" className="hero-tag purple">
            {lang === 'fr' ? 'Analyse de données' : lang === 'es' ? 'Análisis de datos' : 'Data Analysis'}
          </StarBorder>
          <StarBorder as="span" color="#fb923c" speed="6s" className="hero-tag orange">
            {lang === 'fr' ? 'Neurosciences et psychologie cognitive' : lang === 'es' ? 'Neurociencia y psicología cognitiva' : 'Neuroscience & Cognitive Psychology'}
          </StarBorder>
          <StarBorder as="span" color="#60a5fa" speed="6s" className="hero-tag blue">
            {lang === 'fr' ? 'Ingénierie pédagogique' : lang === 'es' ? 'Ingeniería pedagógica' : 'Instructional Design'}
          </StarBorder>
        </motion.div>
      </motion.div>
    </section>
  )
}
