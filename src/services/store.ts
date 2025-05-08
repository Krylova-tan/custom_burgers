import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSliceReducer } from '../slices/userSlices/userSlices';
import { ingredientsSliceReducer } from '../slices/ingredientSlice/ingredientSlice';
import { burgerConstructorSliceReducer } from '../slices/constructorSlice/constructorSlice';
import { feedsSliceReducer } from '../slices/feedSlice/feedSlice';

// все редьюсеры объединяем в корневой
const rootReducer = combineReducers({
  user: userSliceReducer,
  feeds: feedsSliceReducer,
  ingredients: ingredientsSliceReducer,
  constructorItems: burgerConstructorSliceReducer
});

// создание store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
