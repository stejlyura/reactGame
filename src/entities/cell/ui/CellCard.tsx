import { motion } from 'framer-motion';
import {type Cell } from '@/entities/cell/ui/model/types';
import { cn } from '@/shared/ui/libs/cn';
import { Icon } from '@/shared/ui/atoms/Icon';

// Маппінг іконок за типом
import CashIcon from '@/shared/assets/icons/cash.svg';
import X2Icon from '@/shared/assets/icons/x2.svg';
import ZeroIcon from '@/shared/assets/icons/zero.svg';
import BombIcon from '@/shared/assets/icons/bomb.svg';

const iconMap: Record<Cell['type'], string> = {
  cash: CashIcon,
  x2: X2Icon,
  zero: ZeroIcon,
  bomb: BombIcon
};

type Props = {
  cell: Cell;
  onOpen: () => void;
  disabled?: boolean;
};

export function CellCard({ cell, onOpen, disabled }: Props) {
  return (
    <button
      className="relative aspect-square perspective-1000"
      onClick={onOpen}
      disabled={disabled || cell.opened}
    >
      <motion.div
        className={cn(
          'absolute inset-0 preserve-3d rounded-xl border border-white/10 shadow-inner transition-colors',
          !cell.opened && 'bg-white/10 hover:bg-white/15'
        )}
        animate={{ rotateY: cell.opened ? 180 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
      >
        {/* Лицьова сторона (закрита) */}
        <div className="absolute inset-0 backface-hidden flex items-center justify-center">
          <span className="text-3xl opacity-70">?</span>
        </div>

        {/* Зворотня сторона (відкрита) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center">
          <Icon src={iconMap[cell.type]} alt={cell.type} size={36} />
        </div>
      </motion.div>
    </button>
  );
}
