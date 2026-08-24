import { Image } from '@/components/ui/image';

const DEPTH = 32; // total book thickness in px

// Dense horizontal "leaf" striations for the page-block edges
const PAGE_LINES = `
  repeating-linear-gradient(to bottom,
    rgba(214,204,181,0.85) 0px, rgba(214,204,181,0.85) 1px,
    rgba(245,242,232,0) 2px, rgba(245,242,232,0) 4px),
  repeating-linear-gradient(to bottom,
    rgba(180,170,145,0.4) 0px, rgba(180,170,145,0.4) 1px,
    rgba(245,242,232,0) 6px, rgba(245,242,232,0) 7px),
  linear-gradient(to right, #ECE6D6 0%, #F5F2E8 35%, #E2D9C4 70%, #D6CCB5 100%)
`;

// Page leaves that riffle open in sequence on hover (flipbook)
const LEAVES = [
  { z: DEPTH - 6, delay: 0.12 },
  { z: DEPTH - 13, delay: 0.22 },
  { z: DEPTH - 20, delay: 0.32 },
  { z: DEPTH - 27, delay: 0.42 },
];

/**
 * A thick trade paperback. On hover the front cover swings open, then the
 * interior page leaves riffle open in sequence (flipbook), revealing the
 * title page beneath.
 */
export default function BookCover3D({ book, className = '' }) {
  return (
    <div
      className={`book-opens relative aspect-[2/3] ${className}`}
      style={{ perspective: '1800px' }}
    >
      {/* Book body — front-right viewing angle */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-24deg) rotateX(3deg)',
        }}
      >
        {/* Title page (back of stack, revealed last) */}
        <div
          className="book-pages absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: '#F5F2E8',
            borderRadius: '1px 2px 2px 1px',
            boxShadow: 'inset 6px 0 14px rgba(0,0,0,0.18)',
          }}
        >
          <div className="absolute inset-0 p-[12%] flex flex-col gap-[6%]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ height: '2px', width: `${[100, 88, 96, 74, 90][i]}%`, backgroundColor: 'rgba(10,13,16,0.16)' }} />
            ))}
            <div className="mt-[10%]">
              <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(10,13,16,0.35)' }}>{book.series}</p>
              <p className="font-black text-[12px] leading-tight mt-[5%]" style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(10,13,16,0.55)' }}>{book.title}</p>
              <p className="font-mono text-[6px] tracking-[0.15em] uppercase mt-[6%]" style={{ color: 'rgba(10,13,16,0.3)' }}>{book.author}</p>
            </div>
          </div>
        </div>

        {/* Flipping page leaves (flipbook) */}
        {LEAVES.map((leaf, i) => (
          <div
            key={i}
            className="leaf absolute inset-0"
            style={{
              '--z': `${leaf.z}px`,
              '--delay': `${leaf.delay}s`,
              backgroundColor: i % 2 === 0 ? '#F5F2E8' : '#EFE8D6',
              borderRadius: '1px',
              boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.08)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-0 p-[12%] flex flex-col gap-[8%]">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} style={{ height: '2px', width: `${[100, 92, 80, 96][j]}%`, backgroundColor: 'rgba(10,13,16,0.12)' }} />
              ))}
            </div>
            <span className="absolute bottom-[8%] right-[10%] font-mono text-[7px]" style={{ color: 'rgba(10,13,16,0.25)' }}>
              {i + 1}
            </span>
          </div>
        ))}

        {/* Cover flap — hinged on left, opens first */}
        <div
          className="book-flap absolute inset-0"
          style={{ '--z': `${DEPTH}px`, transformStyle: 'preserve-3d' }}
        >
          {/* Front face (cover wrap) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundColor: '#0A0D10',
              borderRadius: '1px',
              boxShadow: '0 22px 48px -14px rgba(10,13,16,0.7)',
            }}
          >
            <Image
              src={book.coverUrl}
              alt={`${book.title} by ${book.author}`}
              className="w-full h-full block"
              fittingType="fill"
              focalPointY={0.4}
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(105deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(0,0,0,0.26) 100%)' }} />
            {/* Spine shadow on left */}
            <div className="absolute top-0 bottom-0 left-0 pointer-events-none" style={{ width: '16px', background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))' }} />
            {/* Thin dark line separating cover from page block */}
            <div className="absolute top-0 bottom-0 right-0 pointer-events-none" style={{ width: '2px', background: 'rgba(10,13,16,0.85)' }} />
          </div>
          {/* Inside of cover (cream) */}
          <div
            className="absolute inset-0"
            style={{
              transform: 'rotateY(180deg)',
              backgroundColor: '#ECE6D6',
              borderRadius: '1px',
            }}
          >
            <div className="absolute inset-0 p-[14%] flex flex-col justify-end">
              <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(10,13,16,0.4)' }}>{book.author}</p>
              <p className="font-black text-[12px] leading-tight mt-1" style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(10,13,16,0.5)' }}>{book.title}</p>
            </div>
          </div>
        </div>

        {/* Right-edge page block (visible thickness) */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            right: 0,
            width: `${DEPTH}px`,
            transform: 'rotateY(90deg)',
            transformOrigin: 'left center',
            background: PAGE_LINES,
            boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.32)',
          }}
        />
        {/* Top edge */}
        <div
          className="absolute left-0 right-0"
          style={{ top: 0, height: `${DEPTH}px`, transform: 'rotateX(90deg)', transformOrigin: 'center bottom', background: 'linear-gradient(to right, #D6CCB5 0%, #F5F2E8 50%, #D6CCB5 100%)' }}
        />
        {/* Bottom edge */}
        <div
          className="absolute left-0 right-0"
          style={{ bottom: 0, height: `${DEPTH}px`, transform: 'rotateX(-90deg)', transformOrigin: 'center top', background: 'linear-gradient(to right, #C9BD9F 0%, #E2D9C4 50%, #C9BD9F 100%)' }}
        />
        {/* Spine */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: 0, width: `${DEPTH}px`, transform: 'rotateY(-90deg)', transformOrigin: 'right center', background: 'linear-gradient(to bottom, #0A0D10, #1c1f23, #0A0D10)' }}
        />
      </div>

      {/* Contact shadow */}
      <div
        className="absolute"
        style={{
          left: '6%', right: '2%', bottom: '-14px', height: '26px',
          background: 'radial-gradient(ellipse at center, rgba(10,13,16,0.45) 0%, rgba(10,13,16,0) 70%)',
          transform: 'scaleY(0.5) translateX(10px)',
          filter: 'blur(9px)',
          zIndex: -1,
        }}
      />
    </div>
  );
}