import { Lock, ExternalLink, FileText } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function BookCard({ book, index, onOpenDossier }) {
  return (
    <div
      className="book-card group relative flex flex-col"
      style={{ borderTop: '0.5px solid #0A0D10' }}
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
          <div className="book-cover w-full aspect-[2/3] relative overflow-hidden shadow-lg">
            <Image
              src={book.coverUrl}
              alt={`${book.title} by ${book.author}`}
              className="w-full h-full"
              fittingType="fill"
              focalPointY={0.3}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: 'rgba(10,13,16,0.75)' }}
            >
              <div className="text-center">
                <FileText size={24} className="mx-auto mb-2" style={{ color: '#E35205' }} />
                <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#F4F4F2' }}>
                  Open Dossier
                </span>
              </div>
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
            style={{ fontFamily: 'Playfair Display, serif', color: '#0A0D10' }}
          >
            {book.title}
          </h3>
          <p className="text-sm italic mb-4" style={{ color: '#6B7280' }}>{book.tagline}</p>

          {/* Quote */}
          <div style={{ borderLeft: '2px solid #E35205', paddingLeft: '12px', marginBottom: '20px' }}>
            <p className="text-xs italic" style={{ color: '#0A0D10' }}>"{book.quote}"</p>
          </div>
        </div>

        {/* Transaction block */}
        <div style={{ borderTop: '0.5px solid #0A0D10', paddingTop: '16px' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#6B7280' }}>Transaction</span>
            {book.released ? (
              <span className="font-mono text-xs flex items-center gap-1" style={{ color: '#E35205' }}>
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
              style={{ border: '0.5px solid #0A0D10', color: '#0A0D10', background: 'none', cursor: 'pointer' }}
            >
              View Dossier
            </button>
            {book.released ? (
              <a
                href={book.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center font-mono text-xs tracking-[0.2em] uppercase py-3 transition-all hover:opacity-80 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#E35205', color: '#F4F4F2', textDecoration: 'none' }}
              >
                Secure Your Copy <ExternalLink size={10} />
              </a>
            ) : (
              <div
                className="w-full text-center font-mono text-xs tracking-widest uppercase py-3"
                style={{ backgroundColor: 'rgba(107,114,128,0.1)', color: '#6B7280', border: '0.5px solid #6B7280' }}
              >
                Locked — {book.releaseDate}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}