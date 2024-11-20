import React, { ButtonHTMLAttributes } from 'react';

import { cn } from '../utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <button
      className={cn(
        fullWidth ? 'w-full' : '',
        'bg-primary hover:bg-primary-light text-white font-medium py-3 rounded-lg transition-colors',
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
