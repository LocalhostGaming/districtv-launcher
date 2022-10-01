import { ReactNode } from 'react';

import { Layout } from '@constants/layout';
import DefaultLayout from '@layouts/Default';
import MainLayout from '@layouts/Main';

interface Props {
  layout?: Layout;
  children: ReactNode;
}

const LayoutValue = Object.values(Layout);

export const RouteLayout = ({ children, layout }: Props) => {
  // Invalid Layout
  if (layout && !LayoutValue.includes(layout)) {
    throw Error(
      `Invalid '${layout}' layout. Layout should be one of [${LayoutValue.join(
        ', '
      )}]`
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
  switch (layout) {
    case Layout.Main:
      return <MainLayout>{children}</MainLayout>;
    default:
      return <DefaultLayout>{children}</DefaultLayout>;
  }
};
