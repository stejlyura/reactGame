import React from 'react';
import { cn } from '../libs/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-white/10 backdrop-blur',
        className
      )}
      {...rest}
    />
  );
}
