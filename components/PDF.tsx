import React from 'react';
import { SingleRecipe } from '@lib/supabase';

const marked = require('marked');

interface Props {
  recipe: SingleRecipe;
}

export default function PDF(props: Props) {
  const {
    title,
    image,
    slug,
    description,
    tags,
    ingredients,
    servings,
    cookingTime,
    instructions,
    author,
  } = props.recipe;

  return (
    <section className='space-y-4'>
      <p className='text-6xl font-bold tracking-tight'>{title}</p>
      <p className='text-lg'>{description}</p>

      <section className='space-y-2'>
        <p className='text-lg'>
          <strong className='text-primary-600'>Author: </strong>
          {author.name}
        </p>
        <div className='text-lg flex gap-6'>
          <p className='text-primary-600 font-bold'>Tags:</p>
          {tags.map((tag, index) => {
            return <div key={`tag-${index}`}>{tag}</div>;
          })}
        </div>
        <p className='text-lg'>
          <strong className='text-primary-600'>Cooking time:</strong>{' '}
          {cookingTime}
        </p>
        <p className='text-lg'>
          <strong className='text-primary-600'>Servings:</strong> {servings}
        </p>
      </section>

      <div className='space-y-4'>
        <strong className='text-3xl'>Ingredients</strong>
        {ingredients.map(block => (
          <article key={block.id}>
            <strong className='inline-block mb-2 text-primary-600 text-xl'>
              {block.block.blockTitle}
            </strong>
            <ul className='list-inside list-disc space-y-1'>
              {block.block.ingredients.map(ingredient => (
                <li key={ingredient.id} className='text-lg'>
                  {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div>
        <strong className='inline-block mb-4 text-3xl'>Instructions</strong>
        <span
          className='space-y-4 leading-relaxed'
          dangerouslySetInnerHTML={{
            __html: marked(instructions),
          }}></span>
      </div>
    </section>
  );
}
