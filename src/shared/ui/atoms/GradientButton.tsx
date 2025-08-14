import React from 'react';
import { cn } from '@/shared/ui/libs/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'green' | 'red' | 'violet';
  fullWidth?: boolean;
};
export const GradientButton: React.FC<Props> = ({ color='green', fullWidth, className, children, ...rest }) => {
  const palette: Record<NonNullable<Props['color']>, string> = {
    green:  'bg-gradient-to-b from-[#88FF64] to-[#4CD62D] text-[#0b1a0b] glow-green',
    red:    'bg-gradient-to-b from-[#FF6B6B] to-[#E24545] text-white glow-red',
    violet: 'bg-gradient-to-b from-[#9b7bff] to-[#6a41ff] text-white glow-violet',
  };
  return (
    <button
      className={cn(
        'rounded-2xl h-12 px-6 font-semibold transition active:scale-[0.985] border border-white/10',
        palette[color],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
