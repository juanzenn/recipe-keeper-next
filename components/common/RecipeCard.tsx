import { Pencil } from 'akar-icons';
import React from 'react';
import { Button, ButtonSecondary } from './Button';
import Label from './Label';
import Text from './Text';

import Link from 'next/link';
import Image from 'next/image';
import RecipeCardOptions from './RecipeCardOptions';

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
        <figure className='relative w-full h-56 rounded-lg overflow-hidden shadow'>
          {/* Image */}
          <Image src={imageURL} layout='fill' alt={recipeTitle} />
        </figure>
      </header>
      <section className='flex gap-2 mb-3'>
        {labels.map((label, index) => (
          <Label key={`labale-${index}`} type={label}>
            {label[0].toUpperCase() + label.slice(1)}
          </Label>
        ))}
      </section>
      <p className='text-sm text-gray-400 mb-6'>Cooking time: {time}</p>

      <footer className='flex gap-4'>
        <Button className={userRecipe ? `w-3/4` : ' w-full'}>
          <Link href={`/app/recipes/${recipeId}`}>
            <a className='w-full px-6 py-2 inline-block'>See Recipe</a>
          </Link>
        </Button>

        {/* Condition for the edit button if it is a userRecipe*/}
        {userRecipe ? <RecipeCardOptions id={recipeId} /> : null}
      </footer>
    </article>
  );
}
