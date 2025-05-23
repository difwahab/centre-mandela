import { useTranslation } from 'react-i18next';
import { Star, StarHalf } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: t('testimonials.testimonial1.text'),
      name: t('testimonials.testimonial1.name'),
      role: t('testimonials.testimonial1.role'),
      initials: 'SB',
    },
    {
      id: 2,
      rating: 5,
      text: t('testimonials.testimonial2.text'),
      name: t('testimonials.testimonial2.name'),
      role: t('testimonials.testimonial2.role'),
      initials: 'KM',
    },
    {
      id: 3,
      rating: 4.5,
      text: t('testimonials.testimonial3.text'),
      name: t('testimonials.testimonial3.name'),
      role: t('testimonials.testimonial3.role'),
      initials: 'RL',
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="text-primary h-5 w-5 fill-primary" />
        ))}
        {hasHalfStar && <StarHalf className="text-primary h-5 w-5 fill-primary" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="text-primary h-5 w-5" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('testimonials.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-text-medium max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-text-medium italic mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center mr-3">
                  <span className="font-medium">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-text-medium text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
