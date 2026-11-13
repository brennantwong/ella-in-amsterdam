import { formatMoney } from '@/lib/money';

const labelClass = 'font-mono text-xs tracking-[0.2em] uppercase';

export default function OrderSummary({ lines, subtotal }) {
  return (
    <div className="p-6" style={{ border: '0.5px solid #11151A', backgroundColor: 'rgba(255,255,255,0.4)' }}>
      <h2 className={`${labelClass} mb-5`} style={{ color: '#6B7280' }}>Order Summary</h2>

      <div className="space-y-4 mb-5">
        {lines.map((line) => (
          <div key={line.id} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold leading-snug" style={{ color: '#11151A' }}>{line.title}</p>
              <p className="font-mono text-xs mt-0.5" style={{ color: '#6B7280' }}>
                Paperback × {line.qty}
              </p>
            </div>
            <span className="text-sm" style={{ color: '#11151A' }}>{formatMoney(line.qty * line.price)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4" style={{ borderTop: '0.5px solid rgba(17,21,26,0.3)' }}>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: '#6B7280' }}>Subtotal</span>
          <span style={{ color: '#11151A' }}>{formatMoney(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: '#6B7280' }}>Shipping & tax</span>
          <span style={{ color: '#11151A' }}>Included</span>
        </div>
      </div>

      <div
        className="flex items-baseline justify-between pt-4 mt-4"
        style={{ borderTop: '0.5px solid rgba(17,21,26,0.3)' }}
      >
        <span className={labelClass} style={{ color: '#11151A' }}>Total</span>
        <span className="text-xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}>
          {formatMoney(subtotal)}
        </span>
      </div>
    </div>
  );
}