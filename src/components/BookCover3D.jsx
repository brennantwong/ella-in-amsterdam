import { Image } from '@/components/ui/image';

const PAGE_LINES = `
  repeating-linear-gradient(to bottom,
    rgba(214,204,181,0.85) 0px,
    rgba(214,204,181,0.85) 1px,
    rgba(245,242,232,0) 2px,
    rgba(245,242,232,0) 4px),
  repeating-linear-gradient(to bottom,
    rgba(180,170,145,0.4) 0px,
    rgba(180,170,145,0.4) 1px,
    rgba(245,242,232,0) 5px,
    rgba(245,242,232,0) 6px),
  linear-gradient(to right, #ECE6D6 0%, #F5F2E8 35%, #E2D9C4 70%, #D6CCB5 100%)
`;

const PAGE_THICKNESS = 16; // px — depth of the text block

/**
 * Renders a trade paperback that reads as a real 3D object: a cream page
 * block with dense leaf lines sits behind the cover wrap (visible on the
 * right edge), and the front cover swings open on hover to reveal the
 * interior pages.
 */
export default function BookCover3D({ book, className = '' }) {
  return (
    <div
      className={`book-opens relative aspect-[2/3] ${className}`}
      style={{ perspective: '1700px' }}
    >
      {/* Book body — front-right viewing angle */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-22deg) rotateX(3deg)',
        }}
      >
        {/* Interior page stack (revealed when cover opens) */}
        <div
          className="book-pages absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-2px)`,
            backgroundColor: '#F5F2E8',
            borderRadius: '1px 3px 3px 1px',
            boxShadow: 'inset 5px 0 12px rgba(0,0,0,0.18), inset -2px 0 5px rgba(0,0,0,0.12)',
          }}
        >
          {/* Decorative page lines + title */}
          <div className="absolute inset-0 p-[12%] flex flex-col gap-[7%]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: '2px',
                  width: `${[100, 90, 96, 78, 88, 70][i]}%`,
                  backgroundColor: 'rgba(10,13,16,0.16)',
                }}
              />
            ))}
            <div className="mt-[8%]">
              <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(10,13,16,0.35)' }}>
                {book.series}
              </p>
              <p className="font-black text-[11px] leading-tight mt-[4%]" style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(10,13,16,0.5)' }}>
                {book.title}
              </p>
            </div>
          </div>
        </div>

        {/* Cover flap — hinged on the left, swings open on hover */}
        <div
          className="book-flap absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front face of flap (the cover wrap) */}
          <div
            className="flap-front absolute inset-0 overflow-hidden"
            style={{
              transform: `translateZ(${PAGE_THICKNESS}px)`,
              backgroundColor: '#0A0D10',
              borderRadius: '1px',
              boxShadow: '0 20px 45px -14px rgba(10,13,16,0.65)',
            }}
          >
            <Image
              src={book.coverUrl}
              alt={`${book.title} by ${book.author}`}
              className="w-full h-full block"
              fittingType="fill"
              focalPointY={0.4}
            />
            {/* Gloss */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(0,0,0,0.26) 100%)',
              }}
            />
            {/* Spine shadow on left */}
            <div className="absolute top-0 bottom-0 left-0 pointer-events-none" style={{ width: '16px', background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))' }} />
            {/* Thin dark line separating cover from page block (right edge) */}
            <div className="absolute top-0 bottom-0 right-0 pointer-events-none" style={{ width: '2px', background: 'rgba(10,13,16,0.85)' }} />
          </div>

          {/* Inside of cover (cream) */}
          <div
            className="flap-back absolute inset-0"
            style={{
              transform: `rotateY(180deg) translateZ(${PAGE_THICKNESS}px)`,
              backgroundColor: '#ECE6D6',
              borderRadius: '1px',
            }}
          >
            <div className="absolute inset-0 p-[14%] flex flex-col justify-end">
              <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(10,13,16,0.4)' }}>{book.author}</p>
              <p className="font-black text-[12px] leading-tight mt-1" style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(10,13,16,0.5)' }}>{book.title}</p>
            </div>
          </div>

          {/* Page block on the right edge — the visible text block */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              right: 0,
              width: `${PAGE_THICKNESS}px`,
              transform: 'rotateY(90deg)',
              transformOrigin: 'left center',
              background: PAGE_LINES,
              boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.3)',
            }}
          />
          {/* Top page edge */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: 0,
              height: `${PAGE_THICKNESS}px`,
              transform: 'rotateX(90deg)',
              transformOrigin: 'center bottom',
              background: 'linear-gradient(to right, #D6CCB5 0%, #F5F2E8 50%, #D6CCB5 100%)',
            }}
          />
          {/* Bottom page edge */}
          <div
            className="absolute left-0 right-0"
            style={{
              bottom: 0,
              height: `${PAGE_THICKNESS}px`,
              transform: 'rotateX(-90deg)',
              transformOrigin: 'center top',
              background: 'linear-gradient(to right, #C9BD9F 0%, #E2D9C4 50%, #C9BD9F 100%)',
            }}
          />
          {/* Spine (left edge) */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: 0,
              width: `${PAGE_THICKNESS}px`,
              transform: 'rotateY(-90deg)',
              transformOrigin: 'right center',
              background: 'linear-gradient(to bottom, #0A0D10, #1c1f23, #0A0D10)',
            }}
          />
        </div>
      </div>

      {/* Contact shadow */}
      <div
        className="absolute"
        style={{
          left: '6%',
          right: '2%',
          bottom: '-12px',
          height: '24px',
          background: 'radial-gradient(ellipse at center, rgba(10,13,16,0.45) 0%, rgba(10,13,16,0) 70%)',
          transform: 'scaleY(0.5) translateX(10px)',
          filter: 'blur(9px)',
          zIndex: -1,
        }}
      />
    </div>
  );
}