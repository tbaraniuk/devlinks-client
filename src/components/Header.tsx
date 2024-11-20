import React from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '.';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className='w-full bg-white p-4 border-b'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <div className='w-8 h-8 bg-primary rounded flex items-center justify-center'>
            <span className='text-white'>d</span>
          </div>
          <span>devlinks</span>
        </div>

        <nav className='flex items-center gap-4'>
          <Link
            to='/'
            className='flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-neutral-700'>
            <LinkIcon size={20} />
            <span>Links</span>
          </Link>
          <Link
            to='/profile'
            className='flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-neutral-700'>
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>

        <Button
          className='px-3'
          fullWidth={false}
          onClick={() => navigate('/preview')}>
          Preview
        </Button>
      </div>
    </header>
  );
};

export default Header;
