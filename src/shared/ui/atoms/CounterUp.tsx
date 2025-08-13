import React from 'react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;        
  durationMs?: number;   
};

export const CounterUp: React.FC<Props> = ({ value, durationMs = 500 }) => {
  const [display, setDisplay] = useState<number>(value);
  const startRef = useRef<number>(value);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    startRef.current = display;
    startTimeRef.current = null;

    const tick = (t: number) => {
      if (startTimeRef.current == null) startTimeRef.current = t;
      const p = Math.min(1, (t - startTimeRef.current) / durationMs);

      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(startRef.current + (value - startRef.current) * eased);
      setDisplay(next);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };

  }, [value, durationMs]);

  return <span>{display}</span>;
};
