import React from 'react';

import ViewHeader from '@components/common/ViewHeader';
import NavigationContainer from '@components/common/NavigationContainer';
import Dropdown from '@components/common/Dropdown';
import Input from '@components/common/Input';
import { Search } from 'akar-icons';
import Text from '@components/common/Text';
import RecipeCard from '@components/common/RecipeCard';

export default function Discover() {
  return (
    <main>
      <ViewHeader
        title='Discover'
        subtitle='New recipes from around the world'
      />

      <nav className='w-3/4 mb-12'>
        <NavigationContainer className='h-16 gap-4'>
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

      <section className='grid grid-cols-3 gap-x-4 gap-y-12 pb-12'>
        <RecipeCard type={'discover'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'discover'} recipeTitle={'Pepperonni Pizza'} />
        <RecipeCard type={'discover'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'discover'} recipeTitle={'Pepperonni Pizza'} />
        <RecipeCard type={'discover'} recipeTitle={'Tacos al pastor'} />
        <RecipeCard type={'discover'} recipeTitle={'Pepperonni Pizza'} />
      </section>
    </main>
  );
}
