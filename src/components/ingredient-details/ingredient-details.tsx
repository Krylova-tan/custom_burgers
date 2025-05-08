import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsData } from '../../slices/ingredientSlice/ingredientSlice';
import { useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const location = useLocation();
  const ingredients = useSelector(getIngredientsData);
  const ingredientToFind = location.pathname.replace('/ingredients/', '');

  const ingredientData: TIngredient = ingredients.find(
    (ingredient) => ingredient._id === ingredientToFind
  )!;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
