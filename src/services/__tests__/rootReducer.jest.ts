import { userSliceReducer } from '../../slices/userSlices/userSlices';
import { feedsSliceReducer } from '../../slices/feedSlice/feedSlice';
import { ingredientsSliceReducer } from '../../slices/ingredientSlice/ingredientSlice';
import { burgerConstructorSliceReducer } from '../../slices/constructorSlice/constructorSlice';
import { combineReducers } from '@reduxjs/toolkit';

describe('Тестируем rootReducer', () => {
  test('Проверяем правильную настройку', () => {
    const rootReducer = combineReducers({
      user: userSliceReducer,
      feeds: feedsSliceReducer,
      ingredients: ingredientsSliceReducer,
      constructorItems: burgerConstructorSliceReducer
    });

    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      user: userSliceReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      feeds: feedsSliceReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      ingredients: ingredientsSliceReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      constructorItems: burgerConstructorSliceReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      })
    });
  });
});
