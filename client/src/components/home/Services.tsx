import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

type ServiceCategory = 'all' | 'diagnostic' | 'specialized' | 'interventional';

interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  image: string;
  description: string;
  equipment: string;
}

const Services = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const services: Service[] = useMemo(() => [
    {
      id: 'irm',
      title: t('services.items.irm.title'),
      category: 'diagnostic',
      image: 'https://pixabay.com/get/g8db771e7e41c3e6d463edb1e3e021ade47fdbdacd2ad53f2130650f7cee56fb113cfac87cffccae93eca3a2b17d2d1873dbfdb97208db4705abe36aa4f065730_1280.jpg',
      description: t('services.items.irm.description'),
      equipment: t('services.items.irm.equipment'),
    },
    {
      id: 'scanner',
      title: t('services.items.scanner.title'),
      category: 'diagnostic',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
      description: t('services.items.scanner.description'),
      equipment: t('services.items.scanner.equipment'),
    },
    {
      id: 'echographie',
      title: t('services.items.ultrasound.title'),
      category: 'diagnostic',
      image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
      description: t('services.items.ultrasound.description'),
      equipment: t('services.items.ultrasound.equipment'),
    },
    {
      id: 'radiographie',
      title: t('services.items.radiography.title'),
      category: 'diagnostic',
      image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
      description: t('services.items.radiography.description'),
      equipment: t('services.items.radiography.equipment'),
    },
    {
      id: 'mammographie',
      title: t('services.items.mammography.title'),
      category: 'specialized',
      image: 'https://images.unsplash.com/photo-1561328399-f94d2ce78679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450',
      description: t('services.items.mammography.description'),
      equipment: t('services.items.mammography.equipment'),
    },
    {
      id: 'biopsie',
      title: t('services.items.biopsy.title'),
      category: 'interventional',
      image: 'https://pixabay.com/get/gdca647664ee99449bd144019493e8953dd41933db6abe54e60fcd328fec24758abf119f87558c19beb58d5b3c6ee7d3187e5e822a909b763ac52041f01447c30_1280.jpg',
      description: t('services.items.biopsy.description'),
      equipment: t('services.items.biopsy.equipment'),
    },
  ], [t]);

  const categories = useMemo(() => [
    { key: 'all', label: t('services.categories.all') },
    { key: 'diagnostic', label: t('services.categories.diagnostic') },
    { key: 'specialized', label: t('services.categories.specialized') },
    { key: 'interventional', label: t('services.categories.interventional') },
  ], [t]);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => service.category === activeCategory);

  return (
    <section id="services" className="py-16 bg-[var(--bg-section)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('services.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-[var(--text-medium)] max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
          {categories.map(({ key, label }) => (
            <Button
              key={key}
              variant={activeCategory === key ? 'default' : 'outline'}
              onClick={() => setActiveCategory(key)}
              className="capitalize"
              aria-pressed={activeCategory === key}
              aria-label={label}
              role="tab"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} ${t('services.imageAlt')}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold break-words">{service.title}</h3>
                  <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                    {t(`services.categories.${service.category}`)}
                  </span>
                </div>
                <p className="text-[var(--text-medium)] mb-4">{service.description}</p>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">{t('services.equipment')}:</h4>
                  <p className="text-[var(--text-medium)] text-sm">{service.equipment}</p>
                </div>
                <Link href="#rendez-vous" className="inline-block text-primary font-medium hover:underline group">
                  {t('services.appointment')}{' '}
                  <ChevronRight className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#rendez-vous">
            <Button size="lg" className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              {t('services.appointmentButton')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
