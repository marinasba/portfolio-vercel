import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LanguageContext'
import './Moodboard.css'

const initialItems = [
  { id: 'interstellar', img: '/moodboard/interstellar.jpg', x: 8.3, y: 5.9, w: 100, rot: -2, anecdote: 'Mon film préféré.', anecdoteEn: 'My favourite movie.', anecdoteEs: 'Mi película favorita.' },
  { id: 'doudou', img: '/moodboard/doudou-removebg-preview.png', x: 17.2, y: 5.2, w: 160, rot: 2, anecdote: 'À mon grand âge je possède toujours mon doudou. C\'est un éléphant, il s\'appelle "Doudou éléphant". Ici on aime les choses simples.', anecdoteEn: 'At my age I still have my childhood plushie. It\'s an elephant named "Doudou éléphant". We keep things simple around here.', anecdoteEs: 'A mi edad todavía tengo mi peluche de la infancia. Es un elefante y se llama "Doudou éléphant". Aquí nos gustan las cosas simples.' },
  { id: 'musique', img: '/moodboard/sports.svg', x: 34.9, y: 6.1, w: 330, rot: -1, anecdote: 'Depuis enfant j\'ai essayé énormément de sports et d\'activités différentes mais comme je me lasse rapidement, je n\'ai persévéré dans aucun d\'eux...', anecdoteEn: 'Since childhood I\'ve tried tons of sports and activities, but since I get bored quickly, I never stuck with any of them...', anecdoteEs: 'Desde pequeña he probado un montón de deportes y actividades diferentes, pero como me aburro rápido, nunca he perseverado en ninguno...' },
  { id: 'duolingo', img: '/moodboard/duolingo.svg', x: 54.2, y: 6.4, w: 90, rot: 5, anecdote: 'J\'apprends l\'arabe. Il y a quelques années je parlais bien espagnol et j\'aimerais aussi m\'y remettre car j\'ai tout perdu par manque de pratique.', anecdoteEn: 'I\'m learning Arabic. A few years ago I spoke Spanish well and I\'d love to pick it up again, I lost it all from lack of practice.', anecdoteEs: 'Estoy aprendiendo árabe. Hace unos años hablaba bien español y me encantaría retomarlo, lo he perdido todo por falta de práctica.' },
  { id: 'nord', img: '/moodboard/nord.svg', x: 63.5, y: 6.8, w: 250, rot: 1, anecdote: 'Je suis née et j\'ai grandi dans le 59.', anecdoteEn: 'I was born and raised in the Nord department (59), northern France.', anecdoteEs: 'Nací y crecí en el departamento del Nord (59), en el norte de Francia.' },
  { id: 'petanque', img: '/moodboard/petanque.svg', x: 78.8, y: 5, w: 180, rot: -4, anecdote: 'Mon talent caché, paraît-il : je suis forte à la pétanque.', anecdoteEn: 'My hidden talent, apparently: I\'m really good at pétanque (French boules).', anecdoteEs: 'Mi talento oculto, al parecer: se me da muy bien la petanca.' },
  { id: 'fauteuil', img: '/moodboard/fauteuil_massant-removebg-preview.png', x: 2.5, y: 30.1, w: 120, rot: 3, anecdote: 'J\'ai un abonnement Basic Fit que je n\'utilise jamais (oui je fais partie de ces gens...), la seule chose que j\'aime là-bas ce sont les fauteuils massants.', anecdoteEn: 'I have a Basic Fit membership I never use (yes, I\'m one of those people...), the only thing I like there are the massage chairs.', anecdoteEs: 'Tengo una suscripción a Basic Fit que nunca uso (sí, soy de esas personas...), lo único que me gusta de ahí son los sillones de masaje.' },
  { id: 'appareil', img: '/moodboard/appareilphoto-removebg-preview.png', x: 11.7, y: 34, w: 130, rot: -2, anecdote: 'J\'adore les appareils photo numériques des années 2000, je trouve que l\'esthétique des photos a un charme particulier.', anecdoteEn: 'I love early 2000s digital cameras, I think the aesthetic of those photos has a unique charm.', anecdoteEs: 'Me encantan las cámaras digitales de principios de los 2000, creo que la estética de esas fotos tiene un encanto especial.' },
  { id: 'lipstick', img: '/moodboard/lipstick.svg', x: 17.1, y: 30.4, w: 255, rot: -8, anecdote: 'En 2020 j\'ai eu une période de passion pour le maquillage, je sortais tous les jours avec un look assez excentrique. De manière générale j\'adore tous les loisirs créatifs et artistiques depuis toute petite.', anecdoteEn: 'In 2020 I went through a makeup obsession phase, going out every day with a pretty eccentric look. I\'ve loved all kinds of creative and artistic hobbies since I was little.', anecdoteEs: 'En 2020 tuve una etapa de obsesión con el maquillaje, salía todos los días con un look bastante excéntrico. En general me encantan todas las aficiones creativas y artísticas desde pequeña.' },
  { id: 'vinted', img: '/moodboard/vinted.png', x: 29.2, y: 32.5, w: 105, rot: 3, anecdote: 'J\'adore les friperies et la seconde main, les braderies, brocantes, etc.', anecdoteEn: 'I love thrift stores, second-hand shopping, flea markets, garage sales, all of it.', anecdoteEs: 'Me encantan las tiendas de segunda mano, los mercadillos, los rastros, todo eso.' },
  { id: 'fleur', img: '/moodboard/fleur_rose-removebg-preview.png', x: 59.6, y: 25.2, w: 160, rot: 5, anecdote: 'Enfant, ma couleur préférée était le rose mais on disait que "c\'est nul, c\'est pour les filles" donc je mentais en disant que c\'était le bleu. Maintenant, j\'adore toujours le rose et je n\'ai plus aucun souci avec ça.', anecdoteEn: 'As a kid, my favourite colour was pink but people said "that\'s lame, it\'s for girls" so I\'d lie and say it was blue. Now I still love pink and I\'m totally fine with it.', anecdoteEs: 'De pequeña, mi color favorito era el rosa, pero decían "qué tontería, eso es para chicas", así que mentía y decía que era el azul. Ahora sigo amando el rosa y ya no tengo ningún problema con eso.' },
  { id: 'cafeine', img: '/moodboard/cafeine.svg', x: 85.9, y: 15.1, w: 230, rot: -2, anecdote: 'Tu sais que tu es officiellement une vieille personne quand le café est nécessaire le matin.', anecdoteEn: 'You know you\'re officially old when coffee becomes a morning necessity.', anecdoteEs: 'Sabes que oficialmente eres mayor cuando el café se vuelve indispensable por la mañana.' },
  { id: 'mp4', img: '/moodboard/mp4.png', x: 76.4, y: 24.3, w: 130, rot: 6, anecdote: 'Je suis une grande fan des objets des années 2000, j\'ai encore un lecteur MP4 et je pense que la centralisation de tous nos appareils en un seul (smartphone) contribue au fait de devenir accro au téléphone. Donc j\'essaie de garder tout ça séparé !', anecdoteEn: 'I\'m a big fan of 2000s gadgets, I still have an MP4 player. I think merging all our devices into one smartphone contributes to phone addiction. So I try to keep them separate!', anecdoteEs: 'Soy gran fan de los gadgets de los años 2000, todavía tengo un reproductor MP4. Creo que juntar todos nuestros aparatos en un único smartphone contribuye a la adicción al móvil. ¡Así que intento mantenerlos separados!' },
  { id: 'webcam', img: '/moodboard/cache_webcam-removebg-preview.png', x: 89.7, y: 38.9, w: 90, rot: -3, anecdote: 'Je fais partie de ces gens avec un cache sur leur webcam...', anecdoteEn: 'I\'m one of those people with a cover on their webcam...', anecdoteEs: 'Soy de esas personas que ponen una tapa sobre la webcam...' },
  { id: 'permis', img: '/moodboard/permis.png', x: 7, y: 53.3, w: 130, rot: 4, anecdote: 'J\'ai eu mon permis la 5e fois, ça s\'est étalé sur 8 ans et je refuse de calculer combien ça m\'a coûté (restons dans le déni, j\'ai fait au moins 100 heures).', anecdoteEn: 'I passed my driving test on the 5th try, it took 8 years and I refuse to calculate how much it cost (let\'s stay in denial, at least 100 hours of lessons).', anecdoteEs: 'Aprobé el examen de conducir al 5º intento, me llevó 8 años y me niego a calcular cuánto me costó (mejor seguir en la negación, mínimo 100 horas de clase).' },
  { id: 'codememe', img: '/moodboard/code_meme-removebg-preview.png', x: 17, y: 50, w: 170, rot: -2, anecdote: 'En M1, après une semaine de cours, j\'étais tellement perdue pendant les cours de Python que je suis allée voir mon prof principal pour lui dire que je devrais me réorienter... Traumatisme.', anecdoteEn: 'In my first year of Master\'s, after one week of classes, I was so lost during Python lectures that I went to my professor to say I should switch majors... Trauma.', anecdoteEs: 'En el primer año del máster, después de una semana de clases, estaba tan perdida en las de Python que fui a ver al profe principal para decirle que debería cambiar de carrera... Trauma.' },
  { id: 'canva', img: '/moodboard/canva.png', x: 36.6, y: 74.8, w: 135, rot: 3, anecdote: 'J\'ADORE faire des montages sur mes colocs et les afficher partout.', anecdoteEn: 'I LOVE making photo edits of my roommates and putting them up everywhere.', anecdoteEs: 'ME ENCANTA hacer montajes de mis compañeras de piso y colgarlos por todas partes.' },
  { id: 'maps', img: '/moodboard/maps.svg.png', x: 4, y: 72, w: 65, rot: -5, anecdote: 'Je n\'ai AUCUN sens de l\'orientation, je dois ma survie quotidienne uniquement à Google Maps. Fun fact : un de mes jobs étudiants était guide...', anecdoteEn: 'I have ZERO sense of direction, I owe my daily survival entirely to Google Maps. Fun fact: one of my student jobs was being a tour guide...', anecdoteEs: 'No tengo NINGÚN sentido de la orientación, debo mi supervivencia diaria únicamente a Google Maps. Dato curioso: uno de mis trabajos de estudiante fue de guía turística...' },
  { id: 'skyblog', img: '/moodboard/skyblog.png', x: 10.7, y: 77.7, w: 180, rot: 2, anecdote: 'J\'étais une grande fan de Skyblog quand j\'étais enfant/ado et un de mes blogs avait percé (influenceuse avant l\'heure...).', anecdoteEn: 'I was a huge Skyblog fan as a kid/teen and one of my blogs actually blew up (influencer before it was cool...).', anecdoteEs: 'Era una gran fan de Skyblog cuando era niña/adolescente y uno de mis blogs llegó a triunfar (influencer antes de que fuera moda...).' },
  { id: 'dwg', img: '/moodboard/trust_its_final-removebg-preview.png', x: 22.2, y: 70.6, w: 150, rot: -3, anecdote: 'If you know, you know.', anecdoteEn: 'If you know, you know.', anecdoteEs: 'If you know, you know.' },
  { id: 'plastique', img: '/moodboard/plastique-removebg-preview.png', x: 47.7, y: 72.1, w: 140, rot: 1, anecdote: 'Mon rituel du weekend : mettre de l\'huile dans mes cheveux et enrouler ma tête dans du film étirable. Sexy ? Non. Efficace ? Oui.', anecdoteEn: 'My weekend ritual: put oil in my hair and wrap my head in cling film. Sexy? No. Effective? Yes.', anecdoteEs: 'Mi ritual de fin de semana: ponerme aceite en el pelo y envolverme la cabeza con film transparente. ¿Sexy? No. ¿Eficaz? Sí.' },
  { id: 'huile', img: '/moodboard/huile-removebg-preview.png', x: 53.3, y: 65.2, w: 140, rot: -4, anecdote: 'Mon rituel du weekend : mettre de l\'huile dans mes cheveux et enrouler ma tête dans du film étirable. Sexy ? Non. Efficace ? Oui.', anecdoteEn: 'My weekend ritual: put oil in my hair and wrap my head in cling film. Sexy? No. Effective? Yes.', anecdoteEs: 'Mi ritual de fin de semana: ponerme aceite en el pelo y envolverme la cabeza con film transparente. ¿Sexy? No. ¿Eficaz? Sí.' },
  { id: 'doberman', img: '/moodboard/doberman-removebg-preview.png', x: 65.4, y: 66.9, w: 130, rot: 2, anecdote: 'Mes colocs me surnomment "le doberman" car je cuisine très peu et la plupart du temps me nourris de repas très rudimentaires... Alors que je suis auteure de 2 livres de cuisine.', anecdoteEn: 'My roommates call me "the doberman" because I barely cook and mostly eat very basic meals... Even though I\'m the author of 2 cookbooks.', anecdoteEs: 'Mis compañeras de piso me llaman "el doberman" porque cocino muy poco y la mayoría del tiempo me alimento de comidas muy básicas... A pesar de ser autora de 2 libros de cocina.' },
  { id: 'kiwi', img: '/moodboard/kiwi.png', x: 72, y: 50.3, w: 160, rot: -3, anecdote: 'Il y a quelques années, après avoir énormément abîmé mes cheveux (décolorations, recolorations, lissages...) j\'ai décidé de tout simplement me raser la tête.', anecdoteEn: 'A few years ago, after severely damaging my hair (bleaching, re-dyeing, straightening...) I decided to simply shave my head.', anecdoteEs: 'Hace unos años, después de haberme estropeado mucho el pelo (decoloraciones, tintes, alisados...) decidí simplemente raparme la cabeza.' },
  { id: 'chat', img: '/moodboard/chat-removebg-preview.png', x: 81.7, y: 47.4, w: 180, rot: 4, anecdote: 'Voici Criminou, le chat le plus collant de la planète (pour ma plus grande joie).', anecdoteEn: 'Meet Criminou, the clingiest cat on the planet (to my greatest joy).', anecdoteEs: 'Os presento a Criminou, el gato más pegajoso del planeta (para mi mayor alegría).' },
  { id: 'timbre', img: '/moodboard/timbre.svg', x: 74, y: 69.7, w: 205, rot: -6, anecdote: 'Grande romantique dans l\'âme, j\'adore écrire des lettres manuscrites, garder tous les souvenirs papiers (billets de train, tickets de cinéma, etc).', anecdoteEn: 'A hopeless romantic at heart, I love writing handwritten letters and keeping all paper memorabilia (train tickets, movie stubs, etc).', anecdoteEs: 'Romántica empedernida, me encanta escribir cartas a mano y conservar todos los recuerdos en papel (billetes de tren, entradas de cine, etc).' },
  { id: 'spotify', img: '/moodboard/spotify.svg', x: 28.9, y: 55.1, w: 220, rot: 3, anecdote: 'Anecdote à venir...', anecdoteEn: 'Anecdote coming soon...', anecdoteEs: 'Anécdota próximamente...' },
  { id: 'windowsxp', img: '/moodboard/Windows_XP_SP2_boot_screen.png', x: 84.6, y: 69.9, w: 210, rot: -2, anecdote: 'Anecdote à venir...', anecdoteEn: 'Anecdote coming soon...', anecdoteEs: 'Anécdota próximamente...' },
]

