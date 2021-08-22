import { createClient } from '@supabase/supabase-js';

import { Block } from '@components/AppComponents/Ingredients';

const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Recipe {
  id: string | null;
  image: string | null;
  author_id: string | null;
  title: string | null;
  slug: string | null;
  description: string | null;
  tags: string[] | null;
  ingredients: Block[] | null;
  servings: number | null;
  'cooking-time': string | null;
  instructions: string | null;
}

async function uploadImage(image: File, fileName: string) {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${fileName}`, image);

    if (error !== null) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateImage(image: File, fileName: string) {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .update(`${fileName}`, image, {
        upsert: true,
      });

    if (error !== null) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addRecipe(recipe: Recipe) {
  const recipeToAdd = {
    id: recipe.id,
    author_id: recipe.author_id,
    image: recipe.image,
    title: recipe.title,
    slug: recipe.slug,
    description: recipe.description,
    tags: recipe.tags,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    'cooking-time': recipe['cooking-time'],
    instructions: recipe.instructions,
  };

  try {
    const { data, error } = await supabase.from('recipes').insert(recipeToAdd);

    if (error !== null) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUserRecipe(userId: string | null) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('id, title, slug, image, tags, cooking-time')
      .eq('author_id', userId);

    if (error !== null) {
      throw error;
    }

    const recipes = data?.map(recipe => {
      const { publicURL } = supabase.storage
        .from('images')
        .getPublicUrl(recipe.image);

      const newRecipe = {
        id: recipe.id,
        title: recipe.title,
        slug: recipe.slug,
        image: publicURL,
        tags: recipe.tags,
        'cooking-time': recipe['cooking-time'],
      };

      return newRecipe;
    });

    return recipes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getDiscoveryRecipes(userId: string | null) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select(
        'id, title, slug, image, tags, cooking-time, author:author_id (name)'
      )
      .neq('author_id', userId);

    if (error !== null) {
      throw error;
    }

    const recipes = data?.map(recipe => {
      const { publicURL } = supabase.storage
        .from('images')
        .getPublicUrl(recipe.image);

      const newRecipe = {
        id: recipe.id,
        title: recipe.title,
        slug: recipe.slug,
        image: publicURL,
        tags: recipe.tags,
        'cooking-time': recipe['cooking-time'],
        author: recipe.author,
      };

      return newRecipe;
    });

    return recipes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface SingleRecipe {
  title: string;
  imageName: string;
  imageUrl: string;
  slug: string;
  description: string;
  tags: string[];
  ingredients: Block[];
  servings: number;
  cookingTime: string;
  instructions: string;
  author: any;
}

async function getRecipeById(recipeId: string | string[] | undefined) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select(
        `title,
      image,
      slug,
      description,
      tags,
      ingredients,
      servings,
      cooking-time,
      instructions,
      author:author_id (
          id, name, email, username
        )`
      )
      .eq('id', recipeId);

    if (error !== null) {
      throw error;
    }

    if (data !== null) {
      const { publicURL } = supabase.storage
        .from('images')
        .getPublicUrl(data[0].image);

      const recipe = {
        title: data[0].title,
        imageName: data[0].image,
        imageUrl: publicURL,
        slug: data[0].slug,
        description: data[0].description,
        tags: data[0].tags,
        ingredients: data[0].ingredients,
        servings: data[0].servings,
        cookingTime: data[0]['cooking-time'],
        instructions: data[0].instructions,
        author: data[0].author,
      };

      return recipe;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateRecipeById(recipeId: string, updatedRecipe: Recipe) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .update(updatedRecipe)
      .match({ id: recipeId });

    if (error !== null) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getRecipeForEdition(recipeId: string | null) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select(
        `title,
      slug,
      description,
      tags,
      ingredients,
      servings,
      cooking-time,
      instructions,
      `
      )
      .eq('id', recipeId);

    if (error !== null) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export {
  addRecipe,
  getUserRecipe,
  getDiscoveryRecipes,
  getRecipeById,
  updateRecipeById,
  uploadImage,
  updateImage,
};
