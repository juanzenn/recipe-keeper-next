import { ButtonOutlined } from '@components/common/Button';
import { Ingredient as IngredientInterface } from '@hooks/ingredient';
import React, { useState } from 'react';
import createRandomID from '@lib/randomid';
import IngredientsBlock, { BlockOfIngredients } from './IngredientsBlock';

interface Props {
  setIngredients: (value: IngredientInterface[]) => void;
  ingredients: IngredientInterface[];
}

// Ingredients: The global component that will store every block

interface Block {
  id: string;
  block: BlockOfIngredients;
}

export default function Ingredients() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: createRandomID(),
      block: {
        blockTitle: 'Block',
        ingredients: [],
      },
    },
  ]);

  function addBlock() {
    const block: Block = {
      id: createRandomID(),
      block: {
        blockTitle: 'Block',
        ingredients: [],
      },
    };

    setBlocks(state => {
      return [...state, block];
    });
  }

  function removeBlock(id: string) {
    const newBlocksList = blocks.filter(block => {
      if (block.id === id) {
        return false;
      }

      return true;
    });

    setBlocks(newBlocksList);
  }

  return (
    <section>
      <p className='font-bold text-xl tracking-tight mb-2'>Ingredients</p>
      <p className='w-max text-xs text-gray-500 transition-all mb-6'>
        Add blocks for every part of your recipe. Ex: sauces, main dish, a
        complement, etc.
      </p>

      {blocks.map(block => (
        <article
          key={block.id}
          className='px-2 py-4 space-y-4 shadow-md rounded-sm mb-6'>
          <IngredientsBlock blockTitle={block.block.blockTitle} />
          <button
            type='button'
            onClick={() => removeBlock(block.id)}
            className='w-max text-xs text-gray-600 hover:text-primary-500 transition-all'>
            Remove block
          </button>
        </article>
      ))}

      <ButtonOutlined
        className='px-6 py-2 text-sm tracking-wide'
        onClick={addBlock}>
        Add block
      </ButtonOutlined>
    </section>
  );
}
