import { ExternalLink, Mail } from 'lucide-react';

const channels = [
  {
    label: 'Square',
    sub: 'Buy Now',
    href: 'https://square.link/u/QSrx1eEG',
    external: true,
    icon: ExternalLink,
    primary: true,
  },
  {
    label: 'Dispatches',
    sub: 'Join Newsletter',
    href: '#newsletter',
    external: false,
    icon: Mail,
  },
];

export default function WhereToBuySection() {
  return (
    <section id="acquire" style={{ backgroundColor: '#F4F4F2', borderTop: '0.5px solid #0A0D10' }}>
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto text-center">
        <span className="font-mono text-xs tracking-[0.35em] uppercase block mb-3" style={{ color: '#6B7280' }}>
          Where to Acquire
        </span>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-12"
          style={{ fontFamily: 'Playfair Display, serif', color: '#0A0D10' }}
        >
          Secure Your Copy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center justify-center gap-3 py-10 px-6 transition-all"
                style={{
                  border: c.primary ? '1px solid #E35205' : '1px solid #0A0D10',
                  backgroundColor: c.primary ? '#E35205' : 'transparent',
                  color: c.primary ? '#F4F4F2' : '#0A0D10',
                  textDecoration: 'none',
                }}
              >
                <Icon size={20} />
                <span className="font-mono text-xs tracking-[0.25em] uppercase">{c.label}</span>
                <span className="text-xs opacity-70">{c.sub}</span>
              </a>
            );
          })}
        </div>

        <p className="font-mono text-xs mt-8" style={{ color: '#6B7280' }}>
          Signed copies, when available, through the author site.
        </p>
      </div>
    </section>
  );
}