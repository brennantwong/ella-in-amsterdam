import { useState } from 'react';
import ScrollProgress from '@/components/ScrollProgress';
import NavBar from '@/components/NavBar';
import FeaturedBook from '@/components/FeaturedBook';
import VaultSection from '@/components/VaultSection';
import AboutSection from '@/components/AboutSection';
import WhereToBuySection from '@/components/WhereToBuySection';
import NewsletterSection from '@/components/NewsletterSection';
import FooterSection from '@/components/FooterSection';
import DossierPanel from '@/components/DossierPanel';

export default function Home() {
  const [activeDossier, setActiveDossier] = useState(null);

  return (
    <div style={{ backgroundColor: '#F4F4F2' }}>
      <ScrollProgress />
      <NavBar />
      <main className="pt-[3px]">
        <FeaturedBook onOpenDossier={setActiveDossier} />
        <VaultSection onOpenDossier={setActiveDossier} />
        <AboutSection />
        <WhereToBuySection />
        <NewsletterSection />
        <FooterSection />
      </main>

      {activeDossier && (
        <DossierPanel book={activeDossier} onClose={() => setActiveDossier(null)} />
      )}
    </div>
  );
}