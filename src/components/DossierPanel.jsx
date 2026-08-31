import { X, BookOpen, Globe, Lock, ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';
import BookCover3D from './BookCover3D';
import BookPreview from './BookPreview';

export default function DossierPanel({ book, onClose }) {
  return (
    <div
      className="dossier-panel fixed inset-0 z-50 flex"
      style={{ backgroundColor: 'rgba(17,21,26,0.97)' }}
    >
      {/* Left — Book cover */}
      <div
        className="hidden lg:flex w-2/5 flex-col items-center justify-center p-12 relative"
        style={{ borderRight: '0.5px solid #6B7280' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${book.bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)',
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <BookCover3D book={book} className="w-52" />
          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#6B7280' }}>
              {book.series}
            </p>
            <h2
              className="text-3xl font-black tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: '#E9ECEF' }}
            >
              {book.title}
            </h2>
            <p className="text-sm mt-1 italic" style={{ color: '#1E5CFF' }}>{book.quote}</p>
          </div>

          {/* Buy block */}
          <div className="w-full mt-4 p-4" style={{ border: '0.5px solid #6B7280' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#6B7280' }}>
                Status
              </span>
              {book.released ? (
                <span className="font-mono text-xs tracking-widest" style={{ color: '#1E5CFF' }}>
                  ● Available
                </span>
              ) : (
                <span className="font-mono text-xs tracking-widest flex items-center gap-1" style={{ color: '#6B7280' }}>
                  <Lock size={10} /> Locked: {book.releaseDate}
                </span>
              )}
            </div>
            {book.released ? (
              <a
                href={book.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-mono text-xs tracking-[0.2em] uppercase py-4 transition-all hover:opacity-80"
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Secure Your Copy <ExternalLink size={10} className="inline ml-1" />
              </a>
            ) : (
              <a
                href={book.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-mono text-xs tracking-[0.2em] uppercase py-4 transition-all hover:opacity-80"
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Pre Order <ExternalLink size={10} className="inline ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right — Dossier content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#6B7280 transparent' }}>
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-6 md:px-10 py-4 z-10"
          style={{ backgroundColor: 'rgba(17,21,26,0.97)', borderBottom: '0.5px solid #6B7280' }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#6B7280' }}>
              Classified Dossier
            </span>
            <span className="font-mono text-xs" style={{ color: '#1E5CFF' }}>— {book.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-opacity hover:opacity-60"
            style={{ color: '#E9ECEF' }}
            aria-label="Close dossier"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 md:px-10 py-8 space-y-8 max-w-2xl">
          {/* Mobile cover */}
          <div className="lg:hidden flex items-center gap-4">
            <BookCover3D book={book} className="w-20 flex-shrink-0" />
            <div>
              <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#6B7280' }}>{book.series}</p>
              <h2 className="text-xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#E9ECEF' }}>{book.title}</h2>
              <p className="text-xs italic mt-1" style={{ color: '#1E5CFF' }}>{book.quote}</p>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ borderLeft: '2px solid #1E5CFF', paddingLeft: '16px' }}>
            <p className="text-base font-mono tracking-wide uppercase" style={{ color: '#E9ECEF' }}>{book.tagline}</p>
          </div>

          {/* Preview flipbook — drag a page corner to flip */}
          <div>
            <div className="flex items-center gap-2 mb-3" style={{ borderTop: '0.5px solid #6B7280', paddingTop: '20px' }}>
              <h3 className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: '#1E5CFF' }}>Preview</h3>
            </div>
            <p className="text-xs mb-5" style={{ color: '#6B7280' }}>
              Drag a page corner to flip — or tap the right side to turn forward, left to go back.
            </p>
            <BookPreview book={book} />
          </div>

          {/* Genre + release */}
          <div className="grid grid-cols-2 gap-4">
            <div style={{ borderTop: '0.5px solid #6B7280', paddingTop: '12px' }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#6B7280' }}>Genre</p>
              <p className="text-sm" style={{ color: '#E9ECEF' }}>{book.genre}</p>
            </div>
            <div style={{ borderTop: '0.5px solid #6B7280', paddingTop: '12px' }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#6B7280' }}>Release</p>
              <p className="text-sm" style={{ color: '#E9ECEF' }}>{book.releaseDate}</p>
            </div>
          </div>

          {/* Story */}
          <div>
            <div className="flex items-center gap-2 mb-3" style={{ borderTop: '0.5px solid #6B7280', paddingTop: '20px' }}>
              <BookOpen size={14} style={{ color: '#1E5CFF' }} />
              <h3 className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: '#1E5CFF' }}>The Story</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(233,236,239,0.8)' }}>{book.story}</p>
          </div>

          {/* World */}
          <div>
            <div className="flex items-center gap-2 mb-3" style={{ borderTop: '0.5px solid #6B7280', paddingTop: '20px' }}>
              <Globe size={14} style={{ color: '#1E5CFF' }} />
              <h3 className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: '#1E5CFF' }}>The World</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(233,236,239,0.8)' }}>{book.world}</p>
          </div>

          {/* Chapters (if available) */}
          {book.chapters && book.chapters.length > 0 && (
            <div>
              <div style={{ borderTop: '0.5px solid #6B7280', paddingTop: '20px' }}>
                <h3 className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#1E5CFF' }}>
                  Chapter Index
                </h3>
                <div className="space-y-3">
                  {book.chapters.map(ch => (
                    <div
                      key={ch.num}
                      className="flex gap-4 pb-3"
                      style={{ borderBottom: '0.5px solid rgba(107,114,128,0.3)' }}
                    >
                      <span className="font-mono text-xs w-6 flex-shrink-0 mt-0.5" style={{ color: '#1E5CFF' }}>
                        {String(ch.num).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#E9ECEF' }}>{ch.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{ch.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile buy block */}
          <div className="lg:hidden p-4 mt-4" style={{ border: '0.5px solid #6B7280' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#6B7280' }}>Status</span>
              {book.released ? (
                <span className="font-mono text-xs" style={{ color: '#1E5CFF' }}>● Available</span>
              ) : (
                <span className="font-mono text-xs flex items-center gap-1" style={{ color: '#6B7280' }}>
                  <Lock size={10} /> {book.releaseDate}
                </span>
              )}
            </div>
            {book.released ? (
              <a
                href={book.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-mono text-xs tracking-[0.2em] uppercase py-4"
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Secure Your Copy
              </a>
            ) : (
              <a
                href={book.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-mono text-xs tracking-widest uppercase py-4"
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Pre Order
              </a>
            )}
          </div>

          <div className="pb-16" />
        </div>
      </div>
    </div>
  );
}