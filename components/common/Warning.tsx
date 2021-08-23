import { TrashCan } from 'akar-icons';
import React from 'react';
import { Button } from './Button';

interface Props {
  state: boolean;
  message: string;
  closeWarning: Function;
  cb: Function;
}

export default function Warning(props: Props) {
  return (
    <div
      className={
        props.state
          ? `fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm z-50`
          : 'hidden'
      }>
      <div className='w-1/2 bg-white rounded-md p-4'>
        <strong className='text-red-500 font-bold tracking-tight text-4xl mb-2 inline-block'>
          Warning
        </strong>
        <p className='text-gray-600 mb-12'>{props.message}</p>

        <section className='flex gap-2 w-full justify-end'>
          <button
            onClick={() => props.closeWarning()}
            className='px-6 py-2 font-medium hover:bg-gray-100 rounded-md transition-all'>
            Cancel
          </button>
          <Button
            onClick={() => props.cb()}
            className='px-6 py-2 flex gap-2 items-center'>
            <TrashCan size={16} /> Delete
          </Button>
        </section>
      </div>
    </div>
  );
}
