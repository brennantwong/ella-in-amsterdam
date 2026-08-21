import { useState } from 'react';
import { books } from '@/data/books';
import BookCard from './BookCard';
import DossierPanel from './DossierPanel';

export default function VaultSection() {
  const [activeDossier, setActiveDossier] = useState(null);

  return (
    <>
      <section id="vault" style={{ backgroundColor: '#F4F4F2', borderTop: '0.5px solid #0A0D10' }}>
        {/* Section header */}
        <div
          className="px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4"
          style={{ borderBottom: '0.5px solid #0A0D10' }}
        >
          <div>
            <span className="font-mono text-xs tracking-[0.35em] uppercase block mb-2" style={{ color: '#6B7280' }}>
              02 — The Vault
            </span>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-none"
              style={{ fontFamily: 'Playfair Display, serif', color: '#0A0D10' }}
            >
              Classified Files
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: '#6B7280', lineHeight: '1.6' }}>
            Each title is a dossier. Click the cover to access the full briefing, then acquire your copy below.
          </p>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderBottom: '0.5px solid #0A0D10' }}>
          {books.map((book, i) => (
            <div
              key={book.id}
              style={{
                borderRight: i < books.length - 1 ? '0.5px solid #0A0D10' : 'none',
              }}
            >
              <BookCard book={book} index={i} onOpenDossier={setActiveDossier} />
            </div>
          ))}
        </div>
      </section>

      {/* Dossier panel overlay */}
      {activeDossier && (
        <DossierPanel book={activeDossier} onClose={() => setActiveDossier(null)} />
      )}
    </>
  );
}