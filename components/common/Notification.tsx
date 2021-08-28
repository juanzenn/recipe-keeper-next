import React from 'react';

interface Props {
  message: string;
}

export function NotificationSuccess({ message }: Props) {
  return (
    <div className='fixed top-4 rigth-4 lg:right-8 px-4 py-2 rounded-md bg-green-100 text-green-800 shadow'>
      {message}
    </div>
  );
}

export function NotificationError({ message }: Props) {
  return (
    <div className='fixed top-4 rigth-4 lg:right-8 px-4 py-2 rounded-md bg-red-100 text-red-800 shadow'>
      {message}
    </div>
  );
}
