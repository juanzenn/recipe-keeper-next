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

import { addRecipe, Recipe, uploadImage } from '@lib/supabase';
import { createRandomID, strToSlug } from '@lib/randomid';
import GoBack from '@components/common/GoBack';

export default function Add() {
  const [recipeName, changeRecipeName] = useTextInput('');
  const [description, changeDescription] = useTextInput('');
  const [time, changeTime] = useTextInput('');
  const [instructions, setInstructions] = useTextInput('');
  const [servings, changeServings] = useNumberInput(0);
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [picture, setPicture] = useState<any>('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newId = createRandomID();
    const imageName = `${newId}.${picture.name.split('.').pop()}`;

    const recipe: Recipe = {
      id: newId,
      image: imageName,
      author_id: localStorage.getItem('user-id'),
      title: recipeName,
      slug: strToSlug(recipeName),
      description: description,
      tags: selectedTags,
      ingredients: ingredients,
      servings: servings,
      'cooking-time': time,
      instructions: instructions,
    };

    const pictureData = await uploadImage(picture, imageName);
    const recipeData = await addRecipe(recipe);

    console.log(pictureData);
    console.log(recipeData);
  }

  function handleImageUpload(event: any) {
    const file = event.target.files[0];

    if (Number((file.size / 1024 / 1024).toFixed(4)) >= 3) {
      alert('File should be less than 3MB.');
      setPicture('');
      return;
    } else {
      setPicture(file);
    }
  }

  return (
    <>
      <Head>
        <title>Recipe Keeper - Add Recipe</title>
      </Head>

      <GoBack />

      <ViewHeader
        title='Add new recipe'
        subtitle="Fill the form with your recipe's information"
      />

      <form
        className='lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0'
        onSubmit={handleSubmit}>
        {/* Recipe name */}

        <div className='w-full space-y-2'>
          <Input
            value={recipeName}
            onChange={event => {
              changeRecipeName(event);
            }}
            type='text'
            placeholder='Tacos al pastor'
            label='Recipe name'
          />
          <p className='text-sm text-gray-400 tracking-tight'>
            {/[!-\/:-@[-`{-~]/.test(recipeName) ? (
              <span className='text-primary-500'>
                No special characters (/-*.;,)
              </span>
            ) : (
              `Only letters and numbers.`
            )}
          </p>
        </div>

        <div className='w-full'>
          {/* Recipe image */}
          <label className='inline-block mb-1 font-bold tracking-wide text-primary-600'>
            Cover image
          </label>
          <input
            accept={'.png,.jpg'}
            required
            type='file'
            onChange={e => handleImageUpload(e)}
            className='w-full bg-transparent text-gray-800 mb-2'
          />
          <p className='text-sm text-gray-400 tracking-tight'>
            3mb max, PNG or JPG format.
          </p>
        </div>

        <div className='col-span-2 space-y-2'>
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
          <p className='text-sm text-gray-400 tracking-tight'>
            Markdown syntax available.
          </p>
        </div>

        <div className='space-y-6'>
          {/* Recipe time */}
          <div className='space-y-2'>
            <Input
              value={time}
              onChange={event => {
                changeTime(event);
              }}
              type='text'
              label='Time'
              placeholder='25 minutes'
            />
            <p className='text-sm text-gray-400 tracking-tight'>
              {/[!-\/:-@[-`{-~]/.test(time) ? (
                <span className='text-primary-500'>
                  No special characters (/-*.;,)
                </span>
              ) : (
                `Only letters and numbers.`
              )}
            </p>
          </div>

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

        <article className='space-y-2'>
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
            Markdown syntax available.
          </p>
        </article>

        <section
          id='buttons'
          className='col-span-2 flex justify-end gap-6 mt-6'>
          <GoBack />
          <Button
            type='submit'
            className='w-max p-4 bg-primary-500 text-white col-span-2'>
            Create new recipe
          </Button>
        </section>
      </form>
    </>
  );
}

// eslint-disable-next-line react/display-name
Add.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
