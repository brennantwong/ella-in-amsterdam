export default function FooterSection() {
  return (
    <footer
      style={{ backgroundColor: '#11151A', borderTop: '0.5px solid rgba(233,236,239,0.1)' }}
    >
      <div className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: '#6B7280' }}>Series</p>
              <h3
                className="text-xl font-black mb-2"
                style={{ fontFamily: 'Playfair Display, serif', color: '#E9ECEF' }}
              >
                Ella in Amsterdam
              </h3>
              <p className="text-xs" style={{ color: '#6B7280', lineHeight: '1.6' }}>
                An international thriller series by Désirée Cachette.
              </p>
            </div>

            {/* Books */}
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: '#6B7280' }}>The Files</p>
              <div className="space-y-2">
                {[
                  { title: 'Outside Money', date: 'Jan 2026' },
                  { title: 'Capital Call', date: 'Oct 2026' },
                  { title: 'Heavy Carry', date: 'Nov 2026' },
                ].map(b => (
                  <div key={b.title} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'rgba(233,236,239,0.8)' }}>{b.title}</span>
                    <span className="font-mono text-xs" style={{ color: '#6B7280' }}>{b.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acquire */}
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color: '#6B7280' }}>Acquire</p>
              <a
                href="https://square.link/u/QSrx1eEG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-xs tracking-[0.2em] uppercase px-5 py-3 transition-all hover:opacity-80 mb-3"
                style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none' }}
              >
                Buy on Square
              </a>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                <a
                  href="https://www.ellainamsterdam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6B7280', textDecoration: 'none' }}
                  className="hover:text-white transition-colors"
                >
                  ellainamsterdam.com
                </a>
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6"
            style={{ borderTop: '0.5px solid rgba(107,114,128,0.3)' }}
          >
            <span className="font-mono text-xs" style={{ color: '#6B7280' }}>
              © 2026 Cachette Group LLC. All rights reserved.
            </span>
            <span className="font-mono text-xs" style={{ color: '#6B7280' }}>
              Désirée Cachette
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}