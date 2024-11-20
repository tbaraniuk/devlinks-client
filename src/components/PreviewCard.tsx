import React, { useState, useEffect } from 'react';

import { UserType } from '../types';
import { useFetchAvatarQuery } from '../api/apiSlice';
import { LinkItem } from '.';

interface PreviewCardProps {
  userData: UserType;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ userData }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  const avatarId = userData?.avatar_id || '';

  const { data: avatarBlob, isLoading } = useFetchAvatarQuery(avatarId, {
    skip: !avatarId,
  });

  useEffect(() => {
    if (avatarBlob) {
      setAvatarUrl(URL.createObjectURL(avatarBlob ?? ''));
    }
  }, [avatarBlob]);

  return (
    <div className='w-full max-w-[480px] mx-auto'>
      <div className='bg-primary h-[240px] rounded-t-3xl relative'>
        <div className='absolute left-1/2 -translate-x-1/2 -bottom-20'>
          {userData?.avatar_id && !isLoading ? (
            <div className='w-24 h-24 mb-6'>
              <img
                src={avatarUrl}
                alt='User Avatar'
                className='w-24 h-24 rounded-full'
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className='bg-white pt-24 pb-12 px-14 rounded-b-3xl shadow-sm'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-neutral-800 mb-2'>
            {userData?.first_name + ' ' + userData?.last_name}
          </h1>
          <p className='text-neutral-500'>{userData?.email ?? ''}</p>
        </div>

        <div className='space-y-4'>
          {userData.links.map((link, index) => (
            <LinkItem key={index} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
