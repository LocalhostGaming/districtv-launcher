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
    // await appWindow.minimize();
  };

  const handleOnClose = async () => {
    // await appWindow.close();
    // await exit();
  };

  // const handleOnSystemTray = async () => {
  //   appWindow.hide();
  // };

  useEffect(() => {
    if (location === '/') setLocation(ROUTE.AUTH.LOGIN.FULLPATH);
  }, []);

  return (
    <div className="app">
      <div
        data-tauri-drag-region
        className="flex justify-end w-full p-2 absolute"
      >
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
