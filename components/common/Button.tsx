import React from 'react';

interface Props {
  children: string | React.ReactNode;
  className?: string;
  rest?: any;
}

function Button(props: Props) {
  return (
    <button
      className={`inline-block font-medium text-white bg-primary-500 rounded shadow-md hover:bg-primary-600 transition-colors duration-300 ${props.className}`}
      {...props.rest}>
      {props.children}
    </button>
  );
}

function ButtonSecondary(props: Props) {
  return (
    <button
      className={`inline-block font-medium bg-primary-50 hover:bg-primary-500 hover:text-white tracking-wide rounded transition-all duration-300 ${props.className}`}
      {...props.rest}>
      {props.children}
    </button>
  );
}

export { Button, ButtonSecondary };
