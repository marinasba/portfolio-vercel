import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LanguageContext'
import './Blog.css'

const postsFr = [
  {
    id: 1,
    icon: '>_',
    title: 'Pourquoi j\'ai choisi Flutter plutôt qu\'une PWA',
    content: 'Après une expérience compliquée avec une PWA + Capacitor, j\'ai décidé de tout refaire en Flutter. La différence de performance et de fiabilité est énorme. Flutter offre un vrai rendu natif, des animations fluides et un seul code pour iOS et Android.',
  },
  {
    id: 2,
    icon: '#',
    title: 'Gérer un e-commerce et coder en parallèle',
    content: 'Alterner entre le développement d\'applications et la gestion d\'une marque e-commerce n\'est pas toujours simple. L\'important est de bien structurer ses journées et de savoir automatiser ce qui peut l\'être. Shopify aide beaucoup sur la partie logistique.',
  },
  {
    id: 3,
    icon: '?!',
    title: 'IA dans les apps : quand l\'utiliser (et quand éviter)',
    content: 'L\'IA est un outil puissant pour l\'import de données et le traitement de texte, mais elle ne doit pas remplacer une logique déterministe fiable. Pour l\'estimation de prix ou la détection automatique, un algorithme classique sera toujours plus prévisible et moins coûteux.',
  },
]

const postsEn = [
  {
    id: 1,
    icon: '>_',
    title: 'Why I chose Flutter over a PWA',
    content: 'After a rough experience with a PWA + Capacitor setup, I decided to rebuild everything in Flutter. The difference in performance and reliability is huge. Flutter provides true native rendering, smooth animations, and a single codebase for iOS and Android.',
  },
  {
    id: 2,
    icon: '#',
    title: 'Running an e-commerce brand while coding',
    content: 'Juggling app development and managing an e-commerce brand isn\'t always easy. The key is to structure your days well and automate whatever you can. Shopify helps a lot on the logistics side.',
  },
  {
    id: 3,
    icon: '?!',
    title: 'AI in apps: when to use it (and when to skip it)',
    content: 'AI is a powerful tool for data import and text processing, but it shouldn\'t replace reliable deterministic logic. For price estimation or automatic detection, a classic algorithm will always be more predictable and cost-effective.',
  },
]

const postsEs = [
  {
    id: 1,
    icon: '>_',
    title: 'Por qué elegí Flutter en vez de una PWA',
    content: 'Después de una experiencia complicada con una PWA + Capacitor, decidí rehacerlo todo en Flutter. La diferencia en rendimiento y fiabilidad es enorme. Flutter ofrece un renderizado realmente nativo, animaciones fluidas y un único código para iOS y Android.',
  },
  {
    id: 2,
    icon: '#',
    title: 'Llevar un e-commerce y programar a la vez',
    content: 'Combinar el desarrollo de apps con la gestión de una marca e-commerce no siempre es fácil. La clave es organizar bien los días y automatizar todo lo que se pueda. Shopify ayuda mucho en la parte logística.',
  },
  {
    id: 3,
    icon: '?!',
    title: 'IA en las apps: cuándo usarla (y cuándo evitarla)',
    content: 'La IA es una herramienta potente para importar datos y procesar texto, pero no debe reemplazar una lógica determinista fiable. Para estimar precios o detectar cosas automáticamente, un algoritmo clásico siempre será más predecible y económico.',
  },
]

export default function Blog() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const { lang } = useLang()
  const posts = lang === 'fr' ? postsFr : lang === 'es' ? postsEs : postsEn

  const toggle = (id: number) => {
    setExpanded(expanded === id ? null : id)
  }

  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'fr' ? 'Blog & Astuces' : lang === 'es' ? 'Blog y Consejos' : 'Blog & Tips'}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === 'fr'
            ? "Quelques réflexions et retours d'expérience."
            : lang === 'es'
            ? 'Algunas reflexiones y aprendizajes.'
            : 'Some thoughts and lessons learned.'}
        </motion.p>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              className="blog-card"
              onClick={() => toggle(post.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="blog-card-header">
                <div className="blog-card-icon">{post.icon}</div>
                <div>
                  <div className="blog-card-title">{post.title}</div>
                  <div className="blog-card-expand">
                    {expanded === post.id
                      ? (lang === 'fr' ? 'Cliquer pour réduire' : lang === 'es' ? 'Clic para reducir' : 'Click to collapse')
                      : (lang === 'fr' ? 'Cliquer pour lire' : lang === 'es' ? 'Clic para leer' : 'Click to read')}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expanded === post.id && (
                  <motion.div
                    className="blog-card-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{post.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
