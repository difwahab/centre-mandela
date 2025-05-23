import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Heart, Microscope, UserRound } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="accueil" className="relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
              <span dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
            </h2>
            <p className="text-lg text-text-medium mb-6">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#rendez-vous">
                <Button size="lg" className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                  {t('hero.buttons.appointment')}
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                  {t('hero.buttons.services')}
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-neutral-100 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2M12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4M17 8L14.8 14.5L12.4 10.4L10 13.5L7 8H17M17 8.5H7.5L10 12.9L12.5 9.5L14.5 13L17 8.5Z" fill="#2563EB"/>
                  </svg>
                </div>
                <p className="font-medium">{t('hero.features.expertise')}</p>
              </div>
              <div className="bg-neutral-100 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <Microscope className="text-primary h-6 w-6" />
                </div>
                <p className="font-medium">{t('hero.features.technology')}</p>
              </div>
              <div className="bg-neutral-100 p-4 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <UserRound className="text-primary h-6 w-6" />
                </div>
                <p className="font-medium">{t('hero.features.team')}</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt={t('hero.imageAlt')}
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-primary/5 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-primary h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="font-medium">+213 00 00 00 00</span>
            </div>
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-primary h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-medium">{t('contact.address.city')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-primary h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-medium">{t('contact.hours')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
