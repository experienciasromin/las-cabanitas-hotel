import { motion } from 'motion/react';
import { Calendar, Bed, ChevronDown } from 'lucide-react';

interface HeroProps {
  heroImage: string;
}

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center bg-wood-950 overflow-hidden"
    >
      {/* Background Image with elegant zooming and parallax effect via CSS/motion */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src={heroImage}
            alt="Las Cabañitas Hotel Boutique de Montaña"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        {/* Soft, professional gradient overlays (vignette design) */}
        <div className="absolute inset-0 bg-gradient-to-t from-wood-950 via-wood-950/40 to-wood-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-wood-950/70 via-transparent to-wood-950/70 z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
        {/* Micro-badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-bold tracking-[0.2em] uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
          Experiencia Boutique de Montaña
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          Donde la Cumbre de la Montaña <br className="hidden md:inline" />
          <span className="text-gold-500">Se Une a la Naturaleza</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-sans text-lg sm:text-xl text-wood-100 max-w-3xl mx-auto leading-relaxed mb-12"
        >
          Las Cabañitas combina el confort rústico de un hotel de montaña con la paz y tranquilidad del entorno natural. Despierta rodeado de paisajes majestuosos y culmina el día disfrutando al calor de la chimenea.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#reservar"
            className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-600 active:scale-95 text-wood-950 font-bold uppercase tracking-wider text-xs md:text-sm rounded-xl shadow-xl hover:shadow-gold-500/10 flex items-center justify-center gap-3 transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            Reservar Estadía
          </a>
          <a
            href="#habitaciones"
            className="w-full sm:w-auto px-8 py-4 bg-wood-900/60 hover:bg-wood-800/80 active:scale-95 text-white border border-wood-500/30 hover:border-gold-500/40 font-bold uppercase tracking-wider text-xs md:text-sm rounded-xl backdrop-blur-md flex items-center justify-center gap-3 transition-all duration-300"
          >
            <Bed className="w-4 h-4 text-gold-500" />
            Ver Cabañas y Refugios
          </a>
        </motion.div>
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.a
          href="#habitaciones"
          aria-label="Ir a habitaciones"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="inline-flex p-2 rounded-full border border-white/10 text-white/40 hover:text-gold-500 hover:border-gold-500/30 backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
}
