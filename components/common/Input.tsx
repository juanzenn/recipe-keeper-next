import React from 'react';

interface Props {
  type: 'text' | 'search' | 'upload' | 'textarea' | 'number' | 'select';
  placeholder?: string;
  icon?: React.ReactNode;
  label?: string;
  options?: string[];
  value: string | number;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export default function Input({
  type,
  placeholder,
  icon,
  label,
  options,
  value,
  onChange,
}: Props) {
  switch (type) {
    case 'text':
      return (
        <div className='w-full'>
          <label className='font-bold tracking-wide text-sm text-gray-900'>
            {label}
          </label>
          <input
            value={value}
            onChange={onChange}
            type='text'
            placeholder={placeholder}
            className='w-full text-base bg-transparent py-2 pl-1 pr-4 tracking-wide text-primary-400 focus:text-primary-500 placeholder-primary-300 focus:outline-none border-b border-primary-300 hover:border-primary-400 focus:border-primary-500'
          />
        </div>
      );
    case 'number':
      return (
        <div className='w-full'>
          <label className='font-bold tracking-wide text-sm text-gray-900'>
            {label}
          </label>
          <input
            value={value}
            onChange={onChange}
            min={0}
            type='number'
            placeholder={placeholder}
            className='w-full text-base bg-transparent py-2 pl-1 pr-4 tracking-wide text-primary-400 focus:text-primary-500 placeholder-primary-300 focus:outline-none border-b border-primary-300 hover:border-primary-400 focus:border-primary-500'
          />
        </div>
      );
    case 'select':
      return (
        <div className='w-full'>
          <label className='font-bold tracking-wide text-sm text-gray-900'>
            {label}
          </label>
          <select
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='cursor-pointer w-full text-base bg-transparent py-2 pl-1 pr-4 tracking-wide text-primary-400 focus:text-primary-500 placeholder-primary-300 focus:outline-none border-b border-primary-300 hover:border-primary-400 focus:border-primary-500'>
            <option>{`Select`}</option>
            {options?.map((option, index) => (
              <option key={`option-${index}`}>{option}</option>
            ))}
          </select>
        </div>
      );
    case 'upload':
      return (
        <div className='w-full'>
          <label className='font-bold tracking-wide text-sm text-gray-900'>
            {label}
          </label>
          <input
            value={value}
            onChange={onChange}
            type='file'
            className='w-full text-base bg-transparent py-2 pl-1 pr-4 text-primary-400 focus:text-primary-500 placeholder-primary-300 focus:outline-none'
          />
        </div>
      );
    case 'textarea':
      return (
        <div className='w-full'>
          <label className='font-bold tracking-wide text-sm text-gray-900'>
            {label}
          </label>
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='resize-none w-full text-base bg-transparent py-2 pl-1 pr-4 tracking-wide text-primary-400 focus:text-primary-500 placeholder-primary-300 focus:outline-none border-b border-primary-300 hover:border-primary-400 focus:border-primary-500'
            rows={5}></textarea>
        </div>
      );
    case 'search':
      return (
        <div className='w-full flex items-center border-2 border-white rounded-md pl-2 pr-4 py-1'>
          <input
            value={value}
            onChange={onChange}
            className='w-full text-base bg-transparent tracking-wide text-white placeholder-gray-50 focus:outline-none focus:border-none'
            type='text'
            placeholder={placeholder}
          />
          <span>{icon}</span>
        </div>
      );
  }
}
