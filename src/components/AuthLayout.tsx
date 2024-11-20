import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-[476px] space-y-10'>
        {/* Logo */}
        <div className='flex justify-center'>
          <div className='flex items-center gap-2 text-2xl font-semibold'>
            <div className='w-8 h-8 bg-primary rounded flex items-center justify-center'>
              <span className='text-white'>d</span>
            </div>
            <span>devlinks</span>
          </div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-xl shadow-sm p-10'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
