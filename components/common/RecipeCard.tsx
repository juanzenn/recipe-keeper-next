import { Pencil } from 'akar-icons';
import React from 'react';
import { Button, ButtonSecondary } from './Button';
import Label from './Label';
import Text from './Text';

import Link from 'next/link';
import Image from 'next/image';

interface Props {
  recipeId: string;
  userRecipe: boolean;
  imageURL: string;
  recipeTitle: string;
  labels: string[];
  time: string;
}

export default function RecipeCard(props: Props) {
  const {
    recipeId,
    userRecipe = true,
    imageURL,
    recipeTitle,
    labels,
    time,
  } = props;

  return (
    <article>
      <header className='space-y-2 mb-6'>
        <Text type='h3' className='text-primary-500'>
          {recipeTitle}
        </Text>
        <figure className='relative w-full h-56 rounded-lg overflow-hidden shadow-sm'>
          {/* Image */}
          <Image src={imageURL} layout='fill' alt={recipeTitle} />
        </figure>
      </header>
      <section className='flex gap-2 mb-3'>
        {labels.map((label, index) => (
          <Label key={`labale-${index}`} type={label}>
            {label}
          </Label>
        ))}
      </section>
      <p className='text-sm font-light tracking-wide text-gray-500 mb-6'>
        Cooking time: {time}
      </p>

      <footer className='flex gap-4'>
        <Button className={userRecipe ? `w-3/4` : ' w-full'}>
          <Link href={`/app/recipes/${recipeId}`}>
            <a className='w-full px-6 py-2 inline-block'>Add a recipe</a>
          </Link>
        </Button>

        {/* Condition for the edit button if it is a userRecipe*/}
        {userRecipe ? (
          <ButtonSecondary className='w-1/4 flex items-center justify-center'>
            <Link href={`/app/recipes/edit/${recipeId}`}>
              <a className='w-full px-6 py-2 flex items-center justify-center'>
                <Pencil size={20} />
              </a>
            </Link>
          </ButtonSecondary>
        ) : null}
      </footer>
    </article>
  );
}
