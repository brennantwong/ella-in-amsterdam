import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/FooterSection';
import ScrollProgress from '@/components/ScrollProgress';
import { books } from '@/data/books';

export default function About() {
  return (
    <div style={{ backgroundColor: '#E9ECEF' }}>
      <ScrollProgress />
      <NavBar />
      <main className="pt-20">
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <span
              className="font-mono text-xs tracking-[0.35em] uppercase block mb-8"
              style={{ color: '#6B7280' }}
            >
              About the Series
            </span>

            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8"
              style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
            >
              About Ella in Amsterdam
            </h1>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: 'rgba(17,21,26,0.8)' }}>
              <p>
                Ella in Amsterdam is an international tech thriller series built around Ella
                Taylor, a young founder navigating the money, politics, and hidden loyalties of
                Europe’s most discreet boardrooms. This site is the series dossier: a vault of
                book files, previews, release dispatches, and a direct line to the desk behind
                the novels.
              </p>
              <p>
                Each novel follows a single pressure point in Ella’s career and turns it into a
                larger question about information. In Outside Money, a stolen pitch deck points
                toward a political scandal involving European old money and a royal family
                office. In Capital Call, an innocent-looking app contract pulls her into
                underground East Coast money and a difficult exit plan. In Heavy Carry, the story
                returns to where the partnership with Chelsea began, on a college campus full of
                unsolved mysteries. The throughline is always the same: information has a price,
                and loyalty is rarely free.
              </p>
              <p>
                The series is written for readers who like financial intrigue alongside cybercrime
                and travel: people who enjoy thrillers set in Amsterdam, New York, and the quieter
                capitals of European wealth, and who want the technical detail to hold up. Each
                book is designed to be read as a standalone case file, while the recurring cast
                rewards readers who follow the whole arc.
              </p>
              <p>
                The books are written by Désirée Cachette and published by Cachette Group LLC.
                Paperbacks, signed copies, and pre-orders are handled through Square, with digital
                editions available for Kindle. The site itself is maintained by the author’s small
                publishing desk: the same people who answer the contact line, run the briefing
                list, and send release updates.
              </p>
            </div>

            <div
              className="mt-12 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
              style={{ borderTop: '0.5px solid rgba(17,21,26,0.2)' }}
            >
              {[
                { label: 'Author', value: 'Désirée Cachette' },
                { label: 'Publisher', value: 'Cachette Group LLC' },
                { label: 'Genre', value: 'International Tech Thriller' },
                { label: 'Books', value: `${books.length} in series` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#6B7280' }}>
                    {item.label}
                  </p>
                  <p className="text-sm" style={{ color: '#11151A' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/"
                className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all hover:opacity-80"
                style={{ backgroundColor: '#11151A', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Enter the Vault
              </Link>
              <Link
                to="/contact"
                className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all hover:opacity-80"
                style={{ border: '0.5px solid #11151A', color: '#11151A', textDecoration: 'none' }}
              >
                Contact the Desk
              </Link>
            </div>
          </div>
        </section>
        <FooterSection />
      </main>
    </div>
  );
}