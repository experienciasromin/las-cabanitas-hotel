import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight } from 'lucide-react';

interface ContactFormProps {
  showToast: (msg: string, type: 'success' | 'info' | 'error' | 'loading') => void;
}

export default function ContactForm({ showToast }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !subject || !message) {
      showToast('Por favor completa todos los campos del formulario.', 'error');
      return;
    }

    showToast('Enviando consulta a nuestra consejería...', 'loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          subject,
          message,
        }),
      });

      if (response.ok) {
        showToast(
          `¡Gracias, ${fullName}! Tu consulta ha sido enviada con éxito. Te contactaremos en menos de 24 horas.`,
          'success'
        );
        // Reset inputs
        setFullName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        const errData = await response.json();
        showToast(errData.error || 'Error al enviar el formulario. Por favor reintenta.', 'error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showToast('Error de conexión al servidor. Por favor reintenta.', 'error');
    }
  };

  return (
    <section id="contacto" className="min-h-screen w-full py-12 sm:py-16 flex flex-col justify-center items-center bg-wood-50 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-forest-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Information Column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-forest-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <MessageSquare className="w-4 h-4 text-forest-500" />
                Atención Preferencial
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-charcoal-900 mb-3 leading-tight">
                Planifica Tu Escape
              </h2>
              <p className="text-charcoal-500 text-xs sm:text-sm md:text-base leading-relaxed">
                ¿Tienes alguna petición especial para tu llegada, o deseas reservar una cabañita? Nuestro equipo está a tu entera disposición para que tu estadía sea lo más placentera.
              </p>
            </div>

            {/* Premium details cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 pt-4 border-t border-wood-200">
              {/* Direct Address */}
              <div className="flex gap-3 p-3 sm:p-3.5 rounded-xl bg-wood-100 border border-wood-200/60 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-charcoal-900">Ubicación Exclusiva</h4>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">Km 18.8, calle al Boquerón, San Salvador</p>
                </div>
              </div>

              {/* Direct Phones */}
              <div className="flex gap-3 p-3 sm:p-3.5 rounded-xl bg-wood-100 border border-wood-200/60 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-charcoal-900">Contacto de Reservas</h4>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">Llamadas y WhatsApp: +503 7939 4220</p>
                </div>
              </div>

              {/* Direct Emails */}
              <div className="flex gap-3 p-3 sm:p-3.5 rounded-xl bg-wood-100 border border-wood-200/60 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-charcoal-900">Correos Electrónicos</h4>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">cabanitaslas98@gmail.com · elescondite.com</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex gap-3 p-3 sm:p-3.5 rounded-xl bg-wood-100 border border-wood-200/60 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-charcoal-900">Horario de Recepción</h4>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">Abierto desde 8:00 am a 9:00 pm, los 365 días del año</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column (Right) */}
          <div className="lg:col-span-7 bg-wood-100 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-wood-200/80 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900 mb-1">Formulario de Contacto</h3>
            <p className="text-[11px] text-charcoal-400 font-sans uppercase tracking-widest mb-5 pb-3 border-b border-wood-200">
              Solicita tarifas corporativas, eventos o coordinaciones de traslados
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-charcoal-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. Rodrigo Rodríguez"
                  className="w-full min-h-[46px] px-3.5 py-2.5 bg-white border border-wood-300 rounded-xl text-sm font-sans focus:outline-none focus:border-gold-500 transition-all duration-200"
                />
              </div>

              {/* Email & Phone fields row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-charcoal-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full min-h-[46px] px-3.5 py-2.5 bg-white border border-wood-300 rounded-xl text-sm font-sans focus:outline-none focus:border-gold-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-charcoal-700 mb-1">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +503 7939 4220"
                    className="w-full min-h-[46px] px-3.5 py-2.5 bg-white border border-wood-300 rounded-xl text-sm font-sans focus:outline-none focus:border-gold-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Subject field */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-charcoal-700 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej. Cotización de eventos privados / Peticiones de Cabaña"
                  className="w-full min-h-[46px] px-3.5 py-2.5 bg-white border border-wood-300 rounded-xl text-sm font-sans focus:outline-none focus:border-gold-500 transition-all duration-200"
                />
              </div>

              {/* Message field */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-charcoal-700 mb-1">
                  Mensaje o Petición Especial
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detalla aquí tus necesidades..."
                  className="w-full px-3.5 py-2.5 bg-white border border-wood-300 rounded-xl text-sm font-sans focus:outline-none focus:border-gold-500 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 bg-gold-500 hover:bg-gold-600 text-wood-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
              >
                Enviar Consulta
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
