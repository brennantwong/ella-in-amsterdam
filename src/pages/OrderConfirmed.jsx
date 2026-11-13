import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/FooterSection';
import { useCart } from '@/lib/cart';

const labelClass = 'font-mono text-xs tracking-[0.2em] uppercase';

export default function OrderConfirmed() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, []);

  return (
    <div style={{ backgroundColor: '#E9ECEF', minHeight: '100vh' }}>
      <NavBar />
      <main className="pt-14">
        <section className="px-6 md:px-12 py-24 max-w-3xl mx-auto text-center">
          <div
            className="w-12 h-12 flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF' }}
          >
            <Check size={22} />
          </div>
          <span className={`${labelClass} block mb-3`} style={{ color: '#1E5CFF' }}>Payment Received</span>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight mb-5"
            style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
          >
            Your order is in.
          </h1>
          <p className="text-sm leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: 'rgba(17,21,26,0.8)' }}>
            Your receipt is on its way by email. Paperbacks ship within 3–5 business days — thank you for reading Ella in Amsterdam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#vault"
              className={`${labelClass} px-8 py-4 transition-opacity hover:opacity-85`}
              style={{ backgroundColor: '#11151A', color: '#E9ECEF', textDecoration: 'none' }}
            >
              Back to the Vault
            </Link>
            <Link
              to="/about"
              className={`${labelClass} px-8 py-4 transition-colors hover:bg-[#11151A] hover:text-[#E9ECEF]`}
              style={{ border: '0.5px solid #11151A', color: '#11151A', textDecoration: 'none' }}
            >
              About the Series
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}