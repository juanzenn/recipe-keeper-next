import { Pencil } from 'akar-icons';
import React from 'react';
import { Button, ButtonSecondary } from './Button';
import Label from './Label';
import Text from './Text';

interface Props {
  type: 'dashboard' | 'recipes' | 'discover';
  recipeTitle: string;
  subtitle?: string;
}

export default function RecipeCard({ type, recipeTitle, subtitle }: Props) {
  switch (type) {
    case 'dashboard':
      return (
        <article>
          <header className='space-y-2 mb-2'>
            <Text type='h3' className='text-primary-500'>
              {subtitle}
            </Text>
            <figure className='w-full h-56 bg-gray-300 rounded-lg'></figure>
          </header>
          <p className='text-xl uppercase font-bold tracking-wide mb-1'>
            {recipeTitle}
          </p>
          <p className='text-sm font-light text-gray-400 mb-6'>
            Time: 45 minutes
          </p>
          <Button className='w-full px-6 py-2 text-center'>See recipe</Button>
        </article>
      );
    case 'recipes':
      return (
        <article>
          <header className='space-y-2 mb-4'>
            <Text type='h3' className='text-primary-500'>
              {recipeTitle}
            </Text>
            <figure className='w-full h-56 bg-gray-300 rounded-lg'></figure>
          </header>
          <section className='flex gap-2 mb-2'>
            <Label type='meat'>Meat</Label>
            <Label type='lunch'>Lunch</Label>
            <Label type='dinner'>Dinner</Label>
          </section>
          <p className='text-sm font-light text-gray-400 mb-6'>
            Time: 45 minutes
          </p>

          <footer className='flex gap-4'>
            <Button className='w-3/4 px-6 py-2 text-center'>See recipe</Button>
            <ButtonSecondary className='w-1/4 px-2 py-2 flex items-center justify-center gap-2'>
              <Pencil size={20} />
            </ButtonSecondary>
          </footer>
        </article>
      );
    case 'discover':
      return (
        <article>
          <header className='space-y-2 mb-4'>
            <Text type='h3' className='text-primary-500'>
              {recipeTitle}
            </Text>
            <figure className='w-full h-56 bg-gray-300 rounded-lg'></figure>
          </header>
          <section className='flex gap-2 mb-2'>
            <Label type='meat'>Meat</Label>
            <Label type='lunch'>Lunch</Label>
            <Label type='dinner'>Dinner</Label>
          </section>
          <p className='text-sm font-light text-gray-400 mb-6'>
            Time: 45 minutes
          </p>

          <Button className='w-full px-6 py-2 text-center'>See recipe</Button>
        </article>
      );
  }
}
