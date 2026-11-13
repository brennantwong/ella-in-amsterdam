import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import NavBar from '@/components/NavBar';
import ScrollProgress from '@/components/ScrollProgress';
import OrderSummary from '@/components/OrderSummary';
import PaymentStep from '@/components/PaymentStep';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cart';
import { formatMoney } from '@/lib/money';

const labelClass = 'font-mono text-xs tracking-[0.2em] uppercase';

export default function Checkout() {
  const { lines, subtotal, count } = useCart();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async () => {
    setError('');
    setPaying(true);
    try {
      const res = await base44.functions.invoke('createCheckout', {
        items: lines.map((line) => ({ id: line.id, qty: line.qty })),
      });
      const url = res?.data?.url;
      if (!url) throw new Error(res?.data?.error || 'Checkout could not be started');
      window.location.href = url;
    } catch (err) {
      setError('Checkout could not be started right now. Please try again in a moment.');
      setPaying(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#E9ECEF', minHeight: '100vh' }}>
      <ScrollProgress />
      <NavBar />
      <main className="pt-14">
        <section className="px-6 md:px-12 py-12 md:py-20 max-w-5xl mx-auto">
          <Link
            to="/cart"
            className={`${labelClass} flex items-center gap-2 mb-8 hover:opacity-60 transition-opacity`}
            style={{ color: '#6B7280', textDecoration: 'none' }}
          >
            <ArrowLeft size={12} /> Back to Cart
          </Link>

          <div className="flex items-end justify-between mb-10" style={{ borderBottom: '0.5px solid #11151A', paddingBottom: '16px' }}>
            <div>
              <span className={`${labelClass} block mb-2`} style={{ color: '#6B7280' }}>Final Step</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
                Checkout
              </h1>
            </div>
            <span className={labelClass} style={{ color: '#6B7280' }}>
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>

          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
                Your cart is empty.
              </h2>
              <p className="text-sm mb-8" style={{ color: '#6B7280' }}>Add a paperback before checking out.</p>
              <Link
                to="/#vault"
                className={`${labelClass} inline-block px-8 py-4`}
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Browse the Vault
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
              <div>
                <h2 className={`${labelClass} mb-4`} style={{ color: '#6B7280' }}>Shipping & Payment</h2>
                <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(17,21,26,0.8)' }}>
                  Your shipping address and card details are collected on one secure payment page, then this order ships within 3–5 business days.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,21,26,0.8)' }}>
                  Shipping and tax are included in the price shown.
                </p>

                <PaymentStep
                  amount={formatMoney(subtotal)}
                  paying={paying}
                  error={error}
                  onPay={handlePay}
                />

                <div className="flex items-center gap-2 mt-6" style={{ color: '#6B7280' }}>
                  <Lock size={12} />
                  <span className="font-mono text-xs">Payments are processed by our payment provider — cards never touch this site.</span>
                </div>
              </div>

              <aside className="lg:sticky lg:top-20">
                <OrderSummary lines={lines} subtotal={subtotal} />
                <Link
                  to="/cart"
                  className={`${labelClass} block text-center mt-4 hover:opacity-60 transition-opacity`}
                  style={{ color: '#6B7280', textDecoration: 'none' }}
                >
                  Edit Cart
                </Link>
              </aside>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}