import { RouteObject } from 'react-router-dom';

import { ROUTE } from '@constants/routes';

// Views
import { LoginPage } from '@views/Auth/Login';
import { RegisterPage } from '@views/Auth/Register';

import { PlayPage } from '@views/Dashboard/Play';
import { RouteLayout } from './components/RouteLayout';
import { Route } from './components/Route';

export const config: RouteObject[] = [
  {
    path: ROUTE.AUTH.LOGIN,
    element: (
      <Route>
        <RouteLayout>
          <LoginPage />
        </RouteLayout>
      </Route>
    ),
    index: true,
  },
  {
    path: ROUTE.AUTH.REGISTER,
    element: (
      <Route>
        <RouteLayout>
          <RegisterPage />
        </RouteLayout>
      </Route>
    ),
  },
  {
    path: ROUTE.DASHBOARD.PLAY,
    element: (
      <Route isPrivate>
        <RouteLayout layout="dashboard">
          <PlayPage />
        </RouteLayout>
      </Route>
    ),
  },
];
