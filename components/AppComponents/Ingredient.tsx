import React, { useRef } from 'react';
// Just a ingredient
// Using useRef for easy value setup!!
// The state is going to be updated in the block component

interface Props {
  id: string;
  updateIngredient: (id: string, newValue: string) => void;
}

export default function Ingredient({ updateIngredient, id }: Props) {
  const ingredient = useRef<HTMLInputElement>(null);

  return (
    <input
      className='w-full py-2 px-4 text-primary-500 placeholder-primary-300 border-2 border-primary-300 hover:border-primary-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/70 rounded-md shadow-sm'
      placeholder='All-purprose flour - 200g...'
      type='text'
      ref={ingredient}
      value={ingredient.current?.value}
      onChange={() =>
        updateIngredient(
          id,
          ingredient.current?.value ? ingredient.current?.value : ''
        )
      }
    />
  );
}
