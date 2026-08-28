import InteractiveBook from './InteractiveBook';
import { Image } from '@/components/ui/image';

function Page({ children, tone = 'cream' }) {
  const ink = tone === 'ink';
  return (
    <div className="w-full h-full overflow-hidden" style={{ backgroundColor: ink ? '#11151A' : '#F5F2E8', color: ink ? '#F4F4F2' : '#11151A' }}>
      <div className="w-full h-full p-[8%] flex flex-col">{children}</div>
    </div>
  );
}

/**
 * Builds a preview flipbook for a book's data: cover, title page, overview,
 * story, world, and chapter index — fed to InteractiveBook as page nodes.
 */
export default function BookPreview({ book }) {
  const chapters = (book.chapters || []).slice(0, 6);

  const pages = [
    <div className="w-full h-full relative" key="cover">
      <Image src={book.coverUrl} alt={`${book.title} cover`} className="w-full h-full" fittingType="fill" focalPointY={0.4} />
    </div>,
    <Page key="title">
      <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: '#6B7280' }}>{book.series}</p>
      <div className="mt-auto">
        <h3 className="text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{book.title}</h3>
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-3" style={{ color: '#6B7280' }}>{book.author}</p>
      </div>
      <p className="text-[10px] italic mt-4" style={{ color: '#1E5CFF' }}>&ldquo;{book.quote}&rdquo;</p>
    </Page>,
    <Page key="overview">
      <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-3" style={{ color: '#6B7280' }}>File Overview</p>
      <p className="text-[12px] md:text-sm font-mono leading-relaxed">{book.tagline}</p>
      <div className="mt-auto pt-3" style={{ borderTop: '0.5px solid rgba(17,21,26,0.15)' }}>
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#6B7280' }}>{book.genre}</p>
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: '#6B7280' }}>{book.releaseDate}</p>
      </div>
    </Page>,
    <Page key="story">
      <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-3" style={{ color: '#6B7280' }}>The Story</p>
      <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(17,21,26,0.85)' }}>{book.story}</p>
    </Page>,
    <Page key="world">
      <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-3" style={{ color: '#6B7280' }}>The World</p>
      <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(17,21,26,0.85)' }}>{book.world}</p>
    </Page>,
    <Page key="chapters">
      <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-3" style={{ color: '#6B7280' }}>Chapter Index</p>
      <div className="space-y-2">
        {chapters.length > 0 ? chapters.map((ch) => (
          <div key={ch.num} className="flex gap-2">
            <span className="font-mono text-[10px] flex-shrink-0" style={{ color: '#1E5CFF' }}>{String(ch.num).padStart(2, '0')}</span>
            <span className="text-[10px] leading-snug">{ch.title}</span>
          </div>
        )) : <span className="text-[10px]" style={{ color: '#6B7280' }}>Chapters classified.</span>}
      </div>
    </Page>,
  ];

  return (
    <div className="w-full">
      <InteractiveBook pages={pages} mode="spread" className="mx-auto max-w-xl" ariaLabel={`Preview of ${book.title}`} />
    </div>
  );
}