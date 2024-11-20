import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../hooks';
import { LinkItem } from '.';
import { useFetchAvatarQuery } from '../api/apiSlice';

const PhonePreview: React.FC = () => {
  const userData = useAppSelector((state) => state.user.user);
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
    <div className='w-[307px] h-[631px] bg-white rounded-[40px] border-[10px] border-neutral-100 shadow-xl p-4 relative'>
      <div className='w-full h-full bg-white rounded-3xl flex flex-col items-center justify-center p-6'>
        {userData?.avatar_id && !isLoading ? (
          <div className='w-24 h-24 mb-6'>
            <img
              src={avatarUrl}
              alt='User Avatar'
              className='w-24 h-24 rounded-full'
            />
          </div>
        ) : (
          <div className='w-24 h-24 rounded-full bg-neutral-100 mb-6 animate-pulse' />
        )}
        {userData?.first_name || userData?.last_name ? (
          <div className='mb-2 font-bold'>
            {(userData.first_name ?? '') + ' ' + (userData?.last_name ?? '')}
          </div>
        ) : (
          <div className='w-36 h-4 rounded-md bg-neutral-100 mb-3 animate-pulse'></div>
        )}
        {userData?.email ? (
          <div className='mb-14 text-sm'>{userData?.email}</div>
        ) : (
          <div className='w-28 h-2 rounded-md bg-neutral-100 mb-14 animate-pulse'></div>
        )}
        <div className='w-full space-y-4'>
          {userData?.links && userData?.links?.length > 0
            ? userData.links.map((item, index) => (
                <LinkItem link={item} key={index} />
              ))
            : [1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className='w-full h-10 bg-neutral-100 rounded-lg animate-pulse'
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
