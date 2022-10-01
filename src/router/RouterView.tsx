import { useRoutes } from 'react-router-dom';
import { config } from './config';

const RouterView = () => {
  const routes = useRoutes(config);

  return <div className="h-full w-full">{routes}</div>;
};

export default RouterView;
