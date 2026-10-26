import { Send } from 'lucide-react';

const MAILCHIMP_URL = 'https://cachettegroup.us8.list-manage.com/subscribe?u=14bb0aad703a768aa9ca92853&id=be7a2bde96';

export default function NewsletterSection() {

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
            <form action={MAILCHIMP_URL} method="post" target="_blank">
              <input type="hidden" name="u" value="14bb0aad703a768aa9ca92853" />
              <input type="hidden" name="id" value="be7a2bde96" />
              <div className="flex" style={{ border: '0.5px solid #11151A' }}>
                <input
                  type="email"
                  name="EMAIL"
                  required
                  placeholder="Your operative address"
                  className="flex-1 px-4 py-4 text-sm outline-none bg-transparent font-mono placeholder-opacity-40"
                  style={{
                    color: '#11151A',
                    backgroundColor: 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    borderRight: '0.5px solid #11151A',
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all hover:opacity-80 flex items-center gap-2 flex-shrink-0"
                  style={{ backgroundColor: '#11151A', color: '#E9ECEF' }}
                >
                  Enroll <Send size={12} />
                </button>
              </div>
              <p className="font-mono text-xs mt-3" style={{ color: '#6B7280' }}>
                Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}