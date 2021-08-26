import Image from 'next/image';
import React from 'react';

export default function BigLoading() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <Image
        src='/icon.png'
        alt='recipe keeper icon'
        width='150px'
        height='150px'
      />
      <p className='text-gray-400 text-lg'>Loading...</p>
    </div>
  );
}
