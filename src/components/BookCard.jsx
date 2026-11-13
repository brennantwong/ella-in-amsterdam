import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCover3D from './BookCover3D';

export default function BookCard({ book, index, onOpenDossier }) {
  return (
    <div
      className="book-card group relative flex flex-col"
      style={{ borderTop: '0.5px solid #11151A' }}
    >
      {/* Background image on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: `url(${book.bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
        }}
      />

      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        {/* Index + genre */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs tracking-[0.3em]" style={{ color: '#6B7280' }}>
            {String(index + 1).padStart(2, '0')} / 03
          </span>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#6B7280' }}>
            {book.genre}
          </span>
        </div>

        {/* Book cover — clickable */}
        <button
          onClick={() => onOpenDossier(book)}
          className="redact-hover w-full mb-6 group/cover relative overflow-hidden"
          style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
          aria-label={`Open dossier for ${book.title}`}
        >
          <div className="book-cover w-full aspect-[2/3] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <BookCover3D book={book} className="w-[80%]" />
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: '#6B7280' }}>
                Click to open dossier
              </span>
            </div>
          </div>
        </button>

        {/* Book info */}
        <div className="flex-1">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-1" style={{ color: '#6B7280' }}>
            {book.series}
          </p>
          <h3
            className="text-2xl md:text-3xl font-black tracking-tight mb-2 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
          >
            {book.title}
          </h3>
          <p className="text-sm italic mb-4" style={{ color: '#6B7280' }}>{book.tagline}</p>

          {/* Quote */}
          <div style={{ borderLeft: '2px solid #1E5CFF', paddingLeft: '12px', marginBottom: '20px' }}>
            <p className="text-xs italic" style={{ color: '#11151A' }}>"{book.quote}"</p>
          </div>
        </div>

        {/* Transaction block */}
        <div style={{ borderTop: '0.5px solid #11151A', paddingTop: '16px' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#6B7280' }}>Transaction</span>
            {book.released ? (
              <span className="font-mono text-xs flex items-center gap-1" style={{ color: '#1E5CFF' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Available
              </span>
            ) : (
              <span className="font-mono text-xs flex items-center gap-1" style={{ color: '#6B7280' }}>
                <Lock size={10} />
                {book.releaseDate}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => onOpenDossier(book)}
              className="w-full font-mono text-xs tracking-[0.2em] uppercase py-3 transition-all hover:opacity-70"
              style={{ border: '0.5px solid #11151A', color: '#11151A', background: 'none', cursor: 'pointer' }}
            >
              View Dossier
            </button>
            {!book.released && (
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: '#6B7280' }}>
                Pre-order available
              </p>
            )}
            <Link
              to={`/books/${book.id}`}
              className="block w-full text-center font-mono text-xs tracking-[0.15em] uppercase py-3 transition-all hover:opacity-80"
              style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
            >
              {book.released ? 'Shop Paperback' : 'Pre-order Paperback'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}