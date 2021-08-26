import { Button, ButtonOutlined } from '@components/common/Button';
import Text from '@components/common/Text';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import RecipeCard from '../common/RecipeCard';

export interface RecipeData {
  id: string;
  title: string;
  image: string;
  tags: string[];
  'cooking-time': string;
}

interface Props {
  recipes: RecipeData[];
  userRecipe?: boolean;
}

export default function RecipesContainer({
  recipes,
  userRecipe = false,
}: Props) {
  return (
    <section className='grid lg:grid-cols-3 gap-x-4 gap-y-12'>
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipeId={recipe.id}
            userRecipe={userRecipe}
            imageURL={recipe.image}
            recipeTitle={recipe.title}
            labels={recipe.tags}
            time={recipe['cooking-time']}
          />
        ))
      ) : (
        <div className='col-span-3 flex flex-col justify-center items-center'>
          <p className='text-3xl text-gray-400 tracking-tight mb-4 font-medium'>
            There is no recipes...
          </p>
          <section className='flex gap-2'>
            <Button className='w-full'>
              <Link href='/app/recipes/add'>
                <a className='w-max px-6 py-2 inline-block'>Add a recipe</a>
              </Link>
            </Button>
            <ButtonOutlined className='w-full'>
              <Link href='/app/discover'>
                <a className='w-max px-6 py-2 inline-block'>
                  Discover new ones
                </a>
              </Link>
            </ButtonOutlined>
          </section>
        </div>
      )}
    </section>
  );
}
