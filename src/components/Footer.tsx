import { Compass, Flame, Coffee, Calendar, Landmark, ShieldCheck, Heart, Share2 } from 'lucide-react';
import { SOCIAL_CONFIG } from '../imagesConfig';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', href: SOCIAL_CONFIG.instagram, icon: Share2 },
    { name: 'Facebook', href: SOCIAL_CONFIG.facebook, icon: Share2 },
    { name: 'TripAdvisor', href: SOCIAL_CONFIG.tripadvisor, icon: Share2 },
    { name: 'YouTube', href: SOCIAL_CONFIG.youtube, icon: Share2 },
  ];

  return (
    <footer className="bg-wood-950 text-white pt-20 pb-10 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info & Vector Logo */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
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
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-widest leading-none text-gold-500 uppercase">
                  Las Cabañitas
                </span>
                <span className="font-sans text-[8px] font-medium tracking-[0.3em] leading-none text-wood-300 uppercase mt-1">
                  Hotel de Montaña
                </span>
              </div>
            </div>
            <p className="text-wood-200 text-xs md:text-sm font-sans leading-relaxed">
              Refugio único e inigualable entre montañas conectada con la naturaleza, estrellas, acompañado de servicio personalizado y trato exclusivo.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gold-500 border-b border-wood-800 pb-2">
              Explorar el Refugio
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#inicio" className="text-wood-200 hover:text-white text-xs md:text-sm font-medium transition-colors flex items-center gap-2">
                  <Compass className="w-4 h-4 text-gold-500" />
                  Inicio
                </a>
              </li>
              <li>
                <a href="#habitaciones" className="text-wood-200 hover:text-white text-xs md:text-sm font-medium transition-colors flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-gold-500" />
                  Cabañas y Habitaciones
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-wood-200 hover:text-white text-xs md:text-sm font-medium transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-500" />
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gold-500 border-b border-wood-800 pb-2">
              Legal & Políticas
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#legal" className="text-wood-200 hover:text-white text-xs md:text-sm font-medium transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  Garantía de Mejor Tarifa
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-wood-200 hover:text-white text-xs md:text-sm font-medium transition-colors flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-gold-500" />
                  Políticas de Cancelación
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-wood-200 hover:text-white text-xs md:text-sm font-medium transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  Políticas de Privacidad
                </a>
              </li>
              <li>
                <a href="#terms" className="text-wood-200 hover:text-white text-xs md:text-sm font-medium transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social Connect Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gold-500 border-b border-wood-800 pb-2">
              Siguenos
            </h4>
            <div className="flex flex-col gap-2">
              <span className="text-wood-200 text-xs font-sans">Sigue nuestro viaje culinario y de hospitalidad en redes sociales:</span>
              <div className="flex gap-2.5 mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-wood-900 border border-wood-800 flex items-center justify-center text-wood-200 hover:text-gold-500 hover:border-gold-500/30 transition-all duration-200"
                    title={social.name}
                  >
                    <span className="text-xs font-bold font-sans uppercase tracking-tight">{social.name.substring(0, 2)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Heart sign */}
        <div className="border-t border-wood-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-wood-400 text-xs font-sans text-center sm:text-left leading-relaxed">
            &copy; 2026 Las Cabañitas Hotel de Montaña. Todos los derechos reservados.<br />
            Diseñado con rigor artesanal para experiencias exclusivas.
          </p>
          <p className="text-wood-400 text-xs font-sans flex items-center gap-1.5 justify-center">
            Hecho con <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500 animate-pulse" />.
          </p>
        </div>
      </div>
    </footer>
  );
}
