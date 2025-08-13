import { useMemo, useState } from 'react';
import type { Cell } from '@/entities/cell/ui/model/types';
import { shuffle } from '@/shared/lib/shuffle';

export type GameStatus = 'playing' | 'over';

export type GameState = {
  cells: Cell[];
  baseSum: number;     
  multiplier: number;  
  status: GameStatus;
};

function generateCells(): Cell[] {
  const cells: Cell[] = [];


  for (let i = 1; i <= 5; i++) {
    cells.push({ id: i, type: 'cash', value: i, opened: false });
  }

  cells.push({ id: 6, type: 'x2', opened: false });

  cells.push({ id: 7, type: 'bomb', opened: false });

  cells.push({ id: 8, type: 'zero', opened: false });
  cells.push({ id: 9, type: 'zero', opened: false });


  const mixed = shuffle(cells).map((c, idx) => ({ ...c, id: idx + 1 }));
  return mixed;
}

function initGame(): GameState {
  return {
    cells: generateCells(),
    baseSum: 0,
    multiplier: 1,
    status: 'playing',
  };
}

export function useGameState() {
  const [state, setState] = useState<GameState>(initGame());

  const balance = useMemo(() => state.baseSum * state.multiplier, [state.baseSum, state.multiplier]);

  const counts = useMemo(() => {
    const acc = { cash: 0, x2: 0, zero: 0, bomb: 0 };
    state.cells.forEach(c => { acc[c.type] += 1 as any; });
    return acc;
  }, [state.cells]);

  function reset() {
    setState(initGame());
  }

  function openCell(id: number) {
    if (state.status === 'over') return;

    setState(prev => {
      const cells = prev.cells.map(c => ({ ...c }));
      const idx = cells.findIndex(c => c.id === id);
      if (idx === -1) return prev;
      const cell = cells[idx];
      if (cell.opened) return prev;

      cell.opened = true;


      if (cell.type === 'cash') {
        return { ...prev, cells, baseSum: prev.baseSum + (cell.value ?? 0) };
      }
      if (cell.type === 'x2') {
        return { ...prev, cells, multiplier: prev.multiplier * 2 };
      }
      if (cell.type === 'bomb') {

        const openedAll = cells.map(c => ({ ...c, opened: true }));
        return { ...prev, cells: openedAll, status: 'over' };
      }

      return { ...prev, cells };
    });
  }

  return {
    state,
    balance,
    counts,
    openCell,
    reset,
  };
}
