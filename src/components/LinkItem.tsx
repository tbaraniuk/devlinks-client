import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

import { LinkType } from '../types';

interface LinkItemProps {
  link: LinkType;
}

const getPlatformStyles = (platform: string) => {
  switch (platform) {
    case 'github':
      return {
        icon: Github,
        bg: 'bg-neutral-800',
        hover: 'hover:bg-neutral-900',
      };
    case 'twitter':
      return {
        icon: Twitter,
        bg: 'bg-[#1DA1F2]',
        hover: 'hover:bg-[#1a8cd8]',
      };
    case 'linkedin':
      return {
        icon: Linkedin,
        bg: 'bg-[#0A66C2]',
        hover: 'hover:bg-[#094c8f]',
      };
    default:
      return {
        icon: Github,
        bg: 'bg-neutral-800',
        hover: 'hover:bg-neutral-900',
      };
  }
};

const LinkItem: React.FC<LinkItemProps> = ({ link }) => {
  const { icon: Icon, bg, hover } = getPlatformStyles(link.platform);

  return (
    <a
      href={link.link}
      target='_blank'
      rel='noopener noreferrer'
      className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg text-white transition-colors ${bg} ${hover}`}>
      <Icon size={20} />
      <span className='font-medium capitalize'>{link.platform}</span>
    </a>
  );
};

export default LinkItem;
