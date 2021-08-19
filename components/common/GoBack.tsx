import React from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft } from 'akar-icons';

export default function GoBack() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className='w-max p-4 mb-4 flex gap-2 items-center cursor-pointer text-gray-600 hover:text-primary-600 transition-all'>
      <ChevronLeft size={24} />
      <span>Go back</span>
    </div>
  );
}
