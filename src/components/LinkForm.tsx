import React from 'react';
import { ChevronDown, GripVertical, Link2 } from 'lucide-react';

import { LinkType } from '../types';

interface Platform {
  id: string;
  name: string;
  icon: string;
}

interface LinkFormProps {
  index: number;
  link: LinkType;
  onRemove: (index: number) => void;
  onChangeLink: (index: number, key: string, value: string) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({
  index,
  link,
  onRemove,
  onChangeLink,
}) => {
  const platforms: Platform[] = [
    { id: 'github', name: 'GitHub', icon: '🐱' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  ];

  return (
    <div className='bg-neutral-50 p-5 rounded-lg'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2 text-neutral-500'>
          <GripVertical size={20} className='cursor-move' />
          <span className='font-medium'>Link #{index + 1}</span>
        </div>
        <button
          onClick={() => onRemove(index)}
          className='text-neutral-500 hover:text-neutral-700'>
          Remove
        </button>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-600 font-medium'>
            Platform
          </label>
          <div className='relative'>
            <select
              className='w-full pl-4 pr-10 py-3 bg-white border border-neutral-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
              value={link.platform}
              onChange={(e) => onChangeLink(index, 'platform', e.target.value)}>
              <option value='' disabled>
                Select a platform
              </option>
              {platforms.map((platform) => (
                <option key={platform?.id} value={platform?.id}>
                  {platform?.icon} {platform?.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-neutral-600 font-medium'>Link</label>
          <div className='relative'>
            <div className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500'>
              <Link2 size={20} />
            </div>
            <input
              type='url'
              placeholder='e.g. https://github.com/johnappleseed'
              className='w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
              value={link.link}
              onChange={(e) => onChangeLink(index, 'link', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
