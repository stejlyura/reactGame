import React from 'react';
import { CellCard } from '@/entities/cell/ui/CellCard';
import type { Cell } from '@/entities/cell/ui/model/types';

type BoardProps = {
  cells: Cell[];
  onOpen: (id: number) => void;
  disabled?: boolean;
  registerRef?: (id: number, el: HTMLButtonElement | null) => void;
};

export function Board({ cells, onOpen, disabled, registerRef }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] mx-auto px-2 sm:px-0">
      {cells.map((c) => (
        <CellCard
          key={c.id}
          cell={c}
          onOpen={() => onOpen(c.id)}
          disabled={disabled}
          elRef={(el) => registerRef?.(c.id, el)}
        />
      ))}
    </div>
  );
}
