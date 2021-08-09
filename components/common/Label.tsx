import React from 'react';

interface Props {
  children: string | React.ReactNode;
  type: string;
}

export default function Label({ children, type }: Props) {
  switch (type) {
    case 'meat':
      return (
        <div
          className={`px-4 py-1 text-sm rounded-md bg-primary-200 text-primary-400`}>
          {children}
        </div>
      );
    case 'lunch':
      return (
        <div
          className={`px-4 py-1 text-sm rounded-md bg-blue-200 text-blue-400`}>
          {children}
        </div>
      );
    case 'dinner':
      return (
        <div
          className={`px-4 py-1 text-sm rounded-md bg-yellow-200 text-yellow-500`}>
          {children}
        </div>
      );
    case 'default':
      return (
        <div
          className={`px-4 py-1 text-sm rounded-md bg-primary-200 text-primary-400`}>
          {children}
        </div>
      );
  }

  return <></>;
}
