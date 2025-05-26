import { mockFeeds } from '../mockFeeds';
import {
  initialState,
  getAllFeeds,
  getOrderByNumber,
  feedsSliceReducer
} from '../feedSlice';

const expectedResult = {
  success: true,
  orders: [
    {
      _id: '6666ebbe97ede0001d06fc65',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный антарианский бургер',
      createdAt: '2024-06-10T12:04:14.552Z',
      updatedAt: '2024-06-10T12:04:14.925Z',
      number: 42042
    }
  ]
};

describe('Тестируем экшены feedSlice', () => {
  test('Тестируем загрузку ленты заказов - состояние fulfilled', () => {
    const state = feedsSliceReducer(
      initialState,
      getAllFeeds.fulfilled(mockFeeds, 'fulfilled')
    );
    expect(state.loadingData).toBe(false);
    expect(state.orders).toEqual(mockFeeds.orders);
  });

  test('Тестируем загрузку ленты заказов - состояние rejected', () => {
    const state = feedsSliceReducer(
      initialState,
      getAllFeeds.rejected(new Error('error'), 'rejected')
    );
    expect(state.loadingData).toBe(false);
    expect(state.error).toBe('error');
  });

  test('Тестируем загрузку ленты заказов - состояние pending', () => {
    const state = feedsSliceReducer(
      initialState,
      getAllFeeds.pending('pending')
    );
    expect(state.loadingData).toBe(true);
  });

  test('Тестируем получение заказа - состояние fulfilled', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.fulfilled(expectedResult, 'fulfilled', +'01')
    );
    expect(state.orderByNumber).toEqual(expectedResult);
    expect(state.loadingData).toBe(false);
    expect(state.error).toBe(null);
  });

  test('Тестируем получение заказа - состояние pending', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.pending('pending', +'01')
    );
    expect(state.loadingData).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тестируем получение заказа - состояние rejected', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.rejected(new Error('error'), 'rejected', +'01')
    );
    expect(state.loadingData).toBe(false);
    expect(state.error).toBe('error');
  });
});
