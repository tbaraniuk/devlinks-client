import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PreviewCard } from '../components';
import { useAppSelector } from '../hooks';
import { useGetUserDataByUsernameQuery } from '../api/apiSlice';
import { UserType } from '../types';

interface PreviewProps {
  isCurrentUser: boolean | undefined;
}

const Preview: React.FC<PreviewProps> = ({ isCurrentUser = false }) => {
  const params = useParams();
  const currentUserData = useAppSelector((state) => state.user.user);
  const {
    data: user,
    error,
    isLoading,
  } = useGetUserDataByUsernameQuery(params.username ?? '', {
    skip: isCurrentUser,
  });

  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    if (isCurrentUser && currentUserData?.id) {
      setUserData(currentUserData);
      return;
    }

    setUserData(user);
  }, [isCurrentUser, currentUserData, user]);

  if (isLoading) return <p>Is loading...</p>;
  if (error) return <Navigate to='/login' replace />;

  return (
    <div className='min-h-screen bg-neutral-50'>
      <header className='w-full bg-white p-4 border-b'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          {currentUserData?.id ? (
            <Link
              to='/'
              className='flex items-center gap-2 text-neutral-500 hover:text-neutral-700'>
              <ArrowLeft size={20} />
              <span>Back to Editor</span>
            </Link>
          ) : null}
          {/* <Button
            fullWidth={false}
            className='bg-transparent border border-primary text-primary hover:bg-primary/5 px-3'>
            <div className='flex items-center gap-2'>
              <Share2 size={20} />
              Share Link
            </div>
          </Button> */}
        </div>
      </header>

      <main className='max-w-3xl mx-auto p-4 mt-6'>
        {userData ? <PreviewCard userData={userData} /> : null}
      </main>
    </div>
  );
};

export default Preview;
