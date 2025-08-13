import React from 'react';
import { Badge } from '@/shared/ui/atoms/Badge';

import CashIcon from '@/shared/assets/cash.png';
import X2Icon   from '@/shared/assets/x2.png';
import ZeroIcon from '@/shared/assets/zero.png';
import BombIcon from '@/shared/assets/bomb.png';
import StopIcon from '@/shared/assets/stop.png';

type Props = {
  counts: {
    cash: number;
    x2: number;
    zero: number;
    bomb: number;
    stop?: number; 
  };
};

export const RollToolbar: React.FC<Props> = ({ counts }) => {
  return (
    <div
      className="
        w-full max-w-[420px] mx-auto
        flex flex-wrap items-center justify-center gap-2
        px-3 sm:px-4 mt-2
      "
    >
      <Badge icon={CashIcon} value={counts.cash} />
      <Badge icon={X2Icon}   value={counts.x2}   size="sm" />
      <Badge icon={ZeroIcon} value={counts.zero} size="sm" />
      <Badge icon={BombIcon} value={counts.bomb} />
      {typeof counts.stop === 'number' && (
        <Badge icon={StopIcon} value={counts.stop} size="sm" />
      )}
    </div>
  );
};
