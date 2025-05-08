import { TOrderResponse, getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';
import {
  createSlice,
  createSelector,
  createAsyncThunk
} from '@reduxjs/toolkit';

export type TFeedsSlice = {
  total: number;
  loadingData: boolean;
  orders: TOrder[];
  totalToday: number;
  error: string | null | undefined;
  orderByNumber: TOrderResponse | null;
  success: boolean;
};

// начальное состояние хранилища
export const initialState: TFeedsSlice = {
  orders: [],
  total: 0,
  totalToday: 0,
  loadingData: true,
  error: null,
  orderByNumber: null,
  success: false
};

// полчаем данные ленты заказа
export const getAllFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

// получаем заказ по номеру
export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderById',
  async (number: number) => getOrderByNumberApi(number)
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.loadingData = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.loadingData = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loadingData = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loadingData = false;
        state.error = null;
        state.orderByNumber = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loadingData = false;
        state.error = action.error.message;
      });
  }
});

// получение всего слайса feeds
const feedsSliceSelectors = (state: RootState) => state.feeds;

export const getOrdersData = createSelector(
  [feedsSliceSelectors],
  (state) => state.orders
);

export const getTotalOrders = createSelector(
  [feedsSliceSelectors],
  (state) => state.total
);

export const getTodayOrders = createSelector(
  [feedsSliceSelectors],
  (state) => state.totalToday
);

export const getIsLoading = createSelector(
  [feedsSliceSelectors],
  (state) => state.loadingData
);

export const getOrderByNumberSelector = createSelector(
  [feedsSliceSelectors],
  (state) => state.orderByNumber?.orders[0]
);

export const isSearchSuccessSelector = createSelector(
  [feedsSliceSelectors],
  (state) => state.orderByNumber?.success
);

export const feedsSliceReducer = feedsSlice.reducer;
