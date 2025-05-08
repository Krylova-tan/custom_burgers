import {
  TAuthResponse,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  updateUserApi
} from '@api';
import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

// начальное состояние хранилища
export const initialState: Pick<TAuthResponse, 'user' | 'success'> & {
  orders: TOrder[];
  lastOrder: TOrder | null;
  orderRequestData: boolean;
  loading: boolean;
} = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  orders: [],
  lastOrder: null,
  orderRequestData: false,
  loading: false
};

export const getUserAuth = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const userLogout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) =>
    await loginUserApi({ email, password })
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const getUserOrders = createAsyncThunk(
  'user/getUserOrders',
  async () => await getOrdersApi()
);

export const newUserOrder = createAsyncThunk(
  'user/newUserOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

// создание слайса
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLoginUserSuccess: (state, action) => {
      state.success = action.payload;
    },
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserAuth.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.user = initialState.user;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(newUserOrder.pending, (state) => {
        state.loading = true;
        state.orderRequestData = true;
      })
      .addCase(newUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order);
        state.lastOrder = action.payload.order;
        state.orderRequestData = false;
      })
      .addCase(newUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderRequestData = false;
      });
  }
});

const userSliceSelectors = (state: RootState) => state.user;

// создание селекторов для извлечения данных
export const getUser = createSelector(
  [userSliceSelectors],
  (state) => state.user
);

export const getAuthLoading = createSelector(
  [userSliceSelectors],
  (state) => state.loading
);

export const getUserAuthStatus = createSelector(
  [userSliceSelectors],
  (state) => state.success
);

export const getOrders = createSelector(
  [userSliceSelectors],
  (state) => state.orders
);

export const getLastOrder = createSelector(
  [userSliceSelectors],
  (state) => state.lastOrder
);

export const getOrderRequestStatus = createSelector(
  [userSliceSelectors],
  (state) => state.orderRequestData
);

export const { doLoginUserSuccess, setLastOrder } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
