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
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-yellow-100 hover:brightness-105 transition-all text-yellow-600`}>
          {children}
        </div>
      );
    case 'complement':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-blue-100 hover:brightness-105 transition-all text-blue-600`}>
          {children}
        </div>
      );
    case 'dessert':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-pink-100 hover:brightness-105 transition-all text-pink-600`}>
          {children}
        </div>
      );
    case 'vegan':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-green-100 hover:brightness-105 transition-all text-green-600`}>
          {children}
        </div>
      );
    case 'vegetarian':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-emerald-100 hover:brightness-105 transition-all text-emerald-600`}>
          {children}
        </div>
      );
    case 'meat':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-red-100 hover:brightness-105 transition-all text-red-600`}>
          {children}
        </div>
      );
    case 'chicken':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-orange-100 hover:brightness-105 transition-all text-orange-600`}>
          {children}
        </div>
      );
    case 'fish':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-blue-100 hover:brightness-105 transition-all text-blue-600`}>
          {children}
        </div>
      );
    case 'pork':
      return (
        <div
          onClick={onClick}
          className={`w-max cursor-pointer px-6 py-2 text-sm rounded-md bg-fuchsia-100 hover:brightness-105 transition-all text-fuchsia-600`}>
          {children}
        </div>
      );
  }

  return <></>;
}
