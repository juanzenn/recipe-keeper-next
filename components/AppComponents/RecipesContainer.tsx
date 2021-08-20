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
    <section className='grid grid-cols-3 gap-x-4 gap-y-12'>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipeId={recipe.id}
          userRecipe={userRecipe}
          imageURL={recipe.image}
          recipeTitle={recipe.title}
          labels={recipe.tags}
          time={recipe['cooking-time']}
        />
      ))}
    </section>
  );
}
