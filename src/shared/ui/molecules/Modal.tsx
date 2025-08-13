import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/ui/libs/cn';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
};

export function Modal({ open, onClose, children, ariaLabel = 'Dialog', className }: ModalProps) {

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-label={ariaLabel}
          onMouseDown={onClose}
        >
          {/* overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onMouseDown={onClose}
          />

          {/* panel */}
          <motion.div
            className={cn(
              'relative w-full max-w-[420px] rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-4 sm:p-5',
              className
            )}
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
