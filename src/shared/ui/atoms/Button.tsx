import React from 'react';
import { cn } from '../libs/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition ' +
    'disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30';

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-white/10 hover:bg-white/15 text-white border border-white/10 backdrop-blur',
    ghost:   'bg-transparent hover:bg-white/10 text-white',
    outline: 'border border-white/20 hover:bg-white/10 text-white',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
