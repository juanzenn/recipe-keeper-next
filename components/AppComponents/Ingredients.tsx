import { Button } from '@components/common/Button';
import Text from '@components/common/Text';
import { Ingredient as IngredientInterface } from '@hooks/ingredient';
import React, { useState } from 'react';
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
  const [items, setItems] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);

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

  function deleteIngredient(id: number) {
    const index = ingredients.findIndex(x => id === x.id);

    setItems(removeElement(items, index));
    setIngredients(removeElement(ingredients, index));
  }

  console.log(ingredients);

  return (
    <section>
      <Text type='h3' className='mb-6'>
        Ingredients
      </Text>

      <div>
        {items.map((item, index) => {
          return (
            <div key={item} className='flex flex-col gap-4 mb-4'>
              <Ingredient
                initialValue={{
                  id: index,
                  ingredient: '',
                  quantity: 0,
                  measurement: '',
                }}
                update={updateIngredients}
                unit={unit}
              />
              <button
                type='button'
                onClick={() => deleteIngredient(index)}
                className='w-max bg-black text-white p-6'>
                BYE ITEM
              </button>
            </div>
          );
        })}
      </div>

      <Button
        className='px-6 py-2'
        onClick={() => {
          setItems([...items, String(counter)]);
          setCounter(counter + 1);
        }}>
        Add Ingredient
      </Button>
    </section>
  );
}
