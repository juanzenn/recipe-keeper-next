import { Button } from '@components/common/Button';
import Text from '@components/common/Text';
import {
  Ingredient as IngredientInterface,
  useIngredient,
} from '@hooks/ingredient';
import React, { useState, useEffect } from 'react';

interface IngredientProps {
  update: (ingredient: IngredientInterface) => void;
  initialValue: IngredientInterface;
}

function Ingredient({ update, initialValue }: IngredientProps) {
  const options: string[] = ['g', 'kg', 'mg'];

  const { getIngredient, setIngredient, setQuantity, setMeasurement } =
    useIngredient(initialValue);

  const { ingredient, quantity, measurement } = getIngredient();

  useEffect(() => {
    update(getIngredient());
  }, [ingredient, quantity, measurement]);

  return (
    <article className='mb-2 flex flex-col gap-4'>
      <div>
        <input
          className='p-4 border border-gray-200'
          type='text'
          value={ingredient}
          onChange={event => {
            setIngredient(event.target.value);
          }}
        />
        {ingredient}
      </div>
      <div>
        <input
          min={0}
          className='p-4 border border-gray-200'
          type='number'
          value={quantity}
          onChange={event => setQuantity(parseInt(event.target.value, 10))}
        />
        {quantity}
      </div>
      <div>
        <input
          className='p-4 border border-gray-200'
          type='text'
          value={measurement}
          onChange={event => setMeasurement(event.target.value)}
        />
        {measurement}
      </div>
    </article>
  );
}

interface Props {
  changeIngredients: (value: IngredientInterface[]) => void;
}

export default function Ingredients({ changeIngredients }: Props) {
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

      {/* <section>
        {ingredients.map((ingredient, index) => (
          <div key={`${index}-ingredient`}>{ingredient.ingredient}</div>
        ))}
      </section> */}

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
