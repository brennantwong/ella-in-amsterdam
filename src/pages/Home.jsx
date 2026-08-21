import ScrollProgress from '@/components/ScrollProgress';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import VaultSection from '@/components/VaultSection';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#F4F4F2' }}>
      <ScrollProgress />
      <NavBar />
      <main className="pt-[3px]">
        <HeroSection />
        <VaultSection />
        <AboutSection />
        <NewsletterSection />
        <FooterSection />
      </main>
    </div>
  );
}