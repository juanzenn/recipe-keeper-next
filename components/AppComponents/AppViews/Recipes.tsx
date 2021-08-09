import { Button, ButtonSecondary } from '@components/common/Button';
import Text from '@components/common/Text';
import ViewHeader from '@components/common/ViewHeader';
import React from 'react';

import { CirclePlus, Search, Pencil } from 'akar-icons';
import Input from '@components/common/Input';
import Dropdown from '@components/common/Dropdown';

import { DashboardRecipeShowcaseProps } from './Dashboard';

interface NavigationContainerProps {
  children?: string | React.ReactNode;
  className?: string;
}

function NavigationContainer({
  children,
  className,
}: NavigationContainerProps) {
  return (
    <section
      className={`w-full px-4 flex justify-between items-center text-white bg-primary-500 rounded-md shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function DashboardRecipeShowcase({
  title,
  recipeTitle,
  recipeLink,
}: DashboardRecipeShowcaseProps) {
  return (
    <article>
      <header className='space-y-2 mb-4'>
        <Text type='h3' className='text-primary-500'>
          {recipeTitle}
        </Text>
        <figure className='w-full h-56 bg-gray-300 rounded-lg'></figure>
      </header>
      <section className='flex gap-2 mb-2'>
        <div className='px-4 py-1 bg-primary-200 text-primary-400 text-sm rounded-md'>
          Meat
        </div>
        <div className='px-4 py-1 bg-primary-200 text-primary-400 text-sm rounded-md'>
          Lunch
        </div>
        <div className='px-4 py-1 bg-primary-200 text-primary-400 text-sm rounded-md'>
          Dinner
        </div>
      </section>
      <p className='text-sm font-light text-gray-400 mb-6'>Time: 45 minutes</p>

      <footer className='flex gap-4'>
        <Button className='w-3/4 px-6 py-2 text-center'>See recipe</Button>
        <ButtonSecondary className='w-1/4 px-2 py-2 flex items-center justify-center gap-2'>
          <Pencil size={20} />
        </ButtonSecondary>
      </footer>
    </article>
  );
}

export default function Recipes() {
  return (
    <main className='pb-24'>
      <ViewHeader title='Recipes' subtitle='All your recipes in one place.' />

      <nav className='h-16 flex gap-2 mb-12'>
        <NavigationContainer>
          <Text type='h3' className='w-full'>
            Add a recipe
          </Text>
          <ButtonSecondary className='w-full h-[max-content] px-6 py-2 text-primary-500 flex gap-2 items-center justify-center'>
            Add
            <CirclePlus size={20} />
          </ButtonSecondary>
        </NavigationContainer>
        <NavigationContainer>
          <Input
            type='search'
            icon={<Search size={20} />}
            placeholder='Tacos al pastor'
          />

          <div className='w-full text-right'>
            <Dropdown />
          </div>
        </NavigationContainer>
      </nav>

      <section className='grid grid-cols-3 gap-4 gap-y-12'>
        <DashboardRecipeShowcase
          title={'What to eat?'}
          recipeTitle={'Tacos al pastor'}
        />
        <DashboardRecipeShowcase
          title={'What to eat?'}
          recipeTitle={'Tacos al pastor'}
        />
        <DashboardRecipeShowcase
          title={'What to eat?'}
          recipeTitle={'Tacos al pastor'}
        />
        <DashboardRecipeShowcase
          title={'What to eat?'}
          recipeTitle={'Tacos al pastor'}
        />
        <DashboardRecipeShowcase
          title={'What to eat?'}
          recipeTitle={'Tacos al pastor'}
        />
        <DashboardRecipeShowcase
          title={'What to eat?'}
          recipeTitle={'Tacos al pastor'}
        />
        <DashboardRecipeShowcase
          title={'What to eat?'}
          recipeTitle={'Tacos al pastor'}
        />
      </section>
    </main>
  );
}
