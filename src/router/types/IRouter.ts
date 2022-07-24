import { Layout } from '@constants/layout';

export interface RouteConfigItem {
  name: string;
  path: string;
  component?: () => JSX.Element;
  layout?: Layout;
  children?: Omit<RouteConfigItem, 'layout'>[];
}

export type RouteConfig = RouteConfigItem[];
