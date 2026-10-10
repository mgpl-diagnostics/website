import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import WhyChoose from '@/components/WhyChoose';
import HomeCollection from '@/components/HomeCollection';
import TestCategories from '@/components/TestCategories';
import ReportDownload from '@/components/ReportDownload';
import Testimonials from '@/components/Testimonials';
import DoctorTrust from '@/components/DoctorTrust';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/motion/SmoothScroll';
import BackgroundScene from '@/components/three/BackgroundScene';

/**
 * Section order = 3D station order (components/three/LabScene.tsx STATIONS).
 * Every section with data-station advances the camera one stop.
 */
export default function Home() {
  return (
    <>
      <BackgroundScene />
      <Navbar />
      <SmoothScroll>
        <main>
          <Hero />
          <ServicesGrid />
          <WhyChoose />
          <HomeCollection />
          <TestCategories />
          <ReportDownload />
          <Testimonials />
          <DoctorTrust />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
