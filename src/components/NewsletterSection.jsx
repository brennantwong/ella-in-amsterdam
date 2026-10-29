import { useState } from 'react';
import { Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      const res = await base44.functions.invoke('subscribeNewsletter', { email });
      const data = res?.data || {};
      if (!data.ok) {
        setStatus('error');
        setMessage(data.error || 'Enrollment failed. Try again in a moment.');
        return;
      }
      setStatus('done');
      setMessage(data.alreadySubscribed ? 'You are already on the briefing list.' : 'You are enrolled. Watch your inbox.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Enrollment failed. Try again in a moment.');
    }
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#E9ECEF', borderTop: '0.5px solid #11151A' }}
    >
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="font-mono text-xs tracking-[0.35em] uppercase block mb-4" style={{ color: '#6B7280' }}>
              04 — Secured Communication Line
            </span>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4"
              style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
            >
              Receive the Next Briefing
            </h2>
            <p className="text-base" style={{ color: '#6B7280', lineHeight: '1.6' }}>
              Stay ahead of the intelligence. Release dates, behind-the-scenes dispatches, and classified first looks — delivered direct.
            </p>
          </div>

          {/* Right — form */}
          <div>
            <form onSubmit={onSubmit}>
              <div className="flex" style={{ border: '0.5px solid #11151A' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your operative address"
                  className="flex-1 px-4 py-4 text-sm outline-none bg-transparent placeholder-opacity-40"
                  style={{
                    color: '#11151A',
                    backgroundColor: 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    borderRight: '0.5px solid #11151A',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-6 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all hover:opacity-80 disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
                  style={{ backgroundColor: '#11151A', color: '#E9ECEF' }}
                >
                  {status === 'sending' ? 'Enrolling…' : 'Enroll'} <Send size={12} />
                </button>
              </div>
              <p
                className="font-mono text-xs mt-3"
                style={{ color: status === 'error' ? '#dc2626' : status === 'done' ? '#1E5CFF' : '#6B7280' }}
              >
                {status === 'done' || status === 'error' ? message : 'Unsubscribe at any time.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}