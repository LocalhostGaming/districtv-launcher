import { RouteObject } from 'react-router-dom';

import { ROUTE } from '@constants/routes';

// Views
import { LoginPage } from '@views/Auth/Login';
import { RegisterPage } from '@views/Auth/Register';

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
