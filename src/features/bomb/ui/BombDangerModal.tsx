import { Modal } from '@/shared/ui/molecules/Modal';
import { GradientButton } from '@/shared/ui/atoms/GradientButton';
import { Icon } from '@/shared/ui/atoms/Icon';

import CashIcon from '@/shared/assets/cash.png';
import X2Icon from '@/shared/assets/x2.png';
import ZeroIcon from '@/shared/assets/zero.png';
import BombIcon from '@/shared/assets/bomb.png';

export function BombDangerModal({ open, onClose, onTakeHit, onDefuse, pendingAmount }:{
  open: boolean; onClose: () => void; onTakeHit: () => void; onDefuse: () => void; pendingAmount: number;
}) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Danger ahead">
      <div className="flex flex-col items-center text-center">
        <img src="/favicon.png" className="h-6 mb-3 opacity-90" alt="brand" />
        <h2 className="text-2xl font-extrabold text-white drop-shadow mb-1">Danger ahead!</h2>
        <p className="text-white/80">You’re on a Bomb Square! You hit a bomb<br/>and lose all rewards from this field…</p>

        <div className="relative my-6 h-36 w-36 rounded-full radial-burst-red grid place-items-center">
          <Icon src={BombIcon} alt="bomb" size={40} />
        </div>

        <div className="text-lg font-bold text-white mb-6">{pendingAmount}</div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <GradientButton color="red" onClick={onTakeHit}>
            <span className="inline-flex items-center gap-2"><Icon src={BombIcon} alt="" size={18}/>Take a hit</span>
          </GradientButton>
          <GradientButton color="violet" onClick={onDefuse}>
            Defuse for <span className="ml-1 inline-flex items-center gap-1"><Icon src={CashIcon} alt="" size={18}/>49</span>
          </GradientButton>
        </div>
      </div>
    </Modal>
  );
}
