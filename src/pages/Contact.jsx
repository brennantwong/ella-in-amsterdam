import { useState } from 'react';
import NavBar from '@/components/NavBar';
import FooterSection from '@/components/FooterSection';
import ScrollProgress from '@/components/ScrollProgress';

const CONTACT_EMAIL = 'e.cachette@gmail.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Message from ${form.name || 'a reader'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? `\n${form.email}` : ''}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputClass =
    'w-full bg-transparent border-0 border-b px-0 py-3 text-sm focus:outline-none focus:border-[#1E5CFF] transition-colors';
  const labelClass =
    'font-mono text-xs tracking-[0.2em] uppercase block mb-2';

  return (
    <div style={{ backgroundColor: '#E9ECEF' }}>
      <ScrollProgress />
      <NavBar />
      <main className="pt-20">
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <span
              className="font-mono text-xs tracking-[0.35em] uppercase block mb-8"
              style={{ color: '#6B7280' }}
            >
              Secure Channel
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {/* Left — heading + details */}
              <div>
                <h1
                  className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
                >
                  Contact
                </h1>
                <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(17,21,26,0.75)' }}>
                  Reach the desk behind the Ella in Amsterdam series. For press inquiries, rights, or signed-copy requests, send a transmission below.
                </p>

                <div className="space-y-0">
                  {[
                    { label: 'Publisher', value: 'Cachette Group LLC' },
                    { label: 'Series', value: 'Ella in Amsterdam' },
                    { label: 'Genre', value: 'International Tech Thriller' },
                    { label: 'Response', value: 'Within 5 business days' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between py-4"
                      style={{ borderTop: '0.5px solid rgba(17,21,26,0.2)' }}
                    >
                      <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#6B7280' }}>
                        {item.label}
                      </span>
                      <span className="text-sm text-right" style={{ color: '#11151A' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                  <div style={{ borderTop: '0.5px solid rgba(17,21,26,0.2)' }} />
                </div>
              </div>

              {/* Right — form */}
              <div>
                {sent ? (
                  <div className="border p-8" style={{ borderColor: 'rgba(17,21,26,0.2)' }}>
                    <span className="font-mono text-xs tracking-[0.35em] uppercase block mb-4" style={{ color: '#1E5CFF' }}>
                      Transmission Ready
                    </span>
                    <h2
                      className="text-2xl font-black mb-3"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#11151A' }}
                    >
                      Your mail client should now be open.
                    </h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(17,21,26,0.75)' }}>
                      If nothing happened, email us directly at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#1E5CFF' }}>
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-3 transition-all hover:opacity-80"
                      style={{ backgroundColor: '#11151A', color: '#E9ECEF' }}
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-8">
                    <div>
                      <label className={labelClass} style={{ color: '#6B7280' }}>Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={update('name')}
                        className={inputClass}
                        style={{ borderColor: 'rgba(17,21,26,0.2)', color: '#11151A' }}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ color: '#6B7280' }}>Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className={inputClass}
                        style={{ borderColor: 'rgba(17,21,26,0.2)', color: '#11151A' }}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ color: '#6B7280' }}>Subject</label>
                      <input
                        value={form.subject}
                        onChange={update('subject')}
                        className={inputClass}
                        style={{ borderColor: 'rgba(17,21,26,0.2)', color: '#11151A' }}
                        placeholder="Inquiry type"
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ color: '#6B7280' }}>Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={update('message')}
                        className={inputClass}
                        style={{ borderColor: 'rgba(17,21,26,0.2)', color: '#11151A', resize: 'vertical' }}
                        placeholder="Your transmission…"
                      />
                    </div>
                    <button
                      type="submit"
                      className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all hover:opacity-80"
                      style={{ backgroundColor: '#1E5CFF', color: '#E9ECEF' }}
                    >
                      Transmit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
        <FooterSection />
      </main>
    </div>
  );
}