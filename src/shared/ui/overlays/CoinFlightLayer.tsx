import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export type Flight = { id: string; from:{x:number;y:number}; to:{x:number;y:number}; delay?: number; onDone?: ()=>void };

export function CoinFlightLayer({ flights, icon = '/cash.svg' }:{ flights: Flight[]; icon?: string }) {
  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {flights.map(f => (
        <motion.img
          key={f.id}
          src={icon}
          className="fixed w-6 h-6"
          initial={{ x: f.from.x, y: f.from.y, scale: .9, opacity: 0 }}
          animate={{ x: f.to.x, y: f.to.y, scale: 1.1, opacity: 1 }}
          transition={{ duration: .55, ease: 'easeInOut', delay: f.delay ?? 0 }}
          onAnimationComplete={f.onDone}
        />
      ))}
    </div>,
    document.body
  );
}
