import { ButtonSecondary } from '@components/common/Button';
import Text from '@components/common/Text';
import ViewHeader from '@components/common/ViewHeader';
import React from 'react';

import { CirclePlus, Search, Pencil } from 'akar-icons';
import Input from '@components/common/Input';
import Dropdown from '@components/common/Dropdown';
import RecipeCard from '@components/common/RecipeCard';
import NavigationContainer from '@components/common/NavigationContainer';

import { ViewProps } from './Views';

export default function Recipes({ setView, setOpen }: ViewProps) {
  return (
    <main className='pb-24'>
      <ViewHeader title='Recipes' subtitle='All your recipes in one place.' />

      <nav className='h-16 flex gap-2 mb-12'>
        <NavigationContainer>
          <Text type='h3' className='w-full'>
            Add a recipe
          </Text>
          <ButtonSecondary
            onClick={() => {
              setView('addRecipe');
              setOpen(false);
            }}
            className='w-full h-[max-content] px-6 py-2 text-primary-500 flex gap-2 items-center justify-center'>
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
        <RecipeCard type={'recipes'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'recipes'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'recipes'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'recipes'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'recipes'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'recipes'} recipeTitle={'Tacos al pastor'} />
      </section>
    </main>
  );
}
