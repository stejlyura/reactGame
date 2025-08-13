import React from 'react';
import { CounterUp } from '@/shared/ui/atoms/CounterUp';
import { Icon } from '@/shared/ui/atoms/Icon';

// заміни шлях на свій SVG
import CashIcon from '@/shared/assets/cash.png';

type Props = {
  balance: number;              
  hint?: string;                
  onIconClick?: () => void;     
};

export const BalanceBar: React.FC<Props> = ({ balance, hint, onIconClick }) => {
  return (
    <div
      className="
        w-full max-w-[420px] mx-auto
        flex items-center justify-center gap-2
        px-3 sm:px-4 py-3
      "
    >
      <button
        type="button"
        onClick={onIconClick}
        className="
          rounded-xl border border-white/10 bg-white/10 backdrop-blur
          p-2 shrink-0 transition hover:bg-white/15 active:scale-95
        "
        title={hint}
      >
        <Icon src={CashIcon} alt="balance" size={24} />
      </button>

      <div
        className="
          flex-1 rounded-xl border border-white/10 bg-white/10 backdrop-blur
          px-3 py-2 text-center
        "
      >
        <span className="text-sm opacity-70 block leading-none">Balance</span>
        <div className="text-2xl font-bold leading-tight">
          <CounterUp value={balance} />
        </div>
      </div>
    </div>
  );
};
