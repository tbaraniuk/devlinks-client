import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Header, PhonePreview, ProfileForm } from '../components';
import {
  useUpdateProfileMutation,
  useGetCurrentUserQuery,
} from '../api/apiSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setUserData } from '../store/userSlice';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.user);

  const [updatedProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateProfileMutation();

  const {
    data: user,
    error,
    isLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: !!userData,
  });

  const [profile, setProfile] = useState({
    first_name: userData?.first_name ?? '',
    last_name: userData?.last_name ?? '',
    email: userData?.email ?? '',
    file: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await updatedProfile(profile);

    if (result.data) {
      dispatch(setUserData(result.data));
    } else {
      toast.error(
        'An error occurred while setting data, please try later again'
      );
    }
  };

  useEffect(() => {
    if (userData?.id) return;

    dispatch(setUserData(user));

    setProfile({
      first_name: user?.first_name ?? '',
      last_name: user?.last_name ?? '',
      email: user?.email ?? '',
      file: null as File | null,
    });
  }, [user, userData, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <Navigate to='/login' replace />;

  return (
    <div className='min-h-screen bg-neutral-50'>
      <Header />

      <main className='max-w-7xl mx-auto p-4 mt-6'>
        <div className='grid grid-cols-[307px,1fr] gap-6'>
          <div className='flex justify-center'>
            <PhonePreview />
          </div>

          <div className='bg-white rounded-xl p-10'>
            <div className='max-w-xl mx-auto'>
              <div className='space-y-6'>
                <div>
                  <h1 className='text-2xl font-bold text-neutral-800'>
                    Profile Details
                  </h1>
                  <p className='text-neutral-500'>
                    Add your details to create a personal touch to your profile.
                  </p>
                </div>

                <ProfileForm
                  profile={profile}
                  setProfile={setProfile}
                  onSubmit={handleSubmit}
                  isUpdateProfileLoading={isUpdateProfileLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
