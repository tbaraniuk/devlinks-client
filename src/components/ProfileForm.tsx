import React, { useRef } from 'react';
import { User, Mail, Image as ImageIcon, Loader2 } from 'lucide-react';

import { Input, Button } from '.';
import { useAppSelector } from '../hooks';

interface ProfileFormProps {
  profile: {
    first_name: string;
    last_name: string;
    email: string;
    file: File | null;
  };
  setProfile: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
      file: File | null;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  isUpdateProfileLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  setProfile,
  onSubmit,
  isUpdateProfileLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userData = useAppSelector((state) => state.user.user);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  return (
    <form onSubmit={onSubmit} className='space-y-6'>
      <div className='p-5 bg-neutral-50 rounded-xl'>
        <label className='text-sm text-neutral-600 font-medium'>
          Profile picture
        </label>
        <div className='mt-2 flex items-start gap-6'>
          <div className='w-48 h-48 bg-neutral-100 rounded-xl flex items-center justify-center'>
            {profile.file ? (
              <img
                src={URL.createObjectURL(profile.file)}
                alt='Profile'
                className='w-full h-full object-cover rounded-xl'
              />
            ) : (
              <ImageIcon size={24} className='text-neutral-400' />
            )}
          </div>
          <div className='flex-1 space-y-2'>
            <p className='text-neutral-500 text-sm'>
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageChange}
              accept='image/*'
              className='hidden'
            />
            <Button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='bg-transparent border border-primary text-primary hover:bg-primary/5'>
              + Upload Image
            </Button>
          </div>
        </div>
      </div>

      <div className='space-y-6'>
        <Input
          id='firstName'
          label='First name'
          icon={User}
          value={profile.first_name ?? userData?.first_name}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, first_name: e.target.value }))
          }
          placeholder='e.g. John'
        />

        <Input
          id='lastName'
          label='Last name'
          icon={User}
          value={profile.last_name ?? userData?.last_name}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, last_name: e.target.value }))
          }
          placeholder='e.g. Appleseed'
        />

        <Input
          id='email'
          label='Email'
          icon={Mail}
          type='email'
          value={profile.email ?? userData?.email}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder='e.g. john@example.com'
        />
      </div>

      <div className='pt-6 border-t'>
        <Button
          type='submit'
          disabled={isUpdateProfileLoading}
          className={
            isUpdateProfileLoading ? 'bg-opacity-50 hover:bg-primary-50' : ''
          }>
          {isUpdateProfileLoading ? (
            <Loader2 className='animate-spin mx-auto' />
          ) : (
            'Save'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