export default function Moodboard() {
  const { lang } = useLang()
  const [selected, setSelected] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(initialItems.map(i => [i.id, { x: i.x, y: i.y, w: i.w }]))
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const dragInfo = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null)

  const selectedItem = initialItems.find(i => i.id === selected)

  const handlePointerDown = useCallback((e: React.PointerEvent, id: string) => {
    if (!editMode) return
    e.preventDefault()
    e.stopPropagation()
    const pos = positions[id]
    dragInfo.current = { id, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [editMode, positions])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragInfo.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const dx = ((e.clientX - dragInfo.current.startX) / rect.width) * 100
    const dy = ((e.clientY - dragInfo.current.startY) / rect.height) * 100
    const newX = Math.max(0, Math.min(95, dragInfo.current.origX + dx))
    const newY = Math.max(0, Math.min(95, dragInfo.current.origY + dy))
    setPositions(prev => ({ ...prev, [dragInfo.current!.id]: { ...prev[dragInfo.current!.id], x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 } }))
  }, [])

  const handlePointerUp = useCallback(() => {
    dragInfo.current = null
  }, [])

  const handleResize = useCallback((id: string, delta: number) => {
    setPositions(prev => ({ ...prev, [id]: { ...prev[id], w: Math.max(30, prev[id].w + delta) } }))
  }, [])

  const exportPositions = () => {
    const output = initialItems.map(item => {
      const pos = positions[item.id]
      return `  { id: '${item.id}', x: ${pos.x}, y: ${pos.y}, w: ${pos.w} }`
    }).join(',\n')
    navigator.clipboard.writeText(`[\n${output}\n]`)
    alert('Positions copiées dans le presse-papier !')
  }

  return (
    <section
      className="about-moodboard"
      ref={containerRef}
      onPointerMove={editMode ? handlePointerMove : undefined}
      onPointerUp={editMode ? handlePointerUp : undefined}
    >
      {/* Barre d'édition */}
      <div className="edit-bar">
        <button className="edit-toggle" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Quitter le mode édition' : 'Mode édition'}
        </button>
        {editMode && (
          <button className="edit-export" onClick={exportPositions}>
            Exporter les positions
          </button>
        )}
      </div>

      {/* Titre central */}
      <div className="moodboard-title">
        <h2>
          {lang === 'fr'
            ? "Clique pour apprendre quelques anecdotes à mon sujet"
            : lang === 'es'
            ? 'Haz clic para conocer algunas anécdotas sobre mí'
            : "Click to learn some fun facts about me"}
        </h2>
      </div>

      {/* Items */}
      {initialItems.map(item => {
        const pos = positions[item.id]
        return (
          <motion.div
            key={item.id}
            className={`moodboard-item ${editMode ? 'editing' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: pos.w,
              rotate: item.rot,
              cursor: editMode ? 'grab' : 'pointer',
            }}
            whileHover={editMode ? {} : { scale: 1.15, rotate: item.rot + 5, zIndex: 10 }}
            whileTap={editMode ? {} : { scale: 0.95 }}
            onClick={() => { if (!editMode) setSelected(item.id) }}
            onPointerDown={(e) => handlePointerDown(e, item.id)}
          >
            <img src={item.img} alt={item.id} draggable={false} />
            {editMode && (
              <div className="resize-controls">
                <button onClick={(e) => { e.stopPropagation(); handleResize(item.id, -10) }}>-</button>
                <span>{pos.w}px</span>
                <button onClick={(e) => { e.stopPropagation(); handleResize(item.id, 10) }}>+</button>
              </div>
            )}
          </motion.div>
        )
      })}

      {/* Popup anecdote */}
      <AnimatePresence>
        {selectedItem && !editMode && (
          <motion.div
            className="anecdote-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="anecdote-popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="anecdote-close" onClick={() => setSelected(null)}>X</button>
              <img src={selectedItem.img} alt={selectedItem.id} />
              <p>{lang === 'fr' ? selectedItem.anecdote : lang === 'es' ? selectedItem.anecdoteEs : selectedItem.anecdoteEn}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
