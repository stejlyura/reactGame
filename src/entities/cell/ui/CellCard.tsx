import { motion } from 'framer-motion';
import { type Cell } from '@/entities/cell/ui/model/types';
import { cn } from '@/shared/ui/libs/cn';
import { Icon } from '@/shared/ui/atoms/Icon';

import CashIcon from '@/shared/assets/cash.png';
import X2Icon from '@/shared/assets/x2.png';
import ZeroIcon from '@/shared/assets/zero.png';
import BombIcon from '@/shared/assets/bomb.png';

const iconMap: Record<Cell['type'], string> = {
  cash: CashIcon,
  x2: X2Icon,
  zero: ZeroIcon,
  bomb: BombIcon,
};

type Props = {
  cell: Cell;
  onOpen: () => void;
  disabled?: boolean;
  elRef?: (el: HTMLButtonElement | null) => void; // ← додано
};

export function CellCard({ cell, onOpen, disabled, elRef }: Props) {
  const isWin = cell.opened && cell.type === 'cash';
  const frame = isWin ? 'border-[#7dff6a] bg-[#7dff6a1a]' : 'border-white/10';
  const glow = isWin ? 'ring-2 ring-[#7dff6a]/60' : '';

  return (
    <button
      ref={elRef} // ← тепер можна передати ref із батьківського компонента
      className="relative aspect-square perspective-1000"
      onClick={onOpen}
      disabled={disabled || cell.opened}
    >
      <motion.div
        className={cn(
          'absolute inset-0 preserve-3d rounded-xl shadow-inner transition-colors',
          !cell.opened && 'bg-white/10 hover:bg-white/15',
          frame,
          glow
        )}
        animate={{ rotateY: cell.opened ? 180 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 backface-hidden flex items-center justify-center">
          <span className="text-3xl opacity-70">$</span>
        </div>

        <div
          className={cn(
            'absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center',
            isWin && 'radial-burst-green'
          )}
        >
          <Icon src={iconMap[cell.type]} alt={cell.type} size={36} />
        </div>
      </motion.div>

      {isWin && (
        <div className="absolute -top-2 -left-1 text-green-200 font-bold text-sm drop-shadow">
          {cell.value}
        </div>
      )}
    </button>
  );
}
