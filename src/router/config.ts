import { ROUTE } from '@constants/routes';
import { lazily } from 'react-lazily';
import { RouteConfig } from './types/IRouter';

const { LoginPage } = lazily(() => import('../views/auth/login'));
const { RegisterPage } = lazily(() => import('../views/auth/register'));

export const routes: RouteConfig = [
  {
    name: 'Login',
    path: ROUTE.AUTH.PATH,
    children: [
      {
        name: 'Login',
        path: ROUTE.AUTH.LOGIN.PATH,
        component: LoginPage,
      },
      {
        name: 'Register',
        path: ROUTE.AUTH.REGISTER.PATH,
        component: RegisterPage,
      },
    ],
  },
];
