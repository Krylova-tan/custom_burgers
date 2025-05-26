// константы
const testPath = 'http://localhost:4000/';
const burgerConstructor = '[data-cy=burger-constructor]';
const mainsConstructorIngredients = '[data-cy=ingredients-mains]';
const saucesConstructor = '[data-cy=ingredients-sauces]';
const bunsConstructor = '[data-cy=ingredients-buns]';
const orderButton = '[data-cy=order-button]';
const orderNumber = '[data-cy=order-number]';

const closeModal = '[data-cy=modal-close]';
const closeOverlay = '[data-cy=modal-overlay]';

describe('Тестируем доступность приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testPath);
  });

  it('Тестируем добавление ингредиента в конструктор', () => {
    cy.get(mainsConstructorIngredients).contains('Добавить').click();
    cy.get(saucesConstructor).contains('Добавить').click();
    cy.get(burgerConstructor).contains('Ингредиент 2').should('exist');
    cy.get(burgerConstructor).contains('Ингредиент 4').should('exist');
  });
});

describe('Тестируем работу модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testPath);
  });

  it('Тестируем открытие модального окна ингредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент 1').should('exist');
  });

  it('Тестируем закрытие модального окна по крестику', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(closeModal).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Тестируем закрытие модального окна по оверлею', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(closeOverlay).click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Тестируем создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'userOrder.json' });

    // подставляем фейковые токены авторизации
    window.localStorage.setItem('authRefreshToken', 'mockedRefreshToken');
    cy.setCookie('authAccessToken', 'mockedAccessToken');
    cy.visit(testPath);
  });

  // очищаем токен после теста
  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('Сборка и оформление заказа', () => {
    cy.get(bunsConstructor).contains('Добавить').click();
    cy.get(mainsConstructorIngredients).contains('Добавить').click();
    cy.get(saucesConstructor).contains('Добавить').click();

    cy.get(orderButton).click();
    cy.get(orderNumber).contains('123').should('exist');

    cy.get(closeModal).click();
    cy.get(orderNumber).should('not.exist');

    cy.get(burgerConstructor).contains('Ингредиент 1').should('not.exist');
    cy.get(burgerConstructor).contains('Ингредиент 2').should('not.exist');
    cy.get(burgerConstructor).contains('Ингредиент 4').should('not.exist');
  });
});
