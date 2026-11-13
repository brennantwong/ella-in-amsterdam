import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Globe, Lock, Check } from 'lucide-react';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/FooterSection';
import ScrollProgress from '@/components/ScrollProgress';
import BookCover3D from '@/components/BookCover3D';
import QuantityStepper from '@/components/QuantityStepper';
import { books } from '@/data/books';
import { useCart } from '@/lib/cart';
import { formatMoney } from '@/lib/money';

const labelClass = 'font-mono text-xs tracking-[0.2em] uppercase';

export default function BookProduct() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { add, buyNow } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const book = books.find((b) => b.id === bookId);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [bookId]);

  useEffect(() => {
    if (book) return undefined;
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, [book]);

  if (!book) {
    return (
      <div style={{ backgroundColor: '#E9ECEF', minHeight: '100vh' }}>
        <NavBar />
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <span className={labelClass} style={{ color: '#6B7280' }}>File not found</span>
          <h1 className="text-4xl font-black mt-4 mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
            This title isn’t in the vault.
          </h1>
          <Link to="/#vault" className={labelClass} style={{ color: '#1E5CFF', textDecoration: 'none' }}>
            Back to the vault
          </Link>
        </div>
      </div>
    );
  }

  const accent = book.accent || '#1E5CFF';
  const lineTotal = qty * (book.price || 0);

  const handleAdd = () => {
    add(book.id, qty);
    setAdded(true);
  };

  const handleBuyNow = () => {
    buyNow(book.id, qty);
    navigate('/checkout');
  };

  const specs = [
    { label: 'Format', value: 'Paperback' },
    { label: 'Series', value: book.series },
    { label: 'Publisher', value: 'Cachette Group LLC' },
    { label: 'Release', value: book.releaseDate },
  ];

  return (
    <div style={{ backgroundColor: '#E9ECEF' }}>
      <ScrollProgress />
      <NavBar />
      <main className="pt-14">
        <div
          className="px-6 md:px-12 py-4 flex items-center justify-between"
          style={{ borderBottom: '0.5px solid rgba(17,21,26,0.25)' }}
        >
          <Link
            to="/#vault"
            className={`${labelClass} flex items-center gap-2 hover:opacity-60 transition-opacity`}
            style={{ color: '#6B7280', textDecoration: 'none' }}
          >
            <ArrowLeft size={12} /> The Vault
          </Link>
          <span className={labelClass} style={{ color: '#6B7280' }}>
            Product / {book.title}
          </span>
        </div>

        <section className="px-6 md:px-12 py-12 md:py-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Cover */}
            <div>
              <div className="relative overflow-hidden p-8 md:p-12" style={{ backgroundColor: '#11151A' }}>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url(${book.bgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)',
                  }}
                />
                <div className="relative z-10">
                  <BookCover3D book={book} className="w-[62%] mx-auto" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
                {specs.map((spec) => (
                  <div key={spec.label} style={{ borderTop: '0.5px solid rgba(17,21,26,0.3)', paddingTop: '10px' }}>
                    <p className={`${labelClass} mb-1`} style={{ color: '#6B7280' }}>{spec.label}</p>
                    <p className="text-sm" style={{ color: '#11151A' }}>{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details + purchase */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="pulse-dot w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                <span className={labelClass} style={{ color: accent }}>
                  {book.released ? 'Paperback available' : 'Paperback pre-order'}
                </span>
              </div>

              <p className={`${labelClass} mb-2`} style={{ color: '#6B7280' }}>{book.series}</p>
              <h1
                className="text-4xl md:text-5xl font-black tracking-tight leading-[1] mb-3"
                style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
              >
                {book.title}
              </h1>
              <p className="text-sm italic mb-6" style={{ color: '#6B7280' }}>{book.tagline}</p>

              <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '14px', marginBottom: '28px' }}>
                <p className="text-sm italic" style={{ color: '#11151A' }}>“{book.quote}”</p>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2" style={{ borderTop: '0.5px solid rgba(17,21,26,0.3)', paddingTop: '14px' }}>
                    <BookOpen size={14} style={{ color: accent }} />
                    <h2 className={`${labelClass}`} style={{ color: accent }}>The Story</h2>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,21,26,0.8)' }}>{book.story}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2" style={{ borderTop: '0.5px solid rgba(17,21,26,0.3)', paddingTop: '14px' }}>
                    <Globe size={14} style={{ color: accent }} />
                    <h2 className={`${labelClass}`} style={{ color: accent }}>The World</h2>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,21,26,0.8)' }}>{book.world}</p>
                </div>
              </div>

              {/* Purchase panel */}
              <div className="p-5" style={{ border: '0.5px solid #11151A' }}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className={labelClass} style={{ color: '#6B7280' }}>Paperback</span>
                  <span className="text-2xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
                    {formatMoney(book.price)}
                  </span>
                </div>
                <p className="text-xs mb-5" style={{ color: '#6B7280' }}>
                  Shipping and tax included. Ships within 3–5 business days.
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <QuantityStepper value={qty} onChange={setQty} />
                  <span className="font-mono text-xs" style={{ color: '#6B7280' }}>
                    {qty} × {formatMoney(book.price)} = {formatMoney(lineTotal)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`${labelClass} py-3.5 transition-all hover:bg-[#11151A] hover:text-[#E9ECEF]`}
                    style={{ border: '0.5px solid #11151A', color: '#11151A', background: 'none', cursor: 'pointer' }}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className={`${labelClass} py-3.5 transition-all hover:opacity-85`}
                    style={{ backgroundColor: accent, color: '#E9ECEF', border: 'none', cursor: 'pointer' }}
                  >
                    {book.released ? 'Buy Now' : 'Pre-order Now'}
                  </button>
                </div>

                {added && (
                  <p className="font-mono text-xs flex items-center gap-2 mt-4" style={{ color: accent }}>
                    <Check size={12} /> Added to cart —{' '}
                    <Link to="/cart" style={{ color: '#1E5CFF' }}>View cart</Link>
                  </p>
                )}

                {!book.released && (
                  <p className={`${labelClass} flex items-center gap-1.5 mt-4`} style={{ color: '#6B7280' }}>
                    <Lock size={10} /> Releases {book.releaseDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}