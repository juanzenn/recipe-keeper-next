import { useState } from 'react';

export interface Ingredient {
  id: string;
  ingredient: string;
  quantity: number;
  measurement: string;
}

export interface Ingredients {
  ingredientBlock: string
  ingredients: Ingredient[]
}

export function useIngredient(initialValue: Ingredient) {
  const [ingredient, setIngredient] = useState(initialValue.ingredient);
  const [quantity, setQuantity] = useState(initialValue.quantity);
  const [measurement, setMeasurement] = useState(initialValue.measurement);

  return {
    getIngredient: () => {
      return {
        id: initialValue.id,
        ingredient: ingredient,
        quantity: quantity,
        measurement: measurement,
      };
    },
    setIngredient,
    setQuantity,
    setMeasurement,
  };
}
