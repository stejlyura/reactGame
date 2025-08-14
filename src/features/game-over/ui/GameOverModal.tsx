import { Modal } from '@/shared/ui/molecules/Modal';
import { Button } from '@/shared/ui/atoms/Button';
import {type Cell } from '@/entities/cell/ui/model/types';
import { Icon } from '@/shared/ui/atoms/Icon';
import BombIcon from '@/shared/assets/bomb.png';
import StopIcon from '@/shared/assets/stop.png';
import CashIcon from '@/shared/assets/cash.png';
import X2Icon from '@/shared/assets/x2.png';
import ZeroIcon from '@/shared/assets/zero.png';
import { GradientButton } from '@/shared/ui/atoms/GradientButton';

const iconMap = { cash: CashIcon, x2: X2Icon, zero: ZeroIcon, bomb: BombIcon };

type Props = {
  open: boolean;
  onRestart: () => void;
  cells: Cell[];         
};

export function GameOverModal({ open, onClaim, total }:{
  open: boolean; onClaim: () => void; total: number;
}) {
  return (
    <Modal open={open} onClose={onClaim} ariaLabel="Game over">
      <div className="flex flex-col items-center text-center">
        <img src="/favicon.png" className="h-6 mb-3 opacity-90" alt="brand" />
        <h2 className="text-3xl font-extrabold text-white drop-shadow mb-1">Game over!</h2>
        <p className="text-white/80">You’ve reached the end of this run…</p>

        <div className="relative my-6 h-36 w-36 rounded-full radial-burst-green grid place-items-center">
          <Icon src={StopIcon} alt="stop" size={42} />
        </div>

        <div className="text-lg font-bold text-white mb-1">{total}</div>
        <p className="text-white/70 mb-6">…claim and return to the main board</p>

        <GradientButton color="green" fullWidth onClick={onClaim}>Claim</GradientButton>
      </div>
    </Modal>
  );
}