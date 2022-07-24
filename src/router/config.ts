import { lazily } from 'react-lazily';
import { RouteConfig } from './types/IRouter';

const { LoginPage } = lazily(() => import('../views/auth/login'));
const { RegisterPage } = lazily(() => import('../views/auth/register'));

export const routes: RouteConfig = [
  {
    name: 'Login',
    path: '/auth',
    children: [
      {
        name: 'Login',
        path: '/login',
        component: LoginPage,
      },
      {
        name: 'Register',
        path: '/register',
        component: RegisterPage,
      },
    ],
  },
];
