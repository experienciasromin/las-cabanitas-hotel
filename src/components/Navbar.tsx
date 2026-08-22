import { useState, useEffect } from 'react';
import { Menu, X, Calendar, Coffee, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCode?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio', icon: Compass },
    { name: 'Habitaciones', href: '#habitaciones', icon: Coffee },
    { name: 'Reservaciones', href: '#habitaciones', icon: Calendar },
  ];

  const LogoSVG = ({ className = "h-12 w-auto" }: { className?: string }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Mini vectorized reproduction of the hotel logo */}
      <svg viewBox="0 0 400 240" className="h-10 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Yellow Sun */}
        <circle cx="200" cy="90" r="60" fill="#C5A059" />
        
        {/* Mountain Silhouette Line (Green) */}
        <path d="M40 180 C 120 120, 180 150, 240 110 C 300 80, 320 120, 360 140" stroke="#b28c49" strokeWidth="6" strokeLinecap="round" />
        
        {/* Brown Roofs (3 Cabins) */}
        {/* Left Cabin */}
        <path d="M60 170 L95 130 L130 170" stroke="#825A42" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="80" y="155" width="8" height="10" fill="#825A42" rx="1" />
        <rect x="92" y="155" width="8" height="10" fill="#825A42" rx="1" />
        
        {/* Center Cabin */}
        <path d="M140 165 L175 120 L210 165" stroke="#825A42" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Chimney */}
        <line x1="160" y1="140" x2="160" y2="125" stroke="#825A42" strokeWidth="6" />
        <line x1="157" y1="125" x2="163" y2="125" stroke="#825A42" strokeWidth="4" />
        <rect x="160" y="150" width="8" height="10" fill="#825A42" rx="1" />
        <rect x="172" y="150" width="8" height="10" fill="#825A42" rx="1" />

        {/* Right Cabin */}
        <path d="M220 170 L255 130 L290 170" stroke="#825A42" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Chimney */}
        <line x1="275" y1="145" x2="275" y2="135" stroke="#825A42" strokeWidth="6" />
        <line x1="272" y1="135" x2="278" y2="135" stroke="#825A42" strokeWidth="4" />
        <rect x="240" y="155" width="8" height="10" fill="#825A42" rx="1" />
        <rect x="252" y="155" width="8" height="10" fill="#825A42" rx="1" />
      </svg>
      <div className="flex flex-col select-none">
        <span className="font-serif text-lg md:text-xl font-bold tracking-widest leading-none text-forest-500 uppercase">
          Las Cabañitas
        </span>
        <span className="font-sans text-[8px] md:text-[9px] font-medium tracking-[0.3em] leading-none text-wood-500 uppercase mt-1">
          Hotel de Montaña
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-wood-950/95 border-b border-gold-500/10 shadow-lg backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="focus:outline-none">
            <LogoSVG />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-sans font-semibold text-sm uppercase tracking-wider transition-colors duration-200 ${
                  scrolled
                    ? 'text-wood-100 hover:text-gold-500'
                    : 'text-white hover:text-gold-100 drop-shadow-sm'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 active:scale-95 text-wood-950 text-xs font-bold uppercase tracking-widest rounded-lg shadow-md transition-all duration-300"
            >
              Reservar Ahora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 bg-gold-500 text-wood-950 text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm"
            >
              Reservar
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
              className="p-2 rounded-lg text-white hover:bg-wood-900/40 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 text-gold-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-wood-950/98 border-t border-gold-500/10 shadow-2xl backdrop-blur-lg animate-fadeIn">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-wood-900 text-wood-100 hover:text-gold-500 transition-all duration-200 font-sans font-semibold text-base"
                >
                  <Icon className="w-5 h-5 text-gold-500" />
                  {link.name}
                </a>
              );
            })}
            <div className="pt-4 border-t border-wood-900 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-gold-500 text-wood-950 font-bold uppercase tracking-widest text-sm rounded-xl text-center shadow-lg hover:bg-gold-600 transition-colors"
              >
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
