import React from 'react';
import { cn } from '../libs/cn';

type IconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ size = 24, className, ...rest }) => {
  return (
    <img
      width={size}
      height={size}
      className={cn('inline-block select-none', className)}
      {...rest}
    />
  );
};
