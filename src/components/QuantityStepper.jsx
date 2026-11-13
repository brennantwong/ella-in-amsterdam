import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  const step = (delta) => onChange(Math.min(max, Math.max(min, value + delta)));

  return (
    <div className="inline-flex items-center" style={{ border: '0.5px solid #11151A' }}>
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        className="w-9 h-10 flex items-center justify-center transition-opacity hover:opacity-60 disabled:opacity-30"
        style={{ color: '#11151A', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Decrease quantity"
      >
        <Minus size={12} />
      </button>
      <span
        className="w-9 text-center font-mono text-sm"
        style={{ color: '#11151A', borderLeft: '0.5px solid rgba(17,21,26,0.3)', borderRight: '0.5px solid rgba(17,21,26,0.3)', lineHeight: '2.5rem' }}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        className="w-9 h-10 flex items-center justify-center transition-opacity hover:opacity-60 disabled:opacity-30"
        style={{ color: '#11151A', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Increase quantity"
      >
        <Plus size={12} />
      </button>
    </div>
  );
}