import React from 'react';

import Head from 'next/head';
import ViewHeader from '@components/common/ViewHeader';
import RecipeCard from '@components/common/RecipeCard';

import AppLayout from '@components/layout/AppLayout';
import NavigationContainer from '@components/common/NavigationContainer';
import { Search } from 'akar-icons';
import Input from '@components/common/Input';
import Dropdown from '@components/common/Dropdown';
import { getDiscoveryRecipes } from '@lib/supabase';
import RecipesContainer, {
  RecipeData,
} from '@components/common/RecipesContainer';

interface Props {
  recipes: RecipeData[];
}

export default function Discover(props: Props) {
  const { recipes = [] } = props;

  return (
    <>
      <Head>
        <title>Recipe Keeper - App</title>
      </Head>

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

      <RecipesContainer recipes={recipes} />
    </>
  );
}

export async function getServerSideProps() {
  const recipes = await getDiscoveryRecipes(
    'google-oauth2|117211086836143771355'
  );

  // google-oauth2|117211086836143771355

  return {
    props: { recipes },
  };
}

// eslint-disable-next-line react/display-name
Discover.getLayout = (page: React.ReactNode) => (
  <AppLayout view='discover'>{page}</AppLayout>
);
