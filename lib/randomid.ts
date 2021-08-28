import { Recipe } from './supabase';

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function createRandomID(): string {
  let letters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  let id = '';

  for (let i = 0; i < 7; i++) {
    id += letters[getRandomIntInclusive(0, 63)];
  }

  return id;
}

function strToSlug(str: string): string {
  return str.toLowerCase().replace(/\s/g, '-');
}

function checkName(str: string) {
  return /[!-\/:-@[-`{-~]/.test(str);
}

function checkForm(recipe: Recipe): { message: string | null } | undefined {
  function error(message: string | null) {
    return {
      message: message,
    };
  }

  let errorMessage: { message: string | null } | null = {
    message: null,
  };

  if (!recipe.title) {
    return error('Add a title');
  } else if (recipe.title) {
    errorMessage = checkName(recipe.title) ? error('Add a valid title.') : null;

    if (errorMessage) {
      return errorMessage;
    }
  }

  if (!recipe.description) {
    return error('Add a description');
  }

  if (!recipe['cooking-time']) {
    return error('Add a cooking time');
  } else if (recipe['cooking-time']) {
    errorMessage = checkName(recipe['cooking-time'])
      ? error('Add a valid cooking time.')
      : null;

    if (errorMessage) {
      return errorMessage;
    }
  }

  if (!recipe.servings) {
    return error('Add servings');
  }

  if (recipe.tags) {
    if (recipe.tags.length <= 0) {
      return error('Add at least one tag');
    }
  }

  if (recipe.ingredients) {
    if (recipe.ingredients.length <= 0) {
      return error('Add at least one ingredient block');
    }
  }

  if (!recipe.instructions) {
    return error('Add some instructions');
  }

  return error(null);
}

export { createRandomID, strToSlug, checkForm };
