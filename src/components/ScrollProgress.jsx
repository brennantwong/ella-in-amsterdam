import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState('01');
  const sections = ['01', '02', '03', '04'];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const pct = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      setProgress(pct);
      const idx = Math.min(Math.floor((pct / 100) * sections.length), sections.length - 1);
      setSection(sections[idx]);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-[3px]" style={{ backgroundColor: '#11151A' }}>
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${progress}%`, backgroundColor: '#1E5CFF' }}
      />
      <div
        className="absolute right-4 top-[6px] text-[10px] font-mono tracking-widest"
        style={{ color: '#6B7280', fontSize: '9px', letterSpacing: '0.15em' }}
      >
        {section}/{sections.length.toString().padStart(2, '0')}
      </div>
    </div>
  );
}