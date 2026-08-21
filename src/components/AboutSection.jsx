export default function AboutSection() {
  return (
    <section id="about" style={{ backgroundColor: '#0A0D10', borderTop: '0.5px solid rgba(244,244,242,0.1)' }}>
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <span className="font-mono text-xs tracking-[0.35em] uppercase block mb-8" style={{ color: '#6B7280' }}>
            03 — Intelligence Brief
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {/* Left */}
            <div>
              <h2
                className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
                style={{ fontFamily: 'Playfair Display, serif', color: '#F4F4F2' }}
              >
                About the Series
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(244,244,242,0.75)' }}>
                Ella in Amsterdam is an international thriller series about Ella Taylor — a sharp, resourceful woman navigating the shadowy intersections of technology, finance, and power across the world's most influential cities.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(244,244,242,0.75)' }}>
                Written by Désirée Cachette and published by Cachette Group LLC, each book peels back another layer of a world where information is currency and loyalty has a price.
              </p>
            </div>

            {/* Right — data block */}
            <div className="space-y-0">
              {[
                { label: 'Author', value: 'Désirée Cachette' },
                { label: 'Publisher', value: 'Cachette Group LLC' },
                { label: 'Genre', value: 'International Tech Thriller' },
                { label: 'Setting', value: 'Amsterdam · New York · Global' },
                { label: 'Books in Series', value: '3 (2026)' },
                { label: 'Website', value: 'ellainamsterdam.com' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between py-4"
                  style={{ borderTop: '0.5px solid rgba(107,114,128,0.4)' }}
                >
                  <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#6B7280' }}>
                    {item.label}
                  </span>
                  <span className="text-sm text-right" style={{ color: '#F4F4F2' }}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: '0.5px solid rgba(107,114,128,0.4)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}