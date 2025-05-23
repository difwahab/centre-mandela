import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo & Socials */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Heart className="text-white w-6 h-6" />
              <div>
                <h3 className="text-lg font-bold">Dr. Benameur</h3>
                <p className="text-sm text-white/80">{t('footer.cabinet')}</p>
              </div>
            </div>
            <p className="text-white/80 mb-4">{t('footer.description')}</p>
            <div className="flex space-x-4">
              {/* Icons */}
              {['facebook', 'linkedin', 'instagram'].map((platform) => (
                <a key={platform} href="#" className="text-white/80 hover:text-white transition" aria-label={platform}>
                  <i className={`fab fa-${platform} text-lg`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {['home', 'about', 'services', 'appointment', 'news', 'contact'].map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="hover:text-white text-white/80 transition">
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white text-white/80">IRM</a></li>
              {['scanner', 'ultrasound', 'radiography', 'mammography', 'interventional'].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-white text-white/80">{t(`services.${s}`)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + Button */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.openingHours')}</h3>
            <ul className="text-white/80 text-sm space-y-2">
              <li className="flex justify-between">
                <span>{t('footer.mondayFriday')}:</span>
                <span>8h00 - 18h00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.saturday')}:</span>
                <span>8h00 - 13h00</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.sunday')}:</span>
                <span>{t('footer.closed')}</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/#rendez-vous">
                <Button variant="outline" className="bg-white text-secondary hover:bg-neutral-100">
                  {t('appointment.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <p>© {currentYear} {t('footer.copyright')}</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition">{t('footer.privacy')}</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;