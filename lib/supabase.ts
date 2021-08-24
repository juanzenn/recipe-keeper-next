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

export interface Review {
  author: string;
  review: string;
  positive: boolean | null;
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

async function deleteRecipeById(recipeId: string) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .delete()
      .match({ id: recipeId });
    if (error !== null) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function sendReview(review: Review) {
  try {
    const { data, error } = await supabase.from('reviews').insert(review);

    if (error !== null) {
      throw error;
    }

    if (data) {
      return {
        code: 200,
        message: 'Your review was sended successfully! Thank you.',
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface Actions {
  id: number;
  userId: string;
  recipeId: string;
  isBookmarked: boolean;
  hasShoppingList: boolean;
}

// Function for handling bookmark
async function bookmarkRecipe(id: string, userId: string | undefined | null) {
  if (!userId) {
    throw `Not authenticated.`;
  }

  try {
    const { data, error } = await supabase
      .from<Actions>('actions')
      .select()
      .match({ userId: userId, recipeId: id });

    if (error !== null) {
      throw error;
    }

    // if (data && data.length <= 0) {
    //   try {
    //     const newEntry = await supabase.from<Actions>('actions').insert({
    //       userId: userId,
    //       recipeId: id,
    //       isBookmarked: true,
    //     });

    //     if (newEntry.error !== null) {
    //       throw newEntry.error;
    //     }

    //     return newEntry.data;
    //   } catch (error) {
    //     console.error(error);
    //     return null;
    //   }
    // }

    if (data) {
      try {
        const currentBookmarkValue = data[0].isBookmarked;

        const updated = await supabase
          .from<Actions>('actions')
          .update({ isBookmarked: !currentBookmarkValue })
          .match({ userId: userId, recipeId: id });

        if (updated.error !== null) {
          throw updated.error;
        }

        return updated.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function for handling shoppingList
async function shopRecipe(id: string, userId: string | undefined | null) {
  if (!userId) {
    throw `Not authenticated.`;
  }

  try {
    const { data, error } = await supabase
      .from<Actions>('actions')
      .select()
      .match({ userId: userId, recipeId: id });

    if (error !== null) {
      throw error;
    }

    // if (data && data.length <= 0) {
    //   try {
    //     const newEntry = await supabase.from<Actions>('actions').insert({
    //       userId: userId,
    //       recipeId: id,
    //       hasShoppingList: true,
    //     });

    //     if (newEntry.error !== null) {
    //       throw newEntry.error;
    //     }

    //     console.log(newEntry.data);

    //     return newEntry.data;
    //   } catch (error) {
    //     console.error(error);
    //     return null;
    //   }
    // }

    if (data) {
      try {
        const currentShoppingList = data[0].hasShoppingList;

        const updated = await supabase
          .from<Actions>('actions')
          .update({ hasShoppingList: !currentShoppingList })
          .match({ userId: userId, recipeId: id });

        if (updated.error !== null) {
          throw updated.error;
        }

        return updated.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getActionsById(id: string, userId: string | undefined | null) {
  if (!userId) {
    throw `Not authenticated.`;
  }

  try {
    const { data, error } = await supabase
      .from<Actions>('actions')
      .select()
      .match({ userId: userId, recipeId: id });

    if (error !== null) {
      throw error;
    }

    if (data && data.length <= 0) {
      try {
        const newEntry = await supabase.from<Actions>('actions').insert({
          userId: userId,
          recipeId: id[0],
        });

        if (newEntry.error !== null) {
          throw newEntry.error;
        }

        return {
          isBookmarked: newEntry.data[0].isBookmarked,
          hasShoppingList: newEntry.data[0].hasShoppingList,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    if (data) {
      return {
        isBookmarked: data[0].isBookmarked,
        hasShoppingList: data[0].hasShoppingList,
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getBookmarkedRecipes(userId: string | null) {
  try {
    const { data, error } = await supabase
      .from('actions')
      .select(
        `recipeId (
          id,
          title,
          slug,
          tags,
          cooking-time,
          image
      )`
      )
      .match({ userId: userId, isBookmarked: true });

    if (error !== null) {
      throw error;
    }

    if (data) {
      const recipes = data.map(recipe => {
        const { publicURL } = supabase.storage
          .from('images')
          .getPublicUrl(recipe.recipeId.image);

        const newRecipe = {
          id: recipe.recipeId.id,
          title: recipe.recipeId.title,
          slug: recipe.recipeId.slug,
          image: publicURL,
          tags: recipe.recipeId.tags,
          'cooking-time': recipe.recipeId['cooking-time'],
        };

        return newRecipe;
      });
      return recipes;
    }
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
  deleteRecipeById,
  sendReview,
  bookmarkRecipe,
  shopRecipe,
  getActionsById,
  getBookmarkedRecipes,
};
