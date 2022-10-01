import { RouteObject } from 'react-router-dom';

import { ROUTE } from '@constants/routes';

// Views
import { LoginPage } from '@views/auth/login';
import { RegisterPage } from '@views/auth/register';

import { RouteLayout } from './components/RouteLayout';

export const config: RouteObject[] = [
  {
    path: ROUTE.AUTH.LOGIN,
    element: (
      <RouteLayout>
        <LoginPage />
      </RouteLayout>
    ),
    index: true,
  },
  {
    path: ROUTE.AUTH.REGISTER,
    element: (
      <RouteLayout>
        <RegisterPage />
      </RouteLayout>
    ),
  },
];
