import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './LanguageContext'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import About from './components/About'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'

function App() {
  return (
    <LanguageProvider>
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/projets/:slug" element={<ProjectDetail />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/competences" element={<Skills />} />
        <Route path="/parcours" element={<Timeline />} />
        <Route path="/temoignages" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    </LanguageProvider>
  )
}

export default App
