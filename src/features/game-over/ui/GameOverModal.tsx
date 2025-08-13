import { Modal } from '@/shared/ui/molecules/Modal';
import { Button } from '@/shared/ui/atoms/Button';
import {type Cell } from '@/entities/cell/ui/model/types';
import { Icon } from '@/shared/ui/atoms/Icon';
import BombIcon from '@/shared/assets/icons/bomb.svg';
import CashIcon from '@/shared/assets/icons/cash.svg';
import X2Icon from '@/shared/assets/icons/x2.svg';
import ZeroIcon from '@/shared/assets/icons/zero.svg';

const iconMap = { cash: CashIcon, x2: X2Icon, zero: ZeroIcon, bomb: BombIcon };

type Props = {
  open: boolean;
  onRestart: () => void;
  cells: Cell[];         
};

export function GameOverModal({ open, onRestart, cells }: Props) {
  return (
    <Modal open={open} onClose={onRestart} ariaLabel="Game Over">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon src={BombIcon} alt="bomb" size={24} />
        <h2 className="text-lg font-semibold">Game Over</h2>
      </div>

      <p className="text-center text-sm opacity-80 mb-3">
        You hit a bomb. Here’s what was on the board:
      </p>

      <div className="grid grid-cols-3 gap-2">
        {cells.map(c => (
          <div key={c.id} className="rounded-lg border border-white/10 bg-white/10 px-2 py-3 text-center">
            <Icon src={iconMap[c.type]} alt={c.type} size={22} />
            <div className="mt-1 text-xs capitalize opacity-80">{c.type}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button fullWidth onClick={onRestart}>Try Again</Button>
      </div>
    </Modal>
  );
}
