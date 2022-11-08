import { ReactNode } from 'react';

import DefaultLayout from '@layouts/Default';
import DashboardLayout from '@layouts/Dashboard';

export type Layouts = 'dashboard' | 'default';
interface Props {
  layout?: Layouts;
  children: ReactNode;
}

export const RouteLayout = ({ children, layout = 'default' }: Props) => {
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
  switch (layout) {
    case 'dashboard':
      return <DashboardLayout>{children}</DashboardLayout>;
    default:
      return <DefaultLayout>{children}</DefaultLayout>;
  }
};
