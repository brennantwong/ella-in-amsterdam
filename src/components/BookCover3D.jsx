import { Image } from '@/components/ui/image';

/**
 * Renders a book that opens on hover: the front cover swings open
 * (hinged on the left spine) to reveal cream interior pages.
 */
export default function BookCover3D({ book, className = '' }) {
  return (
    <div
      className={`book-opens relative aspect-[2/3] ${className}`}
      style={{ perspective: '1600px' }}
    >
      {/* Book body — slight 3D tilt */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-18deg) rotateX(3deg)',
        }}
      >
        {/* Interior page stack (revealed when cover opens) */}
        <div
          className="book-pages absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-1px)',
            backgroundColor: '#f5edd9',
            borderRadius: '2px',
            boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.15), inset -2px 0 4px rgba(0,0,0,0.1)',
          }}
        >
          {/* Page lines */}
          <div className="absolute inset-0 p-[12%] flex flex-col gap-[7%]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: '2px',
                  width: `${[100, 92, 96, 80, 88, 70, 94][i]}%`,
                  backgroundColor: 'rgba(10,13,16,0.18)',
                }}
              />
            ))}
            <div className="mt-[6%]">
              <p
                className="font-mono text-[7px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(10,13,16,0.35)' }}
              >
                {book.series}
              </p>
              <p
                className="font-black text-[10px] leading-tight mt-[4%]"
                style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(10,13,16,0.55)' }}
              >
                {book.title}
              </p>
            </div>
          </div>
          {/* Right-edge page block (visible behind opening cover) */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              right: 0,
              width: '26px',
              transform: 'rotateY(90deg)',
              transformOrigin: 'left center',
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0.05) 2px), linear-gradient(to right, #efe5d2 0%, #f5edd9 30%, #c9bd9f 100%)',
              boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.3)',
            }}
          />
        </div>

        {/* Cover flap — hinged on the left, swings open on hover */}
        <div
          className="book-flap absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front face of flap (the cover art) */}
          <div
            className="flap-front absolute inset-0 overflow-hidden"
            style={{
              transform: 'translateZ(2px)',
              backgroundColor: '#0A0D10',
              borderRadius: '2px',
              boxShadow: '0 18px 40px -12px rgba(10,13,16,0.6)',
            }}
          >
            <Image
              src={book.coverUrl}
              alt={`${book.title} by ${book.author}`}
              className="w-full h-full block"
              fittingType="fill"
              focalPointY={0.35}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(0,0,0,0.28) 100%)',
              }}
            />
            {/* Spine shadow on left edge of cover */}
            <div
              className="absolute top-0 bottom-0 left-0 pointer-events-none"
              style={{
                width: '14px',
                background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))',
              }}
            />
          </div>

          {/* Back face of flap (inside of cover, cream) */}
          <div
            className="flap-back absolute inset-0"
            style={{
              transform: 'rotateY(180deg) translateZ(2px)',
              backgroundColor: '#efe5d2',
              borderRadius: '2px',
            }}
          >
            <div className="absolute inset-0 p-[14%] flex flex-col justify-end">
              <p
                className="font-mono text-[7px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(10,13,16,0.4)' }}
              >
                {book.author}
              </p>
              <p
                className="font-black text-[12px] leading-tight mt-1"
                style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(10,13,16,0.5)' }}
              >
                {book.title}
              </p>
            </div>
          </div>

          {/* Page thickness on right edge of the cover flap (closed look) */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              right: 0,
              width: '24px',
              transform: 'rotateY(90deg)',
              transformOrigin: 'left center',
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0.05) 2px), linear-gradient(to right, #efe5d2 0%, #f5edd9 30%, #c9bd9f 100%)',
              boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>

      {/* Contact shadow */}
      <div
        className="absolute"
        style={{
          left: '4%',
          right: '4%',
          bottom: '-10px',
          height: '22px',
          background: 'radial-gradient(ellipse at center, rgba(10,13,16,0.5) 0%, rgba(10,13,16,0) 70%)',
          transform: 'scaleY(0.55) translateX(8px)',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      />
    </div>
  );
}