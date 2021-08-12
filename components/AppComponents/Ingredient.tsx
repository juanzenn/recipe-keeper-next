import {
  Ingredient as IngredientInterface,
  useIngredient,
} from '@hooks/ingredient';
import React, { useEffect } from 'react';

interface Props {
  update: (ingredient: IngredientInterface) => void;
  initialValue: IngredientInterface;
  unit: string;
}

export default function Ingredient({ update, initialValue, unit }: Props) {
  const metric: string[] = ['g', 'kg'];
  const imperial: string[] = ['cups', 'tbsp', 'tsp', 'oz', 'lb'];

  const { getIngredient, setIngredient, setQuantity, setMeasurement } =
    useIngredient(initialValue);

  const { ingredient, quantity, measurement } = getIngredient();

  useEffect(() => {
    update(getIngredient());
  }, [ingredient, quantity, measurement]);

  return (
    <article className='flex border-2 border-primary-300 rounded-md shadow-md overflow-hidden text-primary-500'>
      <input
        className='w-2/3 p-4 focus:outline-none'
        type='text'
        value={ingredient}
        onChange={event => {
          setIngredient(event.target.value);
        }}
      />
      <input
        min={0}
        className='w-1/4 p-4 focus:outline-none border-l border-r border-primary-200'
        type='number'
        value={quantity}
        onChange={event => setQuantity(parseInt(event.target.value, 10))}
      />
      <select
        className='w-1/4 p-4 focus:outline-none'
        value={measurement}
        onChange={event => setMeasurement(event.target.value)}>
        <option>Select</option>
        {unit.toLowerCase() === 'metric'
          ? metric.map((unit, index) => (
              <option value={unit} key={`unit-${index}`}>
                {unit}
              </option>
            ))
          : unit.toLowerCase() === 'imperial'
          ? imperial.map((unit, index) => (
              <option value={unit} key={`unit-${index}`}>
                {unit}
              </option>
            ))
          : null}
      </select>
    </article>
  );
}
