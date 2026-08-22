import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, AlertTriangle, Loader2, Info, X } from 'lucide-react';
import { ToastType } from '../types';

interface ToastProps {
  toasts: ToastType[];
  onClose: (id: string) => void;
}

export default function Toast({ toasts, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-xl border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-forest-900/95 border-forest-500/30 text-forest-50'
                : toast.type === 'error'
                ? 'bg-red-950/95 border-red-500/30 text-red-50'
                : toast.type === 'loading'
                ? 'bg-wood-950/95 border-gold-500/30 text-gold-50'
                : 'bg-charcoal-900/95 border-charcoal-500/30 text-charcoal-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <CheckCircle className="w-5 h-5 text-gold-500 shrink-0" />
              )}
              {toast.type === 'error' && (
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              {toast.type === 'loading' && (
                <Loader2 className="w-5 h-5 text-gold-500 animate-spin shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-blue-400 shrink-0" />
              )}
              <span className="text-sm font-medium leading-relaxed font-sans">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => onClose(toast.id)}
              className="ml-4 text-charcoal-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
