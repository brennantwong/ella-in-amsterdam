import { Image } from '@/components/ui/image';

/**
 * Renders a book cover as a physical 3D trade paperback:
 * front face + visible page block on the right edge + soft drop shadow.
 */
export default function BookCover3D({ book, className = '' }) {
  return (
    <div
      className={`book-3d-scene relative aspect-[2/3] ${className}`}
      style={{ perspective: '1500px' }}
    >
      {/* The book body — fills the scene, holds the 3D transform */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-28deg) rotateX(3deg)',
          transition: 'transform 0.5s ease-out',
        }}
      >
        {/* Front cover face */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(14px)',
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
          {/* Gloss */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(0,0,0,0.28) 100%)',
            }}
          />
        </div>

        {/* Page block (right edge) */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            right: 0,
            width: '28px',
            transform: 'rotateY(90deg)',
            transformOrigin: 'left center',
            background:
              'linear-gradient(to right, #efe5d2 0%, #f5edd9 30%, #d8cdb5 100%)',
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0.04) 2px), linear-gradient(to right, #efe5d2 0%, #f5edd9 30%, #c9bd9f 100%)',
            boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.3)',
          }}
        />
        {/* Spine (left edge) */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: 0,
            width: '28px',
            transform: 'rotateY(-90deg)',
            transformOrigin: 'right center',
            background: 'linear-gradient(to bottom, #0A0D10, #1c1f23, #0A0D10)',
          }}
        />
        {/* Top edge */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: 0,
            height: '28px',
            transform: 'rotateX(90deg)',
            transformOrigin: 'center bottom',
            background: 'linear-gradient(to right, #d8cdb5 0%, #efe5d2 50%, #d8cdb5 100%)',
          }}
        />
        {/* Bottom edge */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: 0,
            height: '28px',
            transform: 'rotateX(-90deg)',
            transformOrigin: 'center top',
            background: 'linear-gradient(to right, #c9bd9f 0%, #e8dcc2 50%, #c9bd9f 100%)',
          }}
        />
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