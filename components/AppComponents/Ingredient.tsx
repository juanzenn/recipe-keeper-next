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
      className='w-full text-base bg-white p-2 rounded shadow-sm border border-gray-300 hover:border-primary-300 focus:outline-none focus:border-primary-300 focus:ring focus:ring-primary-200'
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
