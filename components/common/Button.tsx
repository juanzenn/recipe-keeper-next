import React from 'react';

interface Props {
  children: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  rest?: any;
}

function Button(props: Props) {
  return (
    <button
      className={`font-medium text-white bg-primary-500 rounded shadow-md hover:bg-primary-600 transition-colors duration-300 ${props.className}`}
      {...props.rest}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}
function ButtonOutlined(props: Props) {
  return (
    <button
      className={`font-medium text-primary-500 border-2 border-primary-500 bg-white hover:bg-primary-500 hover:text-white  rounded shadow-md transition-colors duration-300 ${props.className}`}
      {...props.rest}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function ButtonSecondary(props: Props) {
  return (
    <button
      className={`font-medium bg-primary-50 hover:bg-primary-500 hover:text-white tracking-wide rounded transition-all duration-300 ${props.className}`}
      {...props.rest}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export { Button, ButtonSecondary, ButtonOutlined };
