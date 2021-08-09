import React from 'react';
import AddRecipe from './AddRecipe';
import Dashboard from './Dashboard';
import Discover from './Discover';
import MealPlanner from './MealPlanner';
import Recipes from './Recipes';
import UserSettings from './UserSettings';

interface Props {
  view: string;
  setView: (value: string) => void;
}

export default function Views({ view, setView }: Props) {
  switch (view) {
    case 'dashboard':
      return <Dashboard setView={setView} />;
    case 'recipes':
      return <Recipes />;
    case 'addRecipe':
      return <AddRecipe />;
    case 'discover':
      return <Discover />;
    case 'mealPlanner':
      return <MealPlanner />;
    case 'userSettings':
      return <UserSettings />;
  }
}
