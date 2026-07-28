import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'fr' | 'en' | 'es'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  toggleLang: () => {},
})

const ORDER: Lang[] = ['fr', 'en', 'es']

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')
  const toggleLang = () =>
    setLang((l) => ORDER[(ORDER.indexOf(l) + 1) % ORDER.length])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
