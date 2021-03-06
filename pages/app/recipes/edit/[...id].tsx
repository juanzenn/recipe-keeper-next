import Input from '@components/common/Input';
import ViewHeader from '@components/common/ViewHeader';
import AppLayout from '@components/layout/AppLayout';
import Ingredients from '@components/AppComponents/Ingredients';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { useNumberInput, useTextInput } from '@hooks/formHooks';
import TagSelector from '@components/AppComponents/TagSelector';
import { Button } from '@components/common/Button';

import { Block as IngredientsInterface } from '@components/AppComponents/Ingredients';

import {
  getRecipeById,
  Recipe,
  SingleRecipe,
  updateImage,
  updateRecipeById,
} from '@lib/supabase';
import { checkForm, strToSlug } from '@lib/randomid';
import GoBack from '@components/common/GoBack';
import { GetServerSideProps } from 'next';
import { useUser } from '@auth0/nextjs-auth0';
import {
  NotificationError,
  NotificationSuccess,
} from '@components/common/Notification';

interface Props {
  recipeId: string;
  recipe: SingleRecipe;
}

export default function Edit({ recipe, recipeId }: Props) {
  const [recipeName, changeRecipeName] = useTextInput(recipe.title);
  const [description, changeDescription] = useTextInput(recipe.description);
  const [time, changeTime] = useTextInput(recipe.cookingTime);
  const [instructions, setInstructions] = useTextInput(recipe.instructions);
  const [servings, changeServings] = useNumberInput(recipe.servings);
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>(
    recipe.ingredients
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(recipe.tags);
  const [picture, setPicture] = useState<any>('');

  const [permisionError, setPermisionError] = useState<Boolean>(false);

  const id = recipeId[0];

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setUploading(true);

    const id = recipeId[0];
    const imageName = `${recipe.imageName}`;

    const editedRecipe: Recipe = {
      id: id,
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

    const message = checkForm(editedRecipe);

    if (message) {
      const newMessage = message.message;

      if (newMessage) {
        setError(true);
        setErrorMessage(newMessage);
        return;
      }
    }

    const update = await updateRecipeById(id, editedRecipe);

    if (picture) {
      const updatedImage = await updateImage(picture, imageName);

      if (!updatedImage) {
        setError(true);
        setErrorMessage(
          'There was an error on the server uploading your image...'
        );
      }
    }

    if (update) {
      setSuccess(true);
    } else {
      setError(true);
      setErrorMessage('There was an error on the server...');
    }
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

  const { user } = useUser();

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        window.location.href = `/app/recipes`;
      }

      setError(false);
      setSuccess(false);
      setUploading(false);
    }, 1000);
  }, [success, error]);

  useEffect(() => {
    if (user?.sub !== recipe.author.id) {
      setPermisionError(true);
    }
  }, [id]);

  if (permisionError)
    return (
      <>
        <Head>
          <title>Recipe Keeper - Edit Error</title>
        </Head>

        <section className='h-[70vh] w-full flex flex-col justify-center items-center'>
          <h1 className='text-4xl text-gray-800 font-bold tracking-tight text-center'>{`Are you trying to edit someone else recipe? The audacity.`}</h1>
          <GoBack />
        </section>
      </>
    );

  return (
    <>
      <Head>
        <title>Recipe Keeper - Edit Recipe</title>
      </Head>

      <GoBack />

      <ViewHeader
        title='Edit your recipe '
        subtitle='You are editing right now your recipe. Be careful!'
      />

      <form
        className='lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0'
        onSubmit={handleSubmit}>
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
          <label className='inline-block mb-1 font-bold tracking-wide text-primary-600'>
            Cover image
          </label>
          <input
            accept={'.png,.jpg'}
            type='file'
            onChange={e => handleImageUpload(e)}
            className='w-full bg-transparent text-gray-800 mb-2'
          />
          <p className='text-sm text-gray-400 tracking-tight'>
            3mb max, PNG or JPG format.
          </p>
        </div>

        <div className='col-span-2 space-y-2'>
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
          <TagSelector
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </article>

        <Ingredients
          initialIngredients={ingredients}
          edit={true}
          setIngredients={setIngredients}
        />

        <article className='space-y-2'>
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
          className='col-span-2 flex items-center justify-end gap-6 mt-6'>
          <GoBack />
          <button
            disabled={uploading}
            type='submit'
            className='w-max h-[max-content] px-6 py-2 bg-primary-500 hover:bg-primary-600 rounded-md text-white col-span-2 transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'>
            Update recipe
          </button>
        </section>
      </form>

      {success ? (
        <NotificationSuccess message='Successfully edited! You are being redirected...' />
      ) : null}

      {error ? <NotificationError message={errorMessage} /> : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id !== undefined) {
    const recipe = await getRecipeById(params.id);

    if (!recipe) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        recipeId: params.id,
        recipe,
      },
    };
  }

  return {
    notFound: true,
  };
};

// eslint-disable-next-line react/display-name
Edit.getLayout = (page: React.ReactNode) => (
  <AppLayout view='recipes'>{page}</AppLayout>
);
