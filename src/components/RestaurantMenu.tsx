import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, Plus, Flame, Sparkles, Check, ShoppingBag, Trash2 } from 'lucide-react';
import { MenuItem } from '../types';

interface RestaurantMenuProps {
  steakImage: string;
  showToast: (msg: string, type: 'success' | 'info' | 'error' | 'loading') => void;
}

export default function RestaurantMenu({ steakImage, showToast }: RestaurantMenuProps) {
  const [activeTab, setActiveTab] = useState<'cortes' | 'entradas' | 'bebidas'>('cortes');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');

  const menuItems: MenuItem[] = [
    // Especialidades de campo
    {
      id: 'c1',
      name: 'Desayuno Campestre Cabañitas Especial',
      description: 'Tradicional platillo típico con huevos revueltos con chorizo, frijoles fritos, queso de terrón fresco de montaña, plátano asado maduro, crema de hacienda, aguacate y tortillas de maíz palmeadas calientes.',
      price: 15,
      category: 'cortes',
      image: steakImage, // Our high-end generated image
      isPremium: true,
    },
    {
      id: 'c2',
      name: 'Plato típico de Carnitas de la Casa',
      description: 'Jugosa carne de cerdo y lomo de res asados lentamente a la leña, acompañados de chirmol casero, frijoles rústicos licuados, queso fresco, cebollitas asadas y tortillas de maíz.',
      price: 18,
      category: 'cortes',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'c3',
      name: 'Sopa Criolla de Gallina en Leña',
      description: 'Sabor auténtico. Sopa preparada a fuego lento con gallina de campo, verduras frescas de la zona, hierbabuena y porción de gallina asada a la brasa con ensalada.',
      price: 16,
      category: 'cortes',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'c4',
      name: 'Parrillada de Campo Individual',
      description: 'Combinación perfecta de carne asada de res, chorizo artesanal de montaña, pechuga a la plancha, cebollas cambray, frijoles charros y queso cuajada de la sierra.',
      price: 22,
      category: 'cortes',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600',
    },

    // Entradas y Antojitos
    {
      id: 'e1',
      name: 'Antojito de Pupusas Típicas',
      description: 'Tres pupusas hechas a mano en comal de barro (queso, chicharrón o revueltas) acompañadas con curtido casero y salsa de tomate natural caliente.',
      price: 8,
      category: 'entradas',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'e2',
      name: 'Tamalitos de Elote con Crema',
      description: 'Dos tamales de elote tierno recién hechos, servidos calientes con crema de hacienda salvadoreña y espolvoreados con queso seco local.',
      price: 6,
      category: 'entradas',
      image: 'https://images.unsplash.com/photo-1560684352-8497838a2229?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'e3',
      name: 'Yuca Frita con Chicharrón',
      description: 'Yuca dorada crujiente acompañada con chicharrones de cerdo premium crujientes, salsa de tomate natural, curtido y cebollitas curtidas.',
      price: 10,
      category: 'entradas',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'e4',
      name: 'Empanadas de Plátano con Poleada',
      description: 'Deliciosas empanadas tradicionales hechas con masa de plátano maduro cocido, rellenas de crema poleada de leche aromatizada con canela.',
      price: 7,
      category: 'entradas',
      image: 'https://images.unsplash.com/photo-1628102476629-f8cf3116f50a?auto=format&fit=crop&q=80&w=600',
    },

    // Bebidas
    {
      id: 'b1',
      name: 'Chocolate Caliente Artesanal',
      description: 'Chocolate de tablilla 100% puro batido a mano en jarrito de barro con leche fresca y un toque de canela. Perfecto para las noches de frío en la montaña.',
      price: 4,
      category: 'bebidas',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600',
      isPremium: true,
    },
    {
      id: 'b2',
      name: 'Horchata de Morro Tradicional',
      description: 'Refrescante bebida tradicional elaborada de semillas de morro molidas, ajonjolí, cacahuate y especias naturales, servida con hielo.',
      price: 4,
      category: 'bebidas',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'b3',
      name: 'Café de Olla Endulzado con Dulce de Atado',
      description: 'Granos seleccionados cultivados en la cordillera, hervidos con canela de olor y panela de dulce de atado en cafetera rústica.',
      price: 3,
      category: 'bebidas',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'b4',
      name: 'Limonada con Hierbabuena de la Sierra',
      description: 'Limonada de autor elaborada con limones amarillos exprimidos al momento, infusión de lavanda montañesa y hojas frescas de menta dulce o hierbabuena de nuestro huerto.',
      price: 4,
      category: 'bebidas',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const filteredItems = menuItems.filter((item) => item.category === activeTab);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.item.id === item.id);
      if (existing) {
        return prevCart.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
    showToast(`"${item.name}" agregado a tu orden.`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, c) => total + c.item.price * c.quantity, 0);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Por favor agrega platillos antes de ordenar.', 'error');
      return;
    }
    if (!roomNumber.trim()) {
      showToast('Por favor introduce tu número de cabaña.', 'error');
      return;
    }

    showToast('Procesando solicitud de servicio a la habitación...', 'loading');

    setTimeout(() => {
      showToast(
        `¡Orden recibida con éxito! Tu pedido será entregado en la cabaña ${roomNumber} en aproximadamente 30-40 minutos.`,
        'success'
      );
      setCart([]);
      setRoomNumber('');
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <section id="restaurante" className="py-24 bg-wood-50 border-t border-wood-100 relative overflow-hidden">
      {/* Decorative vector graphics in background for rustic feel */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Flame className="w-4 h-4 text-gold-500 animate-pulse" />
            Sabor de Campo & Tradición
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-900 mb-6 leading-tight">
            Restaurante de Campo
          </h2>
          <p className="text-charcoal-500 text-base sm:text-lg leading-relaxed">
            Nuestra cocina rinde homenaje a las recetas tradicionales y los ingredientes más frescos de la montaña. Disfruta de un menú exquisito de comida típica preparado con sazón casero al calor de la leña.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-wood-100 rounded-xl border border-wood-200 shadow-inner">
            {(['cortes', 'entradas', 'bebidas'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 rounded-lg text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none ${
                  activeTab === tab
                    ? 'bg-wood-950 text-gold-500 shadow-md'
                    : 'text-charcoal-500 hover:text-charcoal-900'
                }`}
              >
                {tab === 'cortes' ? 'Platos Típicos' : tab === 'entradas' ? 'Entradas & Antojitos' : 'Bebidas de la Casa'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-wood-100 rounded-2xl border border-wood-100/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-charcoal-900 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {item.isPremium && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-wood-950 text-[10px] font-extrabold uppercase tracking-widest rounded-md shadow-md flex items-center gap-1.5 z-10">
                      <Sparkles className="w-3 h-3" />
                      Insignia Cabañitas
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-medium">Click para ampliar detalle</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        onClick={() => setSelectedDish(item)}
                        className="font-serif text-lg font-bold text-charcoal-900 hover:text-gold-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.name}
                      </h3>
                      <span className="font-display font-bold text-base text-forest-500 bg-forest-50 px-2.5 py-0.5 rounded-lg shrink-0">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-charcoal-500 text-xs md:text-sm font-sans leading-relaxed line-clamp-3 mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedDish(item)}
                      className="flex-1 py-2.5 bg-wood-50 hover:bg-wood-100 active:scale-95 text-wood-800 text-xs font-bold uppercase tracking-widest rounded-lg border border-wood-200 transition-all duration-200"
                    >
                      Detalle
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2.5 bg-gold-500 hover:bg-gold-600 active:scale-95 text-wood-950 rounded-lg hover:shadow-md transition-all duration-200"
                      title="Agregar a la orden"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Cart Panel Button */}
        {cart.length > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-6 left-6 z-30"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-forest-500 hover:bg-forest-600 active:scale-95 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-transform cursor-pointer border border-forest-400/20"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-gold-500 text-wood-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-forest-500">
                  {cart.reduce((total, c) => total + c.quantity, 0)}
                </span>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline-block">
                Tu Orden (${calculateTotal()})
              </span>
            </button>
          </motion.div>
        )}

        {/* Item Detail Modal */}
        <AnimatePresence>
          {selectedDish && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-wood-100 rounded-3xl overflow-hidden max-w-2xl w-full border border-wood-100 shadow-2xl relative"
              >
                <div className="relative h-64 md:h-80 bg-charcoal-900">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <button
                    onClick={() => setSelectedDish(null)}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors focus:outline-none"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-gold-500 text-xs font-bold uppercase tracking-widest block mb-1">
                      {selectedDish.category === 'cortes' ? 'Cortes Premium' : selectedDish.category === 'entradas' ? 'Entradas de Autor' : 'Bebidas & Elixires'}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                      {selectedDish.name}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-charcoal-600 text-sm md:text-base leading-relaxed mb-8">
                    {selectedDish.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-wood-100 pt-6">
                    <div>
                      <span className="text-charcoal-400 text-xs uppercase tracking-widest block">Precio Unitario</span>
                      <span className="text-2xl font-display font-extrabold text-forest-500">${selectedDish.price} USD</span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedDish(null)}
                        className="px-6 py-3 border border-wood-200 text-charcoal-600 hover:bg-wood-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Cerrar
                      </button>
                      <button
                        onClick={() => {
                          addToCart(selectedDish);
                          setSelectedDish(null);
                        }}
                        className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-wood-950 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar a Orden
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Room Service Cart Side-Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
              {/* Overlay dismissal */}
              <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-md bg-wood-100 h-full shadow-2xl flex flex-col justify-between border-l border-wood-100 z-10"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-wood-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-gold-500" />
                    <h3 className="text-lg font-serif font-bold text-charcoal-900">Servicio a la Cabaña</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-wood-50 rounded-full text-charcoal-400 hover:text-charcoal-900 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <UtensilsCrossed className="w-12 h-12 text-wood-300 mx-auto mb-4 stroke-[1.5]" />
                      <p className="text-charcoal-400 text-sm">Aún no has agregado platillos a tu menú de habitación.</p>
                    </div>
                  ) : (
                    cart.map(({ item, quantity }) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-wood-50 transition-colors border border-transparent hover:border-wood-100/40">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover bg-charcoal-900 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans font-bold text-sm text-charcoal-900 truncate">{item.name}</h4>
                          <p className="text-xs text-charcoal-400 mt-0.5">${item.price} USD c/u</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-forest-500 font-semibold bg-forest-50 px-2 py-0.5 rounded-md">
                              Cant: {quantity}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Drawer Footer and Form */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-wood-100 bg-wood-50/50">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-charcoal-500 text-sm font-semibold">Total Estimado</span>
                      <span className="text-xl font-display font-extrabold text-forest-500">${calculateTotal()} USD</span>
                    </div>

                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-charcoal-600 mb-1.5">
                          Número de Cabaña / Habitación
                        </label>
                        <input
                          type="text"
                          required
                          value={roomNumber}
                          onChange={(e) => setRoomNumber(e.target.value)}
                          placeholder="Ej. Cabaña 12"
                          className="w-full px-4 py-3 bg-wood-50 border border-wood-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-forest-500 hover:bg-forest-600 active:scale-95 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        Confirmar Orden a Habitación
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
