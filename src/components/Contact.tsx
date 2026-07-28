import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../LanguageContext'
import './Contact.css'

const WEB3FORMS_ACCESS_KEY = '5e683112-c13c-4ddb-9085-f55dfb5ed51d'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { lang } = useLang()
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const statusMessage = {
    sending: lang === 'fr' ? 'Envoi en cours…' : lang === 'es' ? 'Enviando…' : 'Sending…',
    success: lang === 'fr'
      ? 'Merci, votre message a bien été envoyé !'
      : lang === 'es'
      ? '¡Gracias, tu mensaje se ha enviado!'
      : 'Thanks, your message has been sent!',
    error: lang === 'fr'
      ? "Une erreur est survenue, merci de réessayer."
      : lang === 'es'
      ? 'Ha ocurrido un error, inténtalo de nuevo.'
      : 'Something went wrong, please try again.',
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'es' ? 'Contacto' : 'Contact'}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === 'fr'
            ? "Envie de collaborer ou de discuter d'un projet ?"
            : lang === 'es'
            ? '¿Quieres colaborar o hablar de un proyecto?'
            : 'Want to collaborate or discuss a project?'}
        </motion.p>

        <div className="contact-grid">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="Nouveau message depuis ton portfolio" />
            <input type="hidden" name="from_name" value="Portfolio Marina Nowicki" />
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <input type="text" name="name" placeholder={lang === 'fr' ? 'Votre nom' : lang === 'es' ? 'Tu nombre' : 'Your name'} required />
            <input type="email" name="email" placeholder={lang === 'fr' ? 'Votre email' : lang === 'es' ? 'Tu correo' : 'Your email'} required />
            <textarea name="message" placeholder={lang === 'fr' ? 'Votre message' : lang === 'es' ? 'Tu mensaje' : 'Your message'} required />
            <button type="submit" className="contact-submit" disabled={status === 'sending'}>
              {status === 'sending'
                ? (lang === 'fr' ? 'Envoi…' : lang === 'es' ? 'Enviando…' : 'Sending…')
                : (lang === 'fr' ? 'Envoyer' : lang === 'es' ? 'Enviar' : 'Send')}
            </button>

            {status !== 'idle' && (
              <p className={`contact-status contact-status-${status}`} role="status">
                {statusMessage[status]}
              </p>
            )}
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>{lang === 'fr' ? 'Restons en contact' : lang === 'es' ? 'Sigamos en contacto' : "Let's stay in touch"}</h3>
            <p>
              {lang === 'fr'
                ? "N'hésitez pas à me contacter pour discuter !"
                : lang === 'es'
                ? '¡No dudes en escribirme para hablar!'
                : "Feel free to reach out to chat!"}
            </p>

            <a
              href="https://www.linkedin.com/in/sbamarina/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-linkedin-btn"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>{lang === 'fr' ? 'Me contacter sur LinkedIn' : lang === 'es' ? 'Contáctame en LinkedIn' : 'Contact me on LinkedIn'}</span>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
