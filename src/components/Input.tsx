import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, ...props }, ref) => {
    return (
      <div className='space-y-2'>
        <label
          htmlFor={props.id}
          className='text-sm text-neutral-600 font-medium'>
          {label}
        </label>
        <div className='relative'>
          <div className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500'>
            <Icon size={20} />
          </div>
          <input
            ref={ref}
            {...props}
            className='w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
          />
        </div>
      </div>
    );
  }
);

export default Input;
