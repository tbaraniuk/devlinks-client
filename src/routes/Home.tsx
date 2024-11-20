import React, { useState, useEffect } from 'react';
import { Smartphone, Plus, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

import { Header, PhonePreview, Button, LinkForm } from '../components';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useGetCurrentUserQuery, useAddLinksMutation } from '../api/apiSlice';
import { setUserData } from '../store/userSlice';
import { LinkType } from '../types';
import { Navigate } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.user);

  const {
    data: user,
    error,
    isLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: !!userData,
  });

  const [addLinks, { isLoading: isAddLinksLoading }] = useAddLinksMutation();

  const [links, setLinks] = useState<LinkType[]>(userData?.links ?? []);

  const addLink = () => {
    setLinks([...links, { link: '', platform: '' }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const onChangeLink = (index: number, key: string, value: string) => {
    setLinks((prev) =>
      prev.map((item, i) => (i == index ? { ...item, [key]: value } : item))
    );
  };

  const onSendLinks = async () => {
    const userData = await addLinks(links);

    if (userData.data) {
      dispatch(setUserData(userData.data));
    } else {
      toast.error(
        'An error occurred while setting data, please try later again'
      );
    }
  };

  useEffect(() => {
    if (userData?.id) {
      setLinks(userData.links);
      return;
    } else if (user) {
      dispatch(setUserData(user));
      setLinks(user?.links);
    }
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
            <div className='max-w-xl mx-auto space-y-6'>
              <h1 className='text-2xl font-bold text-neutral-800'>
                Customize your links
              </h1>
              <p className='text-neutral-500'>
                Add/edit/remove links below and share all your profiles with the
                world!
              </p>

              <Button
                onClick={addLink}
                className='flex items-center justify-center gap-2 bg-transparent border border-primary text-primary hover:bg-primary/5'>
                <Plus size={20} />
                Add new link
              </Button>

              {links.length === 0 ? (
                <div className='flex flex-col items-center gap-6 mt-10 py-10'>
                  <Smartphone size={48} className='text-primary' />
                  <h2 className='text-xl font-bold text-neutral-800'>
                    Let's get you started
                  </h2>
                  <p className='text-neutral-500 text-center max-w-md'>
                    Use the "Add new link" button to get started. Once you have
                    more than one link, you can reorder and edit them. We're
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              ) : (
                <div className='space-y-6'>
                  {links.map((link, index) => (
                    <LinkForm
                      key={index}
                      index={index}
                      link={link}
                      onRemove={removeLink}
                      onChangeLink={onChangeLink}
                    />
                  ))}
                </div>
              )}

              <div className='pt-6 border-t'>
                <Button
                  className={
                    isAddLinksLoading ? 'bg-opacity-50 hover:bg-primary-50' : ''
                  }
                  onClick={onSendLinks}>
                  {isAddLinksLoading ? (
                    <Loader2 className='animate-spin mx-auto' />
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
