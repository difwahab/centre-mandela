import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="a-propos" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('about.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-text-medium max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt={t('about.imageAlt')}
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4">{t('about.career.title')}</h3>
            <p className="text-text-medium mb-4">
              {t('about.career.description')}
            </p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">{t('about.education.title')}</h4>
              <ul className="space-y-2">
                {['education1', 'education2', 'education3', 'education4'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                    <span>{t(`about.education.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <h4 className="font-semibold mb-2">{t('about.affiliations.title')}</h4>
            <p className="text-text-medium mb-4">
              {t('about.affiliations.description')}
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {['specialty1', 'specialty2', 'specialty3', 'specialty4'].map((item, index) => (
                <span key={index} className="bg-neutral-200 px-3 py-1 rounded-full text-sm">
                  {t(`about.specialties.${item}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-neutral-100 p-6 rounded-xl">
            <div className="text-primary text-4xl font-bold mb-2">20+</div>
            <h4 className="text-lg font-semibold mb-2">{t('about.stats.years.title')}</h4>
            <p className="text-text-medium">{t('about.stats.years.description')}</p>
          </div>
          
          <div className="bg-neutral-100 p-6 rounded-xl">
            <div className="text-primary text-4xl font-bold mb-2">50K+</div>
            <h4 className="text-lg font-semibold mb-2">{t('about.stats.patients.title')}</h4>
            <p className="text-text-medium">{t('about.stats.patients.description')}</p>
          </div>
          
          <div className="bg-neutral-100 p-6 rounded-xl">
            <div className="text-primary text-4xl font-bold mb-2">100%</div>
            <h4 className="text-lg font-semibold mb-2">{t('about.stats.equipment.title')}</h4>
            <p className="text-text-medium">{t('about.stats.equipment.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
