import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsData } from '../../slices/ingredientSlice/ingredientSlice';
import {
  isSearchSuccessSelector,
  getOrderByNumber,
  getOrderByNumberSelector
} from '../../slices/feedSlice/feedSlice';

export const OrderInfo: FC = () => {
  const currentNumber = Number(useParams().number);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByNumber(Number(currentNumber)));
  }, [dispatch]);
  const isSearchSuccess = useSelector(isSearchSuccessSelector);
  const orderData = useSelector(getOrderByNumberSelector);

  const ingredients: TIngredient[] = useSelector(getIngredientsData);

  /* готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || !isSearchSuccess) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
