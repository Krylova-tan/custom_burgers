import {
  createSlice,
  PayloadAction,
  createSelector,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../../services/store';

type TBurgerConstructorSlice = {
  constructorIngredients: TConstructorIngredient[];
  constructorBun: TConstructorIngredient | null;
};

// начальное состояние хранилища
export const initialState: TBurgerConstructorSlice = {
  constructorIngredients: [],
  constructorBun: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientConstructor: {
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...item } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorBun = action.payload)
          : state.constructorIngredients.push(action.payload);
      }
    },

    removeIngredientConstructor: (state, action: PayloadAction<string>) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.id !== action.payload
      );
    },
    upPositionIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.constructorIngredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.constructorIngredients.splice(
        ingredientIndex,
        1
      );
      state.constructorIngredients.splice(ingredientIndex - 1, 0, ingredient);
    },
    downPositionIngredient: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.constructorIngredients.findIndex(
        (item) => item.id === action.payload
      );
      const [ingredient] = state.constructorIngredients.splice(
        ingredientIndex,
        1
      );
      state.constructorIngredients.splice(ingredientIndex + 1, 0, ingredient);
    },
    resetConstructor: (state: TBurgerConstructorSlice) => {
      state.constructorIngredients = [];
      state.constructorBun = null;
    }
  }
});

// получение всего слайса
const constructorSliceSelectors = (state: RootState) => state.constructorItems;

export const getConstructorBun = createSelector(
  [constructorSliceSelectors],
  (state) => state.constructorBun
);

export const getConstructorIngredients = createSelector(
  [constructorSliceSelectors],
  (state) => state.constructorIngredients
);

export const {
  addIngredientConstructor,
  removeIngredientConstructor,
  upPositionIngredient,
  downPositionIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
