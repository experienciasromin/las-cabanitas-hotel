import { useState, useEffect } from 'react';
import { ToastType } from './types';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomBooking from './components/RoomBooking';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

import { IMAGES_CONFIG, formatImageUrl } from './imagesConfig';

const HERO_IMAGE_PATH = formatImageUrl(IMAGES_CONFIG.heroBg);
const SUITE_IMAGE_PATH = formatImageUrl(IMAGES_CONFIG.defaultSuite);

export default function App() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [heroImage, setHeroImage] = useState(HERO_IMAGE_PATH);

  // Add elegant welcome notification on initial load and fetch custom assets
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch('/api/rooms');
        if (res.ok) {
          const data = await res.json();
          if (data.imagesMap && data.imagesMap['Hero']) {
            setHeroImage(formatImageUrl(data.imagesMap['Hero']));
          }
        }
      } catch (e) {
        console.warn('Error fetching dynamic layout config:', e);
      }
    };
    loadConfig();

    const timer = setTimeout(() => {
      showToast(
        '¡Bienvenido a Las Cabañitas Hotel de Montaña! Explora nuestros refugios y cotiza tu estadía.',
        'info'
      );
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string, type: ToastType['type']) => {
    // If it's a loading toast, check if we already have one. If yes, replace it or remove old ones
    if (type === 'loading') {
      setToasts((prev) => prev.filter((t) => t.type !== 'loading'));
    }

    const newToast: ToastType = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
    };

    setToasts((prev) => {
      // Limit number of active non-loading toasts to prevent clutter
      const filtered = prev.filter((t) => t.type !== 'loading');
      if (type === 'loading') {
        return [...filtered, newToast];
      }
      return [...filtered.slice(-2), newToast];
    });

    // Auto dismiss non-loading toasts after 4.5 seconds
    if (type !== 'loading') {
      setTimeout(() => {
        handleCloseToast(newToast.id);
      }, 4500);
    }
  };

  const handleCloseToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleOpenBookingScroll = () => {
    const bookingSection = document.getElementById('reservar') || document.getElementById('habitaciones');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Selecciona un refugio y cotiza las fechas de tu estadía.', 'info');
  };

  return (
    <div id="inicio-root" className="min-h-screen bg-wood-50 text-charcoal-900 select-none antialiased">
      {/* Toast Manager Overlay */}
      <Toast toasts={toasts} onClose={handleCloseToast} />

      {/* Navigation */}
      <Navbar
        onOpenBooking={handleOpenBookingScroll}
      />

      {/* Hero Section */}
      <Hero heroImage={heroImage} />

      {/* Refugios / Habitaciones Section & Tarificador Form */}
      <RoomBooking suiteImage={SUITE_IMAGE_PATH} showToast={showToast} />

      {/* Contact Section */}
      <ContactForm showToast={showToast} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
