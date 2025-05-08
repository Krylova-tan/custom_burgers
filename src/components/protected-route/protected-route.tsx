import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import {
  getAuthLoading,
  getUserAuthStatus
} from '../../slices/userSlices/userSlices';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getUserAuthStatus);
  const isDataLoading = useSelector(getAuthLoading);

  // пока идёт чекаут пользователя, показываем прелоадер
  if (isDataLoading) {
    return <Preloader />;
  }

  // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
  if (!isAuthenticated && !onlyUnAuth) {
    return <Navigate replace to={'/login'} state={{ from: location }} />;
  }

  // eсли пользователь на странице авторизации и данные есть в хранилище
  if (isAuthenticated && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }
  return children;
};
