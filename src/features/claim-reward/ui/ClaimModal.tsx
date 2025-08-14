import { Modal } from '@/shared/ui/molecules/Modal';
import { Button } from '@/shared/ui/atoms/Button';
import { CounterUp } from '@/shared/ui/atoms/CounterUp';
import {type Cell } from '@/entities/cell/ui/CellCard';
import { Icon } from '@/shared/ui/atoms/Icon';

import CashIcon from '@/shared/assets/cash.png';
import X2Icon from '@/shared/assets/x2.png';
import ZeroIcon from '@/shared/assets/zero.png';
import BombIcon from '@/shared/assets/bomb.png';

const iconMap = { cash: CashIcon, x2: X2Icon, zero: ZeroIcon, bomb: BombIcon };

type Props = {
  open: boolean;
  onClose: () => void;
  openedCells: Cell[];
  balance: number;
  onConfirm?: () => void;
};

export function ClaimModal({ open, onClose, openedCells, balance, onConfirm }: Props) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Claim summary">
      <h2 className="text-lg font-semibold mb-2 text-center">Your Results</h2>

      <div className="max-h-[40vh] overflow-auto rounded-xl border border-white/10">
        <ul className="divide-y divide-white/10">
          {openedCells.map(c => (
            <li key={c.id} className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <Icon src={iconMap[c.type]} alt={c.type} size={20} />
                <span className="capitalize">{c.type}</span>
              </div>
              {c.type === 'cash' ? <span className="opacity-80">+{c.value}</span> : <span className="opacity-50">—</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 text-center">
        <span className="opacity-70 text-sm">Total</span>
        <div className="text-2xl font-bold"><CounterUp value={balance} /></div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
}
