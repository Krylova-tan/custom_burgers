import {
  addIngredientConstructor,
  burgerConstructorSliceReducer,
  removeIngredientConstructor,
  upPositionIngredient,
  downPositionIngredient,
  initialState
} from '../constructorSlice';

const bun = {
  id: '1',
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const ingredient = {
  id: '2',
  _id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('Тестируем экшен добавления ингредиента в конструктор бургера', () => {
  test('Добавляем булки', () => {
    const newState = burgerConstructorSliceReducer(
      initialState,
      addIngredientConstructor(bun)
    );

    const { constructorBun } = newState;
    expect(constructorBun).toEqual(bun);
  });

  test('Добавляем ингредиенты', () => {
    const newState = burgerConstructorSliceReducer(
      initialState,
      addIngredientConstructor(ingredient)
    );

    const { constructorIngredients } = newState;
    expect(constructorIngredients).toEqual([ingredient]);
  });
});

describe('Тестируем экшен удаления ингредиентов', () => {
  test('Удаляем булку из списка', () => {
    const prevState = burgerConstructorSliceReducer(
      initialState,
      addIngredientConstructor(bun)
    );

    const newState = burgerConstructorSliceReducer(
      prevState,
      removeIngredientConstructor('1')
    );

    const { constructorBun } = newState;
    expect(constructorBun).toEqual(prevState.constructorBun);
  });

  test('Удаляем ингредиент из списка', () => {
    const prevState = burgerConstructorSliceReducer(
      initialState,
      addIngredientConstructor(ingredient)
    );

    const newState = burgerConstructorSliceReducer(
      prevState,
      removeIngredientConstructor('2')
    );

    const { constructorIngredients } = newState;
    expect(constructorIngredients).toHaveLength(0);
  });
});

describe('Тестируем экшены перемещения ингредиента', () => {
  const initialState = {
    constructorBun: null,
    constructorIngredients: [
      {
        id: '2',
        _id: '2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: 'idTest',
        _id: '_idTest',
        name: 'nameTest',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]
  };

  test('Тестируем перемещение вверх', () => {
    const expectedResult = [
      {
        id: 'idTest',
        _id: '_idTest',
        name: 'nameTest',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      ingredient
    ];

    const newState = burgerConstructorSliceReducer(
      initialState,
      upPositionIngredient('testId')
    );

    const { constructorIngredients } = newState;
    expect(constructorIngredients).toEqual(expectedResult);
  });

  test('Тестируем перемещение вниз', () => {
    const expectedResult = [
      {
        id: 'idTest',
        _id: '_idTest',
        name: 'nameTest',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      ingredient
    ];

    const newState = burgerConstructorSliceReducer(
      initialState,
      downPositionIngredient(ingredient._id)
    );

    const { constructorIngredients } = newState;
    expect(constructorIngredients).toEqual(expectedResult);
  });
});
