import { deleteRecipeById } from '@lib/supabase';
import { Gear, Pencil, TrashCan } from 'akar-icons';
import Link from 'next/link';
import React, { useState } from 'react';
import Warning from './Warning';

interface Props {
  id: string;
}

export default function RecipeCardOptions({ id }: Props) {
  const [active, setActive] = useState(false);
  const [warning, setWarning] = useState(false);

  async function deleteRecipe(id: string) {
    const recipe = await deleteRecipeById(id);
    if (recipe) {
      window.location.reload();
    }
    return;
  }

  return (
    <>
      <div
        className='cursor-pointer relative w-1/4 h-max flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md'
        onClick={() => setActive(prev => !prev)}>
        <Gear size={20} className='text-gray-900' />
        <section
          className={
            active
              ? 'absolute top-12 right-0 border border-gray-100 shadow rounded-md'
              : 'hidden'
          }>
          <Link href={`/app/recipes/edit/${id}`}>
            <a className='w-full px-6 py-2 flex items-center gap-2 transition-all hover:bg-gray-100'>
              <Pencil size={20} />
              Edit
            </a>
          </Link>
          <button
            onClick={() => setWarning(prev => !prev)}
            className='w-full px-6 py-2 flex items-center gap-2 text-primary-600 transition-all hover:bg-gray-100'>
            <TrashCan size={20} /> Delete
          </button>
        </section>
      </div>

      {warning ? (
        <Warning
          closeWarning={() => setWarning(false)}
          cb={() => deleteRecipe(id)}
          state={warning}
          message={`Are you sure you want to erase this recipe? You can't revert this!`}
        />
      ) : null}
    </>
  );
}
