import React from 'react';

interface Props {
  children: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
}

function Button({ children, className, onClick, type = 'button' }: Props) {
  return (
    <button
      className={`font-medium text-white bg-primary-500 rounded shadow-md hover:bg-primary-600  duration-300  focus:ring focus:outline-none  ${className}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
}
function ButtonOutlined({
  children,
  className,
  onClick,
  type = 'button',
}: Props) {
  return (
    <button
      className={`font-medium text-primary-500 border-2 border-primary-500 bg-white hover:bg-primary-500 hover:text-white rounded shadow-md transition-colors  duration-300 focus:ring focus:outline-none  ${className}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
}

function ButtonSecondary({
  children,
  className,
  onClick,
  type = 'button',
}: Props) {
  return (
    <button
      className={`font-medium bg-primary-50 hover:bg-primary-500 hover:text-white tracking-wide rounded transition-all duration-300  focus:ring focus:outline-none ${className}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
}

export { Button, ButtonSecondary, ButtonOutlined };
