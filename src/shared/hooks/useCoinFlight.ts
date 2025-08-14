import { useCallback, useState } from 'react';
import type { Flight } from '@/shared/ui/overlays/CoinFlightLayer';

export function useCoinFlight() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const launch = useCallback((f: Omit<Flight,'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setFlights(prev => [...prev, { id, ...f }]);
    const done = f.onDone;
    return () => {
      setFlights(prev => prev.filter(x => x.id !== id));
      done?.();
    };
  }, []);
  const clear = () => setFlights([]);
  return { flights, launch, clear };
}
