import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const navItems = [
  { label: 'The Vault', href: '#vault' },
  { label: 'About', to: '/about' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Contact', to: '/contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-[3px] left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 h-14"
        style={{ backgroundColor: 'rgba(233,236,239,0.95)', backdropFilter: 'blur(8px)', borderBottom: '0.5px solid #11151A' }}
      >
        <a href="#featured" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <span className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: '#6B7280' }}>Ella in Amsterdam</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => {
            const cls = "text-xs font-mono tracking-[0.2em] uppercase transition-colors hover:opacity-60";
            const sty = { color: '#11151A', textDecoration: 'none' };
            return item.to ? (
              <Link key={item.label} to={item.to} className={cls} style={sty}>{item.label}</Link>
            ) : (
              <a key={item.label} href={item.href} className={cls} style={sty}>{item.label}</a>
            );
          })}
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
          style={{ color: '#11151A' }}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* Full-screen menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: '#11151A' }}
        >
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '0.5px solid #6B7280' }}>
            <span className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: '#6B7280' }}>Contents</span>
            <button onClick={() => setOpen(false)} style={{ color: '#E9ECEF' }} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col justify-center flex-1 px-12 gap-8">
            {navItems.map((item, i) => {
              const cls = "flex items-baseline gap-4 group";
              const inner = (
                <>
                  <span className="font-mono text-xs" style={{ color: '#6B7280' }}>0{i + 1}</span>
                  <span
                    className="text-4xl font-bold tracking-tight group-hover:opacity-70 transition-opacity"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#E9ECEF' }}
                  >
                    {item.label}
                  </span>
                </>
              );
              return item.to ? (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className={cls} style={{ textDecoration: 'none' }}>{inner}</Link>
              ) : (
                <a key={item.label} href={item.href} onClick={() => setOpen(false)} className={cls} style={{ textDecoration: 'none' }}>{inner}</a>
              );
            })}
            <a
              href="https://square.link/u/QSrx1eEG"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-mono tracking-[0.2em] uppercase px-6 py-3 transition-all hover:opacity-80"
              style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF', textDecoration: 'none', width: 'fit-content' }}
            >
              Acquire a Copy
            </a>
          </div>
        </div>
      )}
    </>
  );
}