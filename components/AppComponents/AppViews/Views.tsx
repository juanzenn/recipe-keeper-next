import React from 'react';
import Dashboard from './Dashboard';
import Discover from './Discover';
import MealPlanner from './MealPlanner';
import Recipes from './Recipes';
import UserSettings from './UserSettings';

interface Props {
  view: string;
}

export default function Views({ view }: Props) {
  switch (view) {
    case 'dashboard':
      return <Dashboard />;
    case 'recipes':
      return <Recipes />;
    case 'discover':
      return <Discover />;
    case 'mealPlanner':
      return <MealPlanner />;
    case 'userSettings':
      return <UserSettings />;
  }
}
