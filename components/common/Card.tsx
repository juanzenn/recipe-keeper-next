import React from 'react';

interface Props {
  children: string | React.ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <article className='h-[max-content] p-5 rounded-md shadow-sm'>
      {children}
    </article>
  );
}
