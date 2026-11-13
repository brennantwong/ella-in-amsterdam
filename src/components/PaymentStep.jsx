import { CreditCard, Loader2 } from 'lucide-react';

const labelClass = 'font-mono text-xs tracking-[0.2em] uppercase';

export default function PaymentStep({ amount, paying, error, onPay }) {
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={onPay}
        disabled={paying}
        className={`${labelClass} w-full flex items-center justify-center gap-2 py-4 transition-opacity hover:opacity-85 disabled:opacity-50`}
        style={{ backgroundColor: '#11151A', color: '#E9ECEF', border: 'none', cursor: paying ? 'default' : 'pointer' }}
      >
        {paying ? (
          <>
            <Loader2 size={13} className="animate-spin" /> Opening Secure Checkout
          </>
        ) : (
          <>
            <CreditCard size={13} /> Pay {amount}
          </>
        )}
      </button>
      {error && <p className="text-xs mt-3" style={{ color: '#dc2626' }}>{error}</p>}
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-3 text-center" style={{ color: '#6B7280' }}>
        Card details are entered on the secure payment page
      </p>
    </div>
  );
}