import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import MobileMenu from '@/components/MobileMenu';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#accueil', label: t('nav.home') },
    { href: '#a-propos', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#rendez-vous', label: t('nav.appointment') },
    { href: '#actualites', label: t('nav.news') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#accueil" className="flex items-center space-x-2">
          <Heart className="text-primary w-6 h-6 md:w-7 md:h-7" />
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-primary">{t('header.centerName')}</h1>
            <p className="text-xs sm:text-sm text-gray-600">{t('header.cabinet')}</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-gray-700 font-medium hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/espace-medecins/login">
            <Button variant="secondary" className="hover:-translate-y-0.5 transition-transform shadow hover:shadow-md">
              {t('nav.doctorPortal')} <span className="ml-1">🔒</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <button
              onClick={() => setLanguage('fr')}
              className={language === 'fr' ? 'text-primary' : 'hover:text-primary'}
            >
              FR
            </button>
            <span>|</span>
            <button
              onClick={() => setLanguage('ar')}
              className={language === 'ar' ? 'text-primary' : 'hover:text-primary'}
            >
              AR
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-primary"
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
