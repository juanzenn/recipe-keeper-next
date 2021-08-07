import React from 'react';

interface Props {
  children: string | React.ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <article className='h-[max-content] p-4 rounded-md shadow-lg'>
      {children}
    </article>
  );
}
