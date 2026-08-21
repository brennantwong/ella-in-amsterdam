import { Image } from '@/components/ui/image';

/**
 * Renders a book cover as a physical 3D trade paperback:
 * front face + visible page block on the right edge + soft drop shadow.
 */
export default function BookCover3D({ book, className = '', interactive = false }) {
  return (
    <div
      className={`book-3d-scene relative ${className}`}
      style={{ perspective: '1400px' }}
    >
      <div
        className="book-3d relative transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-22deg) rotateX(2deg)',
        }}
      >
        {/* Front cover face */}
        <div
          className="book-3d-front relative overflow-hidden shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: '#0A0D10',
            borderRadius: '2px',
          }}
        >
          <Image
            src={book.coverUrl}
            alt={`${book.title} by ${book.author}`}
            className="w-full h-full block"
            fittingType="fill"
            focalPointY={0.35}
          />
          {/* Subtle gloss */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(0,0,0,0.25) 100%)',
            }}
          />
        </div>

        {/* Page block (right edge thickness) */}
        <div
          className="book-3d-pages absolute top-0 right-0 bottom-0"
          style={{
            width: '22px',
            transform: 'rotateY(90deg) translateZ(11px)',
            transformOrigin: 'left center',
            background:
              'repeating-linear-gradient(to bottom, #f3ead8 0px, #efe5d2 1px, #f3ead8 3px), linear-gradient(to right, #d8cdb5 0%, #f3ead8 40%, #c9bd9f 100%)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.25)',
          }}
        />
        {/* Top edge */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '22px',
            transform: 'rotateX(-90deg) translateZ(11px)',
            transformOrigin: 'center bottom',
            background: 'linear-gradient(to right, #e8dcc2 0%, #f3ead8 50%, #e8dcc2 100%)',
          }}
        />
        {/* Bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '22px',
            transform: 'rotateX(90deg) translateZ(11px)',
            transformOrigin: 'center top',
            background: 'linear-gradient(to right, #d8cdb5 0%, #e8dcc2 50%, #d8cdb5 100%)',
          }}
        />
        {/* Spine (left edge) */}
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{
            width: '22px',
            transform: 'rotateY(-90deg) translateZ(11px)',
            transformOrigin: 'right center',
            background: 'linear-gradient(to bottom, #0A0D10, #1a1d20, #0A0D10)',
          }}
        />
      </div>

      {/* Contact shadow */}
      <div
        className="book-3d-shadow absolute left-0 right-0"
        style={{
          bottom: '-8px',
          height: '18px',
          background: 'radial-gradient(ellipse at center, rgba(10,13,16,0.45) 0%, rgba(10,13,16,0) 70%)',
          transform: 'translateX(6px) scaleY(0.6)',
          filter: 'blur(6px)',
          zIndex: -1,
        }}
      />
    </div>
  );
}