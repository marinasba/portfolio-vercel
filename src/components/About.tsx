import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import StarBorder from './StarBorder'
import Moodboard from './Moodboard'
import './About.css'

const languagesFr = [
  { name: 'Français', level: 'Natif', flag: '🇫🇷' },
  { name: 'Anglais', level: 'C1 · TOEIC 980/990', flag: '🇬🇧' },
  { name: 'Espagnol', level: 'A2', flag: '🇪🇸' },
  { name: 'Arabe', level: 'Débutante', flag: '🇸🇦' },
]

const languagesEn = [
  { name: 'French', level: 'Native', flag: '🇫🇷' },
  { name: 'English', level: 'C1 · TOEIC 980/990', flag: '🇬🇧' },
  { name: 'Spanish', level: 'A2', flag: '🇪🇸' },
  { name: 'Arabic', level: 'Beginner', flag: '🇸🇦' },
]

const languagesEs = [
  { name: 'Francés', level: 'Nativo', flag: '🇫🇷' },
  { name: 'Inglés', level: 'C1 · TOEIC 980/990', flag: '🇬🇧' },
  { name: 'Español', level: 'A2', flag: '🇪🇸' },
  { name: 'Árabe', level: 'Principiante', flag: '🇸🇦' },
]

export default function About() {
  const { lang } = useLang()
  const languages = lang === 'fr' ? languagesFr : lang === 'es' ? languagesEs : languagesEn

  return (
    <>
    <section className="about-section" id="a-propos">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'fr' ? 'À propos' : lang === 'es' ? 'Sobre mí' : 'About'}
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-photo"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {lang === 'fr' ? 'Photo à venir' : lang === 'es' ? 'Foto próximamente' : 'Photo coming soon'}
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>{lang === 'fr' ? 'Bonjour, je suis Marina Nowicki' : lang === 'es' ? 'Hola, soy Marina Nowicki' : "Hi, I'm Marina Nowicki"}</h3>
            <p className="pronunciation"><em>{lang === 'fr' ? 'ça se prononce no-vi-tski' : lang === 'es' ? 'se pronuncia no-vi-tski' : "it's pronounced no-vi-tski"}</em></p>
            <p>
              {lang === 'fr'
                ? "Touche-à-tout dans le domaine de la tech, je crée des outils sur mesure pour faciliter le fonctionnement de votre entreprise et vous libérer du temps."
                : lang === 'es'
                ? 'Todoterreno en el mundo de la tecnología, creo herramientas a medida para facilitar el funcionamiento de tu empresa y liberarte tiempo.'
                : "A tech generalist, I build custom tools that make your company run smoother and free up your time."}
            </p>
            <p>
              {lang === 'fr'
                ? "J'utilise une approche basée sur la donnée : après recueil et analyse des besoins, je conçois des outils (web, mobile, ou autre !) pensés pour être intuitifs et adoptés immédiatement par leurs utilisateurs."
                : lang === 'es'
                ? 'Trabajo con un enfoque basado en los datos: tras recoger y analizar las necesidades, diseño herramientas (web, móvil o cualquier otra) pensadas para ser intuitivas y adoptadas de inmediato por sus usuarios.'
                : "I use a data-driven approach: after gathering and analyzing needs, I design tools (web, mobile, or anything else!) built to be intuitive and adopted right away by their users."}
            </p>
            <p>
              {lang === 'fr'
                ? "Formée à l'IA, à la psychologie et aux neurosciences, mon approche est avant tout centrée sur l'humain : non pas le remplacer par la tech, mais lui montrer comment elle peut le servir, pour qu'il consacre son temps et son énergie à ce qui compte le plus."
                : lang === 'es'
                ? 'Formada en IA, psicología y neurociencia, mi enfoque es ante todo centrado en el ser humano: no reemplazarlo con la tecnología, sino mostrarle cómo puede servirle, para que dedique su tiempo y su energía a lo que más importa.'
                : "Trained in AI, psychology and neuroscience, my approach is above all human-centered: not to replace people with tech, but to show them how it can serve them, so they can spend their time and energy on what matters most."}
            </p>

            <div className="about-actions">
              <StarBorder as="a" href="/cv-marina-nowicki.pdf" target="_blank" rel="noopener noreferrer" className="btn-cv" color="#5eead4" speed="6s">
                {lang === 'fr' ? 'Voir le CV' : lang === 'es' ? 'Ver el CV' : 'View Resume'}
              </StarBorder>
              <a href="https://www.linkedin.com/in/sbamarina/" target="_blank" rel="noopener noreferrer" className="btn-linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/marinasba" target="_blank" rel="noopener noreferrer" className="btn-github" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>

            <div className="about-hobbies">
              <h4>{lang === 'fr' ? 'Loisirs' : lang === 'es' ? 'Aficiones' : 'Hobbies'}</h4>
              <div className="hobbies-list">
                {(lang === 'fr'
                  ? ['Langues étrangères', 'Livres & livres audio', 'Marche', 'Loisirs créatifs']
                  : lang === 'es'
                  ? ['Idiomas extranjeros', 'Libros y audiolibros', 'Caminar', 'Manualidades']
                  : ['Foreign languages', 'Books & audiobooks', 'Walking', 'Creative crafts']
                ).map((hobby) => (
                  <span key={hobby} className="hobby-tag">{hobby}</span>
                ))}
              </div>
            </div>

            <div className="about-languages">
              <h4>{lang === 'fr' ? 'Langues' : lang === 'es' ? 'Idiomas' : 'Languages'}</h4>
              <div className="languages-list">
                {languages.map((l) => (
                  <div key={l.name} className="language-item">
                    <span className="language-flag">{l.flag}</span>
                    <span className="language-name">{l.name}</span>
                    <span className="language-level">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    <Moodboard />
    </>
  )
}
