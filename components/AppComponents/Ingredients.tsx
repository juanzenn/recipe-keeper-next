import { Button } from '@components/common/Button';
import Text from '@components/common/Text';
import { Ingredient as IngredientInterface } from '@hooks/ingredient';
import React, { useState } from 'react';
import Ingredient from './Ingredient';

interface Props {
  changeIngredients: (value: IngredientInterface[]) => void;
  unit: string;
}

export default function Ingredients({ changeIngredients, unit }: Props) {
  const [items, setItems] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);

  const [ingredients, setIngredients] = useState<IngredientInterface[]>([]);

  function updateIngredients(ingredient: IngredientInterface) {
    if (ingredients.find(x => ingredient.id === x.id)) {
      ingredients[ingredients.findIndex(x => ingredient.id === x.id)] = {
        ...ingredient,
      };
      changeIngredients(ingredients);
      return;
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  }

  return (
    <section>
      <Text type='h3' className='mb-6'>
        Ingredients
      </Text>

      <div>
        {items.map(item => (
          <Ingredient
            initialValue={{
              id: counter,
              ingredient: '',
              quantity: 0,
              measurement: '',
            }}
            update={updateIngredients}
            unit={unit}
            key={item}
          />
        ))}
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
