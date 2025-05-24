import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Equipment from '@/components/home/Equipment';
import Appointment from '@/components/home/Appointment';
import DoctorPortal from '@/components/home/DoctorPortal';
import News from '@/components/home/News';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';

const Home = () => {
  const { t } = useTranslation();
  
  // Update page title
  useEffect(() => {
    document.title = t('meta.homeTitle');
  }, [t]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Equipment />
      <Appointment />
      <DoctorPortal />
      <News />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
