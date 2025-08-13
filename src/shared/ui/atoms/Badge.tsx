import React from 'react';
import { cn } from '../libs/cn';
import { Icon } from './Icon';

type BadgeProps = {
  icon: string;     
  value: number;    
  size?: 'sm' | 'md';
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  icon,
  value,
  size = 'md',
  className
}) => {
  const sizes: Record<typeof size, string> = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-2'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/10 shadow-sm',
        sizes[size],
        className
      )}
    >
      <Icon src={icon} alt="" size={size === 'sm' ? 14 : 16} />
      <span className="font-semibold">{value}</span>
    </div>
  );
};
