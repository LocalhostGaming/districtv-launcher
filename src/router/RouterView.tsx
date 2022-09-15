import { Switch } from 'wouter';
import { Suspense } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { routes } from './config';
import RoutedLayout from './components/LayoutedRoute';

const RouterView = () => {
  return (
    <Suspense
      fallback={
        <LoadingOverlay className="rounded-xl" visible overlayBlur={2} />
      }
    >
      <Switch>
        {routes.map((route) => (
          <RoutedLayout route={route} key={route.path} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default RouterView;
