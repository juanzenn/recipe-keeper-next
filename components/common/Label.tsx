import React from 'react';

interface Props {
  children: string | React.ReactNode;
  type: string;
  onClick?: () => void;
}

export default function Label({ children, type, onClick }: Props) {
  switch (type) {
    case 'main dish':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-yellow-200 text-yellow-400`}>
          {children}
        </div>
      );
    case 'complement':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-blue-200 text-blue-400`}>
          {children}
        </div>
      );
    case 'dessert':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-pink-200 text-pink-400`}>
          {children}
        </div>
      );
    case 'vegan':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-green-200 text-green-400`}>
          {children}
        </div>
      );
    case 'vegetarian':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-emerald-200 text-emerald-400`}>
          {children}
        </div>
      );
    case 'meat':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-red-200 text-red-400`}>
          {children}
        </div>
      );
    case 'chicken':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-orange-200 text-orange-400`}>
          {children}
        </div>
      );
    case 'fish':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-blue-200 text-blue-400`}>
          {children}
        </div>
      );
    case 'pork':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-4 py-1 text-sm rounded-md bg-fuchsia-200 text-fuchsia-400`}>
          {children}
        </div>
      );
  }

  return <></>;
}
