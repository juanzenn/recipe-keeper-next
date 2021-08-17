import Input from '@components/common/Input';
import ViewHeader from '@components/common/ViewHeader';
import AppLayout from '@components/layout/AppLayout';
import Ingredients from '@components/AppComponents/Ingredients';
import Head from 'next/head';
import React, { useState } from 'react';

import { useNumberInput, useTextInput } from '@hooks/formHooks';
import TagSelector from '@components/AppComponents/TagSelector';
import { Button } from '@components/common/Button';

import { Block as IngredientsInterface } from '@components/AppComponents/Ingredients';

export default function Add() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const recipe = {
      name: recipeName,
      description: description,
      cooking_time: time,
      servings_per_recipe: servings,
      tags: selectedTags,
      ingredients: ingredients,
      instructions: instructions,
      image: picture,
    };
    console.log(recipe);
  }

  const [recipeName, changeRecipeName] = useTextInput('');
  const [description, changeDescription] = useTextInput('');
  const [time, changeTime] = useTextInput('');
  const [instructions, setInstructions] = useTextInput('');
  const [servings, changeServings] = useNumberInput(0);
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [picture, setPicture] = useState<any>('');

  function handleImageUpload(event: any) {
    setPicture(event.target.files[0]);
  }

  return (
    <>
      <Head>
        <title>Recipe Keeper - Add Recipe</title>
      </Head>

      <ViewHeader
        title='Add new recipe'
        subtitle="Fill the form with your recipe's information"></ViewHeader>

      <form className='grid grid-cols-2 gap-8' onSubmit={handleSubmit}>
        {/* Recipe name */}
        <Input
          value={recipeName}
          onChange={event => {
            changeRecipeName(event);
          }}
          type='text'
          placeholder='Tacos al pastor'
          label='Recipe name'
        />

        <div className='w-full'>
          {/* Recipe image */}
          <label className='inline-block mb-2 font-bold tracking-wide text-primary-600'>
            Cover image
          </label>
          <input
            type='file'
            onChange={e => handleImageUpload(e)}
            className='w-full bg-transparent text-gray-800'
          />
        </div>

        <div className='col-span-2'>
          {/* Recipe description */}
          <Input
            value={description}
            onChange={event => {
              changeDescription(event);
            }}
            type='textarea'
            placeholder='Tacos al pastor are the best mexican tacos'
            label='Description'
          />
        </div>

        <div className='space-y-6'>
          {/* Recipe time */}
          <Input
            value={time}
            onChange={event => {
              changeTime(event);
            }}
            type='text'
            label='Time'
            placeholder='25 minutes'
          />

          {/* Recipe services */}
          <Input
            value={servings}
            onChange={event => {
              changeServings(event);
            }}
            type='number'
            label='Servings Per Recipe'
            placeholder='4'
          />
        </div>

        <article>
          {/* Tags */}
          <TagSelector
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </article>

        {/* Ingredients */}
        <Ingredients setIngredients={setIngredients} />

        <article>
          {/* Instructions */}
          <Input
            value={instructions}
            onChange={event => {
              setInstructions(event);
            }}
            type='textarea'
            placeholder={`* Prepare the meat \n* Prepare the tacos \n* Enjoy yourselve`}
            label='Instructions'
          />
          <p className='text-sm text-gray-600 tracking-tight'>
            This field accepts Markdown syntax.
          </p>
        </article>

        <Button
          type='submit'
          className='w-max p-4 bg-primary-500 text-white col-span-2'>
          Create new recipe
        </Button>
      </form>
    </>
  );
}

// eslint-disable-next-line react/display-name
Add.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
