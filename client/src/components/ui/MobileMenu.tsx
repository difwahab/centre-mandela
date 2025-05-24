import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/context/LanguageContext'
import ThemeToggle from '@/components/ThemeToggle'
import {
  Home,
  Info,
  User,
  Calendar,
  Newspaper,
  Phone,
  Lock,
} from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const isRTL = language === 'ar'

  const handleClick = (id: string) => {
    onClose()
    const target = document.getElementById(id)
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const navLinks = [
    { id: 'accueil', label: t('nav.home'), icon: <Home size={18} /> },
    { id: 'a-propos', label: t('nav.about'), icon: <Info size={18} /> },
    { id: 'services', label: t('nav.services'), icon: <User size={18} /> },
    { id: 'rendez-vous', label: t('nav.appointment'), icon: <Calendar size={18} /> },
    { id: 'actualites', label: t('nav.news'), icon: <Newspaper size={18} /> },
    { id: 'contact', label: t('nav.contact'), icon: <Phone size={18} /> },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:hidden p-0">
        <div className="p-6 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* NAVIGATION */}
          <nav className="space-y-4">
            {navLinks.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`flex items-center gap-3 w-full text-base font-medium text-[color:var(--text-dark)] hover:text-[color:var(--color-primary)] transition-colors ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>

          {/* PORTAIL MÉDECINS */}
          <div className="pt-6 border-t border-gray-200">
            <a href="/espace-medecins/login" onClick={onClose}>
              <Button
                variant="secondary"
                className={`w-full flex items-center justify-center gap-2 ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <Lock size={18} />
                {t('nav.doctorPortal')}
              </Button>
            </a>
          </div>

          {/* LANGUE & THÈME */}
          <div
            className={`flex justify-between items-center pt-4 border-t border-gray-200 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Sélecteur de langue */}
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <button
                className={`text-sm font-semibold transition-colors ${
                  language === 'fr'
                    ? 'text-[color:var(--color-primary)]'
                    : 'text-[color:var(--text-medium)] hover:text-[color:var(--color-primary)]'
                }`}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
              <span className="text-[color:var(--text-medium)]">|</span>
              <button
                className={`text-sm font-semibold transition-colors ${
                  language === 'ar'
                    ? 'text-[color:var(--color-primary)]'
                    : 'text-[color:var(--text-medium)] hover:text-[color:var(--color-primary)]'
                }`}
                onClick={() => setLanguage('ar')}
              >
                AR
              </button>
            </div>

            {/* Thème (sombre/clair) */}
            <ThemeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MobileMenu
