import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';
import MobileMenu from '@/components/MobileMenu';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Heart className="text-primary h-6 w-6 md:h-7 md:w-7" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-primary">{t('header.centerName')}</h1>
              <p className="text-xs sm:text-sm text-text-medium">{t('header.cabinet')}</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/#accueil" className={`font-medium transition-colors ${isActive('/#accueil') ? 'text-primary' : 'text-text-dark hover:text-primary'}`}>
              {t('nav.home')}
            </Link>
            <Link href="/#a-propos" className={`font-medium transition-colors ${isActive('/#a-propos') ? 'text-primary' : 'text-text-dark hover:text-primary'}`}>
              {t('nav.about')}
            </Link>
            <Link href="/#services" className={`font-medium transition-colors ${isActive('/#services') ? 'text-primary' : 'text-text-dark hover:text-primary'}`}>
              {t('nav.services')}
            </Link>
            <Link href="/#rendez-vous" className={`font-medium transition-colors ${isActive('/#rendez-vous') ? 'text-primary' : 'text-text-dark hover:text-primary'}`}>
              {t('nav.appointment')}
            </Link>
            <Link href="/#actualites" className={`font-medium transition-colors ${isActive('/#actualites') ? 'text-primary' : 'text-text-dark hover:text-primary'}`}>
              {t('nav.news')}
            </Link>
            <Link href="/#contact" className={`font-medium transition-colors ${isActive('/#contact') ? 'text-primary' : 'text-text-dark hover:text-primary'}`}>
              {t('nav.contact')}
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/espace-medecins/login" className="inline-block">
              <Button variant="secondary" className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                {t('nav.doctorPortal')} <span className="ml-1">&#x1F512;</span>
              </Button>
            </Link>
            <div className="flex space-x-2">
              <button 
                className={`text-sm font-medium transition-colors ${language === 'fr' ? 'text-primary' : 'text-text-medium hover:text-primary'}`}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
              <span className="text-text-medium">|</span>
              <button 
                className={`text-sm font-medium transition-colors ${language === 'ar' ? 'text-primary' : 'text-text-medium hover:text-primary'}`}
                onClick={() => setLanguage('ar')}
              >
                AR
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-text-dark hover:text-primary p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;
