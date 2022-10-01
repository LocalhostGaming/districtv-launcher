import { RouterView } from '@router/index';
import { ControlButtons } from '@components/index';

import '@styles/app.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/' || pathname.includes('index.html'))
      navigate('/auth/login');
  }, []);

  return (
    <div className="app">
      <div className="flex justify-end w-full p-2 absolute draggable">
        <ControlButtons className="not-draggable" />
      </div>

      <RouterView />
    </div>
  );
};

export default App;
