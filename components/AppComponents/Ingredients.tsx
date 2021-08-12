import { Button } from '@components/common/Button';
import Text from '@components/common/Text';
import { Ingredient as IngredientInterface } from '@hooks/ingredient';
import React, { useState } from 'react';
import createRandomID from '../../lib/randomid';
import Ingredient from './Ingredient';

interface Props {
  setIngredients: (value: IngredientInterface[]) => void;
  unit: string;
  ingredients: IngredientInterface[];
}

function removeElement(arr: any, index: number) {
  const firstHalf = arr.slice(0, index);
  const secondHalf = arr.slice(index + 1);

  return [...firstHalf.concat(secondHalf)];
}

export default function Ingredients({
  ingredients,
  setIngredients,
  unit,
}: Props) {
  function addItem() {
    let newItem = {
      id: createRandomID(),
      ingredient: '',
      quantity: 0,
      measurement: '',
    };
    updateIngredients(newItem);
  }

  function updateIngredients(ingredient: IngredientInterface) {
    if (ingredients.find(x => ingredient.id === x.id)) {
      ingredients[ingredients.findIndex(x => ingredient.id === x.id)] = {
        ...ingredient,
      };
      setIngredients(ingredients);
      return;
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  }

  function deleteIngredient(id: string) {
    const index = ingredients.findIndex(x => {
      console.log(id);
      console.log(x);
      if (id === x.id) {
        return true;
      }
    });

    if (index < 0) {
      console.log('That item is not on ingredients');
      console.log(ingredients);
      return;
    }

    setIngredients(removeElement(ingredients, index));
  }

  return (
    <section>
      <p className='mb-4 font-bold text-gray-600 text-xl tracking-tight'>
        Ingredients
      </p>

      <div>
        {ingredients.map((ingredient, index) => {
          return (
            <div key={`item-${ingredient.id}`} className='mb-4'>
              <Ingredient
                initialValue={ingredient}
                update={updateIngredients}
                unit={unit}
              />
              <button
                type='button'
                onClick={() => deleteIngredient(ingredient.id)}
                className='w-max text-xs text-gray-600 hover:text-primary-700 transition-all'>
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <Button className='px-6 py-2' onClick={() => addItem()}>
        Add Ingredient
      </Button>
    </section>
  );
}
