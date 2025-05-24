import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/context/LanguageContext'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import MobileMenu from '@/components/MobileMenu'
import ThemeToggle from '@/components/ThemeToggle'

const Header = () => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isRTL = language === 'ar'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'accueil', label: t('nav.home') },
    { id: 'a-propos', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'rendez-vous', label: t('nav.appointment') },
    { id: 'actualites', label: t('nav.news') },
    { id: 'contact', label: t('nav.contact') },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors ${
        isScrolled ? 'bg-background/90 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-[color:var(--color-primary)]">
          {t('header.title')}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className="text-base font-medium text-[color:var(--text-dark)] hover:text-[color:var(--color-primary)] transition-colors"
            >
              {label}
            </button>
          ))}
          <a
            href="/espace-medecins/login"
            className="text-base font-medium text-[color:var(--text-dark)] hover:text-[color:var(--color-primary)] transition-colors"
          >
            {t('nav.doctorPortal')}
          </a>

          <ThemeToggle />
        </nav>

        {/* Mobile menu toggle */}
        <button onClick={() => setMobileOpen(true)} className="md:hidden text-[color:var(--text-dark)]">
          <Menu size={24} />
        </button>

        <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  )
}

export default Header
