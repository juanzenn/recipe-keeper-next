import { createRandomID } from '@lib/randomid';
import React, { useState, useRef, useEffect } from 'react';
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
  blockId: string;
  updateBlock: (id: string, updatedBlock: BlockOfIngredients) => void;
}

export default function IngredientsBlock({ blockId, updateBlock }: Props) {
  const [blockOfIngredients, setBlockOfIngredients] =
    useState<BlockOfIngredients>({
      blockTitle: '',
      ingredients: [],
    });

  const blockTitleRef = useRef<HTMLInputElement>(null);

  function addIngredient() {
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

  function updateTitle() {
    setBlockOfIngredients(state => {
      return {
        ...state,
        blockTitle: blockTitleRef.current?.value
          ? blockTitleRef.current.value
          : '',
      };
    });
  }

  useEffect(() => {
    updateBlock(blockId, blockOfIngredients);
  }, [blockOfIngredients]);

  return (
    <section className='p-4 mb-2 shadow rounded border border-gray-300'>
      <input
        type='text'
        placeholder='Block title'
        className='w-full p-2 mb-4 rounded-sm font-semibold text-lg text-gray-600 placeholder-gray-300 border-b border-gray-300 hover:border-primary-300 focus:border-primary-300 focus:outline-none focus:ring focus:ring-primary-200'
        ref={blockTitleRef}
        value={blockTitleRef.current?.value}
        onChange={updateTitle}
      />

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

      <button
        className='px-6 py-2 text-sm font-medium text-primary-600 shadow-sm tracking-wide bg-primary-100 hover:bg-primary-200 rounded-md transition-all'
        onClick={addIngredient}>
        Add ingredient
      </button>
    </section>
  );
}
