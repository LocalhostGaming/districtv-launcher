import { RouteObject } from 'react-router-dom';

import { ROUTE } from '@constants/routes';
import { LoginPage } from '@views/auth/login';
import { RegisterPage } from '@views/auth/register';

import { RouteLayout } from './components/RouteLayout';

export const config: RouteObject[] = [
  {
    path: ROUTE.AUTH.PATH,
    children: [
      {
        path: ROUTE.AUTH.LOGIN.FULLPATH,
        element: (
          <RouteLayout>
            <LoginPage />
          </RouteLayout>
        ),
      },
      {
        path: ROUTE.AUTH.REGISTER.FULLPATH,
        element: (
          <RouteLayout>
            <RegisterPage />
          </RouteLayout>
        ),
      },
    ],
  },
];
