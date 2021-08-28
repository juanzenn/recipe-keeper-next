import React from 'react';

interface Props {
  type: 'text' | 'search' | 'textarea' | 'number' | 'select';
  placeholder?: string;
  icon?: React.ReactNode;
  label?: string;
  options?: string[];
  value: string | number;
  required?: boolean;
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
  required = false,
  onChange,
}: Props) {
  const styles =
    'w-full text-base bg-white p-2 rounded shadow-sm border border-gray-300 hover:border-primary-300 focus:outline-none focus:border-primary-300 focus:ring focus:ring-primary-200 resize-none';

  switch (type) {
    case 'text':
      return (
        <div className='w-full'>
          <label className='inline-block font-bold tracking-wide text-primary-600 mb-1'>
            {label}
          </label>
          <input
            required={required}
            value={value}
            onChange={onChange}
            type='text'
            placeholder={placeholder}
            className={styles}
          />
        </div>
      );
    case 'number':
      return (
        <div className='w-full'>
          <label className='inline-block mb-1 font-bold tracking-wide text-primary-600'>
            {label}
          </label>
          <input
            required={required}
            value={value}
            onChange={onChange}
            min={0}
            type='number'
            placeholder={placeholder}
            className={styles}
          />
        </div>
      );
    case 'select':
      return (
        <div className='w-full'>
          <label className='inline-block mb-1 font-bold tracking-wide text-primary-600'>
            {label}
          </label>
          <select
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles}>
            <option>{`Select`}</option>
            {options?.map((option, index) => (
              <option key={`option-${index}`}>{option}</option>
            ))}
          </select>
        </div>
      );
    case 'textarea':
      return (
        <div className='w-full'>
          <label className='inline-block mb-1 font-bold tracking-wide text-primary-600'>
            {label}
          </label>
          <textarea
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles}
            rows={5}></textarea>
        </div>
      );
    case 'search':
      return (
        <div className='w-full flex items-center border-2 border-white rounded-md pl-2 pr-4 py-1'>
          <input
            required={required}
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
