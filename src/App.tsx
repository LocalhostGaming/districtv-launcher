import { appWindow } from '@tauri-apps/api/window';
import { exit } from '@tauri-apps/api/process';
import { Link } from 'wouter';
import { ROUTE } from '@constants/routes';
import { RouterView } from './router';

import '@styles/app.css';

const App = () => {
  const handleOnMinimize = async () => {
    await appWindow.minimize();
  };

  const handleOnClose = async () => {
    await appWindow.close();
    await exit();
  };

  // const handleOnSystemTray = async () => {
  //   appWindow.hide();
  // };

  return (
    <div className="app">
      <div data-tauri-drag-region className="flex justify-end w-full p-2">
        <div className="bg-dark-700 flex flex-wrap p-1 rounded-lg gap-1">
          <button
            type="button"
            className="h-[30px] w-[32px] hover:bg-dark-600 text-white rounded-lg"
            onClick={() => handleOnMinimize()}
          >
            _
          </button>
          <button
            type="button"
            className="h-[30px] w-[32px] hover:bg-dark-600 text-white rounded-lg"
            onClick={() => handleOnClose()}
          >
            x
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <Link to={ROUTE.AUTH.LOGIN} className="active">
          login
        </Link>
        <Link href={ROUTE.AUTH.REGISTER} className="active">
          register
        </Link>
      </div>

      <RouterView />
    </div>
  );
};

export default App;
