import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/FooterSection';
import ScrollProgress from '@/components/ScrollProgress';
import QuantityStepper from '@/components/QuantityStepper';
import { Image } from '@/components/ui/image';
import { useCart } from '@/lib/cart';
import { formatMoney } from '@/lib/money';

const labelClass = 'font-mono text-xs tracking-[0.2em] uppercase';

export default function Cart() {
  const { lines, subtotal, count, setQty, remove } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#E9ECEF' }}>
      <ScrollProgress />
      <NavBar />
      <main className="pt-14">
        <section className="px-6 md:px-12 py-12 md:py-20 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8" style={{ borderBottom: '0.5px solid #11151A', paddingBottom: '16px' }}>
            <div>
              <span className={`${labelClass} block mb-2`} style={{ color: '#6B7280' }}>Order Draft</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
                Your Cart
              </h1>
            </div>
            <span className={labelClass} style={{ color: '#6B7280' }}>
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>

          {lines.length === 0 ? (
            <div className="py-20 text-center">
              <ShoppingBag size={28} style={{ color: '#6B7280', margin: '0 auto 20px' }} />
              <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
                Nothing filed yet.
              </h2>
              <p className="text-sm mb-8" style={{ color: '#6B7280' }}>Add a paperback from the vault to begin an order.</p>
              <Link
                to="/#vault"
                className={`${labelClass} inline-block px-8 py-4 transition-opacity hover:opacity-85`}
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Browse the Vault
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
              {/* Lines */}
              <div>
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className="flex gap-4 md:gap-6 py-6"
                    style={{ borderBottom: '0.5px solid rgba(17,21,26,0.25)' }}
                  >
                    <Link to={`/books/${line.id}`} className="w-20 md:w-24 flex-shrink-0">
                      <div className="aspect-[2/3] overflow-hidden" style={{ border: '0.5px solid rgba(17,21,26,0.25)' }}>
                        <Image src={line.coverUrl} alt={`${line.title} cover`} className="w-full h-full" fittingType="fill" />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <p className={`${labelClass} mb-1`} style={{ color: '#6B7280' }}>{line.series}</p>
                      <Link
                        to={`/books/${line.id}`}
                        className="text-lg md:text-xl font-black leading-tight hover:opacity-70 transition-opacity"
                        style={{ fontFamily: 'Playfair Display, serif', color: '#11151A', textDecoration: 'none' }}
                      >
                        {line.title}
                      </Link>
                      <p className="font-mono text-xs mt-1 mb-4" style={{ color: '#6B7280' }}>
                        Paperback · {formatMoney(line.price)} each
                      </p>

                      <div className="flex items-center gap-4 flex-wrap">
                        <QuantityStepper value={line.qty} onChange={(qty) => setQty(line.id, qty)} />
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          className={`${labelClass} flex items-center gap-1.5 hover:opacity-60 transition-opacity`}
                          style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <X size={11} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-semibold" style={{ color: '#11151A' }}>
                        {formatMoney(line.qty * line.price)}
                      </span>
                    </div>
                  </div>
                ))}

                <Link
                  to="/#vault"
                  className={`${labelClass} inline-flex items-center gap-2 mt-6 hover:opacity-60 transition-opacity`}
                  style={{ color: '#11151A', textDecoration: 'none' }}
                >
                  Continue Browsing
                </Link>
              </div>

              {/* Summary */}
              <aside className="p-6 lg:sticky lg:top-20" style={{ border: '0.5px solid #11151A', backgroundColor: 'rgba(255,255,255,0.4)' }}>
                <h2 className={`${labelClass} mb-5`} style={{ color: '#6B7280' }}>Summary</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Subtotal</span>
                    <span style={{ color: '#11151A' }}>{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Shipping & tax</span>
                    <span style={{ color: '#11151A' }}>Included</span>
                  </div>
                </div>
                <div
                  className="flex items-baseline justify-between pt-4 mb-6"
                  style={{ borderTop: '0.5px solid rgba(17,21,26,0.3)' }}
                >
                  <span className={labelClass} style={{ color: '#11151A' }}>Total</span>
                  <span className="text-xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
                    {formatMoney(subtotal)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className={`${labelClass} w-full flex items-center justify-center gap-2 py-4 transition-opacity hover:opacity-85`}
                  style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', border: 'none', cursor: 'pointer' }}
                >
                  Checkout <ArrowRight size={12} />
                </button>
              </aside>
            </div>
          )}
        </section>
      </main>
      <FooterSection />
    </div>
  );
}