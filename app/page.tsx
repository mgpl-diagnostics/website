import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
// import BannerStrip from '@/components/BannerStrip';
import TrustStrip from '@/components/TrustStrip';
import ServicesGrid from '@/components/ServicesGrid';
import WhyChoose from '@/components/WhyChoose';
import HomeCollection from '@/components/HomeCollection';
import TestCategories from '@/components/TestCategories';
import Testimonials from '@/components/Testimonials';
import DoctorTrust from '@/components/DoctorTrust';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <BannerStrip /> */}
        <TrustStrip />
        <ServicesGrid />
        <WhyChoose />
        <HomeCollection />
        <TestCategories />
        <Testimonials />
        <DoctorTrust />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
