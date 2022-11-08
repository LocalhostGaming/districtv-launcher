import { RouterView } from '@router/index';
import { ControlButtons } from '@components/index';

import '@styles/app.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationsProvider } from '@mantine/notifications';

const App = () => {
  const queryClient = new QueryClient();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/' || pathname.includes('index.html'))
      navigate('/auth/login');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="flex justify-end w-full p-2 absolute draggable">
          <ControlButtons className="not-draggable" />
        </div>
        <NotificationsProvider
          style={{ width: 320 }}
          className="not-draggable"
          position="top-center"
        >
          <RouterView />
        </NotificationsProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
