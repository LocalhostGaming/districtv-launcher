import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { ROUTE } from '@constants/routes';
import { Group, ActionIcon } from '@mantine/core';
import { IconWindowMinimize, IconX } from '@tabler/icons';
import { RouterView } from './router';

import '@styles/app.css';

const App = () => {
  const [location, setLocation] = useLocation();

  const handleOnMinimize = async () => {
    window.electron.emit('minimize-window');
  };

  const handleOnClose = async () => {
    window.electron.emit('close-window');
  };

  // const handleOnSystemTray = async () => {
  //   appWindow.hide();
  // };

  useEffect(() => {
    if (location === '' || location.includes('index.html'))
      setLocation(ROUTE.AUTH.LOGIN.FULLPATH);
  }, []);

  return (
    <div className="app">
      <div className="flex justify-end w-full p-2 absolute">
        {location}
        <Group className="bg-zinc-800 p-1 rounded-lg" spacing="xs">
          {/* Minimize Button */}
          <ActionIcon
            className="hover:bg-zinc-700"
            onClick={() => handleOnMinimize()}
          >
            <IconWindowMinimize size={16} />
          </ActionIcon>

          {/* Close Button */}
          <ActionIcon
            className="hover:bg-zinc-700"
            onClick={() => handleOnClose()}
          >
            <IconX size={17} />
          </ActionIcon>
        </Group>
      </div>

      <RouterView />
    </div>
  );
};

export default App;
