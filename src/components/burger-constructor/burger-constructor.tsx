import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getLastOrder,
  getOrderRequestStatus,
  getUserAuthStatus,
  newUserOrder,
  setLastOrder
} from '../../slices/userSlices/userSlices';
import { getAllFeeds } from '../../slices/feedSlice/feedSlice';
import {
  getConstructorBun,
  getConstructorIngredients,
  resetConstructor
} from '../../slices/constructorSlice/constructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getUserAuthStatus);

  const constructorIngredients = useSelector(getConstructorIngredients);
  const constructorBun = useSelector(getConstructorBun);
  const dispatch = useDispatch();
  const constructorItems = {
    bun: constructorBun,
    ingredients: constructorIngredients
  };
  const orderRequest = useSelector(getOrderRequestStatus);

  const orderModalData = useSelector(getLastOrder);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsId: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      )
    ];

    dispatch(newUserOrder(ingredientsId));
    dispatch(resetConstructor());
    dispatch(getAllFeeds());
  };
  const closeOrderModal = () => dispatch(setLastOrder(null));

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
