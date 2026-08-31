import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import BookCover3D from './BookCover3D';
import { books } from '@/data/books';

/**
 * Freida-style featured book hero: large cover + blurb + Buy / More Info.
 * Features the currently-released title.
 */
export default function FeaturedBook({ onOpenDossier }) {
  const book = books.find((b) => b.released) || books[0];

  return (
    <section id="featured" className="relative overflow-hidden" style={{ backgroundColor: '#E9ECEF' }}>
      {/* Faint atmospheric backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: `url(${book.bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(100%)',
      }} />

      <div className="relative px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Cover */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="w-[55%] md:w-[68%]">
              <div style={{ perspective: '1500px' }}>
                <motion.div
                  initial={{ opacity: 0, y: 70, rotateY: -32, rotateX: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0, scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <BookCover3D book={book} className="w-full" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="pulse-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#1E5CFF' }} />
              <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#1E5CFF' }}>
                Buy Now
              </span>
            </div>

            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#6B7280' }}>
              {book.series}
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
            >
              {book.title}
            </h1>
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#6B7280' }}>
              {book.genre}
            </p>

            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#11151A' }}>
              {book.story}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={book.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all hover:opacity-85"
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Buy Today <ExternalLink size={12} />
              </a>
              <button
                onClick={() => onOpenDossier(book)}
                className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all hover:bg-[#11151A] hover:text-[#E9ECEF]"
                style={{ border: '1px solid #11151A', color: '#11151A', background: 'none', cursor: 'pointer' }}
              >
                More Info <FileText size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}