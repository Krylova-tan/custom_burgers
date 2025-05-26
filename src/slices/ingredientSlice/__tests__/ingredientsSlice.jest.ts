import {
  initialState,
  getIngredients,
  ingredientsSliceReducer
} from '../ingredientSlice';
import { ingredients } from '../mockIngredients';

describe('Тестируем экшены ingredientsSlice', () => {
  const expectedResult = ingredients;

  test('Тестируем загрузку ингридиентов - состояние fulfilled', () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.fulfilled(expectedResult, 'fulfilled')
    );
    expect(state.loadingData).toBe(false);
    expect(state.ingredients).toBe(expectedResult);
  });

  test('Тестируем выдачу ошибки - состояние rejected', () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.rejected(new Error('error'), 'rejected')
    );
    expect(state.loadingData).toBe(false);
    expect(state.error).toBe('error');
  });

  test('Тестируем состояние загрузки - pending', () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.pending('pending')
    );
    expect(state.loadingData).toBe(true);
  });
});
