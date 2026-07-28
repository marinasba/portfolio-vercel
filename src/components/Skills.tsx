import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import './Skills.css'

const categoriesFr = [
  {
    title: 'Langages',
    skills: ['Dart', 'TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks',
    skills: ['Flutter', 'React', 'React Native', 'Expo', 'Next.js', 'Vite'],
  },
  {
    title: 'Traitement et analyse de données',
    skills: ['Pandas', 'Matplotlib', 'Seaborn', 'Missingno', 'Jupyter Notebook'],
  },
  {
    title: 'Outils & Services',
    skills: ['Firebase', 'Supabase', 'Shopify', 'Git', 'OneSignal'],
  },
  {
    title: 'Design',
    skills: ['Figma', 'Canva', 'Adobe Illustrator', 'Procreate'],
  },
  {
    title: 'Autres',
    skills: ['UI/UX Design', 'SEO', 'Marketing digital', 'Création de contenu', 'E-commerce', 'Réseaux sociaux', 'Gestion de projet', 'Ingénierie pédagogique'],
  },
  {
    title: 'Langues étrangères',
    skills: ['Anglais (C1, TOEIC 980/990)', 'Espagnol (A2)', 'Arabe (Débutante)'],
  },
]

const categoriesEn = [
  {
    title: 'Languages',
    skills: ['Dart', 'TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks',
    skills: ['Flutter', 'React', 'React Native', 'Expo', 'Next.js', 'Vite'],
  },
  {
    title: 'Data processing & analysis',
    skills: ['Pandas', 'Matplotlib', 'Seaborn', 'Missingno', 'Jupyter Notebook'],
  },
  {
    title: 'Tools & Services',
    skills: ['Firebase', 'Supabase', 'Shopify', 'Git', 'OneSignal'],
  },
  {
    title: 'Design',
    skills: ['Figma', 'Canva', 'Adobe Illustrator', 'Procreate'],
  },
  {
    title: 'Other',
    skills: ['UI/UX Design', 'SEO', 'Digital Marketing', 'Content Creation', 'E-commerce', 'Social media', 'Project management', 'Instructional design'],
  },
  {
    title: 'Foreign languages',
    skills: ['English (C1, TOEIC 980/990)', 'Spanish (A2)', 'Arabic (Beginner)'],
  },
]

const categoriesEs = [
  {
    title: 'Lenguajes',
    skills: ['Dart', 'TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks',
    skills: ['Flutter', 'React', 'React Native', 'Expo', 'Next.js', 'Vite'],
  },
  {
    title: 'Tratamiento y análisis de datos',
    skills: ['Pandas', 'Matplotlib', 'Seaborn', 'Missingno', 'Jupyter Notebook'],
  },
  {
    title: 'Herramientas y Servicios',
    skills: ['Firebase', 'Supabase', 'Shopify', 'Git', 'OneSignal'],
  },
  {
    title: 'Diseño',
    skills: ['Figma', 'Canva', 'Adobe Illustrator', 'Procreate'],
  },
  {
    title: 'Otros',
    skills: ['Diseño UI/UX', 'SEO', 'Marketing digital', 'Creación de contenido', 'E-commerce', 'Redes sociales', 'Gestión de proyectos', 'Diseño instruccional'],
  },
  {
    title: 'Idiomas extranjeros',
    skills: ['Inglés (C1, TOEIC 980/990)', 'Español (A2)', 'Árabe (Principiante)'],
  },
]

export default function Skills() {
  const { lang } = useLang()
  const categories = lang === 'fr' ? categoriesFr : lang === 'es' ? categoriesEs : categoriesEn

  return (
    <section className="skills-section" id="competences">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'fr' ? 'Compétences' : lang === 'es' ? 'Habilidades' : 'Skills'}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === 'fr'
            ? "Les technologies et outils que j'utilise au quotidien."
            : lang === 'es'
            ? 'Las tecnologías y herramientas que uso a diario.'
            : 'The technologies and tools I use on a daily basis.'}
        </motion.p>

        <div className="skills-categories">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="skills-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="skills-category-title">{cat.title}</h3>
              <div className="skills-badges">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
