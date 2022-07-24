import { RouteConfigItem } from '@router/types/IRouter';
import { Route as WRoute } from 'wouter';
import { NestedRoute } from './NestedRoute';

interface Props {
  route: RouteConfigItem;
}

export const Route = ({ route: parentRoute }: Props) => {
  if (parentRoute.children) {
    return (
      <NestedRoute base={parentRoute.path}>
        {parentRoute.children.map((childRoute) => (
          <WRoute
            path={childRoute.path}
            key={childRoute.path}
            component={childRoute.component}
          />
        ))}
      </NestedRoute>
    );
  }

  return (
    <WRoute
      path={parentRoute.path}
      key={parentRoute.path}
      component={parentRoute.component}
    />
  );
};
