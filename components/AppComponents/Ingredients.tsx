import { ButtonOutlined } from '@components/common/Button';
import { Ingredient as IngredientInterface } from '@hooks/ingredient';
import React, { useEffect, useState } from 'react';
import { createRandomID } from '@lib/randomid';
import IngredientsBlock, { BlockOfIngredients } from './IngredientsBlock';

import { TrashCan } from 'akar-icons';

interface Props {
  initialIngredients?: Block[];
  edit?: boolean;
  setIngredients: (value: Block[]) => void;
}

// Ingredients: The global component that will store every block

export interface Block {
  id: string;
  block: BlockOfIngredients;
}

export default function Ingredients({
  setIngredients,
  edit = false,
  initialIngredients = [],
}: Props) {
  const [blocks, setBlocks] = useState<Block[]>(initialIngredients);

  function addBlock() {
    const block: Block = {
      id: createRandomID(),
      block: {
        blockTitle: '',
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

  function updateBlock(id: string, updatedBlock: BlockOfIngredients) {
    const updatedBlocks = blocks.map(block => {
      if (block.id === id) {
        return {
          ...block,
          block: updatedBlock,
        };
      }

      return block;
    });

    setBlocks(updatedBlocks);
  }

  useEffect(() => {
    setIngredients(blocks);
  }, [blocks]);

  return (
    <section>
      <p className='font-bold text-2xl tracking-tight mb-1 text-primary-600'>
        Ingredients
      </p>
      <p className='w-full text-gray-600 mb-4'>
        Add blocks for every part of your recipe. Ex: sauces, main dish, a
        complement, etc.
      </p>

      <section className='space-y-6 mb-8'>
        {blocks.map(block => (
          <article key={block.id}>
            <IngredientsBlock
              initialValue={edit ? block.block : undefined}
              edit={edit}
              blockId={block.id}
              updateBlock={updateBlock}
            />
            <button
              type='button'
              onClick={() => removeBlock(block.id)}
              className='w-full text-sm text-gray-600 hover:text-primary-600 transition-all flex gap-1 items-center justify-end'>
              <TrashCan size={16} />
              Remove block
            </button>
          </article>
        ))}
      </section>

      <ButtonOutlined
        className='px-6 py-2 text-sm tracking-wide'
        type='button'
        onClick={addBlock}>
        Add block
      </ButtonOutlined>
    </section>
  );
}
