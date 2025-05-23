import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:hidden p-0">
        <div className="p-6">
          <nav className="flex flex-col space-y-4">
            <Link href="/#accueil" onClick={onClose} className="text-text-dark hover:text-primary font-medium py-2 transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/#a-propos" onClick={onClose} className="text-text-dark hover:text-primary font-medium py-2 transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/#services" onClick={onClose} className="text-text-dark hover:text-primary font-medium py-2 transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/#rendez-vous" onClick={onClose} className="text-text-dark hover:text-primary font-medium py-2 transition-colors">
              {t('nav.appointment')}
            </Link>
            <Link href="/#actualites" onClick={onClose} className="text-text-dark hover:text-primary font-medium py-2 transition-colors">
              {t('nav.news')}
            </Link>
            <Link href="/#contact" onClick={onClose} className="text-text-dark hover:text-primary font-medium py-2 transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link href="/espace-medecins/login" onClick={onClose} className="block mb-4">
              <Button variant="secondary" className="w-full">
                {t('nav.doctorPortal')} <span className="ml-1">&#x1F512;</span>
              </Button>
            </Link>
            
            <div className="flex justify-center space-x-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;
