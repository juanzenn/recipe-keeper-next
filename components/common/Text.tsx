import React from 'react';

interface Props {
  type: 'h1' | 'h2' | 'h3' | 'paragraph';
  children: string | React.ReactNode;
  className?: string;
}

export default function Text({ type, children, className }: Props) {
  switch (type) {
    case 'h1':
      return (
        <h1
          className={`text-4xl lg:text-6xl font-bold tracking-tight ${className}`}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={`text-2xl lg:text-4xl font-bold tracking-tight ${className}`}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={`text-lg lg:text-2xl font-bold tracking-tight ${className}`}>
          {children}
        </h3>
      );
    case 'paragraph':
      return (
        <p className={`text-base text-gray-600 ${className}`}>{children}</p>
      );
  }
}
