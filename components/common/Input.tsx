import React from 'react';

interface Props {
  type: 'text' | 'search';
  placeholder: string;
  icon?: React.ReactNode;
}

export default function Input({ type, placeholder, icon }: Props) {
  switch (type) {
    case 'text':
      return <input type='text' placeholder={placeholder} />;
    case 'search':
      return (
        <div className='w-full flex items-center border-2 border-white rounded-md pl-2 pr-4 py-1'>
          <input
            className='w-full text-base bg-transparent tracking-wide text-white placeholder-gray-50 focus:outline-none focus:border-none'
            type='text'
            placeholder={placeholder}
          />
          <span>{icon}</span>
        </div>
      );
  }
}
