import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-[var(--color-secondary)] text-[var(--color-on-secondary)] pt-12 pb-6"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo & Socials */}
          <div>
            <div className="flex items-center mb-4 gap-2">
              <Heart className="text-[var(--color-on-secondary)] w-6 h-6" />
              <div>
                <h3 className="text-lg font-bold">Dr. Benameur</h3>
                <p className="text-sm text-[var(--color-on-secondary-muted)]">{t('footer.cabinet')}</p>
              </div>
            </div>
            <p className="text-[var(--color-on-secondary-muted)] mb-4">{t('footer.description')}</p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[var(--color-on-secondary-muted)] hover:text-[var(--color-on-secondary)] transition"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--color-on-secondary-muted)] hover:text-[var(--color-on-secondary)] transition"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[var(--color-on-secondary-muted)] hover:text-[var(--color-on-secondary)] transition"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {['home', 'about', 'services', 'appointment', 'news', 'contact'].map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="hover:underline text-[var(--color-on-secondary-muted)] hover:text-[var(--color-on-secondary)] transition"
                  >
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
              <li>
                <a href="#services" className="hover:underline text-[var(--color-on-secondary-muted)] hover:text-[var(--color-on-secondary)]">
                  IRM
                </a>
              </li>
              {['scanner', 'ultrasound', 'radiography', 'mammography', 'interventional'].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:underline text-[var(--color-on-secondary-muted)] hover:text-[var(--color-on-secondary)]">
                    {t(`services.${s}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + Button */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.openingHours')}</h3>
            <ul className="text-[var(--color-on-secondary-muted)] text-sm space-y-2">
              <li className="flex justify-between">
                <span>{t('footer.mondayFriday')}:</span>
                <span>{t('footer.hours.week')}</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.saturday')}:</span>
                <span>{t('footer.hours.saturday')}</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.sunday')}:</span>
                <span>{t('footer.closed')}</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/#rendez-vous">
                <Button
                  variant="outline"
                  className="bg-[var(--color-background)] text-[var(--color-secondary)] hover:bg-[var(--color-surface-hover)]"
                >
                  {t('appointment.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--color-on-secondary-muted)]">
          <p>© {currentYear} {t('footer.copyright')}</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline hover:text-[var(--color-on-secondary)] transition">{t('footer.privacy')}</a>
            <span>|</span>
            <a href="#" className="hover:underline hover:text-[var(--color-on-secondary)] transition">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
