import { Switch } from 'wouter';
import { Suspense } from 'react';
import { routes } from './config';
import RoutedLayout from './components/LayoutedRoute';

const Loading = () => <h1>LOADING</h1>;
// eslint-disable
const RouterView = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route) => (
          <RoutedLayout route={route} key={route.path} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default RouterView;
