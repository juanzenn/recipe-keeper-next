import React from 'react';

interface Props {
  children: string | React.ReactNode;
  type: string;
  onClick?: () => void;
}

export default function Label({ children, type, onClick }: Props) {
  switch (type.toLowerCase()) {
    case 'meat':
      return (
        <div
          onClick={onClick}
          className={`cursor-pointer px-4 py-1 text-sm rounded-md bg-primary-200 text-primary-400`}>
          {children}
        </div>
      );
    case 'lunch':
      return (
        <div
          onClick={onClick}
          className={`cursor-pointer px-4 py-1 text-sm rounded-md bg-blue-200 text-blue-400`}>
          {children}
        </div>
      );
    case 'dinner':
      return (
        <div
          onClick={onClick}
          className={`cursor-pointer px-4 py-1 text-sm rounded-md bg-yellow-200 text-yellow-500`}>
          {children}
        </div>
      );
    case 'default':
      return (
        <div
          onClick={onClick}
          className={`cursor-pointer px-4 py-1 text-sm rounded-md bg-primary-200 text-primary-400`}>
          {children}
        </div>
      );
  }

  return <></>;
}
