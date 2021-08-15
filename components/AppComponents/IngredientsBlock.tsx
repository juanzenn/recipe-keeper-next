import { ButtonOutlined } from '@components/common/Button';
import createRandomID from '@lib/randomid';
import React, { useState } from 'react';
import Ingredient from './Ingredient';

// A block that will store every ingredient

interface IngredientInterface {
  id: string;
  ingredient: string;
}

export interface BlockOfIngredients {
  blockTitle: string;
  ingredients: IngredientInterface[];
}

interface Props {
  blockTitle: string;
}

export default function IngredientsBlock({ blockTitle }: Props) {
  const [blockOfIngredients, setBlockOfIngredients] =
    useState<BlockOfIngredients>({
      blockTitle: blockTitle,
      ingredients: [],
    });

  function addItem() {
    const ingredient: IngredientInterface = {
      id: createRandomID(),
      ingredient: '',
    };

    setBlockOfIngredients(state => {
      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
      };
    });
  }

  function updateIngredient(id: string, newValue: string) {
    const updatedIngredientList = blockOfIngredients.ingredients.map(
      ingredient => {
        if (ingredient.id === id) {
          return (ingredient = {
            ...ingredient,
            ingredient: newValue,
          });
        }

        return ingredient;
      }
    );

    setBlockOfIngredients(state => {
      return {
        ...state,
        ingredients: updatedIngredientList,
      };
    });
  }

  function deleteIngredient(id: string) {
    const updatedIngredientList = blockOfIngredients.ingredients.filter(
      ingredient => {
        if (ingredient.id === id) {
          return false;
        }

        return true;
      }
    );

    setBlockOfIngredients(state => {
      return {
        ...state,
        ingredients: updatedIngredientList,
      };
    });
  }

  return (
    <section>
      <p className='mb-2 font-bold text-lg tracking-tight text-gray-500'>
        {blockOfIngredients.blockTitle}
      </p>

      {blockOfIngredients.ingredients.map(ingredient => {
        return (
          <div key={`item-${ingredient.id}`} className='mb-4'>
            <Ingredient
              id={ingredient.id}
              updateIngredient={updateIngredient}
            />
            <button
              type='button'
              onClick={() => deleteIngredient(ingredient.id)}
              className='w-max text-xs text-gray-600 tracking-wide hover:text-primary-500 transition-all'>
              Remove ingredient
            </button>
          </div>
        );
      })}

      <ButtonOutlined
        className='px-6 py-2 text-sm tracking-wide'
        onClick={addItem}>
        Add ingredient
      </ButtonOutlined>
    </section>
  );
}
