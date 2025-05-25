import { useTranslation } from 'react-i18next';
import { Magnet, Radiation, CircleX, Check } from 'lucide-react';

const Equipment = () => {
  const { t } = useTranslation();

  return (
    <section id="equipement" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('equipment.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-text-medium max-w-3xl mx-auto">
            {t('equipment.subtitle')}
          </p>
        </div>

        {/* Equipment Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="equipment-items">
          {[
            { Icon: Magnet, key: 'mri' },
            { Icon: Radiation, key: 'scanner' },
            { Icon: CircleX, key: 'ultrasound' },
          ].map(({ Icon, key }) => (
            <div key={key} className="bg-neutral-100 p-6 rounded-xl text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t(`equipment.items.${key}.title`)}
              </h3>
              <p className="text-text-medium">
                {t(`equipment.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Technological Commitment */}
        <div className="mt-12 bg-neutral-100 rounded-xl p-8" data-testid="equipment-commitment">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                {t('equipment.commitment.title')}
              </h3>
              <p className="text-text-medium mb-4">
                {t('equipment.commitment.description')}
              </p>
              <ul className="space-y-3 list-none">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start">
                    <Check className="text-primary mt-1 mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>{t(`equipment.commitment.points.point${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt={t('equipment.imageAlt')}
                className="rounded-xl shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipment;
