import Hero from '@/components/Hero/Hero';
import About from '@/components/Sections/About';
import Expertise from '@/components/Sections/Expertise';
import Work from '@/components/Sections/Work';
import Experience from '@/components/Sections/Experience';
import AtlasSection from '@/components/Sections/AtlasSection';
import Contact from '@/components/Sections/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Work />
      <Experience />
      <AtlasSection />
      <Contact />
      <Footer />
    </>
  );
}
