import { UserType } from '../types';
import { LinkItem } from '.';

interface PreviewCardProps {
  userData: UserType;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ userData }) => {
  const avatarId = userData?.avatar_id || '';

  return (
    <div className='w-full max-w-[480px] mx-auto'>
      <div className='bg-primary h-[240px] rounded-t-3xl relative'>
        <div className='absolute left-1/2 -translate-x-1/2 -bottom-20'>
          {userData?.avatar_id ? (
            <div className='w-24 h-24 mb-6'>
              <img
                src={`${import.meta.env.VITE_API}images/${avatarId}`}
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
