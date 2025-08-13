import { CellCard } from '@/entities/cell/ui/CellCard';
import {type Cell } from '@/entities/cell/ui/model/types';

type BoardProps = {
  cells: Cell[];
  onOpen: (id: number) => void;
  disabled?: boolean;
};

export function Board({ cells, onOpen, disabled }: BoardProps) {
  return (
    <div
      className="
        grid grid-cols-3 gap-3
        w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px]
        mx-auto px-2 sm:px-0
      "
    >
      {cells.map((cell) => (
        <CellCard
          key={cell.id}
          cell={cell}
          onOpen={() => onOpen(cell.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
