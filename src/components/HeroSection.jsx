import { Image } from '@/components/ui/image';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0A0D10' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://media.base44.com/images/public/6a88cd622b5ecb032bde5c51/51751996e_generated_bb6d5a93.png"
          alt="Amsterdam canal at twilight"
          className="w-full h-full"
          fittingType="fill"
          focalPointY={0.4}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,13,16,0.5) 0%, rgba(10,13,16,0.3) 40%, rgba(10,13,16,0.75) 100%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-6xl mx-auto w-full">
        {/* Series label */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 opacity-50" style={{ backgroundColor: '#F4F4F2' }} />
          <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#6B7280' }}>
            Désirée Cachette · Cachette Group LLC
          </span>
          <div className="h-px w-12 opacity-50" style={{ backgroundColor: '#F4F4F2' }} />
        </div>

        {/* Main title */}
        <h1
          className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tight leading-none mb-2"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: 'transparent',
            WebkitTextStroke: '1.5px #F4F4F2',
            textStroke: '1.5px #F4F4F2',
          }}
        >
          ELLA IN
        </h1>
        <h1
          className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tight leading-none mb-8"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#F4F4F2',
          }}
        >
          AMSTERDAM
        </h1>

        {/* Latest book indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="pulse-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#E35205' }} />
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#E35205' }}>
            Latest: Outside Money — Jan 23, 2026
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl max-w-xl mx-auto mb-10 opacity-80"
          style={{ color: '#F4F4F2', lineHeight: '1.6', fontStyle: 'italic' }}
        >
          An international thriller series about a woman learning deep secrets about money and people.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#vault"
            className="font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all hover:opacity-80"
            style={{ backgroundColor: '#E35205', color: '#F4F4F2', textDecoration: 'none' }}
          >
            Access the Vault
          </a>
          <a
            href="https://square.link/u/QSrx1eEG"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all hover:bg-white hover:text-black"
            style={{ border: '1px solid rgba(244,244,242,0.5)', color: '#F4F4F2', textDecoration: 'none' }}
          >
            Acquire a Copy
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#F4F4F2' }}>Scroll</span>
        <div className="w-px h-8 animate-pulse" style={{ backgroundColor: '#F4F4F2' }} />
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0" style={{ borderBottom: '0.5px solid rgba(244,244,242,0.2)' }} />
    </section>
  );
}