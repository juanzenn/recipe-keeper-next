import React, { useState } from 'react';
import { ChevronDown } from 'akar-icons';

interface Props {
  label?: string;
  options?: string[];
}

export default function Dropdown(props: Props) {
  const [active, setActive] = useState(false);

  return (
    <article
      className='inline-block relative'
      onMouseLeave={() => setActive(false)}>
      <p
        onClick={() => setActive(true)}
        className='cursor-pointer flex items-center gap-2 hover:text-primary-100 text-lg'>
        {props.label || 'Filter'} <ChevronDown size={20} />
      </p>

      <div
        className={
          active
            ? `absolute top-7 p-4 space-y-2 text-left text-gray-900 bg-white shadow rounded-md`
            : `hidden`
        }>
        <p className='cursor-pointer tracking-wider hover:bg-gray-100 p-2 rounded-sm'>
          Filter1
        </p>
        <p className='cursor-pointer tracking-wider hover:bg-gray-100 p-2 rounded-sm'>
          Filter2
        </p>
        <p className='cursor-pointer tracking-wider hover:bg-gray-100 p-2 rounded-sm'>
          Filter3
        </p>
      </div>
    </article>
  );
}
