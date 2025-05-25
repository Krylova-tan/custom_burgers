import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { setCookie } from '../../utils/cookie';
import {
  loginUser,
  makeLoginUserSuccess
} from '../../slices/userSlices/userSlices';

export const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((data) => {
        try {
          localStorage.setItem('refreshToken', data.refreshToken);
          setCookie('accessToken', data.accessToken);
        } catch (err) {
          return new Error('error');
        }
      })
      .then(() => dispatch(makeLoginUserSuccess(true)))
      .then(() => navigate('/'));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
