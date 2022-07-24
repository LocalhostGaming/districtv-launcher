/* eslint-disable react/destructuring-assignment */
import { Layout } from '@constants/layout';
import DefaultLayout from '@layouts/Default';
import MainLayout from '@layouts/Main';
import { RouteConfigItem } from '@router/types/IRouter';
import { Route } from './Route';

interface Props {
  route: RouteConfigItem;
}

const LayoutValue = Object.values(Layout);

const RoutedLayout = ({ route }: Props) => {
  // const [location] = useLocation();

  // Invalid Layout
  if (route?.layout && !LayoutValue.includes(route.layout)) {
    throw Error(
      `Invalid '${
        route.layout
      }' layout. Layout should be one of [${LayoutValue.join(', ')}]`
    );
  }

  /**
   *
   * Make a condition if the "currentPath" is equals to *name of your layout*
   * then return the Layout Component
   *
   * Ex.
   * if (getPageLayout(currentPath) === 'test') return <TestLayout>{children}</TestLayout>
   *
   */

  // ===== ADD NEW LAYOUTS HERE ===== //
  switch (route.layout) {
    case Layout.Main:
      return (
        <MainLayout>
          <Route route={route} />
        </MainLayout>
      );
    default:
      return (
        <DefaultLayout>
          <Route route={route} />
        </DefaultLayout>
      );
  }
};

export default RoutedLayout;
