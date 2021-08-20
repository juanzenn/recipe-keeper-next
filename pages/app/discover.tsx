import React from 'react';

import Head from 'next/head';
import AppLayout from '@components/layout/AppLayout';
import ViewHeader from '@components/common/ViewHeader';
import Recipes from '@components/AppComponents/Recipes';

import { RecipeData } from '@components/AppComponents/RecipesContainer';

import { getDiscoveryRecipes } from '@lib/supabase';

interface Props {
  recipes: RecipeData[];
}

export default function Discover(props: Props) {
  const { recipes } = props;

  return (
    <>
      <Head>
        <title>Recipe Keeper - App</title>
      </Head>

      <ViewHeader
        title='Discover'
        subtitle='New recipes from around the world'
      />

      <Recipes recipes={recipes} />
    </>
  );
}

export async function getServerSideProps() {
  const recipes = await getDiscoveryRecipes(
    'google-oauth2|117211086836143771355'
  );

  return {
    props: { recipes },
  };
}

// eslint-disable-next-line react/display-name
Discover.getLayout = (page: React.ReactNode) => (
  <AppLayout view='discover'>{page}</AppLayout>
);
